"use client";
import AuthorForm from "@/components/AuthorForm";
import { useParams, useRouter } from "next/navigation";
import { useAuthorStore } from "@/store/authorStore";
import { AuthorFormData } from "@/lib/validators";
import { useEffect, useState } from "react";

export default function EditarPage() {
  const { authors, editAuthor, loadAuthors } = useAuthorStore();
  const router = useRouter();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors();
    }
  }, [authors, loadAuthors]);

  const author = authors.find((a) => a.id === Number(params.id));

  async function handleUpdate(data: AuthorFormData) {
    if (!author) return;
    setIsSubmitting(true);
    try {
      await editAuthor(author.id, data);
      router.push("/authors");
    } catch (error) {
      console.error("Failed to update author:", error);
      alert("Error: No se pudo actualizar el autor.");
      setIsSubmitting(false);
    }
  }

  if (!author) return <p>Loading author or not found...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Edit Author</h1>
      <AuthorForm
        initialData={author}
        onSubmit={handleUpdate}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}