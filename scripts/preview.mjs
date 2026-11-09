import http from "node:http";
import path from "node:path";
import { stat, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { gzip } from "node:zlib";
import { promisify } from "node:util";

const root = path.resolve(process.env.PREVIEW_DIRECTORY || path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../out"));
const port = Number(process.env.PORT || 3000);
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
if (basePath && (!basePath.startsWith("/") || /[?#\\]/.test(basePath))) throw new Error("NEXT_PUBLIC_BASE_PATH must be a path such as /my_sait");
const compress = promisify(gzip);
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf",
};
const server = http.createServer(async (request, response) => {
  try {
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { Allow: "GET, HEAD" }); response.end(); return;
    }
    const url = new URL(request.url || "/", "http://127.0.0.1");
    let pathname = decodeURIComponent(url.pathname);
    if (basePath) {
      if (pathname === basePath) { response.writeHead(308, { Location: basePath + "/" + url.search }); response.end(); return; }
      if (!pathname.startsWith(basePath + "/")) { response.writeHead(404); response.end("Not found"); return; }
      pathname = pathname.slice(basePath.length);
    }
    let filename = path.resolve(root, "." + pathname);
    if (filename !== root && !filename.startsWith(root + path.sep)) { response.writeHead(403); response.end(); return; }
    try { const info = await stat(filename); if (info.isDirectory()) filename = path.join(filename, "index.html"); }
    catch { filename = ""; }
    let code = 200;
    if (!filename) { code = 404; filename = path.join(root, "404.html"); }
    let content;
    try { content = await readFile(filename); }
    catch { response.writeHead(404); response.end("Not found"); return; }
    const headers = { "Content-Type": types[path.extname(filename)] || "application/octet-stream", "Cache-Control": "no-cache", "X-Content-Type-Options": "nosniff" };
    if (/\btext\/|application\/(?:json|javascript)/.test(headers["Content-Type"]) && /\bgzip\b/.test(request.headers["accept-encoding"] || "")) {
      content = await compress(content); headers["Content-Encoding"] = "gzip"; headers.Vary = "Accept-Encoding";
    }
    headers["Content-Length"] = String(content.length);
    response.writeHead(code, headers); response.end(request.method === "HEAD" ? undefined : content);
  } catch { response.writeHead(400); response.end("Bad request"); }
});
server.listen(port, "127.0.0.1", () => { console.log("Preview: http://127.0.0.1:" + port + basePath + "/"); console.log("Serving " + root + "; press Ctrl+C to stop."); });
server.on("error", error => { console.error(error.message); process.exit(1); });
