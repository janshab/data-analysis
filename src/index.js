'use strict';
import { generateData } from './generate.js';
import { PRODUCTS } from './constants.js';
import { transformRecords, getRecordAggregatedData } from './set_data.js';
import { renderTable } from './render.js';

const RECORDS_N = 1000;
const records = generateData(RECORDS_N);
function getRecords(records) {
  const validatedData = records.filter(
    (record) =>
      record.company &&
      record.product &&
      record.count > 0 &&
      Number.isInteger(record.count)
  );
  const transformedData = transformRecords(validatedData);
  transformedData.forEach((record) => {
    PRODUCTS.forEach((product) => {
      if (!(product in record.products)) {
        record.products[product] = { count: 0, money: 0 };
      }
    });
  });
  return getRecordAggregatedData(transformedData);
}
const aggregatedData = getRecords(records);
renderTable(aggregatedData);
