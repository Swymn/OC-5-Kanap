import { getProduct } from "./utils/fetchApi.js";

/**
 * This function is used to get the product id from the url.
 *
 * @return {string} - The current id.
 */
const getIdFromURL = () => {
    const url = new URL(window.location.href);
    return url.searchParams.get('id');
}

/**
 * This function is used to render a product.
 */
const renderProduct = () => {
    getProduct(getIdFromURL()).then((product) => {

        document.title = product.name;

        document.getElementsByClassName('item__img')[0].innerHTML = `
            <img src="${product.imageUrl}" alt="${product.altTxt}">
        `

        document.getElementById('title').innerHTML = `${product.name}`;
        document.getElementById('price').innerHTML = `${product.price}`;
        document.getElementById('description').innerHTML = `${product.description}`;

        document.getElementById('colors').innerHTML = product.colors.map((color) => `<option value="${color}">${color}</option>`).toString();
    })
}

/**
 * This event is triggered when the button "Ajouter au panier" is triggered.
 *
 * @type {onclick}
 */
document.getElementById('addToCart').onclick = ((ev) => {
    const cart = window.localStorage;
    const id = getIdFromURL();
    const currentColor = document.getElementById('colors').value;
    let currentQuantity = document.getElementById('quantity').value;

    if (currentQuantity <= 0) currentQuantity = 1;

    let currentItem = JSON.parse(cart.getItem(id));

    if (currentItem && currentItem.id === id && currentItem.color === currentColor) {
        currentItem.quantity += 1;
    } else {
        currentItem = {
            id: id,
            quantity: currentQuantity,
            color: currentColor,
        }
    }

    cart.setItem((cart.length).toString(), JSON.stringify(currentItem));
})

renderProduct();
