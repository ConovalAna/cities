import Link from "next/link";
import React from "react";
import style from "../styles/footer.module.css";

export default function Footer() {
  return (
    <nav className={style.footer}>
      <div>
        <ul>
          <li>
            <Link href="/" id="homr">
              Home
            </Link>
          </li>
          <li>
            <Link href="/search" id="search">
              Search
            </Link>
          </li>
          <li>Copyright © 2024</li>
        </ul>
      </div>
    </nav>
  );
}
