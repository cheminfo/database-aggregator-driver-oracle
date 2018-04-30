import debugLib from 'debug';
import OracleDB from 'oracledb';

import { checkOptions } from './util';

const debug = debugLib('aggregator:driver:oracle');

export async function getIds(config) {
  checkOptions(['connectString', 'query'], config);
  const oracleConn = await OracleDB.getConnection(config);

  let { query } = config;
  query = `SELECT id FROM (\n${query}\n) inner_table`;
  debug(query);

  const { rows } = await oracleConn.execute(query);
  const ids = new Set(rows.map((row) => row[0].toString()));
  await oracleConn.release();
  return ids;
}
