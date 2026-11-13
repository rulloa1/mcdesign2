import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { projectAlbums } from "../src/data/albums.ts";

test("every bundled album image exists in public assets", () => {
  for (const [id, album] of Object.entries(projectAlbums)) {
    for (const image of album.images) {
      assert.ok(image.startsWith("/projects/assets/"), `Unexpected local album path: ${image}`);
      assert.ok(
        existsSync(new URL(`../public${image}`, import.meta.url)),
        `${id}: missing ${image}`,
      );
    }
  }
});
