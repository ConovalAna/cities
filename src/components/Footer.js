import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <nav className="footer">
      <div>
        <ul>
          <li>
            <Link href="/search" id="search">
              Search
            </Link>
          </li>
          <li>
            <Link href="/favorites" id="favorites">
              Favorites
            </Link>
          </li>
          <li>Copy rights 2024</li>
        </ul>
      </div>
    </nav>
  );
}
