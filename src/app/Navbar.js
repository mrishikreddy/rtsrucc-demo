"use client";

import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "./contexts/authContext";
import { useData } from "./contexts/dataContext";
import { doSignOut } from "./firebase/Auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { userLoggedIn, currentUser } = useAuth();        // grab currentUser
  const [menuOpen, setMenuOpen] = useState(false);
  const { combinedUserData } = useData();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await doSignOut();
      setMenuOpen(false);
      router.push("/SignIn");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <div className={styles.navOuterDiv}>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.logo} onClick={() => router.push("/home")}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className={styles.logoImg}
            />
            <span className={styles.logoText}>SRU Coding Club</span>
          </div>

          <div className={styles.actions}>
            {userLoggedIn ? (
              <div className={styles.userMenu}>
                <div
                  className={styles.userIcon}
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  👤
                </div>

                {menuOpen && (
                  <div className={styles.dropdown}>
                    <button
                      className={styles.closeBtn}
                      onClick={() => setMenuOpen(false)}
                    >
                      ✖
                    </button>

                    {combinedUserData ? (
                      <>
                        <p className={styles.heading}>User Details</p>
                        <hr className={styles.line} />
                        <div className={styles.details}>
                          <div className={styles.detailsChild}>
                            Name: {combinedUserData.Name}
                          </div>
                          <div className={styles.detailsChild}>
                            Email: {currentUser?.email}
                          </div>
                          {/* Year line removed */}
                          <div className={styles.detailsChild}>
                            Points: {combinedUserData.Points}
                          </div>
                        </div>
                        <button
                          onClick={handleLogout}
                          className={styles.dropdownBtn}
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <p className={styles.detailsChild}>User not found</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/SignIn" className={styles.link}>
                  Login
                </Link>
                <Link href="/SignUp" className={styles.link}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
