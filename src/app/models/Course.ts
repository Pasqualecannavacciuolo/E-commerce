export interface Course {
    id?: any,
    titolo: string,
    body: string,
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