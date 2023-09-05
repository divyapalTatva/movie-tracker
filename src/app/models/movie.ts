export interface Movie {
    id:number,
    title:string,
    posterUrl:string,
    genre:string,
    description:string,
    director:string,
    writer:string,
    leadActor:string,
    boxOffice:BoxOffice
}

export interface BoxOffice{
    budget:string,
    grossIndia:string,
    grossWorld:string,
    total:string
}

export interface Genre{
id:number,
name:string
}