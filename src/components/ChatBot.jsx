import React, { useState, useEffect, useRef } from "react";

// Datos del bot
const botResponses = {
  'agendar cita': {
    text: '¡Perfecto! Para agendar tu cita necesito algunos datos. ¿Qué servicio necesitas?',
    options: ['Cambio de aceite', 'Revisión de frenos', 'Mantenimiento general', 'Reparación específica']
  },
  'estado de mi vehículo': {
    text: 'Para consultar el estado de tu vehículo, necesito tu número de orden de servicio. Por favor ingrésalo (formato: ORD-12345)',
    options: ['No tengo el número', 'Contactar mecánico']
  },
  'servicios disponibles': {
    text: '🔧 Estos son nuestros servicios principales:\n\n• Mantenimiento preventivo\n• Cambio de aceite y filtros\n• Sistema de frenos\n• Alineación y balanceo\n• Diagnóstico computarizado\n• Reparaciones mecánicas\n• Sistema eléctrico\n\n¿Cuál te interesa?',
    options: ['Mantenimiento preventivo', 'Frenos', 'Alineación', 'Diagnóstico', 'Ver precios']
  },
  'cotización': {
    text: 'Con gusto te ayudo con una cotización. ¿Qué servicio necesitas cotizar?',
    options: ['Cambio de aceite', 'Frenos', 'Mantenimiento 10,000 km', 'Otro servicio']
  },
  'cambio de aceite': {
    text: '🛢️ Cambio de Aceite:\n\n• Incluye: Aceite sintético, filtro y revisión de niveles\n• Tiempo estimado: 30-45 minutos\n• Precio desde: $85,000 COP\n\n¿Deseas agendar este servicio?',
    options: ['Sí, agendar', 'Ver otros servicios', 'Preguntar por promociones']
  },
  'revisión de frenos': {
    text: '🔴 Revisión de Frenos:\n\n• Inspección completa del sistema\n• Revisión de pastillas y discos\n• Diagnóstico sin costo\n• Precio reparación desde: $150,000 COP\n\n¿Cuándo puedes traer tu vehículo?',
    options: ['Hoy mismo', 'Mañana', 'Esta semana', 'Elegir fecha']
  },
  'mantenimiento general': {
    text: '⚙️ Mantenimiento General incluye:\n\n✓ Cambio de aceite y filtros\n✓ Revisión de frenos\n✓ Alineación y balanceo\n✓ Revisión de suspensión\n✓ 25 puntos de inspección\n\nPrecio: $280,000 COP\n\n¿Te interesa este paquete?',
    options: ['Sí, agendemos', 'Ver solo mantenimiento básico', 'Consultar mecánico']
  },
  'reparación específica': {
    text: '🔧 Para reparaciones específicas, cuéntame ¿qué problema tiene tu vehículo?',
    options: ['Ruidos extraños', 'Luces en el tablero', 'Problema de motor', 'Hablar con mecánico']
  },
  'ver precios': {
    text: '💰 Lista de Precios:\n\n• Cambio aceite: desde $85,000\n• Revisión frenos: desde $45,000\n• Alineación: $60,000\n• Balanceo: $40,000\n• Mantenimiento 10k: $220,000\n• Diagnóstico: $35,000\n\n*Precios pueden variar según marca/modelo',
    options: ['Agendar servicio', 'Consultar garantía', 'Hablar con asesor']
  },
  'no tengo el número': {
    text: 'No te preocupes. Puedo buscar tu orden con:\n\n• Número de placa del vehículo\n• Tu nombre y teléfono\n• Fecha aproximada del servicio\n\n¿Cómo prefieres buscar?',
    options: ['Por placa', 'Por nombre', 'Llamar al taller']
  },
  'mantenimiento preventivo': {
    text: '✅ Mantenimiento Preventivo:\n\n📋 Incluye 25 puntos de inspección\n🛢️ Cambio de aceite y filtro\n🔍 Revisión de fluidos\n⚙️ Inspección de frenos\n🔧 Ajustes necesarios\n\nPrecio: $220,000 COP\nTiempo: 2-3 horas',
    options: ['Agendar ahora', 'Ver qué incluye', 'Preguntar por garantía']
  },
  'frenos': {
    text: '🔴 Servicios de Frenos:\n\n• Revisión diagnóstico: GRATIS\n• Cambio pastillas: desde $120,000\n• Cambio discos: desde $280,000\n• Paquete completo: desde $380,000\n\n¿Qué servicio necesitas?',
    options: ['Solo revisión', 'Cambio pastillas', 'Paquete completo', 'Agendar']
  },
  'alineación': {
    text: '⚖️ Alineación y Balanceo:\n\n• Alineación computarizada: $60,000\n• Balanceo 4 llantas: $40,000\n• Paquete combo: $90,000\n• Incluye reporte impreso\n\nTiempo estimado: 45 minutos',
    options: ['Agendar combo', 'Solo alineación', 'Solo balanceo', 'Volver']
  },
  'diagnóstico': {
    text: '💻 Diagnóstico Computarizado:\n\n• Scanner automotriz profesional\n• Lectura de códigos de error\n• Reporte detallado\n• Recomendaciones del mecánico\n\nPrecio: $35,000 COP\nTiempo: 30 minutos',
    options: ['Agendar diagnóstico', 'Incluir en otro servicio', 'Consultar mecánico']
  },
  'ruidos extraños': {
    text: '👂 Ruidos en el vehículo pueden indicar varios problemas. ¿De dónde proviene el ruido?',
    options: ['Motor', 'Frenos', 'Suspensión', 'No estoy seguro']
  },
  'luces en el tablero': {
    text: '⚠️ Las luces del tablero requieren atención. ¿Qué luz está encendida?',
    options: ['Check Engine', 'Frenos (ABS)', 'Batería', 'Aceite', 'Otra luz']
  },
  'check engine': {
    text: '🔍 La luz Check Engine requiere diagnóstico inmediato.\n\n⚠️ No ignores esta alerta\n💻 Necesitamos conectar el scanner\n🔧 Puede ser desde algo simple hasta serio\n\nDiagnóstico: $35,000 COP\n\n¿Puedes venir hoy?',
    options: ['Sí, voy hoy', 'Agendar para mañana', 'Es urgente - llamar']
  },
  'hablar con mecánico': {
    text: '👨‍🔧 Te conectaré con nuestro mecánico especializado. Por favor espera un momento...\n\nMientras tanto, ¿puedes compartir:\n• Marca y modelo del vehículo\n• Año\n• Kilometraje actual',
    options: ['Tengo la info', 'Necesito ayuda urgente', 'Cancelar']
  },
  'sí, agendar': {
    text: '📅 ¡Excelente! ¿Qué día te viene mejor?\n\nHorarios disponibles:\n• Lunes a Viernes: 7:00 AM - 6:00 PM\n• Sábados: 8:00 AM - 2:00 PM\n\nTiempo aproximado: Te contactaremos para confirmar',
    options: ['Hoy', 'Mañana', 'Esta semana', 'Próxima semana']
  },
  'hoy': {
    text: '¡Perfecto! Tenemos disponibilidad hoy. ¿A qué hora puedes traer tu vehículo?\n\nHorarios disponibles hoy:\n• 10:00 AM\n• 2:00 PM\n• 4:00 PM',
    options: ['10:00 AM', '2:00 PM', '4:00 PM', 'Otra hora']
  },
  'preguntar por promociones': {
    text: '🎉 Promociones Vigentes:\n\n✅ Mantenimiento 10k: 15% descuento\n✅ Combo Alineación + Balanceo: $90,000 (ahorra $10,000)\n✅ Cliente frecuente: Diagnóstico GRATIS\n✅ Referidos: 10% descuento en siguiente servicio\n\n*Válido hasta fin de mes',
    options: ['Aplicar promoción', 'Ver servicios', 'Agendar con descuento']
  },
  'gracias': {
    text: '¡De nada! En AutoExpert estamos para servirte. 🚗\n\n¿Necesitas algo más?',
    options: ['Sí, otra consulta', 'Agendar cita', 'Información de contacto', 'No, es todo']
  },
  'información de contacto': {
    text: '📞 Contáctanos:\n\n📍 Dirección: Calle 45 #23-67, Bogotá\n☎️ Teléfono: (1) 234-5678\n📱 WhatsApp: 300 123 4567\n✉️ Email: info@autoexpert.com\n\n🕐 Horarios:\nLun-Vie: 7:00 AM - 6:00 PM\nSábados: 8:00 AM - 2:00 PM',
    options: ['Agendar cita', 'Ver servicios', 'Cómo llegar', 'Volver al inicio']
  },
  'default': {
    text: '🔧 Soy el asistente de AutoExpert Taller. ¿En qué puedo ayudarte?',
    options: ['Agendar cita', 'Estado de mi vehículo', 'Servicios disponibles', 'Cotización']
  }
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addMessage = (message) => {
    const time = new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { ...message, time }]);
  };

  const generateBotResponse = (userInput) => {
    let response = botResponses.default;

    for (const [key, value] of Object.entries(botResponses)) {
      if (userInput.includes(key)) {
        response = value;
        break;
      }
    }

    if (userInput.match(/ord-\d+/i)) {
      response = {
        text: `✅ Encontré tu orden ${userInput.toUpperCase()}:\n\n🚗 Vehículo: Toyota Corolla 2020\n🔧 Servicio: Mantenimiento preventivo\n📊 Estado: En proceso\n⏱️ Tiempo estimado: 1 hora más\n👨‍🔧 Mecánico: Carlos Méndez\n\n¿Necesitas algo más?`,
        options: ["Llamar al taller", "Agregar otro servicio", "Información de pago", "Volver al menú"],
      };
    }

    if (userInput.includes("hola") || userInput.includes("buenos") || userInput.includes("buenas")) {
      response = {
        text: "¡Hola! 👋 Bienvenido a AutoExpert Taller. Estoy aquí para ayudarte con tu vehículo. ¿Qué necesitas?",
        options: ["Agendar cita", "Estado de mi vehículo", "Servicios disponibles", "Cotización"],
      };
    }

    if (userInput.match(/[a-z]{3}[-\s]?\d{3}/i)) {
      response = {
        text: `🔍 Buscando información para la placa ${userInput.toUpperCase()}...\n\n✅ Vehículo encontrado:\n🚗 Toyota Corolla 2020\n📅 Último servicio: 15 de octubre, 2025\n⚙️ Próximo mantenimiento: 5,000 km\n\n¿Qué necesitas?`,
        options: ["Agendar mantenimiento", "Ver historial", "Cotizar servicio", "Volver"],
      };
    }

    addMessage({ ...response, sender: "bot" });
  };

  const handleSend = () => {
    addMessage({ text: input, sender: "user" });
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      generateBotResponse(input.toLowerCase());
    }, 1500);
  };

  const handleOptionClick = (option) => {
    addMessage({ text: option, sender: "user" });
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      generateBotResponse(option.toLowerCase());
    }, 1500);
  };

  const toggleChat = () => {
    setOpen(!open);
    if (!open && messages.length === 0) {
      addMessage({
        text: "¡Hola! 👋 Bienvenido a AutoExpert Taller Mecánico. Soy Cars, tu asistente virtual. ¿En qué puedo ayudarte hoy?",
        sender: "bot",
        options: ["Agendar cita", "Estado de mi vehículo", "Servicios disponibles", "Cotización"],
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón flotante */}
      {!open && (
        <button
          onClick={toggleChat}
          className="w-16 h-16 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 animate-bounce hover:animate-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}

      {/* Ventana de chat */}
      {open && (
        <div className="w-[380px] sm:w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] transition-all duration-300">
          {/* Header */}
          <div className="bg-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
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
            <div className="flex gap-2">
              <button onClick={toggleChat} className="text-white hover:bg-white/20 p-2 rounded-lg transition">
                {/* Icono cerrar */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => {
              const isUser = msg.sender === "user";
              return (
                <div key={idx} className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
                  <div className={`flex gap-2 max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? "bg-gradient-to-br from-purple-500 to-pink-500" : "bg-gradient-to-br from-blue-500 to-indigo-500"}`}>
                      {isUser ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className={`rounded-2xl px-4 py-3 ${isUser ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none" : "bg-white text-gray-800 shadow-md rounded-tl-none border border-gray-100"}`}>
                        <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                      </div>
                      <span className={`text-xs text-gray-500 mt-1 block ${isUser ? "text-right" : "text-left"}`}>{msg.time}</span>
                      {msg.options && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {msg.options.map((option, i) => (
                            <button
                              key={i}
                              onClick={() => handleOptionClick(option)}
                              className="option-btn bg-white border-2 border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 shadow-sm hover:shadow"
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-md border border-gray-100">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
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
              <button onClick={handleSend} className="flex justify-center items-center bg-blue-600 text-white p-3 rounded-full w-16 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Presiona Enter para enviar</p>
          </div>
        </div>
      )}


      <style>{`
       /* Animaciones personalizadas */
 @keyframes bounce {

     0%,
     100% {
         transform: translateY(0);
     }

     50% {
         transform: translateY(-10px);
     }
 }

 #open-chat:hover {
     animation: none;
 }

 /* Scrollbar personalizado */
 #messages-container::-webkit-scrollbar {
     width: 6px;
 }

 #messages-container::-webkit-scrollbar-track {
     background: #f1f1f1;
     border-radius: 10px;
 }

 #messages-container::-webkit-scrollbar-thumb {
     background: #cbd5e1;
     border-radius: 10px;
 }

 #messages-container::-webkit-scrollbar-thumb:hover {
     background: #94a3b8;
 }
      `}</style>
    </div>
  );
};

export default Chatbot;