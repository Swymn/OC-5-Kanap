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