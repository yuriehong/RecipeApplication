export const fetchWrapper = {
    get,
    post,
    _delete,
    put,
};

function get(url) {
    const requestOptions = {
        method: 'GET'
    };
    return sendRequest(url, requestOptions);
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return sendRequest(url, requestOptions);
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return sendRequest(url, requestOptions);   
}

function _delete(url) {
    const requestOptions = {
        method: 'DELETE'
    };
    return fetch(url, requestOptions)
    .catch((error) => console.error(error));
}

function sendRequest(url, requestOptions) {
    return fetch(url, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}