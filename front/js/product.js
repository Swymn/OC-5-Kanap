import {CART_NAME, getProduct} from "./utils/fetchApi.js";

/**
 * This function is used to get the product id from the url.
 *
 * Basically it use the URL object to parse the url and get the param 'id'.
 *
 * @return {string} - The current id.
 */
const getIdFromURL = () => new URL(window.location.href).searchParams.get('id');

/**
 * This function is used to render a product.
 */
const renderProduct = () => {
    getProduct(getIdFromURL()).then((product) => {

        document.title = product.name;

        const img = document.createElement('img');
        img.src = product.imageUrl;
        img.alt = product.altTxt;

        document.getElementsByClassName('item__img')[0].appendChild(img);

        document.getElementById('title').textContent = `${product.name}`;
        document.getElementById('price').textContent = `${product.price}`;
        document.getElementById('description').textContent = `${product.description}`;

        for (const color of product.colors) {
            const option = document.createElement('option');
            option.value = color;
            option.textContent = color;
            document.getElementById('colors').appendChild(option);
        }
    })
}

/**
 * This event is triggered when the button "Ajouter au panier" is triggered.
 *
 * Basically it will take all the data in the page and put it into the localStorage.
 * But if the object is already inside, and he has the same color, we increase the quantity.
 * Otherwise, we add a new one.
 *
 * @type {onclick}
 */
document.getElementById('addToCart').onclick = ((ev) => {
    const cart = localStorage;
    const id = getIdFromURL();
    const currentColor = document.getElementById('colors').value;
    let currentQuantity = document.getElementById('quantity').value;

    let cartArray = JSON.parse(cart.getItem(CART_NAME));

    const productToAdd = {
        id: id,
        color: currentColor,
        quantity: currentQuantity
    }

    if (!cartArray) {
        localStorage.setItem(CART_NAME, JSON.stringify([productToAdd]));
        return null;
    }
    cartArray.forEach((product) => {
        if (product.id === id && product.color === currentColor) {
            product.quantity = parseInt(product.quantity) + parseInt(currentQuantity);
            cartArray.push(product);
        } else {
            cartArray.push(productToAdd);
        }
    });

    cart.setItem(CART_NAME, JSON.stringify(cartArray));
})

renderProduct();
