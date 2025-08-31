import React, { useState, useRef, useEffect } from "react";
import styles from "./ai.module.css";

export default function Ai() {
  const [showAiBox, setShowAiBox] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleAiBox = () => {
    setShowAiBox(!showAiBox);
  };

  const handleSend = async () => {
    if (inputText.trim()) {
      const userMessage = { text: inputText, type: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const currentInput = inputText;
      setInputText(""); // Clear immediately
      setLoading(true);

      try {
        const res = await fetch("/api/aiEndPoint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rawText: currentInput }),
        });

        const data = await res.json();
        const aiMessage = { text: data.response, type: "ai" };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Error fetching AI response", type: "ai" },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      handleSend();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      {/* Floating Button */}
      <button className={styles.chatButton} onClick={toggleAiBox} aria-label="Toggle AI Chat">
        AI
      </button>

      {/* AI Chatbox */}
      {showAiBox && (
        <div className={styles.aiBox} id="ai-box" role="dialog" aria-labelledby="ai-chat-title">
          <div className={styles.aiTitle}>
            <span id="ai-chat-title" className={styles.titleText}>
              Ciao AI
            </span>
            <button className={styles.aiCloseButton} onClick={toggleAiBox} aria-label="Close Chat">
              ✖
            </button>
          </div>
          <div className={styles.chatContainer}>
            <div className={styles.messages}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={msg.type === "user" ? styles.userBubble : styles.aiBubble}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className={styles.aiBubble}>
                  <div className={styles.loadingDots}>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <textarea
              className={styles.inputBar}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              aria-label="Message Input"
            />
            <button
              className={styles.sendButton}
              onClick={handleSend}
              aria-label="Send Message"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
