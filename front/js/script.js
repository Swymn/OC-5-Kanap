import { getProducts } from "./utils/fetchApi.js";

/**
 * This function is used to render all the products.
 *
 * Basically it take all the product into the API, and render it into the 'items' container.
 */
const renderProducts = () => {
    getProducts().then((products) => {
        const container = document.getElementById('items');

        products.forEach((product) => {

            const img = document.createElement('img');
            img.src = product.imageUrl;
            img.alt = product.altTxt;

            const name = document.createElement('h3');
            name.classList.add('productName');
            name.textContent = product.name;

            const description = document.createElement('p');
            description.classList.add('productDescription');
            description.textContent = product.description;

            const article = document.createElement('article');
            article.appendChild(img);
            article.appendChild(name);
            article.appendChild(description);

            const link = document.createElement('a');
            link.href = `product.html?id=${product._id}`;

            link.appendChild(article);

            container.appendChild(link);
        })
    });
}

renderProducts();