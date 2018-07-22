const login = (login) => ({
    type: 'LOGIN',
    payload: login
})

const logout = (login) => ({
    type: 'LOGOUT',
    payload: login
})

const load = (user) => ({
    type: 'LOAD_USER',
    payload: {
        user
    }
})

export {
    login,
    logout,
    load,
}