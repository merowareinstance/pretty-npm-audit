# pretty-npm-audit
A Nodejs library that provides a pretty version of npm audits

## Install

```
$ npm install pretty-npm-audit
```

## Params

- `dirPath`

   Directory path of the project to audit 
(Defaults current directory)

- `environment`

   Environment of the project 
(Currently Unimplemented)

- `sort`

   Sort output audits ascending from least to most serverity or descending from most to least severity.

  Options:

      asc - (String) Ascending severity low to high 
      dsc - (String) Descending severity high to low (Default)

- `debug`

  Whether to output logging of action running. 
(Default false)

## Usage

### Example 1
```js
const prettyNpmAudit = require("pretty-audit");

prettyNpmAudit({
    dirPath: "./vulnerable-package",
    sort: "asc",
  });
  

const results = await prettyNpmAudit.audit();
```

This produces:

A string containing a list of formatted tables in ascending order depending on the sort string
```
╔═════════════════════╤═════════════════════════════════════════════════════════════════════════════╗
║ Title               │ Regular Expression Denial of Service                                        ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Level               │ high                                                                        ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Package             │ papaparse                                                                   ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Overview            │ Versions of `papaparse` prior to 5.5.2 are vulnerable to Regular Expression ║
║                     │ Denial of Service (ReDos). The `parse` function contains a malformed regula ║
║                     │ r expression that takes exponentially longer to process non-numerical input ║
║                     │ s. This allows attackers to stall systems and lead to Denial of Service.    ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Vulnerable Versions │ <5.2.0                                                                      ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Patched Versions    │ >=5.2.0                                                                     ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Recommendation      │ Upgrade to version 5.2.0 or later.                                          ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ More Info           │ https://npmjs.com/advisories/1515                                           ║
╚═════════════════════╧═════════════════════════════════════════════════════════════════════════════╝
```

### Example 2
```js
const prettyNpmAudit = require("pretty-audit");

prettyNpmAudit({
    dirPath: "./vulnerable-package",
    json: true
  });
  

const results = await prettyNpmAudit.audit();
```

This produces:

A json object hash with severities as keys and arrays of audit strings similar to the ones on example 1. The keys are sorted depending if sort key is provided.

```json
{ 
  "critical": [],
  "high": [],
  "moderate": [],
  "low": [],
  "info": [] 
}
```

## Contributing

TBD

## License

Licensed under [MIT](./LICENSE).
