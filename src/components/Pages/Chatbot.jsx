import React, { useState, useRef, useEffect, useCallback } from 'react';

// --- Iconos (sin cambios) ---
const MessageSquare = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const SendHorizontal = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m3 3 3 9-3 9 19-9Z" />
    <path d="M6 12h16" />
  </svg>
);

const WS_URL = "wss://api.evasalud.com.mx/tracking/ws";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'eva',
      text: '¡Hola! Soy EVA, tu compañera de bienestar. Estoy aquí para escucharte sin juicios. ¿Cómo te sientes hoy?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null); // Ref for the textarea
  const token = localStorage.getItem('token');

  // --- WebSocket Logic ---

  const handleWebSocketMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event.data);

      if (data.error) {
        setError(data.error);
        setIsLoading(false);
        return;
      }
      
      switch (data.type) {
        case 'chatbot_history':
          if (Array.isArray(data.messages)) {
            const history = data.messages.flatMap((msg, idx) => [
              { id: `hist_user_${idx}`, sender: 'user', text: msg.userMessage },
              { id: `hist_bot_${idx}`, sender: 'eva', text: msg.botMessage },
            ]).filter(m => m.text && m.text.trim() !== '');
            
            if (history.length > 0) {
              setMessages(history);
            }
          }
          break;

        case 'chatbot_stream':
          setIsLoading(false); 
          setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage?.sender === 'eva' && lastMessage.streaming) {
              return [
                ...prev.slice(0, -1),
                { ...lastMessage, text: lastMessage.text + data.chunk },
              ];
            } else {
              return [
                ...prev,
                { id: Date.now(), sender: 'eva', text: data.chunk, streaming: true },
              ];
            }
          });
          break;

        case 'chatbot_stream_end':
          setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage?.streaming) {
              return [
                ...prev.slice(0, -1), 
                { ...lastMessage, streaming: false }
              ];
            }
            return prev;
          });
          setIsLoading(false);
          break;
        
        default:
          break;
      }
    } catch (e) {
      console.error('Error processing WebSocket message:', e);
      setError('Error al procesar la respuesta del servidor.');
      setIsLoading(false);
    }
  }, []);

  const connect = useCallback(() => {
    if (!token) {
      setError('No autenticado. Por favor, inicia sesión.');
      return;
    }
    
    console.log('Attempting to connect WebSocket...');
    const socket = new WebSocket(WS_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket Connected');
      setIsConnected(true);
      setError('');
      socket.send(JSON.stringify({ type: 'chatbot_history', token, data: {} }));
    };

    socket.onmessage = handleWebSocketMessage;

    socket.onerror = (err) => {
      console.error('WebSocket Error:', err);
      setError('No se pudo conectar con el servidor de EVA.');
      setIsConnected(false);
      setIsLoading(false);
    };

    socket.onclose = (event) => {
      console.warn(`WebSocket closed: Code ${event.code}, Reason: ${event.reason}`);
      setIsConnected(false);
    };
  }, [token, handleWebSocketMessage]);

  useEffect(() => {
    connect();
    return () => {
      console.log('Closing WebSocket connection on cleanup.');
      socketRef.current?.close();
    };
  }, [connect]);


  // --- UI Effects ---
  
  // Auto-scroll to the bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Clear error when user starts typing
  useEffect(() => {
    if (inputValue) setError('');
  }, [inputValue]);
  
  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      const scrollHeight = textarea.scrollHeight;
      // Set a max-height (e.g., 120px) to prevent infinite growth on mobile
      textarea.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [inputValue]);


  // --- Event Handlers ---

  const handleSendMessage = (e) => {
    e?.preventDefault(); 
    if (!inputValue.trim() || !isConnected || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue,
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    socketRef.current.send(JSON.stringify({
      type: 'chatbot_response',
      token,
      data: { texto: inputValue }
    }));

    setInputValue('');
  };
  
  // Handle Enter to send, Shift+Enter for new line
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isSendDisabled = isLoading || !isConnected || !inputValue.trim();

  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-100 font-sans md:p-4">
      <div className="flex flex-col w-full h-screen bg-white md:max-w-lg md:h-[90vh] md:max-h-[750px] md:rounded-2xl md:shadow-2xl">
        {/* Header */}
        <header className="flex items-center p-4 sm:p-5 bg-gradient-to-r from-[#8DC8FA] to-[#6AA5D7] text-white shadow-md z-10 shrink-0 md:rounded-t-2xl">
          <MessageSquare className="w-7 h-7 mr-4" />
          <div>
            <h1 className="text-lg font-bold">EVA Asistente</h1>
            <p className="text-xs opacity-90">Tu compañera de bienestar</p>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-end gap-2 ${message.sender === 'eva' ? 'justify-start' : 'justify-end'}`}>
              <div
                className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl animate-slide-up ${
                  message.sender === 'eva'
                    ? 'bg-slate-200 text-slate-800 rounded-bl-lg'
                    : 'bg-[#8DC8FA] text-white rounded-br-lg'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-end gap-2 justify-start">
              <div className="max-w-xs px-4 py-3 rounded-2xl bg-slate-200 text-slate-800 rounded-bl-lg">
                <p className="text-sm animate-pulse">EVA está escribiendo...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center mt-2">
              <div className="text-red-600 bg-red-100 border border-red-300 rounded-lg px-4 py-2 text-sm">{error}</div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <footer className="p-4 bg-white border-t border-slate-200 shrink-0 md:rounded-b-2xl">
          <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
            <textarea
              ref={textareaRef}
              rows="1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isConnected ? "Escribe cómo te sientes..." : "Conectando con EVA..."}
              className="flex-1 w-full px-4 py-2.5 text-sm bg-slate-100 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8DC8FA] resize-none transition-all"
              disabled={isLoading || !isConnected}
            />
            <button
              type="submit"
              className="flex items-center justify-center w-11 h-11 bg-[#8DC8FA] rounded-full text-white hover:bg-[#7bbef9] active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8DC8FA] disabled:bg-[#a0d2f9] disabled:cursor-not-allowed disabled:active:scale-100 shrink-0"
              aria-label="Enviar mensaje"
              disabled={isSendDisabled}
            >
              <SendHorizontal className="w-5 h-5" />
            </button>
          </form>
        </footer>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
        .whitespace-pre-wrap { white-space: pre-wrap; }
      `}</style>
    </main>
  );
}
