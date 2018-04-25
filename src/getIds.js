import debugLib from 'debug';

import { checkOptions, getConnection } from './oracledb';

const debug = debugLib('aggregator:driver:oracle');

export async function getIds(config) {
  checkOptions(['connectString', 'query'], config);
  const oracleConn = await getConnection(config);

  let { query } = config;
  query = `SELECT id FROM (\n${query}\n) inner_table`;
  debug(query);

  const resultSet = await oracleConn.execute(query);
  debug('result set ready');

  var ids = new Set();
  let rows;
  /* eslint-disable no-await-in-loop */
  do {
    rows = await resultSet.getRows(100);
    for (let i = 0; i < rows.length; i++) {
      ids.add(rows[i].ID.toString());
    }
  } while (rows.length > 0);
  /* eslint-enable */
  await resultSet.close();
  await oracleConn.release();
  return ids;
}
