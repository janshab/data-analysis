import { PRODUCT_PRICES } from './generate.js';
export const PRICES = PRODUCT_PRICES;
export const PRODUCTS = Object.keys(PRICES);
export const TABLE_HEADERS = [
  'Компания',
  ...PRODUCTS.reduce((acc, product) => {
    acc.push(`${product}шт.`);
    acc.push(`${product}руб.`);
    return acc;
  }, []),
  'Итого',
  '% от всех продаж',
];
