document.addEventListener('DOMContentLoaded', () => {
  const tableContainer = document.getElementById('table-container');
  const addRowBtn = document.getElementById('add-row');
  const addColumnBtn = document.getElementById('add-column');
  const freezeRowBtn = document.getElementById('freeze-row');
  const freezeColumnBtn = document.getElementById('freeze-column');
  
  const data = [
      { id: 1, name: 'John Doe', age: 28, email: 'john.doe@example.com', salary: 50000 },
      { id: 2, name: 'Jane Smith', age: 34, email: 'jane.smith@example.com', salary: 65000 },
      { id: 3, name: 'Alice Johnson', age: 29, email: 'alice.j@example.com', salary: 54000 },
      { id: 4, name: 'Bob Brown', age: 45, email: 'bob.brown@example.com', salary: 75000 },
      { id: 5, name: 'Charlie Black', age: 38, email: 'charlie.black@example.com', salary: 69000 }
  ];

  function generateTable(data) {
      tableContainer.innerHTML = '';
      if (data.length === 0) return;

      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const tbody = document.createElement('tbody');

      // Create table headers
      const headers = Object.keys(data[0]);
      const headerRow = document.createElement('tr');
      headers.forEach(header => {
          const th = document.createElement('th');
          th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
          th.classList.add('sortable');
          th.addEventListener('click', () => sortTable(header));
          headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);

      // Create table rows
      data.forEach(rowData => {
          const row = document.createElement('tr');
          headers.forEach(header => {
              const td = document.createElement('td');
              td.textContent = rowData[header];
              td.contentEditable = true;
              td.addEventListener('input', () => updateData(rowData.id, header, td.textContent));
              row.appendChild(td);
          });
          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.addEventListener('click', () => deleteRow(rowData.id));
          const deleteCell = document.createElement('td');
          deleteCell.appendChild(deleteBtn);
          row.appendChild(deleteCell);
          tbody.appendChild(row);
      });

      table.appendChild(thead);
      table.appendChild(tbody);
      tableContainer.appendChild(table);
  }

  function sortTable(header) {
      data.sort((a, b) => {
          if (a[header] < b[header]) return -1;
          if (a[header] > b[header]) return 1;
          return 0;
      });
      generateTable(data);
  }

  function updateData(id, field, value) {
      const row = data.find(row => row.id === id);
      if (row) row[field] = value;
  }

  function deleteRow(id) {
      const index = data.findIndex(row => row.id === id);
      if (index !== -1) data.splice(index, 1);
      generateTable(data);
  }

  function addRow() {
      const newRow = { id: Date.now(), name: '', age: '', email: '', salary: '' };
      data.push(newRow);
      generateTable(data);
  }

  function addColumn() {
      const newColumn = prompt('Enter new column name:');
      if (newColumn) {
          data.forEach(row => row[newColumn] = '');
          generateTable(data);
      }
  }

  function freezeRow() {
      const table = tableContainer.querySelector('table');
      if (table) {
          const thead = table.querySelector('thead');
          if (thead) thead.querySelectorAll('th').forEach(th => th.classList.toggle('freeze'));
      }
  }

  function freezeColumn() {
      const table = tableContainer.querySelector('table');
      if (table) {
          const tbody = table.querySelector('tbody');
          if (tbody) tbody.querySelectorAll('td').forEach(td => td.classList.toggle('freeze'));
      }
  }

  addRowBtn.addEventListener('click', addRow);
  addColumnBtn.addEventListener('click', addColumn);
  freezeRowBtn.addEventListener('click', freezeRow);
  freezeColumnBtn.addEventListener('click', freezeColumn);

  generateTable(data);
});