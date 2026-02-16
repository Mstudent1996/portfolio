import { useState } from "react";
import { FaGithub, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import characterPhoto from "/assets/character.png";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={styles.toggleButton}
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        {open ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      <div className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <h2 className={styles.sidebarHead}>Snydekoder</h2>

        <nav className={styles.sidebarNav}>
          <Link
            to="/"
            className={styles.sidebarLink}
            onClick={() => setOpen(false)}
          >
            Hjem
          </Link>
          <Link
            to="/projects"
            className={styles.sidebarLink}
            onClick={() => setOpen(false)}
          >
            Projekter
          </Link>
          <Link
            to="/about"
            className={styles.sidebarLink}
            onClick={() => setOpen(false)}
          >
            Om Mig
          </Link>
        </nav>

        <img
          src={characterPhoto}
          alt="Character"
          className={styles.sidebarPhoto}
        />

        <div className={styles.sidebarGithub}>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaGithub size={45} className={styles.sidebarGithubIcon} />
          </a>
        </div>

        <p className={styles.sidebarText}>Copyright @ Mette Rasmussen</p>
      </div>
    </>
  );
}
