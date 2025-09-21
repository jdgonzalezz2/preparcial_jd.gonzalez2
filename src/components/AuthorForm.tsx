"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorSchema, AuthorFormData } from "@/lib/validators";
import { Author } from "@/lib/api";

interface AuthorFormProps {
  initialData?: Author | null;
  onSubmit: (data: AuthorFormData) => void;
  isSubmitting?: boolean;
  title?: string;
}

export default function AuthorForm({
  initialData = null,
  onSubmit,
  isSubmitting = false,
  title,
}: AuthorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      image: initialData?.image || "",
      birthDate: initialData?.birthDate ? initialData.birthDate.split("T")[0] : "",
    },
  });

  const formTitle = title ?? (initialData ? "Update Author" : "Create Author");

  return (
    <Card className="max-w-md mx-auto shadow-lg">
      <CardContent className="space-y-4 p-6">
        <div className="mb-2">
          <h2 className="text-xl font-semibold">{formTitle}</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <Input {...register("name")} placeholder="Name" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Input type="date" {...register("birthDate")} />
            {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>}
          </div>
          <div>
            <Input {...register("image")} placeholder="URL of the image" />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>
          <div>
            <Textarea {...register("description")} placeholder="Description" />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : (initialData ? "Update" : "Create")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
