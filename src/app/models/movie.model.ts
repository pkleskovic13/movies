import { Genre } from "./genre.model"

export interface Movie {
  adult: boolean,
  backdropPath: string,
  genreIds?: number[],
  genres: Genre[],
  id: number,
  originalLanguage: string,
  originalTitle: string,
  overview: string,
  popularity: number,
  posterPath: string,
  releaseDate: string,
  title: string,
  video: boolean,
  voteAverage: number,
  voteCount: number
}
