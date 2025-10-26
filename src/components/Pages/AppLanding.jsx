import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    Heart,
    MessageSquare,
    Wind,
    BarChart3,
    BookOpen,
    Gamepad2,
    Paintbrush,
    ClipboardCheck,
    Bell,
    BrainCircuit,
    Smile,
    Lock,
    FileArchive,
    ShieldCheck,
    AlertTriangle,
    CheckCircle,
    ChevronDown,
    Menu,
    X,
    Download,
    Instagram,
    Youtube,
    Send,
    User,
    Users,
    Briefcase,
    Check
} from 'lucide-react';

// --- Colores (para referencia, aplicados directamente con Tailwind) ---
// eva-sky-100: #8DC8FA
// eva-blue:    #0077b6
// eva-deep:    #023e8a
// gray-50:     #f9fafb
// muted:       #6b7280

// --- Componente de Animación de Scroll ---
const AnimatedSection = ({ children, className = "", once = true }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: once });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <motion.section
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
                hidden: { opacity: 0, y: 50 },
            }}
            className={className}
        >
            {children}
        </motion.section>
    );
};


// --- 2. Hero ---
const Hero = () => {
    return (
        <AnimatedSection id="hero" className="pt-32 pb-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Contenido de texto */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                            Tu bienestar emocional, al alcance de tu mano
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-lg">
                            EVA te acompaña cada día con un chatbot empático, ejercicios y herramientas para sentirte mejor paso a paso.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                            <motion.a
                                href="javascript:void(0)"
                                className="w-full sm:w-auto bg-[#8DC8FA] text-black font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-[#6AA5D7] transition-all text-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Descarga la app — Es gratis
                            </motion.a>
                            <motion.a
                                className="w-full sm:w-auto text-gray-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors text-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Ver demo (30s)
                            </motion.a>
                        </div>
                        <p className="mt-6 text-sm text-gray-500">
                            Creada junto a psicólogos. Privacidad y seguridad desde el diseño.
                        </p>
                    </motion.div>

                    {/* Visual / Lottie Placeholder */}
                    <motion.div
                        className="flex justify-center items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                    >
                        <div className="w-full max-w-md aspect-square bg-gray-100 rounded-3xl shadow-xl border border-gray-200 flex flex-col items-center justify-center text-center p-8">
                            <Heart className="w-24 h-24 text-gray-300" />
                            <p className="mt-4 font-semibold text-lg text-gray-500">
                                [Placeholder para Lottie/Video]
                            </p>
                            <p className="text-sm text-gray-400">
                                (Animación de un chatbot interactuando con un usuario en un teléfono)
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Fondo decorativo */}
            <div className="absolute top-0 right-0 -z-10 transform translate-x-1/2 -translate-y-1/4" aria-hidden="true">
                <div className="w-[60rem] h-[60rem] bg-gradient-to-br from-[#8DC8FA]/20 to-transparent rounded-full opacity-50 blur-3xl" />
            </div>
        </AnimatedSection>
    );
};

// --- 3. Valor Inmediato (3 Beneficios) ---
const ThreeBenefits = () => {
    const benefits = [
        {
            icon: MessageSquare,
            title: "Habla cuando lo necesites",
            description: "Chat 24/7 para expresar cómo te sientes en cualquier momento."
        },
        {
            icon: Wind,
            title: "Pequeñas acciones que ayudan",
            description: "Ejercicios diarios, respiración y juegos para calmar la mente."
        },
        {
            icon: BarChart3,
            title: "Sigue tu progreso",
            description: "Registra tu estado de ánimo y revisa tu avance con gráficos sencillos."
        }
    ];

    return (
        <AnimatedSection className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {benefits.map((benefit) => (
                        <div key={benefit.title} className="p-6">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-md border border-gray-100 mx-auto mb-5">
                                <benefit.icon className="h-8 w-8 text-[#0077b6]" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                            <p className="mt-2 text-gray-600">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

// --- 4. Demo Interactiva (Chatbot) ---
const ChatbotDemo = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: "bot", text: "Hola, soy EVA. ¿Quieres contarme cómo te sientes hoy?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // --- INICIO DE LA CORRECCIÓN ---

    // 1. Añade esta línea para rastrear el primer renderizado
    const isInitialRender = useRef(true);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // 2. Modifica este useEffect
    useEffect(() => {
        // Si es el primer renderizado...
        if (isInitialRender.current) {
            isInitialRender.current = false; // ...pon la bandera en 'false'
            return; // ...y no hagas nada más (evita el scroll inicial)
        }

        // En todos los renderizados siguientes, sí se ejecutará el scroll
        scrollToBottom();
    }, [messages]); // La dependencia de [messages] sigue siendo correcta

    // --- FIN DE LA CORRECCIÓN ---


    const handleSendMessage = (e) => {
        e.preventDefault();
        if (input.trim() === "" || isTyping) return;

        const newUserMessage = { id: messages.length + 1, sender: "user", text: input };
        setMessages([...messages, newUserMessage]);
        setInput("");
        setIsTyping(true);

        // Simulación de respuesta del bot
        setTimeout(() => {
            const botResponse = {
                id: messages.length + 2,
                sender: "bot",
                text: "Gracias por compartir. Lo registré para cuando lo pases a tu terapeuta o para revisarlo después."
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <AnimatedSection id="demo" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Contenido de texto */}
                    <div className="lg:pr-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Un espacio seguro para expresarte
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Prueba cómo funciona el chat de EVA. Es un lugar confidencial, sin juicios,
                            diseñado para escucharte y ayudarte a organizar tus pensamientos.
                        </p>
                        <p className="mt-4 text-gray-600">
                            Todo lo que escribes es privado y solo tú decides si quieres compartirlo con tu terapeuta.
                        </p>
                    </div>

                    {/* Demo del Chatbot */}
                    <div className="w-full max-w-lg mx-auto h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col border border-gray-200">
                        {/* Encabezado */}
                        <div className="bg-gradient-to-r from-[#8DC8FA] to-[#6AA5D7] text-black p-4 rounded-t-3xl flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center border-2 border-white">
                                <Heart className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">EVA Asistente</h3>
                                <p className="text-xs opacity-90">Tu compañero de bienestar</p>
                            </div>
                        </div>

                        {/* Mensajes */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className={`py-2.5 px-4 rounded-2xl text-sm max-w-[85%] leading-relaxed shadow-sm ${msg.sender === "user"
                                        ? "bg-[#8DC8FA] text-black rounded-br-none"
                                        : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div
                                    className="flex justify-start"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="py-2.5 px-4 rounded-2xl bg-white text-gray-800 rounded-bl-none border border-gray-200">
                                        <div className="flex space-x-1.5 items-center h-5">
                                            <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
                                            <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                                            <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200 rounded-b-3xl">
                            <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 bg-transparent px-3 py-2.5 text-gray-800 placeholder-gray-500 focus:outline-none"
                                    placeholder="Escribe cómo te sientes..."
                                    aria-label="Escribe tu mensaje para EVA"
                                />
                                <button
                                    type="submit"
                                    className="bg-[#0077b6] text-white p-2.5 rounded-full hover:bg-[#023e8a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8DC8FA] disabled:opacity-50"
                                    aria-label="Enviar mensaje"
                                    disabled={isTyping}
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

// --- 5. ¿Qué puedes hacer con EVA? (6 tarjetas) ---
const ToolCard = ({ icon: Icon, title, description }) => (
    <motion.div
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col cursor-pointer"
        whileHover={{ y: -6, scale: 1.03, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#EBF8FF] mb-4">
            <Icon className="h-6 w-6 text-[#0077b6]" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

const WhatYouCanDo = () => {
    const tools = [
        { icon: BookOpen, title: "Diario emocional", description: "Escribe o graba tus pensamientos. EVA crea resúmenes diarios." },
        { icon: Wind, title: "Ejercicios guiados", description: "Respiración, grounding y meditación guiada en 3 minutos." },
        { icon: Gamepad2, title: "Juegos antiestrés", description: "Mini-juegos para bajar la ansiedad en minutos." },
        { icon: Paintbrush, title: "Dibujo terapéutico", description: "Expresa lo que no encuentras en palabras." },
        { icon: ClipboardCheck, title: "Tests rápidos", description: "Cuestionarios (no diagnósticos) para entenderte mejor." },
        { icon: Bell, title: "Recordatorios", description: "Rutinas personalizadas para mejorar sueño y hábitos." }
    ];

    return (
        <AnimatedSection id="tools" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        ¿Qué puedes hacer con EVA?
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Herramientas prácticas creadas por expertos para tu bienestar diario.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tools.map((tool) => (
                        <ToolCard key={tool.title} icon={tool.icon} title={tool.title} description={tool.description} />
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

// --- 6. Cómo funciona (3 pasos) ---
const HowItWorks = () => {
    const steps = [
        { icon: MessageSquare, title: "Habla con EVA", description: "Cuéntale cómo te sientes, cuando quieras." },
        { icon: BrainCircuit, title: "EVA organiza lo importante", description: "Resúmenes y ejercicios personalizados." },
        { icon: Smile, title: "Sientes la diferencia", description: "Herramientas prácticas para tu día a día." }
    ];

    return (
        <AnimatedSection id="how-it-works" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Tan simple como 1, 2, 3
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center relative">
                    {/* Línea de conexión (desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 -z-10"
                        style={{ top: "40px" }}>
                        <div className="absolute top-0 left-0 h-0.5 bg-[#8DC8FA] w-full" />
                    </div>

                    {steps.map((step, index) => (
                        <div key={step.title} className="flex flex-col items-center z-10">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white mb-6 border-4 border-[#8DC8FA] shadow-lg">
                                <step.icon className="h-10 w-10 text-[#0077b6]" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                            <p className="mt-2 text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

// --- 7. Testimonios ---
const TestimonialCard = ({ quote, name, age, avatar }) => (
    <figure className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col justify-between h-full">
        <blockquote className="text-lg text-gray-700 italic">
            <p>“{quote}”</p>
        </blockquote>
        <figcaption className="mt-6">
            <div className="flex items-center">
                <img className="h-14 w-14 rounded-full bg-gray-200" src={avatar} alt={`Avatar de ${name}`} />
                <div className="ml-4">
                    <div className="font-semibold text-gray-900">{name}, {age}</div>
                </div>
            </div>
        </figcaption>
    </figure>
);

const Testimonials = () => {
    const stories = [
        { quote: "EVA me ayuda a expresar lo que no puedo decir en persona. Ya no me siento tan sola.", name: "Mariana", age: 25, avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=M" },
        { quote: "Con los ejercicios de respiración de 3 minutos he logrado calmar mis ataques de ansiedad en el trabajo. Es un salvavidas.", name: "Luis", age: 32, avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=L" },
        { quote: "Me gusta mucho el diario. Me ayuda a ver mi progreso y cómo cambian mis estados de ánimo durante la semana.", name: "Ana", age: 21, avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=A" }
    ];

    return (
        <AnimatedSection id="testimonials" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Historias reales de personas como tú
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story) => (
                        <TestimonialCard key={story.name} {...story} />
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

// --- 9. Seguridad y Privacidad ---
const SecurityAndPrivacy = () => {
    const points = [
        { icon: Lock, text: "Tus datos están cifrados en tránsito y en reposo (AES-256 / TLS)." },
        { icon: FileArchive, text: "Tus registros son tuyos: puedes exportarlos o eliminarlos cuando quieras." },
        { icon: AlertTriangle, text: "EVA acompaña, no diagnostica. Para emergencias, contacta servicios locales." },
        { icon: ShieldCheck, text: "No usamos tus datos para entrenar modelos sin tu permiso explícito." }
    ];

    return (
        <AnimatedSection className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Privacidad en la que puedes confiar
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Tu confianza es nuestra prioridad número uno.
                    </p>
                </div>
                <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {points.map((point) => (
                        <li key={point.text} className="flex items-start">
                            <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                            <span className="text-gray-700">{point.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </AnimatedSection>
    );
};

// --- 10. ¿Es para ti? (Segmentación) ---
const IsItForYou = () => {
    const segments = [
        { icon: User, title: "Estudiantes", description: "Maneja el estrés de los exámenes y la vida social." },
        { icon: Briefcase, title: "Profesionales", description: "Encuentra balance entre el trabajo, tu vida personal y tu bienestar." },
        { icon: Users, title: "Padres y Madres", description: "Herramientas para encontrar calma y paciencia en la rutina diaria." }
    ];
    return (
        <AnimatedSection className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        ¿Es EVA para ti?
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        EVA está diseñada para cualquiera que busque mejorar su bienestar emocional, sin importar en qué etapa de la vida te encuentres.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {segments.map((segment) => (
                        <div key={segment.title} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#EBF8FF] mx-auto mb-5">
                                <segment.icon className="h-8 w-8 text-[#0077b6]" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">{segment.title}</h3>
                            <p className="mt-2 text-gray-600">{segment.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

// --- 11. Planes y Precio ---
const PlansAndPrice = () => {
    return (
        <AnimatedSection id="plans" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Encuentra el plan perfecto para ti
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Empieza gratis y descubre herramientas poderosas para tu bienestar.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {/* Plan Freemium */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-[#8DC8FA] flex flex-col">
                        <h3 className="text-2xl font-semibold text-gray-900">Freemium</h3>
                        <p className="mt-2 text-gray-600">Lo esencial para empezar tu camino.</p>
                        <div className="mt-6">
                            <span className="text-5xl font-extrabold text-gray-900">$0</span>
                            <span className="text-lg text-gray-600">/siempre</span>
                        </div>
                        <ul className="mt-8 space-y-4 text-gray-700 flex-grow">
                            <li className="flex items-center"><Check className="w-5 h-5 text-green-500 mr-3" />Chat básico con EVA</li>
                            <li className="flex items-center"><Check className="w-5 h-5 text-green-500 mr-3" />Diario emocional</li>
                            <li className="flex items-center"><Check className="w-5 h-5 text-green-500 mr-3" />3 ejercicios de respiración</li>
                            <li className="flex items-center"><Check className="w-5 h-5 text-green-500 mr-3" />1 test de auto-evaluación al mes</li>
                        </ul>
                        <motion.a
                            href="javascript:void(0)"
                            className="mt-10 block w-full text-center bg-[#8DC8FA] text-black font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-[#6AA5D7] transition-all"
                            whileHover={{ scale: 1.05 }}
                        >
                            Empieza gratis
                        </motion.a>
                    </div>

                    {/* Plan Premium */}
                    <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-2xl flex flex-col">
                        <h3 className="text-2xl font-semibold">Premium</h3>
                        <p className="mt-2 text-gray-300">Todas las herramientas para potenciarte.</p>
                        <div className="mt-6">
                            <span className="text-5xl font-extrabold">$X</span>
                            <span className="text-lg text-gray-400">/mes</span>
                        </div>
                        <ul className="mt-8 space-y-4 text-gray-200 flex-grow">
                            <li className="flex items-center"><Check className="w-5 h-5 text-[#8DC8FA] mr-3" />Todo lo de Freemium, y...</li>
                            <li className="flex items-center"><Check className="w-5 h-5 text-[#8DC8FA] mr-3" />Chat ilimitado y avanzado</li>
                            <li className="flex items-center"><Check className="w-5 h-5 text-[#8DC8FA] mr-3" />Diario con análisis de IA</li>
                            <li className="flex items-center"><Check className="w-5 h-5 text-[#8DC8FA] mr-3" />+10 ejercicios y meditaciones</li>
                            <li className="flex items-center"><Check className="w-5 h-5 text-[#8DC8FA] mr-3" />Tests ilimitados</li>
                            <li className="flex items-center"><Check className="w-5 h-5 text-[#8DC8FA] mr-3" />Exportar reportes en PDF</li>
                        </ul>
                        <motion.a
                            href="#download"
                            className="mt-10 block w-full text-center bg-white text-gray-900 font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-gray-200 transition-all"
                            whileHover={{ scale: 1.05 }}
                        >
                            Ver planes (Pronto)
                        </motion.a>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

// --- 12. Lead Magnet ---
const LeadMagnet = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de API (mock)
        console.log("Email submitted:", email);
        setMessage("¡Listo! Revisa tu inbox para descargar la guía.");
        setEmail("");
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <AnimatedSection className="py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-[#8DC8FA] to-[#0077b6] text-white p-8 md:p-12 rounded-3xl shadow-xl grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-extrabold">Descarga gratis</h2>
                        <p className="text-xl font-semibold mt-1">5 ejercicios para calmar la ansiedad en minutos</p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Tu correo electrónico"
                            required
                            aria-label="Tu correo electrónico"
                            className="w-full px-5 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50"
                        />
                        <button
                            type="submit"
                            className="w-full bg-white text-[#0077b6] font-bold px-5 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-all"
                        >
                            Quiero mi guía
                        </button>
                        {message && <p className="text-sm text-center text-white pt-1">{message}</p>}
                    </form>
                </div>
            </div>
        </AnimatedSection>
    );
};

// --- 13. FAQs ---
const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 py-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full text-left"
                aria-expanded={isOpen}
            >
                <span className="text-lg font-semibold text-gray-900">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-6 h-6 text-gray-500" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto", marginTop: "16px" },
                            collapsed: { opacity: 0, height: 0, marginTop: "0px" }
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="text-gray-600 leading-relaxed">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Faq = () => {
    const faqs = [
        {
            question: "¿EVA reemplaza a un psicólogo?",
            answer: "No. EVA es una herramienta de acompañamiento diseñada para usarse entre sesiones o para ayudarte a practicar el autocuidado. No reemplaza la terapia profesional, pero sí puede ser un gran complemento."
        },
        {
            question: "¿Qué pasa con mis datos? ¿Son privados?",
            answer: "Absolutamente. Tu privacidad es nuestra prioridad. Todos tus datos están cifrados. Solo tú controlas tus registros y se almacenan en servidores seguros. Puedes ver, exportar o eliminar tu información cuando quieras."
        },
        {
            question: "¿Es realmente gratuita?",
            answer: "Sí, tenemos una versión gratuita (Freemium) que te da acceso a las herramientas esenciales, como el chat básico y el diario. También ofreceremos una versión Premium con funciones avanzadas, pero siempre podrás usar la versión gratuita."
        },
        {
            question: "¿Qué hago en caso de una crisis?",
            answer: "EVA no es un servicio de emergencias. Si te encuentras en una crisis o sientes que tu vida está en peligro, por favor contacta a los servicios de emergencia locales de inmediato. EVA te puede proporcionar enlaces a líneas de ayuda."
        }
    ];

    return (
        <AnimatedSection className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Preguntas frecuentes
                    </h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {faqs.map((faq) => (
                        <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

// --- 14. Footer ---
const Footer = () => {
    const socialLinks = [
        { name: "Instagram", icon: Instagram, href: "#" },
        {
            name: "TikTok", icon: (props) => (
                <svg {...props} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.17.04-4.36-.6-6.08-2.23-1.95-1.8-2.73-4.3-2.49-6.6.23-2.13 1.34-4.14 3.09-5.38 1.83-1.29 4.14-1.72 6.18-1.23.08 1.54.01 3.08.01 4.63-.69-.01-1.39-.01-2.08-.02-1.03-.01-2.02.38-2.71 1.15-.51.56-.8 1.28-.8 2.04.01 1.02.6 1.98 1.59 2.4.98.41 2.13.24 3.02-.38.87-.6 1.33-1.5 1.35-2.58.02-2.5.01-5 .01-7.5z" />
                </svg>
            ), href: "#"
        },
        { name: "YouTube", icon: Youtube, href: "#" }
    ];

    const footerLinks = [
        { name: "Aviso de Privacidad", href: "#" },
        { name: "Términos y Condiciones", href: "#" },
        { name: "Contacto", href: "#" }
    ];

    return (
        <footer id="download" className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Col 1: Logo y Descarga */}
                    <div>
                        <div className="flex items-center space-x-2">
                            <Heart className="w-8 h-8 text-[#8DC8FA]" />
                            <span className="font-bold text-2xl text-white">EVA Salud Mental</span>
                        </div>
                        <p className="mt-4 text-gray-400">Tu bienestar emocional, al alcance de tu mano.</p>
                        <div className="mt-6 space-y-3">
                            <p className="font-semibold text-white">Descarga la app (Pronto):</p>
                            <div className="flex space-x-3">
                                <a href="javascript:void(0)" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg flex items-center justify-center opacity-70 cursor-not-allowed" aria-label="Descargar en la App Store (Próximamente)">
                                    {/* Placeholder App Store */}
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.3 12.38c-.3.08-.5.31-.5.62 0 .28.18.53.46.61.32.1.66-.1.9-.38.25-.3.4-.64.4-.98 0-.34-.15-.68-.42-.87-.27-.2-.6-.3-.94-.2zM15.4 9.1c-.8-.88-1.78-1.3-3.1-1.32-1.28 0-2.3.4-3.1 1.2-.8.8-1.2 1.8-1.2 2.8 0 .8.2 1.6.6 2.3.4.7 1 1.3 1.7 1.7.7.4 1.5.6 2.4.6 1 0 1.9-.2 2.7-.7.8-.5 1.4-1.2 1.8-2.1.2-.4.3-.8.3-1.2 0-.9-.4-1.8-1.2-2.5zM21 6.88c-.62-.9-1.4-1.6-2.3-2.12-.92-.5-1.93-.76-3.03-.76-1.12 0-2.1.25-3.02.7-1.1.55-2.03 1.34-2.7 2.3-.68.97-1.02 2.1-1.02 3.3 0 1.1.3 2.1.9 3 .6.9 1.37 1.6 2.2 2.1.9.5 1.8.7 2.9.7 1.1 0 2.1-.2 3.1-.7s1.8-1.2 2.5-2c.6-.8.9-1.7 1-2.6.1-1.1-.2-2.2-.7-3.2zM17 19.18a3.3 3.3 0 01-1.4.3c-.6 0-1.1-.1-1.7-.3-.6-.2-1.1-.5-1.5-.9-.4-.4-.7-.9-.9-1.4-.2-.6-.3-1.1-.3-1.7 0-.3.02-.6.08-.9H7.5c-1.3 0-2.4.4-3.4 1.1C3 16.18 2.3 17 1.8 18 .8 19.9 1.1 22 2.8 22c.9 0 1.9-.3 3-.8 1.1-.5 2.1-1.3 2.8-2.3.6-.9 1-1.9.9-3H17v3.3z" /></svg>
                                </a>
                                <a href="javascript:void(0)" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg flex items-center justify-center opacity-70 cursor-not-allowed" aria-label="Descargar en Google Play (Próximamente)">
                                    {/* Placeholder Play Store */}
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.5 12c0-1.07-.3-2.07-.88-2.88l-5.63-5.63C14.1.4 13.07 0 12 0c-.05 0-.1 0-.16.02l7.46 7.46C20.37 8.54 21.5 10.1 21.5 12zM3.6 3.6C2.5 4.7 1.8 6.1 1.6 7.6L12.1 18.1c.4.4.9.6 1.4.6.5 0 1-.2 1.4-.6l2.9-2.9-14.2-14.2zM.5 12c0-1.9 1.1-3.6 2.6-4.5L13.6 18c-.4.4-.9.7-1.5.8L2.6 16.5C1.1 15.6.5 13.9.5 12zM15 16.5l5.6-3.2c1.2-.7 1.2-1.9 0-2.6L15 7.5l-2.9 2.9 2.9 2.9-2.9 2.9 2.9 2.9z" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Col 2: Enlaces */}
                    <div className="lg:col-span-1 lg:justify-self-center">
                        <h4 className="text-lg font-semibold text-white">Enlaces</h4>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    <a href="javascript:void(0)" className="text-gray-400 hover:text-white transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Social */}
                    <div className="lg:col-span-1 lg:justify-self-end">
                        <h4 className="text-lg font-semibold text-white">Síguenos</h4>
                        <div className="flex space-x-4 mt-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-400 hover:text-white transition-colors"
                                    aria-label={`EVA Salud Mental en ${link.name}`}
                                >
                                    <link.icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} EVA Salud Mental. Todos los derechos reservados.</p>
                    <p>Hecho con ❤️ en México.</p>
                </div>
            </div>
        </footer>
    );
};

// --- 15. Modal de Consentimiento de Cookies ---
const ConsentModal = ({ onAccept }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-lg z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consent-title"
        >
            <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-200">
                <h2 id="consent-title" className="text-lg font-semibold text-gray-900">
                    Tu privacidad es importante
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Usamos cookies esenciales y de análisis para mejorar tu experiencia. Al continuar, aceptas nuestro{" "}
                    <a href="#" className="text-[#0077b6] underline">Aviso de Privacidad</a>.
                </p>
                <div className="mt-5 flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                    <button
                        onClick={onAccept}
                        className="w-full sm:w-auto flex-1 bg-[#8DC8FA] text-black font-semibold px-5 py-2.5 rounded-lg hover:bg-[#6AA5D7] transition-all"
                    >
                        Aceptar
                    </button>
                    <button
                        onClick={onAccept} // Simplificado, idealmente abriría config
                        className="w-full sm:w-auto flex-1 bg-gray-100 text-gray-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-200 transition-all"
                    >
                        Configurar
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// --- Componente Principal ---
export default function App() {
    const [showConsentModal, setShowConsentModal] = useState(false);

    useEffect(() => {
        // Simular que es la primera visita
        const consentGiven = localStorage.getItem("eva_consent_given");
        if (!consentGiven) {
            // Retrasar modal para no ser tan intrusivo
            const timer = setTimeout(() => {
                setShowConsentModal(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleConsentAccept = () => {
        localStorage.setItem("eva_consent_given", "true");
        setShowConsentModal(false);
    };

    // Forzar el scroll al inicio al cargar la página
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white font-sans text-gray-800 antialiased">
            {/* Skip Link (Accesibilidad) */}
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-blue-600">
                Saltar al contenido principal
            </a>


            <main id="main-content" className="pt-20">
                <Hero />
                <ThreeBenefits />
                <ChatbotDemo />
                <WhatYouCanDo />
                <HowItWorks />
                <Testimonials />
                <SecurityAndPrivacy />
                <IsItForYou />
                <PlansAndPrice />
                <LeadMagnet />
                <Faq />
            </main>

            <Footer />

            <AnimatePresence>
                {showConsentModal && <ConsentModal onAccept={handleConsentAccept} />}
            </AnimatePresence>
        </div>
    );
}
