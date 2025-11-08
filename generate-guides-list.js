// Run with: node generate-guides-list.js
const fs = require("fs");
const path = require("path");

const guidesDir = path.join(__dirname, "guides");
const output = path.join(guidesDir, "guides.json");

const guides = fs.readdirSync(guidesDir)
  .filter(f => f.endsWith(".html"))
  .map(file => {
    const title = file.replace(/-/g, " ").replace(".html", "")
      .replace(/\b\w/g, c => c.toUpperCase());
    return {
      title,
      description: "An interactive step-by-step guide.",
      file
    };
  });

fs.writeFileSync(output, JSON.stringify(guides, null, 2));
console.log("✅ guides.json updated!");
