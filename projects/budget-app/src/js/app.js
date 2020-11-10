document.addEventListener('DOMContentLoaded', () => {
    const balance = document.getElementById('balance');
    const money_plus = document.getElementById('money-plus');
    const money_minus = document.getElementById('money-minus');
    const list = document.getElementById('list');
    const text = document.getElementById('text');
    const amount = document.getElementById('amount');
    const descError = document.getElementById('desc-error');
    const amountError = document.getElementById('amount-error');
    const addButton = document.getElementById('add-btn');
    let transactions;

    // Init app
    const init = () => {
        const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
        transactions = localStorageTransactions !== null ? localStorageTransactions : [];
        list.innerHTML = '';
        transactions.forEach(addTransactionDOM);
        updateValues();
    }

    // Update the balance, income and expense
    const updateValues = () => {
        const amounts = transactions.map(transaction => transaction.amount);
        const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
        const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
        const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

        balance.innerText = `$${total}`;
        money_plus.innerText = `$${income}`;
        money_minus.innerText = `$${expense}`;
    }

    // Add transaction
    const addTransaction = e => {
        e.preventDefault();
        if (text.value.trim() === '' && amount.value.trim() === '') {
            descError.style.display = 'block';
            amountError.style.display = 'block';
        } else if (text.value.trim() === '') {
            descError.style.display = 'block';
            amountError.style.display = 'none';
        } else if (amount.value.trim() === '') {
            amountError.style.display = 'block';
        } else {
            descError.style.display = 'none';
            amountError.style.display = 'none';
            const transaction = {id: generateID(), text: text.value, amount: +amount.value};
            transactions.push(transaction);
            addTransactionDOM(transaction);
            updateValues();
            updateLocalStorage();
            text.value = '';
            amount.value = '';
        }
    }

    // Generate random ID
    const generateID = () => Math.floor(Math.random() * 100000000)

    // Add transactions to DOM list
    const addTransactionDOM = transaction => {
    // Get sign
        const sign = transaction.amount < 0 ? '-' : '+';
        const item = document.createElement('li');
        item.classList.add('budget__item')

        // Add class based on value
        item.classList.add(transaction.amount < 0 ? 'budget__item--minus' : 'budget__item--plus');
        item.innerHTML = `
            ${transaction.text} <span>${sign}${Math.abs(
            transaction.amount
        )}</span> <button class="budget__delete-btn" data-transaction-id=${transaction.id}>x</button>
        `;

        list.appendChild(item);
    }

    // Update local storage transactions
    const updateLocalStorage = () => localStorage.setItem('transactions', JSON.stringify(transactions))

    // Remove transaction by ID
    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('budget__delete-btn')) {
            const id = +e.target.dataset.transactionId;
            transactions = transactions.filter(transaction => transaction.id !== id);

            updateLocalStorage();

            init();
        }
    });

    init();
    addButton.addEventListener('click', addTransaction);
});