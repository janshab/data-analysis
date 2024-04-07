import { TABLE_HEADERS } from './constants.js';
export function renderTable(records) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const headerRow = document.createElement('tr');
  TABLE_HEADERS.forEach((headerText) => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  records.forEach((record) => {
    const row = document.createElement('tr');
    TABLE_HEADERS.forEach((header) => {
      const td = document.createElement('td');
      if (header.includes('шт.')) {
        const product = header.split('шт.')[0];
        td.textContent = record.products[product]?.count || 0;
      } else if (header.includes('руб.')) {
        const product = header.split('руб.')[0];
        td.textContent = record.products[product]?.money || 0;
      } else if (header === 'Компания') {
        td.textContent = record.company;
      } else if (header === 'Итого') {
        td.textContent = record.totalMoney;
      } else if (header === '% от всех продаж') {
        td.textContent = record.purchasePercentage;
      }
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });
  table.appendChild(thead);
  table.appendChild(tbody);
  document.querySelector('.container').appendChild(table);
}
