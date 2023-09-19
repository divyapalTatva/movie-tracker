export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  genre: string;
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
  id: number;
  name: string;
}
