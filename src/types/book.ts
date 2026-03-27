import { BookFromApi } from '../services/bookService';

export enum BookStatus {
  PUBLISHED = 'published',
  FORTHCOMING = 'forthcoming',
  CANCELLED = 'cancelled'
}

export enum BookType {
  NOVEL = 'novel',
  LIGHT_NOVEL = 'light_novel',
  MANGA = 'manga',
  WEB_NOVEL = 'web_novel',
  GRAPHIC_NOVEL = 'graphic_novel',
  SHORT_STORY = 'short_story'
}

export interface Author {
  id: number;
  name: string;
  biography?: string | null;
  birthDate?: Date | null;
  deathDate?: Date | null;
  image?: string | null;
}

export interface Genre {
  id: number;
  name: string;
  slug: string | null;
  description?: string | null;
}

export interface Series {
  id: number;
  name: string;
  description?: string | null;
  slug?: string | null;
}

export interface Book {
  id: number;
  title: string;
  originalTitle?: string | null;
  synopsis?: string | null;
  coverImageUrl?: string | null;
  publicationDate?: Date | null;
  status: BookStatus | null;
  type: BookType | null;
  volumeNumber?: number | null;
  isbn10?: string | null;
  isbn13?: string | null;
  pageCount?: number | null;
  authors: Author[];
  genres: Genre[];
  series?: Series;
  score?: number | null;
  rank?: number;
  popularity?: number;
  totalReviews?: number;
}

export function mapBookFromApi(apiBook: BookFromApi): Book {
  return {
    id: apiBook.id,
    title: apiBook.title,
    originalTitle: apiBook.originalTitle,
    synopsis: apiBook.synopsis,
    coverImageUrl: apiBook.coverImage,
    publicationDate: apiBook.publicationDate,
    status: apiBook.status,
    type: apiBook.type,
    isbn10: apiBook.isbn10,
    isbn13: apiBook.isbn13,
    pageCount: apiBook.pages,
    authors: apiBook.authors.map(({ author }) => ({
      id: author.id,
      name: author.name,
      biography: author.biography,
      birthDate: author.birthDate,
      deathDate: author.deathDate,
      image: author.image,
    })),
    genres: apiBook.genres.map(({ genre }) => ({
      id: genre.id,
      name: genre.name,
      slug: genre.slug,
      description: genre.description,
    })),
    series: apiBook.seriesBooks?.[0] ? {
      id: apiBook.seriesBooks[0].series.id,
      name: apiBook.seriesBooks[0].series.name,
      description: apiBook.seriesBooks[0].series.description,
      slug: apiBook.seriesBooks[0].series.slug,
    } : undefined,
    volumeNumber: apiBook.seriesBooks?.[0]?.volumeNumber,
    score: apiBook.statistics?.averageRating,
    popularity: apiBook.statistics?.popularity,
    totalReviews: apiBook.statistics?.totalReviews,
  };
}
