"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./contexts/authContext";
import { useData } from "./contexts/dataContext";
import styles from "./page.module.css";
import AiBox from "./aicb/ai";
import { faLinkedin, faInstagram, faMedium } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const toUpperCaseName = (str) => (str || "").toUpperCase();

export default function DetailsPage() {
  const { userLoggedIn } = useAuth();
  const router = useRouter();

  const { examDetails, dashboardData } = useData();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [countdown, setCountdown] = useState("");
  const [showResources, setShowResources] = useState(false);

  const rowsPerPage = 10;
  const { date, time, link: examLink, resourcesLink, examName = "Loading" } = examDetails || {};

  useEffect(() => {
    if (userLoggedIn === null) return;
    if (!userLoggedIn) {
      router.push("/SignIn");
    } else {
      setCheckingAuth(false);
    }
  }, [userLoggedIn, router]);

  useEffect(() => {
    if (!date || !time) return;

    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(`${date}T${time}`);
      const diff = target - now;

      setShowResources(now < target);

      if (diff <= 0) {
        setCountdown("00d 00h 00m 00s");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(
        `${String(days).padStart(2, "0")}d ` +
        `${String(hours).padStart(2, "0")}h ` +
        `${String(minutes).padStart(2, "0")}m ` +
        `${String(seconds).padStart(2, "0")}s`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [date, time]);

  const formatCountdown = () => countdown || " Loading ";

  const filteredData = searchTerm
    ? dashboardData.filter((item) => {
        const formattedName = toUpperCaseName(item.Name);
        return (
          formattedName.includes(searchTerm.toUpperCase()) ||
          item.Email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : dashboardData;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (checkingAuth) return null;

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const getFormattedDateTime = () => {
    if (!date || !time) return "To be announced";

    const examDate = new Date(`${date}T${time}`);
    const now = new Date();

    if (now >= examDate) {
      return "Click here to start the Quiz";
    }

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    return `Live on ${examDate.toLocaleDateString("en-US", options)}`;
  };

  const handleClick = () => {
    const now = new Date();
    const examStart = new Date(`${date}T${time}`);

    if (!date || !time) {
      alert("Exam date/time not available yet!");
      return;
    }

    if (now < examStart) {
      if (resourcesLink) {
        window.open(resourcesLink, "_blank");
      } else {
        alert("Resources link is not available yet!");
      }
    } else {
      if (examLink) {
        window.open(examLink, "_blank");
      }
    }
  };

  const handleFooter = () => {
    window.open("https://rishik.tech", "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className={styles.container}>
        <button className={styles.hamburger} onClick={() => setSidebarOpen(!sidebarOpen)}>
          &#9776;
        </button>

        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
          <div className={styles.sidebarContent}>
            <h2 className={styles.sidebarTitle}>Menu</h2>
            <ul>
              <li><a href="/about">About Coding Club</a></li><hr />
              <li><a href="/rules.pdf" target="_blank">Competition Rules</a></li><hr />
              <li><a href="/ccfaq.pdf" target="_blank">FAQ</a></li><hr />
              <li><a href="./contact">Contact</a></li><hr />
              <li><a href="/connect">Connect</a></li><hr />
              <li><a href="/MeetOurTeam">Meet Our Team</a></li>
            </ul>
            <div className={styles.socialLinks}>
              <p className={styles.followText}>Follow the links and stay updated</p>
              <div className={styles.iconContainer}>
                <a href="https://www.linkedin.com/company/codingclubsru/" target="_blank">
                  <FontAwesomeIcon icon={faLinkedin} className={styles.icon} />
                </a>
                <a href="https://instagram.com/codingclubsru" target="_blank">
                  <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
                </a>
                <a href="https://medium.com/@codingclubsru" target="_blank">
                  <FontAwesomeIcon icon={faMedium} className={styles.icon} />
                </a>
              </div>
            </div>
          </div>
        </aside>

        <main className={styles.mainContent}>
          <div className={styles.banner}></div>

          <div className={styles.examCard} onClick={handleClick}>
            <div className={styles.examInner}>
              <div className={styles.examDetails}>
                <h2 className={styles.title}>{examName}</h2>
                <p className={styles.date}>{getFormattedDateTime()}</p>
                {showResources && (
                  <p className={styles.resources}>Click here for learning resources</p>
                )}
              </div>
              <div className={styles.timer}>
                <h3 className={styles.timerHeading}>Quiz Starts In</h3>
                <p className={styles.timerText}>{formatCountdown()}</p>
              </div>
            </div>
          </div>

          <div className={styles.sectionTitle}> Leader Board</div>

          <input
            type="text"
            placeholder="Search by Name or Email..."
            className={styles.searchBar}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>CC Points</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.length > 0 ? (
                  displayedData.map((item, index) => (
                    <tr key={item.Email ? `${item.Email}-${index}` : index}>
                      <td>{item.Rank}</td>
                      <td className={styles.ellipsisCell}>{item.Name?.toUpperCase()}</td>
                      <td>{item.Email}</td>
                      <td>{item.Points}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>Loading</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>

          <div className={styles.footerWrapper}>
            <div className={styles.footerContent}>
              <p className={styles.cp} onClick={handleFooter}>Designed and developed by Rishik Reddy</p>
              <p>Rishik Tech © 2025</p>
            </div>
          </div>
        </main>
      </div>
      <AiBox />
    </>
  );
}
