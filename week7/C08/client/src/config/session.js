import jwt_decode from "jwt-decode";

const storeToken = (token) => sessionStorage.setItem('token', `Bearer ${token}`);

const loadToken = () => sessionStorage.getItem('token');

const eraseToken = () => sessionStorage.removeItem('token');

const decodeUser = () => {
    const token = loadToken();

    if (token === null) {
        return null;
    }

    const encoded = token.slice(7);
    const decoded = jwt_decode(encoded);

    return decoded;
};

export {
    storeToken,
    loadToken,
    eraseToken,
    decodeUser
}