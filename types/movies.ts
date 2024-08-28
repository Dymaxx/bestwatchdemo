export interface Movie {
  id: number;
  api_id: number | null;
  imdb_id: string | null;
  title: string;
  release_date: string | null;
  overview: string | null;
  poster_path: string | null;
  director: string | null;
  status: string | null;
  runtime: number | null;
  budget: number | null;
  trailer: string | null;
}

export type RecommendedMovieProps = {
  status: string | null;
  id: number;
  api_id: number | null;
  imdb_id: string | null;
  title: string;
  release_date: string | null;
  overview: string | null;
  poster_path: string | null;
  director: string | null;
  runtime: number | null;
  budget: number | null;
  trailer: string | null;
};

export type Actor = {
  name: string;
  gender: string | null;
  imdb_id: number | null;
  image: string | null;
  character: string | null;
};

export type MovieGenre = {
  movieId: number;
  genreId: number;
  // Add other fields as needed
};

// Define the return type for the query
export type MovieWithGenre = {
  movie: Movie;
};
