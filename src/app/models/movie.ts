export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  genre?: string;
  genreId?: number;
  description: string;
  director: string;
  writer: string;
  leadActor: string;
  budget: number;
  grossIndia: number;
  grossWorld: number;
  total: number;
}

export interface Genre {
  genreId: number;
  genreName: string;
}
