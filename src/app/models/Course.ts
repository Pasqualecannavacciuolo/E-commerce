export interface Course {
    id?: any,
    titolo: string,
    body_introduzione: string,
    body_cosa_imparerai: string,
    prezzo: number,
    image: string,
    macro_category: string,
    tags: string,
    cosa_imparerai: string,
    progetti: [
        {
        nome: string,
        difficolta: string
        }
    ]
}