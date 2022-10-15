import {CART_NAME, getProduct} from "./utils/fetchApi.js";

/**
 * This function is used to create the image of a product.
 * @param {{altTxt: string,
 *      colors: string[],
 *      description: string,
 *      imageUrl: string,
 *      name: string,
 *      price: number,
 *      _id: string}} product - The product to render
 * @returns {HTMLDivElement}
 */
const createProductImage = (product) => {
    const container = document.createElement('div');
    container.classList.add('cart__item__img');

    const image = document.createElement('img');
    image.src = product.imageUrl;
    image.alt = product.altTxt;

    container.appendChild(image);

    return container;
}

/**
 * This function is used to create the description of a product.
 *
 * @param {string} colorProduct - The color of the product.
 * @param {{altTxt: string,
 *      colors: string[],
 *      description: string,
 *      imageUrl: string,
 *      name: string,
 *      price: number,
 *      _id: string}} product - The product to render.
 *
 * @returns {HTMLDivElement}
 */
const createProductDescription = (product, colorProduct) => {
    const container = document.createElement('div');
    container.classList.add('cart__item__content__description');

    const name = document.createElement('h2');
    name.textContent = product.name;

    const color = document.createElement('p');
    color.textContent = colorProduct;

    const price = document.createElement('p');
    price.textContent = `${product.price} €`;

    container.appendChild(name);
    container.appendChild(color);
    container.appendChild(price);

    return container;
}

/**
 * This function is used to create the settings of a product.
 *
 * @param {{ id: string, color: string, quantity: string }} product
 * @returns {HTMLDivElement} - The settings of a product.
 */
const createProductSettings = (product) => {
    const container = document.createElement('div');
    container.classList.add('cart__item__content__settings');

    const quantityContainer = document.createElement('div');
    quantityContainer.classList.add('cart__item__content__settings__quantity');

    const quantityLabel = document.createElement('p');
    quantityLabel.textContent = 'Qté : ';

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.classList.add('itemQuantity');
    quantityInput.name = 'itemQuantity';
    quantityInput.min = "1";
    quantityInput.max = "100";
    quantityInput.value = product.quantity;

    const deleteContainer = document.createElement('div');
    deleteContainer.classList.add('cart__item__content__settings__delete');

    const deleteButton = document.createElement('p');
    deleteButton.textContent = 'Supprimer';
    deleteButton.classList.add('deleteItem');


    quantityContainer.appendChild(quantityLabel);
    quantityContainer.appendChild(quantityInput);

    deleteContainer.appendChild(deleteButton);

    container.appendChild(quantityContainer);
    container.appendChild(deleteContainer);

    return container;
};

/**
 * This function is used to render a product.
 *
 * @param {HTMLElement} container - The container where the product will be rendered.
 * @param {{ id: string, color: string, quantity: string }} product - The product to render (inside the cart).
 * @param {{altTxt: string,
 *      colors: string[],
 *      description: string,
 *      imageUrl: string,
 *      name: string,
 *      price: number,
 *      _id: string}} currentProduct - The product to render.
 *
 * @returns {void} - Nothing.
 */
const renderProduct = (container, currentProduct, product) => {

    const productImage = createProductImage(currentProduct);

    const containerContent = document.createElement('div');
    containerContent.classList.add('item__content');
    const productDescription = createProductDescription(currentProduct, product.color);
    const productSettings = createProductSettings(product);
    containerContent.appendChild(productDescription);
    containerContent.appendChild(productSettings);

    const containerItem = document.createElement('div');
    containerItem.classList.add('cart__item');
    containerItem.dataset.id = product.id;
    containerItem.dataset.color = product.color;
    containerItem.appendChild(productImage);
    containerItem.appendChild(containerContent);

    container.appendChild(containerItem);

}

/**
 * This function is used to get the cart from the localStorage.
 *
 * @returns {Array} - The cart.
 */
const getCart = () => JSON.parse(localStorage.getItem(CART_NAME));

/**
 * This function is used to update the cart.
 *
 * @param {Array} cart - The new cart.
 *
 * @returns {void} - Nothing.
 */
const updateCart = (cart) => localStorage.setItem(CART_NAME, JSON.stringify(cart));

/**
 * This function is used to remove all the child of a node.
 *
 * @param container
 *
 * @returns {void} - Nothing.
 */
const emptyRender = (container) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

/**
 * This function is used to remove an item from the cart.
 *
 * @param {{id: string, color: string, quantity: string}[]} cart - The cart.
 * @param {number} index - The index of the item to remove.
 */
const removeItem = (cart, index) => {
    cart.splice(index, 1);
}

/**
 * This function is used to render the cart.
 */
const renderCart = () => {

    let total = 0;
    let quantity = 0;
    const cart = getCart();

    const container = document.getElementById('cart__items');

    emptyRender(container);

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];

        getProduct(product.id).then((currentProduct) => {
            total += product.quantity * currentProduct.price;
            quantity += Number.parseInt(product.quantity);

            renderProduct(container, currentProduct, product);

            if (i === cart.length - 1) {
                document.getElementById('totalPrice').textContent = total;
                document.getElementById('totalQuantity').textContent = quantity;
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
        const cart = getCart();

        for (let i = 0; i < cart.length; i++) {
            const product = cart[i];

            if (product.id === id) {
                cart[i].quantity = event.target.value;
                break;
            }
        }

        console.log('cart', cart);

        updateCart(cart);
        renderCart();
    }
});

/**
 * This function is used to delete an item from the cart.
 *
 * Basically, it removes the item from the cart. It calls when the user clicks on the delete button.
 */
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteItem')) {

        const cart = getCart();
        const id = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;

        for (let i = 0; i < cart.length; i++) {
            const product = cart[i];

            if (product.id === id) {
                removeItem(cart, i);
                break;
            }
        }

        updateCart(cart);
        renderCart();
    }
});

renderCart();