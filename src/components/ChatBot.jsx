import React, { useState, useEffect, useRef } from "react";

const API_URL = "http://localhost:8000";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [conversacionId] = useState(`conv_${Date.now()}`);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addMessage = (message) => {
    const time = new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((prev) => [...prev, { ...message, time }]);
  };

  const sendToAPI = async (userMessage) => {
    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversacion_id: conversacionId,
          mensaje: userMessage,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      return {
        respuesta: "Lo siento, hubo un error. Intenta de nuevo.",
        opciones: [],
      };
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    addMessage({ text: input, sender: "user" });
    const userMessage = input;
    setInput("");
    setIsTyping(true);

    const botResponse = await sendToAPI(userMessage);
    setIsTyping(false);

    addMessage({
      text: botResponse.respuesta,
      sender: "bot",
      options: botResponse.opciones || [],
    });
  };

  const handleOptionClick = async (option) => {
    addMessage({ text: option, sender: "user" });
    setIsTyping(true);

    const botResponse = await sendToAPI(option);
    setIsTyping(false);

    addMessage({
      text: botResponse.respuesta,
      sender: "bot",
      options: botResponse.opciones || [],
    });
  };

  const toggleChat = () => {
    setOpen(!open);
    if (!open && messages.length === 0) {
      addMessage({
        text: "¡Hola! 👋 Bienvenido a AutoExpert Taller Mecánico. Soy Cars, tu asistente virtual. ¿En qué puedo ayudarte hoy?",
        sender: "bot",
        options: [
          "Agendar cita",
          "Estado de mi vehículo",
          "Servicios disponibles",
          "Cotización",
        ],
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open && (
        <button
          onClick={toggleChat}
          className="w-16 h-16 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 animate-bounce hover:animate-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}

      {open && (
        <div className="w-[380px] sm:w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] transition-all duration-300">
          <div className="bg-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Cars</h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-100 text-xs">En línea</span>
                </div>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={idx}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}
                >
                  <div
                    className={`flex gap-2 max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? "bg-gradient-to-br from-purple-500 to-pink-500" : "bg-gradient-to-br from-blue-500 to-indigo-500"}`}
                    >
                      {isUser ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          ></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      )}
                    </div>
                    <div>
                      <div
                        className={`rounded-2xl px-4 py-3 ${isUser ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none" : "bg-white text-gray-800 shadow-md rounded-tl-none border border-gray-100"}`}
                      >
                        <p className="text-sm whitespace-pre-line leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                      <span
                        className={`text-xs text-gray-500 mt-1 block ${isUser ? "text-right" : "text-left"}`}
                      >
                        {msg.time}
                      </span>
                      {msg.options && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {msg.options.map((option, i) => (
                            <button
                              key={i}
                              onClick={() => handleOptionClick(option)}
                              className="bg-white border-2 border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 shadow-sm hover:shadow"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start mb-2">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-md border border-gray-100">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <button
                onClick={handleSend}
                className="flex justify-center items-center bg-blue-600 text-white p-3 rounded-full w-12 h-12 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Presiona Enter para enviar
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
