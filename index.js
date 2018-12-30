const request = require("./request.js");
const escapeHTML = require("escape-html");

// https://stackoverflow.com/questions/52374809/javascript-regular-expression-to-catch-boxes
const boxRegex = /\[([^\][]+)\]/g;

function markdown(str) {
  return str.replace(boxRegex, (_, term) => `[${term}](https://www.urbandictionary.com/define.php?term=${term.replace(/\s+/g, "+")})`);
}

function html(str) {
  return str.replace(boxRegex, (_, term) => `<a href="https://www.urbandictionary.com/define.php?term=${term.replace(/\s+/g, "+")}">${escapeHTML(term)}</a>`);
}

async function urban(term = {}) {
  if(!term)
    throw new Error("Missing term pass a term as string or an object with defid");
  if(typeof term === "string") term = { term };
  const terms = await request(term);
  if(term.markdown) return terms.map((term) => {
    term.definition = markdown(term.definition);
    term.example = markdown(term.example);
    return term;
  });
  if(term.html) return terms.map((term) => {
    term.definition = html(term.definition);
    term.example = html(term.example);
    return term;
  });
  if(term.process && typeof term.process === "function") return terms.map((term) => {
    term.definition = term.definition.replace(boxRegex, (_, term) => term.process(term));
    term.example = term.example.replace(boxRegex, (_, term) => term.process(term));
    return term;
  });
  return terms;
}

module.exports = urban;
module.exports.request = request;
module.exports.markdown = markdown;
module.exports.html = html;
module.exports.boxRegex = boxRegex;
