import { PRICES } from './constants.js';
export function transformRecords(records) {
  return records.reduce((accum, record) => {
    const money = calculateMoney(record);
    const existingCompany = findCompany(accum, record.company);

    if (existingCompany) {
      updateExistingCompany(existingCompany, record, money);
    } else {
      addNewCompany(accum, record, money);
    }

    return accum;
  }, []);
}
export function calculateMoney(record) {
  return formatNumber(record.count * PRICES[record.product]);
}

export function findCompany(accum, companyName) {
  return accum.find((item) => item.company === companyName);
}

export function updateExistingCompany(company, record, money) {
  let productData = company.products[record.product];
  if (!productData) {
    productData = { count: 0, money: 0 };
    company.products[record.product] = productData;
  }
  productData.count += record.count;
  productData.money = formatNumber(productData.money + money);
}
export function addNewCompany(accum, record, money) {
  const products = {};
  products[record.product] = { count: record.count, money: money };
  accum.push({
    products: products,
    company: record.company,
  });
}
export function getRecordAggregatedData(records) {
  const recordsTotalMoney = calcRecordsTotalMoney(records);
  const purchasesSum = calcTotalSum(recordsTotalMoney);
  return calcPercentPerPurchase(recordsTotalMoney, purchasesSum);
}

export function calcRecordsTotalMoney(records) {
  return records.map((record) => {
    const total = getTotalMoney(record);
    record.totalMoney = formatNumber(total);
    return record;
  });
}

export function getTotalMoney(record) {
  return Object.values(record.products).reduce((sum, productData) => {
    return sum + productData.money;
  }, 0);
}

export function calcTotalSum(records) {
  return records.reduce((sum, record) => {
    return sum + record.totalMoney;
  }, 0);
}

export function calcPercentPerPurchase(records, purchasesSum) {
  return records.map((record) => {
    record.purchasePercentage = formatNumber(
      (record.totalMoney / purchasesSum) * 100
    );
    return record;
  });
}
export function formatNumber(number) {
  return +number.toFixed(2);
}
