interface Credentials {
    login: string
    password: string
}

interface Auth {
    id: string
    login: string
    token: string
}

export { Auth, Credentials }
