'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import Papa from 'papaparse';
import { auth } from '../firebase/firebase';
import styles from './admin.module.css';

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [csvData, setCsvData] = useState([]);
  const [examLinkInput, setExamLinkInput] = useState('');
  const [resourcesLinkInput, setResourcesLinkInput] = useState(''); // ✅ NEW STATE
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [examNameInput, setExamNameInput] = useState('');

  const router = useRouter();

  useEffect(() => {
    const allowed = [
      "malerishikreddy@gmail.com",
      "2203a51244@sru.edu.in",
      "rishiktechcore@gmail.com",
      "rishiktechofficial@gmail.com",
      "2303A51209@sru.edu.in",
    ];

    onAuthStateChanged(auth, (u) => {
      if (u && allowed.includes(u.email)) {
        setUser(u);
      } else {
        router.push('/');
      }
    });
  }, [router]);

  useEffect(() => {
    if (verified) {
      fetchExamDetails();
    }
  }, [verified]);

  const fetchExamDetails = async () => {
    try {
      const res = await fetch('/api/getExamDetails');
      const data = await res.json();
      setExamLinkInput(data.link || '');
      setDate(data.date || '');
      setTime(data.time || '');
      setExamNameInput(data.examName || '');
      setResourcesLinkInput(data.resourcesLink || ''); // ✅ Load existing resourcesLink
    } catch (err) {
      console.error('Failed to fetch exam details.');
    }
  };

  const handlePasswordSubmit = () => {
    if (password === 'Admin@2025') {
      setVerified(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleCSV = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError('Please select a CSV file.');
      return;
    }

    Papa.parse(file, {
      header: false,
      complete: (results) => {
        const raw = results.data;
        const data = raw.slice(1)
          .filter(r => r.length === 2)
          .map(([hallticket, points]) => ({
            hallticket: hallticket.trim().toLowerCase(),
            points: parseInt(points),
          }));
        setCsvData(data);
        setError('');
      },
    });
  };

  const sendToAPI = async () => {
    if (csvData.length === 0) {
      setError('CSV data is empty. Please upload a valid CSV file.');
      return;
    }

    const res = await fetch('/api/addpoints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: csvData }),
    });

    const result = await res.json();
    alert(result.message || 'Done!');
  };

  const handleUpdateLink = async () => {
    if (!examLinkInput.trim()) {
      setError('Please enter an exam link before updating.');
      return;
    }

    try {
      const res = await fetch('/api/setlink', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: examLinkInput.trim() }),
      });
      const result = await res.json();
      alert(result.message || 'Link updated.');
    } catch (err) {
      setError('Failed to update link.');
    }
  };

  const handleClearLink = async () => {
    const defaultLink = '/exam';
    try {
      const res = await fetch('/api/setlink', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: defaultLink }),
      });
      const result = await res.json();
      setExamLinkInput(defaultLink);
      alert(result.message || 'Link reset.');
    } catch (err) {
      setError('Failed to clear link.');
    }
  };

  const handleDateTimeSubmit = async () => {
    if (!date || !time) {
      setError('Please enter both date and time.');
      return;
    }

    try {
      const res = await fetch('/api/setDateTime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, time }),
      });
      const result = await res.json();
      alert(result.message || 'Date and Time updated.');
    } catch (err) {
      setError('Failed to update date and time.');
    }
  };

  const handleExamNameSubmit = async () => {
    if (!examNameInput.trim()) {
      setError('Please enter an exam name.');
      return;
    }

    try {
      const res = await fetch('/api/setExamName', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examName: examNameInput.trim() }),
      });
      const result = await res.json();
      alert(result.message || 'Exam name updated.');
    } catch (err) {
      setError('Failed to update exam name.');
    }
  };

  // ✅ NEW FUNCTION: Update Learning Resources Link
  const handleResourcesLinkSubmit = async () => {
    if (!resourcesLinkInput.trim()) {
      setError('Please enter the resources link.');
      return;
    }

    try {
      const res = await fetch('/api/setResourcesLink', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resourcesLink: resourcesLinkInput.trim() }),
      });
      const result = await res.json();
      alert(result.message || 'Resources link updated.');
    } catch (err) {
      setError('Failed to update resources link.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Admin Panel</h1>

      {!verified ? (
        <div className={styles.passwordBox}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button onClick={handlePasswordSubmit} className={styles.button}>
            Submit
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      ) : (
        <>
          <div className={styles.uploadBox}>
            <input
              type="file"
              accept=".csv"
              onChange={handleCSV}
              className={styles.fileInput}
            />
            <button onClick={sendToAPI} className={styles.buttonGreen}>
              Upload and Update Points
            </button>
          </div>

          <div className={styles.uploadBox}>
            <input
              type="text"
              placeholder="Enter Exam Link"
              value={examLinkInput}
              onChange={(e) => setExamLinkInput(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleUpdateLink} className={styles.buttonGreen}>
              Update Link
            </button>
            <button onClick={handleClearLink} className={styles.button}>
              Clear Link
            </button>
          </div>

          <div className={styles.uploadBox}>
            <input
              type="text"
              placeholder="Enter exam name"
              value={examNameInput}
              onChange={(e) => setExamNameInput(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleExamNameSubmit} className={styles.buttonGreen}>
              Set Exam Name
            </button>
          </div>

          <div className={styles.uploadBox}>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={styles.input}
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleDateTimeSubmit} className={styles.buttonGreen}>
              Set Date & Time
            </button>
          </div>

          {/* ✅ Learning Resources Link Input */}
          <div className={styles.uploadBox}>
            <input
              type="text"
              placeholder="Enter learning resources link"
              value={resourcesLinkInput}
              onChange={(e) => setResourcesLinkInput(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleResourcesLinkSubmit} className={styles.buttonGreen}>
              Set Learning Resources
            </button>
          </div>

          {error && <p className={styles.error}>{error}</p>}
        </>
      )}
    </div>
  );
}
