import { URI, fetchAPI } from "./utils/fetchApi.js";

/**
 * This function is used to fetch all the products in the API.
 *
 * @return { Promise<{
 *      altTxt: string,
 *      colors: string[],
 *      description: string,
 *      imageUrl: string,
 *      name: string,
 *      price: number,
 *      _id: string}[]>
 *  } - The products Array.
 */
const getProducts = async () => fetchAPI(`${URI}products`);

const renderProducts = () => {
    getProducts().then((products) => {
        const container = document.getElementById('items');
        let html = '';

        products.forEach((product) => {
            const segment = `
                <a href="./product.html?id=${product._id}">
                    <article>
                      <img src="${product.imageUrl}" alt=${product.altTxt}>
                      <h3 class="productName">${product.name}</h3>
                      <p class="productDescription">${product.description}</p>
                    </article>
                </a>
            `
            html += segment;
        })

        container.innerHTML = html;
    });
}

renderProducts();