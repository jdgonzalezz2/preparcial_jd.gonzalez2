"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useAuthorStore } from "@/store/authorStore";

export interface Author {
  id: number;
  name: string;
  birthDate: string;
  description: string;
  image: string;
}

export default function AuthorList() {
  const { authors, loading, removeAuthor, loadAuthors } = useAuthorStore();
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadAuthors();
  }, [loadAuthors]);

  if (loading) return <p>Loading...</p>;

  const markFailed = (id: number) =>
    setFailedImages((prev) => {
      const copy = new Set(prev);
      copy.add(id);
      return copy;
    });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Authors</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author: Author) => {
          let birthDisplay = "-";
          if (author.birthDate) {
            const d = new Date(author.birthDate);
            if (!Number.isNaN(d.getTime())) {
              birthDisplay = d.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
            }
          }

          const imageBroken = failedImages.has(author.id);
          const imageSrc = imageBroken ? "/default-author.png" : (author.image || "/default-author.png");

          return (
            <Card key={author.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="flex-none shrink-0 w-20 h-20 relative rounded-full overflow-hidden border">
                    <Image
                      src={imageSrc}
                      alt={`Photo of ${author.name}`}
                      fill
                      sizes="80px"
                      className="absolute inset-0 w-full h-full object-cover"
                      unoptimized
                      onError={() => markFailed(author.id)}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-lg truncate">{author.name}</h2>
                    <p className="text-sm text-white-500 line-clamp-3 break-words">{author.description}</p>
                    <p className="text-sm text-white-200 mt-1">Birthdate: {birthDisplay}</p>
                  </div>
                </div>
                <div className="w-full md:w-auto flex flex-col md:items-end gap-2">
                  <div className="flex gap-2 justify-start md:justify-end">
                    <Link href={`/edit/${author.id}`}>
                      <Button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 w-15 text-sm text-center"
                        aria-label={`Edit ${author.name}`}
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 w-15 text-sm text-center"
                      aria-label={`Delete ${author.name}`}
                      onClick={() => removeAuthor(author.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
