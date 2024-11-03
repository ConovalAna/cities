import Link from "next/link";
import React from "react";
import styles from "../styles/navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navBar}>
      <div>
        <Link href="/" id="home">
          Home
        </Link>
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
        </ul>
      </div>
    </nav>
  );
}
