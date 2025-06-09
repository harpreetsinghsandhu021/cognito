export interface Paper {
  _id: Id;
  providerId: string;
  title: string;
  abstract: string;
  publishedDate: PublishedDate;
  updatedDate: PublishedDate;
  primaryCategory: string;
  categories: string[];
  journalRef: null;
  doi: null;
  pdfUrl: string;
  doiUrl: null;
  embeddings: number[];
  retrievalTimestamp: PublishedDate;
  authors: Author[];
}

export interface Author {
  name: string;
  affiliation: null;
}

export interface PublishedDate {
  $date: string;
}

export interface Id {
  $oid: string;
}
