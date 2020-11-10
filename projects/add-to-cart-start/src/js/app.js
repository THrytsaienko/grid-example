document.addEventListener('DOMContentLoaded', () => {
    const listOfItem = document.querySelectorAll('.shopping-list__label');
    const ul = document.querySelector('.cart__list');
    let counter = 0;
    const deleteAllButton = document.querySelector('.cart__clear-btn');

    const resetCheckbox = child => {
        child.checked = false;
        child.disabled = false;
        child.style.cursor = 'pointer';
    }

    const resetText = child => {
        child.style.textDecoration = 'none';
        child.style.cursor = 'pointer';
    }

    const createDeleteIcon = (parent) => {
        //Create element for delete button
        const el = document.createElement("div");
        const img = document.createElement("img");
        img.src = '../img/cross.svg';
        // Create and append text inside button
        el.appendChild(img);
        // Give class=delete to buttons - Its's going to be used to select them in the future
        el.className = "cart__delete";
        // append or insert the button to the parent element(li)
        parent.appendChild(el);
    }

    deleteAllButton.addEventListener('click', () => {
        counter = 0;
        document.querySelector('.cart__counter').style.display = "none";
        deleteAllButton.style.display = 'none';
        ul.innerHTML = '';

        listOfItem.forEach(el => {
            el.removeAttribute('data-added');
            for (let child of el.children) {
                if (child.classList.contains('shopping-list__checkbox')) {
                    resetCheckbox(child);
                } else {
                    resetText(child);
                }
            }
        })
    });

    const countItems = (deleteItem = false) => {
        if (deleteItem) {
            counter = counter - 1;
            if (counter === 0) {
                document.querySelector('.cart__counter').style.display = "none";
            } else if (counter === 1) {
                document.querySelector('.cart__counter').innerHTML = counter;
                deleteAllButton.style.display = 'none';
            } else {
                document.querySelector('.cart__counter').innerHTML = counter;
            }
        } else {
            counter = counter + 1;
            const cartCounter = document.querySelector('.cart__counter');
            cartCounter.style.display = 'block';
            cartCounter.innerHTML = counter;
            if (counter > 1) deleteAllButton.style.display = 'inline-block';
        }
    }

    const addToCart = (name) => {
        //Create "li"
        const li = document.createElement("li");
        li.className = 'cart__item';
        const span = document.createElement("span");
        // Create text for the li according to what you put in the input
        li.appendChild(span);
        const innerLabel = document.createTextNode(name);
        span.appendChild(innerLabel);
        // Append or insert the new li to the ul
        ul.appendChild(li);
        //Create the delete button calling the funtion with the new li
        createDeleteIcon(li);
        countItems();
    }

    const getBackToTheShoppingList = (name) => {
        listOfItem.forEach(el => {
            if (el.innerText.trim() === name) {
                el.removeAttribute('data-added');
                for (let child of el.children) {
                    if (child.classList.contains('shopping-list__checkbox')) {
                        resetCheckbox(child);
                    } else {
                        resetText(child);
                    }
                }
            }
        })
    }

    ul.addEventListener('click', (e) => {
        if (e.target.parentElement.classList.contains('cart__delete')) {
            e.target.parentElement.parentElement.remove();
            countItems(true);
            getBackToTheShoppingList(e.target.parentElement.parentElement.innerText);
        }
    });

    const markElement = (parent) => {
        for (let child of parent.children) {
            if (child.classList.contains('shopping-list__checkbox')) {
                child.checked = true;
                child.disabled = true;
                child.style.cursor = 'not-allowed';
            } else {
                child.style.textDecoration = 'line-through';
                child.style.cursor = 'not-allowed';
            }
        }
    }

    listOfItem.forEach(element => {
        element.addEventListener('click', (e) => {
            const innerText = e.target.parentElement.innerText.trim();
            const generalParentElement = e.target.parentElement;
            if (generalParentElement.classList.contains('shopping-list__label')) {
                if (!generalParentElement.dataset.added) {
                    // Add element to cart
                    addToCart(innerText);
                    // Mark element as chosen
                    markElement(generalParentElement);
                    generalParentElement.dataset.added = true;
                }
            }
        });
    });
});