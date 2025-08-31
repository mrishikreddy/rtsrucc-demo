"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getFirestore, doc, getDoc, updateDoc, FieldPath } from "firebase/firestore";
import { useAuth } from "./authContext";
import { app } from "../firebase/firebase";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

const CACHE_KEY = "dataCache";
const CACHE_TTL = 1 * 60 * 60 * 1000; // 3 hours

export const DataProvider = ({ children }) => {
  const db = getFirestore(app);
  const { userLoggedIn, currentUser } = useAuth();

  const [userData, setUserData] = useState({});
  const [userPoints, setUserPoints] = useState({});
  const [examDetails, setExamDetails] = useState(null);
  const [dashboardData, setDashboardData] = useState([]);
  const [combinedUserData, setCombinedUserData] = useState({
    Name: "Loading...",
    Points: "Loading...",
  });

  const processAggregateData = useCallback(
    async (aggregateData) => {
      if (!currentUser?.email) return aggregateData;

      const userKey = currentUser.email.toLowerCase().split("@")[0];
      const userObj = aggregateData?.UserData?.[userKey];

      if (userObj?.Verified === false) {
        try {
          // Correct updateDoc usage with FieldPath + value
          await updateDoc(
            doc(db, "Admin", "aggregateDoc"),
            new FieldPath("UserData", userKey, "Verified"),
            true
          );
          // mirror locally so cached data reflects the change
          aggregateData.UserData[userKey].Verified = true;
        } catch (error) {
          console.error("❌ Error updating Verified:", error);
        }
      }

      setUserData(aggregateData.UserData || {});
      setUserPoints(aggregateData.UserPoints || {});
      setExamDetails(aggregateData.ExamDetails || {});

      return aggregateData;
    },
    [currentUser, db]
  );

  const fetchAggregateData = useCallback(async () => {
    if (!currentUser?.email) return;

    const now = Date.now();
    const cached = localStorage.getItem(CACHE_KEY);

    if (cached) {
      const { timestamp, aggregateData } = JSON.parse(cached);
      if (now - timestamp < CACHE_TTL) {
        await processAggregateData(aggregateData);
        return;
      }
    }

    const aggregateRef = doc(db, "Admin", "aggregateDoc");
    const snapshot = await getDoc(aggregateRef);

    if (snapshot.exists()) {
      let data = snapshot.data();
      data = await processAggregateData(data);
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ timestamp: now, aggregateData: data })
      );
    } else {
      console.warn("⚠️ aggregateDoc does not exist");
    }
  }, [currentUser, db, processAggregateData]);

  // Initial & visibility-change fetch
  useEffect(() => {
    if (userLoggedIn) fetchAggregateData();
  }, [userLoggedIn, currentUser, fetchAggregateData]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible" && userLoggedIn) {
        fetchAggregateData();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [userLoggedIn, fetchAggregateData]);

  // Clear on logout
  useEffect(() => {
    if (!userLoggedIn) {
      localStorage.removeItem(CACHE_KEY);
      setUserData({});
      setUserPoints({});
      setExamDetails(null);
      setDashboardData([]);
      setCombinedUserData({ Name: "Loading...", Points: "Loading..." });
    }
  }, [userLoggedIn]);

  // Build combinedUserData for the current user
  useEffect(() => {
    if (!currentUser) return;
    const userKey = currentUser.email.toLowerCase().split("@")[0];
    const info = userData[userKey];
    const pts = userPoints[userKey];
    if (info) {
      setCombinedUserData({
        Name: info.Name || "Unknown",
        Points: pts?.Points ?? 0,
      });
    }
  }, [currentUser, userData, userPoints]);

  // Build leaderboard
  useEffect(() => {
    const list = Object.entries(userData)
      .filter(([, u]) => u.Verified)
      .map(([key, u]) => ({
        Email: u.Email,
        Name: u.Name,
        Points: userPoints[key]?.Points ?? 0,
      }))
      .filter((u) => u.Points >= 0)
      .sort((a, b) => b.Points - a.Points);

    let last = null,
      rank = 1;
    const ranked = list.map((u) => {
      if (u.Points !== last) {
        if (last !== null) rank++;
        last = u.Points;
      }
      return { ...u, Rank: rank };
    });

    setDashboardData(ranked);
  }, [userData, userPoints]);

  return (
    <DataContext.Provider
      value={{
        userData,
        userPoints,
        examDetails,
        dashboardData,
        combinedUserData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
