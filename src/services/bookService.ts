import { api } from './api';

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

export enum BookSortBy {
  TITLE = 'title',
  RATING = 'rating',
  POPULARITY = 'popularity',
  PUBLICATION_DATE = 'publicationDate'
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export interface AuthorInBook {
  authorId: number;
  role: string | null;
  author: {
    id: number;
    name: string;
    biography: string | null;
    birthDate: Date | null;
    deathDate: Date | null;
    image: string | null;
  };
}

export interface GenreInBook {
  genreId: number;
  genre: {
    id: number;
    name: string;
    description: string | null;
    slug: string | null;
  };
}

export interface SeriesInBook {
  seriesId: number;
  volumeNumber: number | null;
  series: {
    id: number;
    name: string;
    description: string | null;
    slug: string | null;
  };
}

export interface BookFromApi {
  id: number;
  title: string;
  originalTitle: string | null;
  synopsis: string | null;
  publicationDate: Date | null;
  coverImage: string | null;
  pages: number | null;
  isbn10: string | null;
  isbn13: string | null;
  status: BookStatus | null;
  type: BookType | null;
  createdAt: Date;
  updatedAt: Date;
  authors: AuthorInBook[];
  genres: GenreInBook[];
  seriesBooks?: SeriesInBook[];
  statistics?: {
    bookId: number;
    popularity: number;
    averageRating: number | null;
    totalReviews: number;
  };
}

export interface FindAllBooksFilters {
  sortBy?: BookSortBy;
  sortOrder?: SortOrder;
  startDate?: string;
  endDate?: string;
  genreId?: number;
  bookType?: BookType;
}

class BookService {
  private readonly basePath = '/books';

  async findAll(filters?: FindAllBooksFilters): Promise<BookFromApi[]> {
    const queryParams = new URLSearchParams();
    
    if (filters?.sortBy) queryParams.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) queryParams.append('sortOrder', filters.sortOrder);
    if (filters?.startDate) queryParams.append('startDate', filters.startDate);
    if (filters?.endDate) queryParams.append('endDate', filters.endDate);
    if (filters?.genreId) queryParams.append('genreId', filters.genreId.toString());
    if (filters?.bookType) queryParams.append('bookType', filters.bookType);
    
    const query = queryParams.toString();
    const endpoint = query ? `${this.basePath}?${query}` : this.basePath;
    
    return api.get<BookFromApi[]>(endpoint);
  }

  async findOne(id: number): Promise<BookFromApi> {
    return api.get<BookFromApi>(`${this.basePath}/${id}`);
  }

  async findByAuthor(authorId: number): Promise<BookFromApi[]> {
    return api.get<BookFromApi[]>(`${this.basePath}/author/${authorId}`);
  }

  async create(data: unknown): Promise<BookFromApi> {
    return api.post<BookFromApi>(this.basePath, data);
  }

  async update(id: number, data: unknown): Promise<BookFromApi> {
    return api.put<BookFromApi>(`${this.basePath}/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    return api.delete<void>(`${this.basePath}/${id}`);
  }
}

export const bookService = new BookService();
