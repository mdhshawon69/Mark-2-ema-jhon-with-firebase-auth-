const getUser = () => {
    // eslint-disable-next-line no-use-before-define
    const existingUser = sessionStorage.getItem('userId');
    if (existingUser) {
        return existingUser;
    }
    const newUser = `user-${new Date().getTime()}`;
    // eslint-disable-next-line no-use-before-define
    sessionStorage.setItem('userId', newUser);
    return newUser;
};

const getDataKey = () => {
    const userId = getUser();
    return `emaJohn/carts/${userId}`;
};

// push to local storage: a temporary place for database
const getDatabaseCart = () => {
    const dataKey = getDataKey();
    // eslint-disable-next-line no-use-before-define
    const data = localStorage.getItem(dataKey) || '{}';
    return JSON.parse(data);
};

const addToDatabaseCart = (key, count) => {
    const currentCart = getDatabaseCart();
    currentCart[key] = count;
    // eslint-disable-next-line no-use-before-define
    localStorage.setItem(getDataKey(), JSON.stringify(currentCart));
};

const removeFromDatabaseCart = (key) => {
    const currentCart = getDatabaseCart();
    delete currentCart[key];
    // eslint-disable-next-line no-use-before-define
    localStorage.setItem(getDataKey(), JSON.stringify(currentCart));
};

// eslint-disable-next-line no-unused-vars
const processOrder = (cart) => {
    // eslint-disable-next-line no-use-before-define
    localStorage.removeItem(getDataKey());
};

export { addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart, processOrder };

// polyfill to support older browser
const localStorage =
    window.localStorage ||
    (() => {
        let store = {};
        return {
            getItem(key) {
                return store[key];
            },
            setItem(key, value) {
                store[key] = value.toString();
            },
            clear() {
                store = {};
            },
        };
    })();

const sessionStorage =
    window.sessionStorage ||
    (() => {
        let store = {};
        return {
            getItem(key) {
                return store[key];
            },
            setItem(key, value) {
                store[key] = value.toString();
            },
            clear() {
                store = {};
            },
        };
    })();
// end of poly fill
