import { getProducts } from "./utils/fetchApi.js";

/**
 * This function is used to render all the products.
 *
 * Basically it take all the product into the API, and render it into the 'items' container.
 */
const renderProducts = () => {
    getProducts().then((products) => {
        const container = document.getElementById('items');
        let html = '';

        products.forEach((product) => {
            html += `
                <a href="./product.html?id=${product._id}">
                    <article>
                      <img src="${product.imageUrl}" alt=${product.altTxt}>
                      <h3 class="productName">${product.name}</h3>
                      <p class="productDescription">${product.description}</p>
                    </article>
                </a>
            `
        })

        container.innerHTML = html;
    });
}

renderProducts();