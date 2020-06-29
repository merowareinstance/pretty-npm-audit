# pretty-npm-audit

![CI](https://github.com/meroware/pretty-npm-audit/workflows/CI/badge.svg)

A Nodejs library that provides a pretty version of npm audits

## Install

```
$ npm install pretty-npm-audit
```

## Params

- `dirPath` (String)

   Directory path of the project to audit 
(Defaults current directory)

- `sort` (String)

   Sort output audits ascending from least to most serverity or descending from most to least severity.

  Options:

      asc - (String) Ascending severity low to high 
      dsc - (String) Descending severity high to low (Default)

- `jsonPretty` (Boolean)

  Return a json object hash with severities as keys and arrays of audit strings in pretty tabular format. The keys are sorted depending if sort key is provided.
  (Default: false)

- `json` (Boolean)
    
    Return a json object hash with severities as keys and arrays of audit data used to populate pretty tables in json format. The keys are sorted depending if sort key is provided.
  (Default: false)

- `auditLevel` (String)

  The minimum level of audit to get
(Default low)
Options: Any of the levels in array ["low", "moderate", "high", "critical"];

- `debug`

  Whether to output logging of action running. 
(Default false)

## Usage

### Example 1
```js
const prettyNpmAudit = require("pretty-audit");

prettyNpmAudit({
    dirPath: "./vulnerable-package",
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
    jsonPretty: true,
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

### Example 3
```js
const prettyNpmAudit = require("pretty-audit");

prettyNpmAudit({
    dirPath: "./vulnerable-package",
    json: true,
  });
  

const results = await prettyNpmAudit.audit();
```

This produces:

A json object hash with severities as keys and arrays of audit json data used to populate the pretty tables described in example 1 and 2. The root level serverity keys can be sorted depending if sort key is provided.

```json
{ 
  "critical": [],
  "high": [],
  "moderate": [],
  "low": [
    { 
      "title": "Prototype Pollution",
       "moduleName": "yargs-parser",
       "vulnerableVersions": "<13.1.2 || >=14.0.0 <15.0.1 || >=16.0.0 <18.1.2",
       "patchedVersions": ">=13.1.2 <14.0.0 || >=15.0.1 <16.0.0 || >=18.1.2",
       "overview":
        "Affected versions of `yargs-parser` are vulnerable to prototype pollution. Arguments are not properly sanitized, allowing an attacker to modify the prototype of `Object`, causing the addition or modification of an existing property that will exist on all objects.  \nParsing the argument `--foo.__proto__.bar baz'` adds a `bar` property with value `baz` to all objects. This is only exploitable if attackers have control over the arguments being passed to `yargs-parser`.\n",
       "recommendation": "Upgrade to versions 13.1.2, 15.0.1, 18.1.1 or later.",
       "url": "https://npmjs.com/advisories/1500",
       "severity": "low" 
    }
  ],
  "info": [] 
}
```

## Contributing

TBD

## License

Licensed under [MIT](./LICENSE).
