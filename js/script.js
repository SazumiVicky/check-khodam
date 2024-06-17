document.addEventListener('DOMContentLoaded', () => {
    loadTableData();
});

document.getElementById('checkButton').addEventListener('click', function() {
    const name = document.getElementById('nameInput').value;
    const resultElement = document.getElementById('result');
    
    if (name.trim() === "") {
        alert("Masukin namanya anjeng!");
        return;
    }

    fetch('khodam/list.txt')
        .then(response => response.text())
        .then(data => {
            const khodams = data.split('\n').filter(khodam => khodam.trim() !== "");
            const randomKhodam = khodams[Math.floor(Math.random() * khodams.length)];
            resultElement.innerHTML = `Khodam untuk <strong>${name}</strong> adalah: <strong>${randomKhodam}</strong>`;
            resultElement.classList.add('has-result');
            
            const tableBody = document.getElementById('checkTableBody');
            const newRow = tableBody.insertRow();
            const nameCell = newRow.insertCell(0);
            const khodamCell = newRow.insertCell(1);
            nameCell.textContent = name;
            khodamCell.textContent = randomKhodam;
            saveToLocalStorage(name, randomKhodam);
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('clearButton').addEventListener('click', function() {
    localStorage.removeItem('khodamData');
    document.getElementById('checkTableBody').innerHTML = '';
});

function saveToLocalStorage(name, khodam) {
    const data = JSON.parse(localStorage.getItem('khodamData')) || [];
    data.push({ name: name, khodam: khodam });
    localStorage.setItem('khodamData', JSON.stringify(data));
}

function loadTableData() {
    const data = JSON.parse(localStorage.getItem('khodamData')) || [];
    const tableBody = document.getElementById('checkTableBody');
    data.forEach(item => {
        const newRow = tableBody.insertRow();
        const nameCell = newRow.insertCell(0);
        const khodamCell = newRow.insertCell(1);
        nameCell.textContent = item.name;
        khodamCell.textContent = item.khodam;
    });
}