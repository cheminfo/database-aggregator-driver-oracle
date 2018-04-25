# database-aggregator-driver-oracle

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

Oracle Database driver for database-aggregator.

## Installation

`$ npm install --save database-aggregator-driver-oracle`

## Usage

The source configuration must have two properties:

### `config.connectString`

The Oracle Database connection string

### `config.query`

A string with the query to make.  
The query must return the following columns:

* `ID`: The row's unique identifier
* `PID`: The entry's unique identifier (for aggregation)
* `MODDATE`: The last modification date for this row

All other columns will be stored in the source database.

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/database-aggregator-driver-oracle.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/database-aggregator-driver-oracle
[download-image]: https://img.shields.io/npm/dm/database-aggregator-driver-oracle.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/database-aggregator-driver-oracle
