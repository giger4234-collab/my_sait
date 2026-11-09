import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile, readdir, stat } from "node:fs/promises";

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const root = path.resolve(process.env.EXPORT_DIRECTORY || path.join(project, "out"));
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");
const html = await readFile(path.join(root, "index.html"), "utf8");
assert.match(html, /<html[^>]*lang="ru"/, "The document must declare Russian");
assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, "Expected exactly one H1");
assert.match(html, /ВЕБ СТУДИЯ/, "Studio navigation is missing");
assert.match(html, /https:\/\/t\.me\/webdiz3d/, "Telegram contact is missing");
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
const anchors = [...html.matchAll(/\bhref="#([^"]+)"/g)].map(match => match[1]);
for (const id of anchors) assert(ids.has(id), "Missing anchor target: " + id);
assert(!/\bhref="\s*"/.test(html), "Empty link found");
const seen = new Set();
function localPath(url) {
  const pathname = decodeURIComponent(new URL(url, "https://export.test").pathname);
  if (basePath) assert(pathname.startsWith(basePath + "/"), "Missing basePath in resource: " + url);
  const relative = basePath ? pathname.slice(basePath.length) : pathname;
  const filename = path.resolve(root, "." + relative);
  assert(filename.startsWith(root + path.sep), "Resource points outside export: " + url);
  return filename;
}
async function check(url) {
  if (seen.has(url)) return;
  seen.add(url);
  const filename = localPath(url);
  assert((await stat(filename)).isFile(), "Missing exported resource: " + url);
  let directory = root;
  for (const segment of path.relative(root, filename).split(path.sep)) {
    assert((await readdir(directory)).includes(segment), "Filename case differs: " + filename);
    directory = path.join(directory, segment);
  }
  if (filename.endsWith(".css")) {
    const css = await readFile(filename, "utf8");
    for (const match of css.matchAll(/url\(\s*["']?([^"'()\s]+)["']?\s*\)/g)) {
      if (!match[1].startsWith("data:") && !match[1].startsWith("http")) await check(new URL(match[1], "https://export.test" + url).pathname);
    }
  }
}
const urls = [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)].map(match => match[1].replaceAll("&amp;", "&")).filter(url => url.startsWith("/") && !url.startsWith("//"));
for (const url of urls) await check(url);
for (const name of ["earth", "mars", "saturn"]) await check(basePath + "/assets/textures/" + name + ".webp");
for (const match of html.matchAll(/<a\b([^>]*)>/g)) {
  if (/target="_blank"/.test(match[1])) {
    assert(/rel="[^"]*\bnoopener\b[^"]*"/.test(match[1]), "External link lacks noopener");
    assert(/rel="[^"]*\bnoreferrer\b[^"]*"/.test(match[1]), "External link lacks noreferrer");
  }
}
if (siteUrl) assert(html.includes('rel="canonical" href="' + siteUrl + '/"'), "Canonical URL does not match publication URL");
async function size(directory) {
  let bytes = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    assert(!["node_modules", ".git", ".env", ".env.local"].includes(entry.name), "Private or source-only directory in export");
    const filename = path.join(directory, entry.name);
    bytes += entry.isDirectory() ? await size(filename) : (await stat(filename)).size;
  }
  return bytes;
}
const bytes = await size(root);
assert(bytes < 1024 ** 3, "Export exceeds GitHub Pages 1 GiB size limit");
console.log("PASS: one H1, " + anchors.length + " anchors, Telegram and studio navigation.");
console.log("PASS: " + seen.size + " resources, font URLs and exact filename case.");
console.log("PASS: basePath=" + (basePath || "/") + "; export " + (bytes / 1024 / 1024).toFixed(2) + " MiB.");
if (siteUrl) console.log("PASS: canonical " + siteUrl + "/");
