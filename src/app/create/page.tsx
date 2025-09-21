"use client";
import AuthorForm from "@/components/AuthorForm";
import { useRouter } from "next/navigation";
import { useAuthorStore } from "@/store/authorStore";
import { AuthorFormData } from "@/lib/validators";
import { useState } from "react";

export default function CrearPage() {
  const { addAuthor } = useAuthorStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreate(data: AuthorFormData) {
    setIsSubmitting(true);
    try {
      await addAuthor(data);
      router.push("/authors");
    } catch (error) {
      console.error("Failed to create author:", error);
      alert("Error: No se pudo crear el autor.");
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Create Author</h1>
      <AuthorForm onSubmit={handleCreate} isSubmitting={isSubmitting} />
    </div>
  );
}