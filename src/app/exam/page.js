import styles from "./exam.module.css";

export default function ExamPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>🚫 Quiz Not Active</h1>
        <p className={styles.subText}>We&apos;ll notify you when it goes live!</p>
      </div>
    </div>
  );
}
