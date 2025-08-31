"use client";
import styles from "./contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faMedium,
  faFacebook,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function Contact() {
  const links = [
    { name: "Instagram", icon: faInstagram, url: "https://instagram.com/codingclubsru" },
    { name: "LinkedIn", icon: faLinkedin, url: "https://www.linkedin.com/company/codingclubsru/" },
    { name: "Email", icon: faEnvelope, url: "mailto:codingclub@sru.edu.in" },
    { name: "Medium", icon: faMedium, url: "https://medium.com/@codingclubsru" },
    { name: "Facebook", icon: faFacebook, url: "https://facebook.com/codingclubsru" },
    { name: "Twitter", icon: faXTwitter, url: "https://twitter.com/codingclubsru" },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Get in Touch</h1>
        <p>Join our coding community and stay connected!</p>
      </header>

      <main className={styles.cardGrid}>
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <span className={styles.icon}>
              <FontAwesomeIcon icon={link.icon} size="2x" />
            </span>
            <span className={styles.name}>{link.name}</span>
          </a>
        ))}
      </main>

      <footer className={styles.footer}>
        <p>Coding Club @ SR University &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
