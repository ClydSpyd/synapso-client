declare type WikiType = "quote" | "movie" | "series" | "book" | "link";

declare type MediaType = "movie" | "series";

declare type WikiItem =
  | WikiMovie
  | WikiQuote
  | WikiSeries
  | WikiBook
  | WikiLink;

declare interface WikiItemConfig {
  type: WikiType;
  label: string;
  mainColor: string;
  accentColor: string;
}

interface MediaBase {
  title: string;
  year: string;
  released?: string;
  runtime?: string;
  genre?: string;
  director?: string;
  actors?: string;
  plot?: string;
  language?: string;
  posterUrl?: string;
  metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbId: string;
  ratings?: { source: string; value: string }[];
}

declare interface WikiMovie extends MediaBase {
  type: "movie";
}

declare interface WikiSeries extends MediaBase {
  seasons: number;
  type: "series";
}

interface WikiQuote {
  id: string;
  author: string;
  content: string;
  additionalData?: string;
  year?: string;
  type: "quote";
}

interface WikiBook {
  title: string;
  author: string;
  year: string;
  genre?: string;
  language?: string;
  isbn?: string;
  summary?: string;
  type: "book";
}

interface WikiLink {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
  type: "link";
}
