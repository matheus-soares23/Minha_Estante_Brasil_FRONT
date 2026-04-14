import { httpService } from "./httpService";
import { Book } from "../types/book";

const UserBookListService = {
  getUserBookList: async () => {
    return httpService.get<Book[]>(`/user-book-list/user`);
  },

  addBookToUserList: async (data: {
    bookId: number;
    status?: string;
    rating?: number;
    progress?: number;
  }) => {
    return httpService.post(`/user-book-list`, data);
  },
};

export default UserBookListService;