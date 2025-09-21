import Link from "next/link";
import { Button } from "./ui/button";

export default function NavBar() {
  return (
    <nav className="navbar-glass flex justify-between items-center p-4">
      <h1 className="text-xl font-bold">Bookstore</h1>
      <div className="space-x-2">
        <Link href="/authors">
          <Button variant="outline">Authors</Button>
        </Link>
        <Link href="/create">
          <Button>Create Author</Button>
        </Link>
      </div>
    </nav>
  );
}
