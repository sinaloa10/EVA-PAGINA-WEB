import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Importando íconos de Lucide-React para un look más moderno
import {
    BrainCircuit,
    BarChart3,
    HeartHandshake,
    ShieldCheck,
    Clock,
    FileText,
    MessageSquare,
    Moon,
    Sun,
    Star,
    BookHeart, // Icono para Diario Emocional
    Paintbrush, // Icono para Dibujo Terapéutico
    Gamepad2, // Icono para Juegos Antiestrés
    Wind, // Icono para Mindfulness
    ClipboardCheck, // Icono para Tests
    Sparkles // Icono para Futuras Herramientas
} from 'lucide-react';

// --- COMPONENTES AUXILIARES ---

// Componente para animar secciones al hacer scroll
const AnimatedSection = ({ children, className }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

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

// Componente de Chatbot rediseñado
function ChatBotDemo() {
    const [messages, setMessages] = useState([
        { text: "Hola, soy EVA. Estoy aquí para ayudarte a registrar cómo te sientes hoy.", sender: "bot" }
    ]);
    const [input, setInput] = useState("");

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (input.trim() === "") return;

        const userMessage = { text: input, sender: "user" };
        // Respuesta simulada más empática
        const botResponse = { text: "Gracias por compartir eso. Lo he registrado para tu próxima sesión. ¿Hay algo más en lo que pueda ayudarte?", sender: "bot" };

        setMessages([...messages, userMessage, botResponse]);
        setInput("");
    };

    return (
        <div className="w-full max-w-sm h-[550px] bg-white rounded-3xl shadow-2xl flex flex-col border border-gray-200">
            {/* Encabezado del Chatbot */}
            <div className="bg-gradient-to-r from-[#8DC8FA] to-[#6AA5D7] text-white p-4 rounded-t-3xl flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                    <img
                        src="/eva-icon.png"
                        alt="Avatar EVA"
                        className="w-10 h-10 object-cover"
                    />
                </div>
                <div>
                    <h3 className="font-bold text-lg">EVA Asistente</h3>
                    <p className="text-xs opacity-90">Tu compañero de bienestar</p>
                </div>
            </div>

            {/* Mensajes del Chat */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`py-2 px-4 rounded-2xl text-sm max-w-[85%] leading-relaxed shadow-sm ${msg.sender === "user"
                            ? "bg-[#8DC8FA] text-black rounded-br-none"
                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input de Mensaje */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200 rounded-b-3xl">
                <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent px-3 py-2 text-gray-800 placeholder-gray-500 focus:outline-none"
                        placeholder="Escribe cómo te sientes..."
                    />
                    <button
                        type="submit"
                        className="bg-[#8DC8FA] text-black p-2 rounded-full hover:bg-[#6AA5D7] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#8DC8FA] focus:ring-offset-2"
                        aria-label="Enviar mensaje"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </div>
            </form>
        </div>
    );
}

// --- NUEVO COMPONENTE: SECCIÓN DE HERRAMIENTAS DE BIENESTAR ---
const WellnessToolsSection = () => {
    const tools = [
        {
            icon: BookHeart,
            title: "Diario Emocional Inteligente",
            description: "Un espacio privado para que los pacientes expresen y entiendan sus emociones, guiados por la IA.",
        },
        {
            icon: Paintbrush,
            title: "Dibujo Terapéutico",
            description: "Libera la creatividad como forma de expresión no verbal para procesar sentimientos complejos.",
        },
        {
            icon: Gamepad2,
            title: "Juegos Antiestrés",
            description: "Actividades lúdicas diseñadas para reducir la ansiedad y mejorar el enfoque en momentos difíciles.",
        },
        {
            icon: Wind,
            title: "Ejercicios de Mindfulness",
            description: "Audios y guías interactivas para practicar la atención plena y encontrar la calma en el día a día.",
        },
        {
            icon: ClipboardCheck,
            title: "Tests Psicológicos",
            description: "Cuestionarios validados para que el paciente pueda auto-evaluar su progreso y compartirlo contigo.",
        },
        {
            icon: Sparkles,
            title: "Más herramientas en camino",
            description: "Nuestro equipo trabaja constantemente para traer nuevas funcionalidades que enriquezcan el proceso terapéutico.",
            isSpecial: true,
        },
    ];

    return (
        <AnimatedSection className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Herramientas que empoderan el bienestar
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        EVA ofrece un conjunto de recursos interactivos para que tus pacientes continúen su camino de sanación y autoconocimiento entre sesiones.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tools.map((tool) => (
                        <motion.div
                            key={tool.title}
                            className={`p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 ${tool.isSpecial
                                    ? "bg-gradient-to-br from-[#8DC8FA] to-[#0077b6] text-white shadow-2xl"
                                    : "bg-gray-50 shadow-lg border border-gray-200"
                                }`}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${tool.isSpecial ? "bg-white/20" : "bg-[#EBF8FF]"
                                }`}>
                                <tool.icon className={`w-6 h-6 ${tool.isSpecial ? "text-white" : "text-[#0077b6]"
                                    }`} />
                            </div>
                            <h3 className={`text-xl font-semibold mb-2 ${tool.isSpecial ? "text-white" : "text-gray-900"
                                }`}>{tool.title}</h3>
                            <p className={`${tool.isSpecial ? "text-sky-100" : "text-gray-600"
                                }`}>{tool.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};



// --- DATOS MOCK (REEMPLAZAR CON DATOS REALES) ---

const painPoints = [
    {
        icon: Clock,
        title: 'Horas perdidas en tareas administrativas',
        description: 'La transcripción de sesiones y la creación de informes manuales consumen un tiempo valioso que podrías dedicar a tus pacientes.',
    },
    {
        icon: BarChart3,
        title: 'La "brecha invisible" entre sesiones',
        description: 'Sin datos continuos, es difícil tener una visión clara del progreso real y los desafíos emocionales de tus pacientes día a día.',
    },
    {
        icon: HeartHandshake,
        title: 'Dificultad para fomentar el autocuidado',
        description: 'Motivar a los pacientes a aplicar herramientas y seguir rutinas fuera de la consulta es un desafío constante para el éxito terapéutico.',
    },
];

const howItWorksSteps = [
    {
        icon: MessageSquare,
        title: '1. Conversaciones que sanan',
        description: 'Tu paciente interactúa con EVA a través de un chat amigable, registrando sus emociones y pensamientos de forma segura y natural.',
    },
    {
        icon: BrainCircuit,
        title: '2. Análisis con inteligencia',
        description: 'Nuestra IA procesa y estructura la información, identificando patrones, tendencias y momentos clave en el estado emocional del paciente.',
    },
    {
        icon: FileText,
        title: '3. Informes que revelan',
        description: 'Recibes informes visuales y resúmenes automáticos antes de cada sesión, permitiéndote tomar decisiones clínicas basadas en datos precisos.',
    },
];

const testimonials = [
    {
        quote: "EVA me devolvió horas en mi semana. Los informes automáticos son un cambio radical. Ahora llego a cada sesión con una claridad que antes era imposible.",
        name: 'Dra. Sofía Ramirez',
        role: 'Psicóloga Clínica, Especialista en TCC',
        avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=SR',
    },
    {
        quote: "Mis pacientes se sienten más acompañados. La app les da una herramienta para el día a día, y yo puedo ver su progreso real. Ha fortalecido nuestra alianza terapéutica.",
        name: 'Lic. Javier Mendoza',
        role: 'Terapeuta de Pareja y Familia',
        avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=JM',
    },
    {
        quote: "Al principio era escéptico, pero la precisión de los datos que EVA recopila es asombrosa. Me ha ayudado a identificar patrones que antes pasaba por alto. Lo recomiendo 100%.",
        name: 'Dr. Carlos Vega',
        role: 'Psicoanalista',
        avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=CV',
    },
];


// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="bg-white text-gray-800 font-sans transition-colors duration-300 mt-8">
            <main className="pt-20">
                {/* --- HERO SECTION --- */}
                <AnimatedSection className="text-center pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-grid-gray-200/[0.3] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10"></div>
                    <div className="max-w-4xl mx-auto">
                        <motion.h1
                            className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Dedica más tiempo a tus pacientes,
                            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#8DC8FA] to-[#0077b6]">no al papeleo.</span>
                        </motion.h1>
                        <motion.p
                            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            EVA es tu asistente con IA que automatiza informes, visualiza el progreso emocional y fortalece la alianza terapéutica. Transforma tu práctica para siempre.
                        </motion.p>
                        <motion.div
                            className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <button
                                onClick={() => navigate('/register')}
                                className="w-full sm:w-auto bg-[#8DC8FA] text-black font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-[#6AA5D7] transition-all duration-300 transform hover:scale-105"
                            >
                                Solicita acceso anticipado
                            </button>
                            <a href="#demo" className="w-full sm:w-auto text-gray-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                                Ver una demo
                            </a>
                        </motion.div>
                        <motion.p
                            className="mt-6 text-sm text-gray-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <span className="font-semibold text-gray-800">EVA</span> es la plataforma más innovadora de salud mental desarrollada en México.
                        </motion.p>
                    </div>
                </AnimatedSection>

                {/* --- PAIN POINTS SECTION --- */}
                <AnimatedSection className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Deja atrás las limitaciones de la terapia tradicional</h2>
                            <p className="mt-4 text-lg text-gray-600">Sabemos a qué te enfrentas. Por eso creamos EVA.</p>
                        </div>
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {painPoints.map((point, index) => (
                                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#EBF8FF] mb-6">
                                        <point.icon className="h-6 w-6 text-[#0077b6]" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">{point.title}</h3>
                                    <p className="mt-2 text-gray-600">{point.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* --- HOW IT WORKS SECTION --- */}
                <AnimatedSection id="features" className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Transforma datos en bienestar en 3 simples pasos</h2>
                            <p className="mt-4 text-lg text-gray-600">Así es como EVA potencia tu intuición clínica con evidencia.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
                            {howItWorksSteps.map((step, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#EBF8FF] mb-6 border-2 border-[#8DC8FA]">
                                        <step.icon className="h-8 w-8 text-[#0077b6]" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                                    <p className="mt-2 text-gray-600">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* --- DEMO SECTION --- */}
                <AnimatedSection id="demo" className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="lg:pr-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Empodera a tu paciente, potencia tu terapia</h2>
                                <p className="mt-4 text-lg text-gray-600">
                                    Ofrece a tus pacientes una herramienta de seguimiento intuitiva y amigable. EVA les permite registrar su estado de ánimo y pensamientos de forma segura, fomentando el autoconocimiento y proveyéndote de insights valiosos.
                                </p>
                                <ul className="mt-8 space-y-4">
                                    <li className="flex items-start">
                                        <ShieldCheck className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                                        <span><span className="font-semibold">Comunicación segura y encriptada</span> para la total tranquilidad de tus pacientes.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <HeartHandshake className="w-6 h-6 text-rose-500 mr-3 flex-shrink-0 mt-1" />
                                        <span><span className="font-semibold">Fomenta la auto-observación</span> y el compromiso con el proceso terapéutico.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex justify-center">
                                <ChatBotDemo />
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* --- SECCIÓN DE HERRAMIENTAS DE BIENESTAR INTEGRADA AQUÍ --- */}
                <WellnessToolsSection />


                {/* --- TESTIMONIALS SECTION --- */}
                <AnimatedSection id="testimonials" className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Lo que dicen los profesionales que ya confían en EVA</h2>
                            <p className="mt-4 text-lg text-gray-600">Colegas como tú están redefiniendo el futuro de la salud mental.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <figure key={index} className="bg-gray-50 p-8 rounded-2xl shadow-sm flex flex-col justify-between">
                                    <blockquote className="text-gray-700 italic">
                                        <p>“{testimonial.quote}”</p>
                                    </blockquote>
                                    <figcaption className="mt-6">
                                        <div className="flex items-center">
                                            <img className="h-12 w-12 rounded-full" src={testimonial.avatar} alt={`Avatar de ${testimonial.name}`} />
                                            <div className="ml-4">
                                                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                                <div className="text-gray-600 text-sm">{testimonial.role}</div>
                                            </div>
                                        </div>
                                        <div className="flex mt-4 text-yellow-400">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                                        </div>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* --- FINAL CTA --- */}
                <AnimatedSection className="py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="relative bg-gradient-to-br from-sky-100 to-blue-200 p-8 sm:p-12 rounded-3xl shadow-xl overflow-hidden">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">¿Listo para revolucionar tu práctica clínica?</h2>
                            <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
                                Únete a la nueva era de la salud mental. Ofrece una terapia más profunda, eficiente y humana con el poder de EVA.
                            </p>
                            <button
                                onClick={() => navigate('/register')}
                                className="mt-8 bg-[#0077b6] text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:bg-[#023e8a] transition-all duration-300 transform hover:scale-105"
                            >
                                Solicitar acceso anticipado
                            </button>
                            <p className="mt-4 text-sm text-gray-600">
                                Cupos limitados para la beta. Sé parte del cambio en la salud mental.
                            </p>
                        </div>
                    </div>
                </AnimatedSection>
            </main>
        </div>
    );
}
