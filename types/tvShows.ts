export interface TVShow {
  id: number;
  api_id: number | null;
  imdb_id: string | null;
  title: string;
  overview: string | null;
  poster_path: string | null;
  director: string | null;
  status: string | null;
  budget: number | null;
  trailer: string | null;
  first_air_date: string | null;
}
