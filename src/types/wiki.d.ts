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
  icon: IconType;
}

interface MediaBase {
  id: string;
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

declare interface WikiBook {
  id: string;
  title: string;
  authors: string[];
  year: number;
  cover: string;
  work_key: string;
  olid: string;
  edition_key: string;
  description?: string;
  type: "book";
}


interface WikiLink {
  id: string;
  title: string;
  url: string;
  description?: string;
  tags?: string[];
  type: "link";
}

interface PinPayload {
  item_id: string;
  item_type: WikiType;
  created_at: string;
}

interface WikiPin {
  id: string;
  item_type: WikiType;
  item_id: string;
  created_at: string;
  item: WikiItem;
}

