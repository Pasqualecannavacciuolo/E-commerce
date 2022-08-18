export interface User {
    id?: any,
    nome: string,
    cognome: string,
    data_nascita: string,
    username: string,
    email: string,
    image: string,
    role?: string,
    transactions?: any,
    subscription?: boolean
}