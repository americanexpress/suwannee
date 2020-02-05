# IOTA MAM (Masked Authentication Message) package

This extension of Suwannee framework enables interactions with the IOTA tangle, using the same "universal" API.

To lauch it, perform the following steps:

1. Add the following section to `dlt` node in the `config.json` in root directory of `suwannee` package:

```javascript
"iotaMam": {
    "nodeUrl": "<IOTA node, public or internal>",
    "sideKey": "<IOTA key for secure MAM communications>"
}
```

2. Create `.env` file in root of `suwannee`. Content is:

```sh
PLATFORM = @suwannee/iotaMam
```

3. Install and build suwannee

```sh
yarn && yarn build
```

4. Launch `suwannee`. Please note, the `start start` is not a spelling mistake!

```sh
yarn start start -c <path to config.json>
```

5. Swagger UI can be accessed at http://localhost:3001/swagger 

You ca try and run the following `cURL` command:

```sh
curl -X GET "http://localhost:3001/api/blockchain?applicationId=myapp&applicationContext=myAppContext&identity=me&functionName=MAM_PUBLIC&functionArguments=KGEQBBXN9HDOBYHGTQ9CZUBJRSTQL9TGGERDJC9NPKT9KKCKG9ZYDCGK9XICF9HNEUXIJRBYOJC9NISCZ" -H "accept: application/json"
```

For `iotaMam`, `functionName` can only have 2 values: `MAM_PUBLIC` or `MAM_PRIVATE`. If the latter, the request will use the `sideKey` configured above in the config file to encrypt/decrypt messages on the tangle.

## Authors

* Andras L Ferenczi <andras.l.ferenczi@aexp.com> [andrasfe](https://github.com/andrasfe)
* Chandrakanth Mamillapalli [chandrakanthm](https://github.com/chandrakanthm)
* Tajamul Fazili <tajamul.fazili@aexp.com> [TajamuFazili](https://github.com/tajamulfazili)

## Contributing

We welcome Your interest in the American Express Open Source Community on Github. Any Contributor to any Open Source
Project managed by the American Express Open Source Community must accept and sign an Agreement indicating agreement to
the terms below. Except for the rights granted in this Agreement to American Express and to recipients of software
distributed by American Express, You reserve all right, title, and interest, if any, in and to Your Contributions.
Please [fill out the Agreement](https://cla-assistant.io/americanexpress/suwannee).

Please feel free to open pull requests and see `CONTRIBUTING.md` for commit formatting details.

## License

Any contributions made under this project will be governed by the [Apache License 2.0](LICENSE).

## Code of Conduct

This project adheres to the [American Express Community Guidelines](CODE_OF_CONDUCT.md). By participating, you are
expected to honor these guidelines.


