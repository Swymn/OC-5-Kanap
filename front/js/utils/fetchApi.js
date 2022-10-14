export const URI = "http://localhost:3000/api/";

/**
 * This function is used to fetch any endpoint of the API.
 *
 * @param {string} url - The endpoint
 *
 * @return {Promise<any>} - The result
 *
 * @throws {Error} - Throws error when the endpoint is invalid, or if he cannot communicate to the API.
 */
export const fetchAPI = async (url) => {

    if (typeof url !== "string") throw new Error("The url must be a string.");

    try {
        let result = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });
        return await result.json();
    } catch (error) {
        throw new Error(error);
    }
}

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
export const getProducts = async () => fetchAPI(`${URI}products`);

/**
 * This Function is used to get a product by its id.
 *
 * @param {string} id - The product id
 *
 * @return {Promise<{altTxt: string,
 *      colors: string[],
 *      description: string,
 *      imageUrl: string,
 *      name: string,
 *      price: number,
 *      _id: string}>} - The product
 *
 * @throws {Error} - If the id isn't correct.
 */
export const getProduct = (id) => {

    if (typeof id !== "string") throw new Error("Id must be a string.");
    if (id.length === 0) throw new Error("Id not found");

    return fetchAPI(`${URI}products/${id}`);
}