import assert from "node:assert/strict";
import test from "node:test";
import { safeRedirect } from "../src/lib/safe-redirect.ts";

test("preserves local routes and OAuth consent parameters", () => {
  for (const path of [
    "/",
    "/studio/media",
    "/.lovable/oauth/consent?authorization_id=123%2F456",
    "/portfolio#work",
  ]) {
    assert.equal(safeRedirect(path), path);
  }
});

test("rejects off-site redirects and browser normalization bypasses", () => {
  for (const path of [
    undefined,
    null,
    42,
    "",
    "https://example.com",
    "//example.com",
    "/a/..//example.com",
    "/%2e%2e//example.com",
    "/\\example.com",
    "/\t/example.com",
    "/\n/example.com",
    " /studio/media",
    "javascript:alert(1)",
  ]) {
    assert.equal(safeRedirect(path), undefined, `Accepted ${JSON.stringify(path)}`);
  }
});

test("all accepted destinations resolve to the current origin", () => {
  const origin = "https://mcdesign.example";
  for (const path of [
    "/%2F%2Fexample.com",
    "/%5Cexample.com",
    "/a/../studio/media",
    "/?redirect=https://example.com",
    "/#//example.com",
  ]) {
    const destination = safeRedirect(path);
    assert.ok(destination);
    assert.equal(new URL(destination, origin).origin, origin);
  }
});
