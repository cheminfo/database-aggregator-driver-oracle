import debugLib from 'debug';

import { checkOptions, getConnection } from './oracledb';
import { formatTimestamp } from './sql';

const debug = debugLib('aggregator:driver:oracle');

export async function getData(config, callback, options) {
  checkOptions(['connectString', 'query'], config);
  const oracleConn = await getConnection(config);

  const { query } = config;
  const { latestDate, ids } = options;

  let dataQuery = `
  SELECT * FROM (
    ${query}
  ) inner_table
  WHERE 1=1
  `;
  if (latestDate) {
    if (ids) {
      dataQuery += `\nAND moddate < ${formatTimestamp(latestDate)}`;
    } else {
      dataQuery += `\nAND moddate >= ${formatTimestamp(latestDate)}`;
    }
  }
  if (ids) {
    dataQuery += `\nAND ID IN ('${ids.join("','")}')`;
  }

  // This clause is very important for incremental updates
  dataQuery += '\nORDER BY moddate ASC';

  debug(dataQuery);
  const resultSet = await oracleConn.execute(query);
  debug('result set ready');

  let rows;
  /* eslint-disable no-await-in-loop */
  do {
    const entries = [];
    rows = await resultSet.getRows(100);
    for (let i = 0; i < rows.length; i++) {
      entries.push(convert(rows[i]));
    }
    await callback(entries);
  } while (rows.length > 0);
  /* eslint-enable */

  await oracleConn.release();
}

function convert(row) {
  const obj = {
    id: row.ID,
    commonID: row.PID,
    modificationDate: row.MODDATE || new Date(0),
    data: row
  };

  delete row.ID;
  delete row.PID;
  delete row.MODDATE;
  return obj;
}
