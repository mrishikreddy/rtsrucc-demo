"use client";

import { useState } from "react";
import styles from "./ProblemBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";


export default function ProblemBox() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    problem: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("../../api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError(data.error || "Failed to send. Try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ ...formData, problem: "" });
    setIsSubmitted(false);
    setError("");
  };

  return (
    <div className={styles.container}>
      {isSubmitted ? (
        <div className={styles.successMessage} role="alert">
          <FontAwesomeIcon
            icon={faCheckCircle}
            style={{
              color: "rgb(17, 255, 0)",
              fontSize: "2rem",
              marginRight: "10px",
            }}
          />
          <p>Thank you! We received your Message.</p>
          <button className={styles.submitButton} onClick={resetForm}>
            Send another Message
          </button>
        </div>
      ) : (
        <>
          <div className={styles.InfoDiv}>
            <h1 style={{ fontFamily: "Poppins, sans-serif" }}>Contact Form</h1>
            <p>
            If you have any questions, inquiries, or would like to get in touch with us
             regarding the website or our events, feel free to fill out the contact form below.
              We&apos;re always happy to hear from you and will get back to you as soon as possible.
            </p>
          </div>

          <div className={styles.content}>
            <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <textarea
                name="problem"
                placeholder="Write your Message"
                value={formData.problem}
                onChange={handleChange}
                required
              ></textarea>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>

            {error && (
              <div className={styles.error} role="alert">
                {error}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
