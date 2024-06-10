import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { auth, dataBase } from "../firebase-config";

const COMMENTS_PAGE_SIZE = 10;

export const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = collection(dataBase, "messages");

  const getMessages = useCallback(async () => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt"),
      limit(COMMENTS_PAGE_SIZE)
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsuscribe();
  }, [messageRef, room]);

  useEffect(() => {
    getMessages();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat">
      <div className="chat-app">
        <div className="header">
          <h1>Welcome To: {room.toUpperCase()}</h1>
        </div>
        <div className="message-container">
          {messages.map((message) => (
            <div key={message.id} className="message">
              <span className="user">@{message.user}: </span>
              {message.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="new-message-form">
          <input
            placeholder="Type your message..."
            type="text"
            className="new-message-input"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
