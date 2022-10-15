/**
 * This function is used to get the command id from the url.
 *
 * Basically it use the URL object to parse the url and get the param 'id'.
 *
 * @return {string} - The current id.
 */
const getIdFromURL = () => new URL(window.location.href).searchParams.get('orderId');

/**
 * This function is used to render a confirmation id.
 */
const renderConfirmation = () => {
    document.getElementById('orderId').textContent = getIdFromURL();
}

renderConfirmation();