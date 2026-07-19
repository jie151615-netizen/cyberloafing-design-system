// Bundles the whole arcade (design tokens + fonts + all 3 games + shell)
// into one self-contained HTML file suitable for publishing as a Claude
// Artifact — no external requests, no local file:// dependencies.
//
// Usage:  node games/arcade/build-artifact.js
// Output: games/arcade/artifact-bundle.html (gitignored — regenerate anytime)
//
// After running this, ask Claude to publish/update the Artifact from the
// output file. If you want it to land on the *same* published URL instead
// of minting a new one, tell Claude the existing artifact URL (or ask it
// to check memory/its artifact list — the URL from the first publish was
// https://claude.ai/code/artifact/df497489-e072-4e00-b7ff-c0c8792ce971).
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const OUT = path.join(__dirname, "artifact-bundle.html");

function read(rel) { return fs.readFileSync(path.join(ROOT, rel), "utf8"); }
function readBin(rel) { return fs.readFileSync(path.join(ROOT, rel)); }

// ---- 1. Fonts -> base64 data URIs, replacing the file:// @font-face rules ----
const fontFiles = {
  300: "Light", 400: "Regular", 500: "Medium", 700: "Bold", 900: "Black",
};
let fontFaces = "";
for (const [weight, name] of Object.entries(fontFiles)) {
  const b64 = readBin(`assets/fonts/HarmonyOS_Sans_${name}.ttf`).toString("base64");
  fontFaces += `@font-face {\n  font-family: "HarmonyOS Sans";\n  src: url(data:font/ttf;base64,${b64}) format("truetype");\n  font-weight: ${weight};\n  font-style: normal;\n  font-display: swap;\n}\n`;
}

// ---- 2. Tokens: colors + spacing verbatim, typography with fonts swapped in ----
const colors = read("tokens/colors.css");
const spacing = read("tokens/spacing.css");
let typography = read("tokens/typography.css");
typography = typography.replace(/@font-face\s*{[\s\S]*?}\n*/g, "");
// typography.css has 5 @font-face blocks (file:// src) before `:root {` — strip
// all of them, then prepend the data-URI versions built above.
typography = fontFaces + "\n" + typography;

// ---- 3. Arcade shell's own <style> block ----
const arcadeHtml = read("games/arcade/index.html");
const styleMatch = arcadeHtml.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) throw new Error("Could not find <style> block in games/arcade/index.html");
const shellStyle = styleMatch[1];

// ---- 4. Vendor + compiled game JS, inlined verbatim ----
// (Safe as long as none of these contain a literal "</script" substring —
// true for the current minified/compiled files; re-check if you regenerate
// game.js from game.jsx with a different toolchain.)
for (const rel of [
  "games/vendor/react.production.min.js",
  "games/vendor/react-dom.production.min.js",
  "games/water-wanderer/game.js",
  "games/toilet-paper-runner/game.js",
  "games/biscuit-stealth/game.js",
  "games/arcade/app.js",
]) {
  if (read(rel).includes("</script")) {
    throw new Error(`${rel} contains a literal "</script" substring — inlining it verbatim would break the HTML. Escape it before bundling.`);
  }
}
const reactSrc = read("games/vendor/react.production.min.js");
const reactDomSrc = read("games/vendor/react-dom.production.min.js");
const waterSrc = read("games/water-wanderer/game.js");
const toiletSrc = read("games/toilet-paper-runner/game.js");
const biscuitSrc = read("games/biscuit-stealth/game.js");
const appSrc = read("games/arcade/app.js");

const html = `<style>
/* ============ Cyberloafing design tokens (inlined) ============ */
${colors}
${spacing}
${typography}

/* ============ Arcade shell chrome ============ */
${shellStyle}
</style>
<div id="root"></div>
<script>${reactSrc}</script>
<script>${reactDomSrc}</script>
<script>${waterSrc}</script>
<script>${toiletSrc}</script>
<script>${biscuitSrc}</script>
<script>${appSrc}</script>
`;

fs.writeFileSync(OUT, html);
console.log("wrote", OUT, "size:", (fs.statSync(OUT).size / 1024 / 1024).toFixed(2), "MB");
