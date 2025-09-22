"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useAuthorStore } from "@/store/authorStore";
import { Heart, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export interface Author {
  id: number;
  name: string;
  birthDate: string;
  description: string;
  image: string;
}

export default function AuthorList({ showOnlyFavorites = false }: { showOnlyFavorites?: boolean }) {
  const { authors, loading, removeAuthor, loadAuthors, favorites, toggleFavorite } = useAuthorStore();
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const router = useRouter();

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors();
    }
  }, [loadAuthors, authors.length]);

  const markFailed = (id: number) => setFailedImages((prev) => new Set(prev).add(id));

  const authorsToDisplay = showOnlyFavorites
    ? authors.filter(author => favorites.has(author.id))
    : authors;

  const pageTitle = showOnlyFavorites ? "Favorite Authors" : "Authors";

  if (loading) return <p className="text-center text-muted-foreground mt-8">Loading...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{pageTitle}</h1>
      </div>

      {authorsToDisplay.length === 0 && (
        <p className="text-center text-muted-foreground pt-12">
          {showOnlyFavorites ? "You haven't added any authors to your favorites yet." : "No authors found."}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authorsToDisplay.map((author: Author) => {
          const isFavorite = favorites.has(author.id);
          const imageSrc = failedImages.has(author.id) ? "/default-author.png" : (author.image || "/default-author.png");
          
          let birthDisplay = "-";
          if (author.birthDate) {
            const d = new Date(author.birthDate);
            if (!Number.isNaN(d.getTime())) {
              birthDisplay = d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
            }
          }

          return (
            <Card key={author.id} className={`shadow-sm hover:shadow-md transition-shadow h-full ${isFavorite ? 'border-primary' : ''}`}>
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <Link href={`/authors/${author.id}`} className="block">
                  <div className="flex items-center gap-4">
                    <div className="flex-none w-20 h-20 relative rounded-full overflow-hidden border">
                      <Image src={imageSrc} alt={`Photo of ${author.name}`} fill sizes="80px" className="object-cover" unoptimized onError={() => markFailed(author.id)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-lg truncate">{author.name}</h2>
                      <p className="text-sm text-muted-foreground line-clamp-2 break-words">{author.description}</p>
                      <p className="text-sm text-muted-foreground mt-1">Birthdate: {birthDisplay}</p>
                    </div>
                  </div>
                </Link>
                <div className="flex gap-2 justify-end mt-4 pt-4 border-t">
                  <Button
                    variant={isFavorite ? "default" : "outline"}
                    size="icon"
                    onClick={() => toggleFavorite(author.id)}
                    aria-label={isFavorite ? `Remove ${author.name} from favorites` : `Add ${author.name} to favorites`}
                    aria-pressed={isFavorite}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-primary-foreground' : ''}`} />
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    aria-label={`Edit ${author.name}`}
                    onClick={() => router.push(`/edit/${author.id}`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" aria-label={`Delete ${author.name}`} onClick={() => removeAuthor(author.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
