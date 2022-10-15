import { getProduct } from "./utils/fetchApi.js";

/**
 * This function is used to render the cart.
 */
const renderCart = () => {

    let html = '';
    let total = 0;
    let quantity = 0;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const product = JSON.parse(localStorage.getItem(key));

        console.log('product', product);
        console.log('product', product.id);

        getProduct(product.id).then((currentProduct) => {
            total += product.quantity * currentProduct.price;
            quantity += Number.parseInt(product.quantity);

            html += `
                <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                    <div class="cart__item__img">
                        <img src="${currentProduct.imageUrl}" alt="${currentProduct.altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${currentProduct.name}</h2>
                            <p>${product.color}</p>
                            <p>${currentProduct.price} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" onchange="" value="${product.quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p onclick="" class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>
            `;

            if (i === localStorage.length - 1) {
                document.getElementById('cart__items').innerHTML = html.toString();
                document.getElementById('totalPrice').innerHTML = total.toString();
                document.getElementById('totalQuantity').innerHTML = quantity.toString();
            }
        });
    }
}

/**
 * This function is used to update the quantity of an item in the cart.
 *
 * Its called when the user change the quantity of an item in the cart.
 */
document.addEventListener('change', (event) => {
    if (event.target.classList.contains('itemQuantity')) {

        const id = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        const cart = localStorage;

        for (let i = 0; i < cart.length; i++) {
            const product = JSON.parse(cart.getItem(i.toString()));

            if (product.id === id) {
                product.quantity = event.target.value;
                cart.setItem(i.toString(), JSON.stringify(product));
            }
        }

        renderCart();
    }
});

/**
 * This function is used to delete an item from the cart.
 *
 * Basically, it removes the item from the localStorage. It calls when the user clicks on the delete button.
 */
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteItem')) {

        const id = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const product = JSON.parse(localStorage.getItem(key));

            console.log('product', product);

            if (product.id === id) {
                console.log('product', product);
                console.log('id', id);
                localStorage.removeItem(key);

                console.log('localStorage', localStorage);
                break;
            }
        }
        renderCart();
    }
});

renderCart();