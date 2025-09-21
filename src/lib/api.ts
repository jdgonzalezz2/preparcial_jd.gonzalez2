export interface Author {
  id: number;
  name: string;
  birthDate: string;
  description: string;
  image: string;
}

export type AuthorData = Omit<Author, "id">;

const API_URL = "http://127.0.0.1:8080/api/authors";

export async function getAuthors(): Promise<Author[]> {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch authors");
  }
  return res.json();
}

export async function createAuthor(author: AuthorData): Promise<Author> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(author),
  });
  if (!res.ok) {
    throw new Error("Failed to create author");
  }
  return res.json();
}

export async function updateAuthor(
  id: number,
  author: Partial<AuthorData>
): Promise<Author> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(author),
  });
  if (!res.ok) {
    throw new Error("Failed to update author");
  }
  return res.json();
}

export async function deleteAuthor(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error("Failed to delete author");
  }
}