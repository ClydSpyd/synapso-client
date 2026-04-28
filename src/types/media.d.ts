declare interface OMDBMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

declare interface OpenLibBook {
  title: string;
  authors: string[];
  year: number;
  cover: string;
  work_key: string;
  olid: string;
  edition_key: string;
}

declare interface MediaFeedback {
  my_rating: number;
  my_completed: string;
  my_notes: string;
}