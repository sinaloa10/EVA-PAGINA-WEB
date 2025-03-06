import { useState } from "react";
import './Chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const usuarioId = "0f961737-f9e7-484d-b65c-f60b78610aaa"; // ID estático

  const sendMessage = async () => {
    if (input.trim() !== "") {
      const newMessage = { text: input, sender: "Yo" };
      setMessages([...messages, newMessage]);
      setInput("");

      try {
        const response = await fetch("http://localhost:3000/api/eva/respuesta-eva", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ texto: input, usuarioId }),
        });

        if (response.ok) {
          const botResponse = await response.text();
          receiveMessage(botResponse);
        } else {
          console.error("Error en la respuesta del servidor");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  const receiveMessage = (botResponse) => {
    setMessages((prev) => [...prev, { text: botResponse, sender: "EVA" }]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white w-3xl mx-auto p-4 border rounded-lg shadow-md">
        <div className="h-80 overflow-y-auto border-b mb-2 p-2">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === "Yo" ? "text-right" : "text-left"}>
              <span className={msg.sender === "Yo" ? "bg-[#f6938c] text-white p-1 rounded" : "bg-[#8ac8fb] p-1 rounded"}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border p-1 rounded text-black"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="button-custom" onClick={sendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512">
              <path fill="#f6938c" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
