import { getProduct } from "./utils/fetchApi.js";

/**
 * This function is used to get all the products in the cart.
 *
 * @returns {{id: string, color: string, quantity: string}[]}
 */
const getCartProducts = () => {
    const products = [];
    const cart = window.localStorage;

    for (let i = 0; i < cart.length; i++) {
        const product = JSON.parse(cart.getItem(i.toString()));
        products.push(product);
    }

    return products;
}

/**
 * This function is used to render the cart.
 */
const renderCart = () => {
    const products = getCartProducts();
    let html = '';
    let total = 0;
    let quantity = 0;
    products.map(async (product, index) => {
        const currentProduct = await getProduct(product.id);
        total += product.quantity * currentProduct.price;
        quantity += Number.parseInt(product.quantity);
        html += `
            <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
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
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>
        `;

        if (index === products.length - 1) {
            document.getElementById('cart__items').innerHTML = html.toString();
            document.getElementById('totalPrice').innerHTML = total.toString();
            document.getElementById('totalQuantity').innerHTML = quantity.toString();
        }
    });
}

renderCart();