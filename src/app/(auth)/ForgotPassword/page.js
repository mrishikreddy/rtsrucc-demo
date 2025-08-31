"use client";

import styles from "./fp.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import { doPasswordReset } from "../../firebase/Auth";

const ForgotPassword = () => {
  const router = useRouter();
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState(""); // Replaced hallTicket with email
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (userLoggedIn) {
      router.push("/");
    }
  }, [userLoggedIn, router]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsSending(true);

    const trimmedEmail = email.trim().toLowerCase(); // Use the email directly

    try {
      await doPasswordReset(trimmedEmail);
      setMessage("✅ If your account exists, you will receive a reset link via email.");
    } catch (err) {
      setError("❌ " + err.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>Reset Your Password</h2>

        {message && <p className={styles.success}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handlePasswordReset} className={styles.form}>
          <div className={styles.inputOuterDiv}>
            <div className={styles.inputContainer}>
              <input
                type="email" // Changed input type to email
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
          </div>

          <button type="submit" className={styles.btn} disabled={isSending}>
            {isSending ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className={styles.links}>
          Remembered your password?{" "}
          <Link href="/SignIn" className={styles.signup}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
