import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import test from "node:test";

async function fixture(run, { isPublic = false, failMove = false } = {}) {
  const source = new Set(
    Array.from(
      { length: 105 },
      (_, i) => `private-gallery/project/${String(i).padStart(3, "0")}.webp`,
    ),
  );
  const moved = [];
  let shouldFail = failMove;
  const server = createServer(async (req, res) => {
    let body = "";
    for await (const chunk of req) body += chunk;
    const data = body ? JSON.parse(body) : {};
    res.setHeader("content-type", "application/json");
    if (req.url === "/storage/v1/bucket") {
      res.end(JSON.stringify([{ id: "private-gallery", public: isPublic }]));
    } else if (req.url === "/storage/v1/object/list/site-media") {
      const items =
        data.prefix === "private-gallery"
          ? [{ name: "project", id: null }]
          : [...source].map((path) => ({ id: path, name: path.split("/").at(-1) }));
      res.end(JSON.stringify(items.slice(data.offset, data.offset + data.limit)));
    } else if (req.url === "/storage/v1/object/move") {
      assert.equal(data.bucketId, "site-media");
      assert.equal(data.destinationBucket, "private-gallery");
      assert.equal(data.sourceKey, data.destinationKey);
      assert.ok(source.has(data.sourceKey));
      if (shouldFail && moved.length === 1) {
        shouldFail = false;
        res.statusCode = 400;
        res.end(
          JSON.stringify({ statusCode: "400", error: "test", message: "Simulated move failure" }),
        );
        return;
      }
      source.delete(data.sourceKey);
      moved.push(data.sourceKey);
      res.end(JSON.stringify({ message: "Successfully moved" }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Unexpected request" }));
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const execute = () =>
    new Promise((resolve, reject) => {
      const child = spawn(process.execPath, ["scripts/migrate-private-gallery.mjs"], {
        cwd: new URL("../", import.meta.url),
        env: {
          ...process.env,
          SUPABASE_URL: `http://127.0.0.1:${server.address().port}`,
          SUPABASE_SERVICE_ROLE_KEY: "test-only-key",
        },
        stdio: ["ignore", "pipe", "pipe"],
      });
      let output = "";
      child.stdout.on("data", (chunk) => {
        output += chunk;
      });
      child.stderr.on("data", (chunk) => {
        output += chunk;
      });
      child.on("error", reject);
      child.on("close", (code) => resolve({ code, output }));
    });
  try {
    await run({ execute, source, moved });
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test("moves all legacy files across listing pages and safely reruns", async () => {
  await fixture(async ({ execute, source, moved }) => {
    assert.equal((await execute()).code, 0);
    assert.equal(source.size, 0);
    assert.equal(moved.length, 105);
    assert.match((await execute()).output, /Moved 0 gallery file/);
  });
});

test("stops on a failed move and resumes without moving successful files twice", async () => {
  await fixture(
    async ({ execute, source, moved }) => {
      assert.notEqual((await execute()).code, 0);
      assert.equal(moved.length, 1);
      assert.equal((await execute()).code, 0);
      assert.equal(source.size, 0);
      assert.equal(new Set(moved).size, 105);
    },
    { failMove: true },
  );
});

test("refuses to move files into a public destination bucket", async () => {
  await fixture(
    async ({ execute, moved }) => {
      assert.notEqual((await execute()).code, 0);
      assert.equal(moved.length, 0);
    },
    { isPublic: true },
  );
});
