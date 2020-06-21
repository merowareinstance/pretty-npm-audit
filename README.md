# pretty-audit
A Nodejs library that provides a pretty version of npm audits

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

╔═════════════════════╤═════════════════════════════════════════════════════════════════════════════╗
║ Title               │ Information Exposure                                                        ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Level               │ moderate                                                                    ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Package             │ apollo-server-micro                                                         ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Overview            │ Versions of `apollo-server-micro` prior to 2.4.12 are vulnerable to Informa ║
║                     │ tion Exposure. The package does not properly enforce validation rules when  ║
║                     │ creating subscription servers, which includes a `NoInstrospection` rule for ║
║                     │ the Websocket. This leaks the GraphQL schema types, their relations and hum ║
║                     │ an-readable names.   More information can be found on the references.       ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Vulnerable Versions │ <2.4.12                                                                     ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Patched Versions    │ >=2.4.12                                                                    ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Recommendation      │ Upgrade to version 2.14.2 or later.                                         ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ More Info           │ https://npmjs.com/advisories/1535                                           ║
╚═════════════════════╧═════════════════════════════════════════════════════════════════════════════╝

╔═════════════════════╤═════════════════════════════════════════════════════════════════════════════╗
║ Title               │ Prototype Pollution                                                         ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Level               │ low                                                                         ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Package             │ yargs-parser                                                                ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Overview            │ Affected versions of `yargs-parser` are vulnerable to prototype pollution.  ║
║                     │ Arguments are not properly sanitized, allowing an attacker to modify the pr ║
║                     │ ototype of `Object`, causing the addition or modification of an existing pr ║
║                     │ operty that will exist on all objects.                                      ║
║                     │ Parsing the argument `--foo.__proto__.bar baz'` adds a `bar` property with  ║
║                     │ value `baz` to all objects. This is only exploitable if attackers have cont ║
║                     │ rol over the arguments being passed to `yargs-parser`.                      ║
║                     │                                                                             ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Vulnerable Versions │ <13.1.2 || >=14.0.0 <15.0.1 || >=16.0.0 <18.1.2                             ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Patched Versions    │ >=13.1.2 <14.0.0 || >=15.0.1 <16.0.0 || >=18.1.2                            ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Recommendation      │ Upgrade to versions 13.1.2, 15.0.1, 18.1.1 or later.                        ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ More Info           │ https://npmjs.com/advisories/1500                                           ║
╚═════════════════════╧═════════════════════════════════════════════════════════════════════════════╝
```