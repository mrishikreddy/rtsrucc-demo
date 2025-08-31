"use client";

import styles from "./signin.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { doSignInWithEmailAndPassword } from "../../firebase/Auth";
import { getAuth, signOut } from "firebase/auth";

const Login = () => {
  const router = useRouter();
  const auth = getAuth();
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState(""); // using email instead of hall ticket
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userLoggedIn) {
      router.push("/");
    }
  }, [userLoggedIn, router]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (isSigningIn) return;

    setIsSigningIn(true);

    try {
      const userCredential = await doSignInWithEmailAndPassword(email.trim(), password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        await signOut(auth);
        setErrorMessage(
          "Verification email sent to your college email. Please verify it before logging in. Don’t forget to check your spam folder"
        );
        setIsSigningIn(false);
        return;
      }

      router.push("/");
    } catch (error) {
      setErrorMessage("Invalid credentials or account not found.");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h3>Login</h3>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.inputOuterDiv}>
            <div className={styles.inputContainer}>
              <input
                className={styles.inputField}
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className={styles.iconDiv}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
            </div>
          </div>

          <div className={styles.inputOuterDiv}>
            <div className={styles.inputContainer}>
              <input
                className={styles.inputField}
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <div className={styles.iconDiv} onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className={styles.icon} />
            </div>
          </div>

          <button type="submit" className={styles.btn} disabled={isSigningIn}>
            {isSigningIn ? "Signing In..." : "Login"}
          </button>
        </form>

        <div className={styles.links}>
          <Link href="/ForgotPassword">Forgot password?</Link>
          <p>
            Don&apos;t have an account?
            <Link href="/SignUp" className={styles.signup}><b> Register</b></Link> now.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
