# Urban Dictionary
Easily search urban dictionary and pull up terms with other useful utilities.

## Install
```sh
npm install urbandict
```

## Usage
```js
const urban = require("urbandict");

// Search a term
urban("term").then(console.log);
// Search a term by definition id
urban({ defid: 12750383 }).then(console.log);
// Limit results
urban({ term: "term", limit: 5 });
// Markdown the definitions (replaces all [term] boxes with a markdown url to the urban page)
urban({ term: "term", markdown: true });
// HTML the definitions (same as markdown but in html form)
// The term will be HTML Escaped first to prevent security issues.
urban({ term: "term", html: true });
// Custom processing the boxes
urban({
  term: "term",
  process: (term) => term // do some processing with the boxed term name
});

// Note: You can only use one of html, markdown, custom processing options
// Markdown will be tried first then html then custom
// So if more than option one exists the first one will be the one used.


// Other internal stuff exposed.

urban.html("definition"); // the processor used for the html: true option
urban.markdown("definition"); // the processor used for the markdown: true option

// The request function used by urban() does not accept a string
// only an object with { term, defid, limit = Infinity }
urban.request({ term: "term" }).then(console.log);

// The regular expression used to catch the [boxed terms] from the definition.
console.log(urban.boxRegex);
```

## CLI
Install globally:
```sh
npm i -g urbandict
```

Now you have access to use the `urban` executable:
```sh
$ urban --help
Usage: cli [options] [term...]

Options:
  -v, --version        output the version number
  -m, --markdown       Turn the [boxes] to markdown links.
  -H, --html           Turn the [boxes] to html anchors.
  -l, --limit <limit>  Limit the number of results.
  -i, --id <id>        Use a definition id instead of a term.
  -h, --help           output usage information
```

## License
MIT
