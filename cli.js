#!/usr/bin/env node
/* eslint-disable no-console */
const program = require("commander");
const urban = require("./index.js");

let term;

program
  .version(require("./package.json").version, "-v, --version")
  .usage("[options] [term...]")
  .option("-m, --markdown", "Turn the [boxes] to markdown links.")
  .option("-H, --html", "Turn the [boxes] to html anchors.")
  .option("-l, --limit <limit>", "Limit the number of results.", parseInt)
  .option("-i, --id <id>", "Use a definition id instead of a term.", parseInt)
  .arguments("[term...]")
  .action((termOption) => {
    term = termOption.join(" ");
  });

program.parse(process.argv);

if(!term && !program.id) {
  console.error("Term is a required argument but optional when definition id is available but found none.\nTry urban --help for help.");
  process.exit(1);
}

urban({
  markdown: program.markdown,
  html: program.html,
  limit: program.limit,
  defid: program.id,
  term
})
  .then((res) => res.forEach((term) => {
    console.log([
      `Word: ${term.word}`,
      `Author: ${term.author}`,
      `ID: ${term.defid}`,
      `Written On: ${new Date(term.written_on).toDateString()}`,
      `Thumbsup: ${term.thumbs_up}`,
      `Thumbsdown: ${term.thumbs_down}`,
      `PermaLink: ${term.permalink}`,
      `Definition: ${term.definition}`,
      `Example: ${term.example}`
    ].join("\n"));
    console.log();
  }))
  .catch((err) => console.error(err.toString()));
