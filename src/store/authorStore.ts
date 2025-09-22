import { create } from "zustand";
import {
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  Author,
  AuthorData,
} from "@/lib/api";

interface AuthorState {
  authors: Author[];
  favorites: Set<number>;
  loading: boolean;
  error: string | null;
  loadAuthors: () => Promise<void>;
  addAuthor: (data: AuthorData) => Promise<void>;
  editAuthor: (id: number, data: Partial<AuthorData>) => Promise<void>;
  removeAuthor: (id: number) => Promise<void>;
  toggleFavorite: (id: number) => void;
}

export const useAuthorStore = create<AuthorState>((set) => ({
  authors: [],
  favorites: new Set(),
  loading: true,
  error: null,

  loadAuthors: async () => {
    try {
      set({ loading: true, error: null });
      const authors = await getAuthors();
      set({ authors, loading: false });
    } catch (error) {
      set({ error: "No se pudieron cargar los autores.", loading: false });
    }
  },

  addAuthor: async (data) => {
    const newAuthor = await createAuthor(data);
    set((state) => ({ authors: [...state.authors, newAuthor] }));
  },

  editAuthor: async (id, data) => {
    const updatedAuthor = await updateAuthor(id, data);
    set((state) => ({
      authors: state.authors.map((author) =>
        author.id === id ? updatedAuthor : author
      ),
    }));
  },

  removeAuthor: async (id) => {
    if (window.confirm("Are you sure you want to delete this author?")) {
        await deleteAuthor(id);
        set((state) => {
            const newFavorites = new Set(state.favorites);
            newFavorites.delete(id);
            return {
                authors: state.authors.filter((author) => author.id !== id),
                favorites: newFavorites,
            };
        });
    }
  },
  
  toggleFavorite: (id: number) => {
    set((state) => {
      const newFavorites = new Set(state.favorites); 
      
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return { favorites: newFavorites };
    });
  },
}));
