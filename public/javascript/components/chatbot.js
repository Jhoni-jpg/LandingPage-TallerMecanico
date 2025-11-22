// Estado del chat
let messages = [];
let isTyping = false;

// Respuestas del bot - Taller Mecánico
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

// Elementos DOM
const chatButton = document.getElementById('chatbot-button');
const chatWindow = document.getElementById('chat-window');
const openChatBtn = document.getElementById('open-chat');
const closeChatBtn = document.getElementById('close-chat');
const minimizeChatBtn = document.getElementById('minimize-chat');
const messagesContainer = document.getElementById('messages-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Funciones
function toggleChat() {
    chatButton.classList.toggle('hidden');
    chatWindow.classList.toggle('hidden');
    if (!chatWindow.classList.contains('hidden') && messages.length === 0) {
        addInitialMessage();
    }
}

function addInitialMessage() {
    const initialMessage = {
        text: '¡Hola! 👋 Bienvenido a AutoExpert Taller Mecánico. Soy Cars, tu asistente virtual. ¿En qué puedo ayudarte hoy?',
        sender: 'bot',
        options: ['Agendar cita', 'Estado de mi vehículo', 'Servicios disponibles', 'Cotización']
    };
    addMessage(initialMessage);
}

function addMessage(message) {
    const time = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    messages.push({ ...message, time });
    renderMessages();
}

function renderMessages() {
    messagesContainer.innerHTML = messages.map((msg, index) => {
        const isUser = msg.sender === 'user';
        const avatarIcon = isUser
            ? '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';

        const optionsHtml = msg.options && msg.options.length > 0
            ? `<div class="flex flex-wrap gap-2 mt-3">
            ${msg.options.map(option =>
                `<button 
                class="option-btn bg-white border-2 border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 shadow-sm hover:shadow"
                data-option="${option}"
              >
                ${option}
              </button>`
            ).join('')}
          </div>`
            : '';

        return `
        <div class="flex ${isUser ? 'justify-end' : 'justify-start'} mb-2">
          <div class="flex gap-2 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}">
            <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser
                ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                : 'bg-gradient-to-br from-blue-500 to-indigo-500'
            }">
              ${avatarIcon}
            </div>
            <div>
              <div class="rounded-2xl px-4 py-3 ${isUser
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                : 'bg-white text-gray-800 shadow-md rounded-tl-none border border-gray-100'
            }">
                <p class="text-sm whitespace-pre-line leading-relaxed">${msg.text}</p>
              </div>
              <span class="text-xs text-gray-500 mt-1 block ${isUser ? 'text-right' : 'text-left'}">
                ${msg.time}
              </span>
              ${optionsHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (isTyping) {
        messagesContainer.innerHTML += `
        <div class="flex justify-start mb-2">
          <div class="flex gap-2">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div class="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-md border border-gray-100">
              <div class="flex gap-1">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Reattach event listeners to option buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const option = e.target.getAttribute('data-option');
            handleOptionClick(option);
        });
    });
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    addMessage({ text, sender: 'user' });
    messageInput.value = '';

    isTyping = true;
    renderMessages();

    setTimeout(() => {
        isTyping = false;
        generateBotResponse(text.toLowerCase());
    }, 1500);
}

function handleOptionClick(option) {
    addMessage({ text: option, sender: 'user' });

    isTyping = true;
    renderMessages();

    setTimeout(() => {
        isTyping = false;
        generateBotResponse(option.toLowerCase());
    }, 1500);
}

function generateBotResponse(userInput) {
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
            options: ['Llamar al taller', 'Agregar otro servicio', 'Información de pago', 'Volver al menú']
        };
    }

    if (userInput.includes('hola') || userInput.includes('buenos') || userInput.includes('buenas')) {
        response = {
            text: '¡Hola! 👋 Bienvenido a AutoExpert Taller. Estoy aquí para ayudarte con tu vehículo. ¿Qué necesitas?',
            options: ['Agendar cita', 'Estado de mi vehículo', 'Servicios disponibles', 'Cotización']
        };
    }

    // Reconocer placas de vehículos (formato ABC-123 o ABC123)
    if (userInput.match(/[a-z]{3}[-\s]?\d{3}/i)) {
        response = {
            text: `🔍 Buscando información para la placa ${userInput.toUpperCase()}...\n\n✅ Vehículo encontrado:\n🚗 Toyota Corolla 2020\n📅 Último servicio: 15 de octubre, 2025\n⚙️ Próximo mantenimiento: 5,000 km\n\n¿Qué necesitas?`,
            options: ['Agendar mantenimiento', 'Ver historial', 'Cotizar servicio', 'Volver']
        };
    }

    addMessage({ ...response, sender: 'bot' });
}

// Event Listeners
openChatBtn.addEventListener('click', toggleChat);
closeChatBtn.addEventListener('click', toggleChat);
minimizeChatBtn.addEventListener('click', toggleChat);
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
});