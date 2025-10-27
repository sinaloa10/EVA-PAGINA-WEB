import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Importando íconos de Lucide-React
import {
    // Existentes
    BrainCircuit,
    BarChart3,
    HeartHandshake,
    ShieldCheck,
    Clock,
    FileText,
    MessageSquare,
    Star,
    BookHeart,
    Paintbrush,
    Gamepad2,
    Wind,
    ClipboardCheck,
    Sparkles,

    // Nuevos íconos para secciones B2B
    MessageSquareWarning, // Para "Lo que viven los psicólogos"
    MapPin,             // Para Radar EVA
    CalendarPlus,       // Para Radar EVA
    UserCheck,          // Para Radar EVA
    Award,              // Para Beneficios de Negocio
    TrendingUp,         // Para Beneficios de Negocio y Resultados
    DollarSign,         // Para Beneficios de Negocio
    LayoutGrid,         // Para Beneficios de Negocio
    Check,              // Para Planes y Seguridad
    Users,              // Para Planes
    Lock,               // Para Seguridad
    Server,             // Para Seguridad
    DatabaseZap,        // Para Seguridad
    BadgeCheck,         // Para Seguridad
    Video,              // Para Demo Visual
    Smile,              // Para Resultados
    TrendingDown        // Para Resultados
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

// Componente de Card simple (reutilizable para nuevas secciones)
const InfoCard = ({ icon: Icon, title, children, className = "" }) => (
    <div className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-100 ${className}`}>
        {Icon && (
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#EBF8FF] mb-4">
                <Icon className="h-6 w-6 text-[#0077b6]" />
            </div>
        )}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{children}</p>
    </div>
);


// Componente de Chatbot (sin cambios)
function ChatBotDemo() {
    const [messages, setMessages] = useState([
        { text: "Hola, soy EVA. Estoy aquí para ayudarte a registrar cómo te sientes hoy.", sender: "bot" }
    ]);
    const [input, setInput] = useState("");

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (input.trim() === "") return;

        const userMessage = { text: input, sender: "user" };
        const botResponse = { text: "Gracias por compartir eso. Lo he registrado para tu próxima sesión. ¿Hay algo más en lo que pueda ayudarte?", sender: "bot" };

        setMessages([...messages, userMessage, botResponse]);
        setInput("");
    };

    return (
        <div className="w-full max-w-sm h-[550px] bg-white rounded-3xl shadow-2xl flex flex-col border border-gray-200">
            {/* Encabezado del Chatbot */}
            <div className="bg-gradient-to-r from-[#8DC8FA] to-[#6AA5D7] text-white p-4 rounded-t-3xl flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                    {/* Reemplazando img por un ícono SVG para evitar errores 404 */}
                    <BrainCircuit className="w-8 h-8 text-white" />
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

// --- NUEVAS SECCIONES B2B ---

// 1. Sección “Lo que viven los psicólogos hoy”
const ColleaguePainPointsSection = () => (
    <AnimatedSection id="pain-points" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Lo que escuchamos de nuestros colegas</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    La vocación es inmensa, pero los desafíos diarios también lo son.
                    Muchos psicólogos nos han dicho cosas como:
                </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <InfoCard icon={MessageSquareWarning} title="Desconexión entre sesiones">
                    “Siento que mis pacientes se desconectan o pierden el hilo entre una sesión y la siguiente.”
                </InfoCard>
                <InfoCard icon={Clock} title="Repetición y tiempo perdido">
                    “Pierdo tiempo valioso al inicio de cada consulta solo repasando lo que pasó en la semana.”
                </InfoCard>
                <InfoCard icon={BarChart3} title="Progreso difícil de medir">
                    “No tengo una forma clara y objetiva de medir si la terapia realmente está funcionando más allá de la percepción.”
                </InfoCard>
            </div>
        </div>
    </AnimatedSection>
);

// 2. Sección “Radar EVA – Conecta con más pacientes”
const RadarEvaSection = () => (
    <AnimatedSection id="radar-eva" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Conecta con más pacientes desde el Radar EVA</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Forma parte del mapa interactivo de profesionales EVA. Sé visible para miles de pacientes que ya usan la app y buscan apoyo psicológico en su zona.
                    </p>
                    <ul className="mt-8 space-y-4">
                        <li className="flex items-start">
                            <MapPin className="w-6 h-6 text-[#0077b6] mr-3 flex-shrink-0 mt-1" />
                            <span><span className="font-semibold">Aparece en el mapa</span> de psicólogos certificados EVA.</span>
                        </li>
                        <li className="flex items-start">
                            <CalendarPlus className="w-6 h-6 text-[#0077b6] mr-3 flex-shrink-0 mt-1" />
                            <span><span className="font-semibold">Recibe solicitudes directas</span> de pacientes desde la app.</span>
                        </li>
                        <li className="flex items-start">
                            <Star className="w-6 h-6 text-[#0077b6] mr-3 flex-shrink-0 mt-1" />
                            <span><span className="font-semibold">Mejora tu reputación</span> profesional con valoraciones verificadas.</span>
                        </li>
                        <li className="flex items-start">
                            <UserCheck className="w-6 h-6 text-[#0077b6] mr-3 flex-shrink-0 mt-1" />
                            <span><span className="font-semibold">Control total:</span> Tú decides a quién aceptar y cómo te contactan.</span>
                        </li>
                    </ul>
                </div>
                <div className="flex justify-center items-center bg-gray-100 rounded-2xl p-8 aspect-square shadow-lg border border-gray-200">
                    {/* Placeholder visual para el mapa */}
                    <div className="text-center text-gray-500">
                        <MapPin className="w-24 h-24 mx-auto text-gray-400" />
                        <p className="mt-4 font-semibold text-lg">[Mockup Visual: Radar EVA]</p>
                        <p className="mt-2 text-sm">Aquí se mostrará una animación del mapa con pines y tarjetas de psicólogos.</p>
                    </div>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

// 3. “Haz crecer tu consulta con EVA”
const BusinessBenefitsSection = () => (
    <AnimatedSection id="business-benefits" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Haz crecer y optimiza tu consulta</h2>
                <p className="mt-4 text-lg text-gray-600">EVA no solo es una herramienta clínica, es un aliado para tu desarrollo profesional.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <InfoCard icon={TrendingUp} title="Más visibilidad y pacientes">
                    Los pacientes te encontrarán directamente en el Radar EVA, aumentando tu cartera sin esfuerzo.
                </InfoCard>
                <InfoCard icon={HeartHandshake} title="Mayor retención">
                    Tus pacientes permanecen más comprometidos y ven valor tangible entre sesiones, reduciendo el abandono.
                </InfoCard>
                <InfoCard icon={Award} title="Reputación profesional">
                    Destaca como un psicólogo actualizado que utiliza IA para potenciar la terapia.
                </InfoCard>
                <InfoCard icon={LayoutGrid} title="Control y eficiencia">
                    Gestiona sesiones, pacientes e informes desde un solo lugar, ahorrando tiempo valioso.
                </InfoCard>
            </div>
        </div>
    </AnimatedSection>
);

// 4. “Resultados medibles”
const MeasurableResultsSection = () => (
    <AnimatedSection id="results" className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Resultados medibles para tu práctica</h2>
                <p className="mt-4 text-lg text-gray-600">Métricas proyectadas basadas en nuestros estudios piloto con profesionales.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <TrendingDown className="w-12 h-12 mx-auto text-red-500 mb-4" />
                    <span className="block text-4xl font-bold text-[#0077b6]">32%</span>
                    <span className="block mt-2 text-gray-700">Menos tiempo en tareas administrativas y generación de informes.</span>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <TrendingUp className="w-12 h-12 mx-auto text-green-500 mb-4" />
                    <span className="block text-4xl font-bold text-[#0077b6]">2.3x</span>
                    <span className="block mt-2 text-gray-700">Más engagement y retención de pacientes activos después de 3 meses.</span>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <Smile className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
                    <span className="block text-4xl font-bold text-[#0077b6]">+40%</span>
                    <span className="block mt-2 text-gray-700">De incremento en la satisfacción reportada por los pacientes.</span>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

// 5. “Seguridad y ética”
const SecurityEthicsSection = () => (
    <AnimatedSection id="security" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Tu ética y la confidencialidad son nuestra prioridad</h2>
                <p className="mt-4 text-lg text-gray-600">Construido bajo los más altos estándares de seguridad y ética profesional.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <InfoCard icon={Lock} title="Encriptación AES-256">
                    Todos los datos del paciente están encriptados en tránsito y en reposo.
                </InfoCard>
                <InfoCard icon={Server} title="Servidores Seguros">
                    Alojamiento en infraestructura segura en México, cumpliendo con la regulación local.
                </InfoCard>
                <InfoCard icon={DatabaseZap} title="Datos no usados para IA">
                    Los datos de tus pacientes NUNCA se usan para entrenar modelos de IA públicos.
                </InfoCard>
                <InfoCard icon={BadgeCheck} title="Cumplimiento Normativo">
                    Alineados con estándares de la APA y la NOM-035-STPS.
                </InfoCard>
            </div>
        </div>
    </AnimatedSection>
);

// 6. “Planes y cómo empezar”
const PlansSection = ({ onCtaClick }) => (
    <AnimatedSection id="plans" className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Comienza a transformar tu consulta hoy</h2>
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-gray-200">
                <span className="inline-block bg-[#EBF8FF] text-[#0077b6] text-sm font-semibold px-4 py-1 rounded-full mb-4">
                    ACCESO ANTICIPADO
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Beta Gratuita para Pioneros</h3>
                <p className="text-lg text-gray-600 mb-6">
                    Estamos invitando a un grupo selecto de 50 psicólogos para probar la plataforma sin costo y ayudarnos a definir el futuro de la terapia digital.
                </p>
                <ul className="text-left space-y-3 mb-8 max-w-md mx-auto">
                    <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        Acceso completo a informes automáticos.
                    </li>
                    <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        Inclusión prioritaria en el Radar EVA.
                    </li>
                    <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        Soporte personalizado 1 a 1 durante la prueba.
                    </li>
                </ul>
                <button
                    onClick={onCtaClick}
                    className="w-full sm:w-auto bg-[#8DC8FA] text-black font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-[#6AA5D7] transition-all duration-300 transform hover:scale-105"
                >
                    Solicitar acceso anticipado
                </button>
            </div>
        </div>
    </AnimatedSection>
);

// 7. “Testimonios orientados al crecimiento profesional”
const NewTestimonialsSection = () => {
    const newTestimonials = [
        {
            quote: "Gracias al Radar EVA recibo al menos 2 nuevos contactos de pacientes por semana, sin gastar un peso en publicidad. Ha sido un impulso increíble para mi consulta privada.",
            name: 'Mtra. Alejandra Torres',
            role: 'Psicóloga Humanista',
            avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=AT',
        },
        {
            quote: "Antes me tomaba horas hacer informes detallados. Con los reportes automáticos de EVA, lo tengo listo en minutos y puedo enfocarme 100% en la sesión con mis pacientes.",
            name: 'Lic. Roberto Hernández',
            role: 'Psicólogo Cognitivo Conductual',
            avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=RH',
        },
        {
            quote: "Mis pacientes adolescentes, que suelen ser reacios a hablar, aman la app. Les da un canal para expresarse y a mí me da data que de otra forma no obtendría.",
            name: 'Dra. Isabel Garza',
            role: 'Especialista en Terapia de Adolescentes',
            avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=IG',
        },
    ];

    return (
        <AnimatedSection id="testimonials" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Lo que dicen nuestros colegas pioneros</h2>
                    <p className="mt-4 text-lg text-gray-600">Profesionales que ya están viendo el impacto de EVA en su práctica.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newTestimonials.map((testimonial, index) => (
                        <figure key={index} className="bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-between border border-gray-100">
                            <blockquote className="text-gray-700 italic text-lg">
                                <p>“{testimonial.quote}”</p>
                            </blockquote>
                            <figcaption className="mt-6">
                                <div className="flex items-center">
                                    <img className="h-12 w-12 rounded-full bg-gray-200" src={testimonial.avatar} alt={`Avatar de ${testimonial.name}`} />
                                    <div className="ml-4">
                                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                        <div className="text-gray-600 text-sm">{testimonial.role}</div>
                                    </div>
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

// 8. Video o demo visual
const VideoDemoSection = () => (
    <AnimatedSection id="video-demo" className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Míralo en acción en 30 segundos</h2>
                <p className="mt-4 text-lg text-gray-600">Descubre cómo fluye la información desde el paciente hasta tu panel de control.</p>
            </div>
            <div className="aspect-video bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-200 flex items-center justify-center">
                {/* Placeholder para el video */}
                <div className="text-center text-gray-400">
                    <Video className="w-20 h-20 mx-auto" />
                    <p className="mt-4 font-semibold text-lg">[Demo Visual del Ecosistema EVA]</p>
                    <p className="text-sm">(Paciente en app → IA procesa → Psicólogo en dashboard)</p>
                </div>
            </div>
        </div>
    </AnimatedSection>
);


// --- SECCIONES EXISTENTES (MANTENIDAS) ---

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

const WellnessToolsSection = () => {
    const tools = [
        { icon: BookHeart, title: "Diario Emocional Inteligente", description: "Un espacio privado para que los pacientes expresen y entiendan sus emociones, guiados por la IA." },
        { icon: Paintbrush, title: "Dibujo Terapéutico", description: "Libera la creatividad como forma de expresión no verbal para procesar sentimientos complejos." },
        { icon: Gamepad2, title: "Juegos Antiestrés", description: "Actividades lúdicas diseñadas para reducir la ansiedad y mejorar el enfoque en momentos difíciles." },
        { icon: Wind, title: "Ejercicios de Mindfulness", description: "Audios y guías interactivas para practicar la atención plena y encontrar la calma." },
        { icon: ClipboardCheck, title: "Tests Psicológicos", description: "Cuestionarios validados para que el paciente pueda auto-evaluar su progreso y compartirlo contigo." },
        { icon: Sparkles, title: "Más herramientas en camino", description: "Nuevas funcionalidades para enriquecer el proceso terapéutico.", isSpecial: true },
    ];

    return (
        <AnimatedSection className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Herramientas que empoderan a tu paciente
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        EVA ofrece un conjunto de recursos para que tus pacientes continúen su autoconocimiento entre sesiones.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tools.map((tool) => (
                        <motion.div
                            key={tool.title}
                            className={`p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 ${tool.isSpecial
                                ? "bg-gradient-to-br from-[#8DC8FA] to-[#0077b6] text-white shadow-2xl"
                                : "bg-white shadow-lg border border-gray-200"
                                }`}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${tool.isSpecial ? "bg-white/20" : "bg-[#EBF8FF]"}`}>
                                <tool.icon className={`w-6 h-6 ${tool.isSpecial ? "text-white" : "text-[#0077b6]"}`} />
                            </div>
                            <h3 className={`text-xl font-semibold mb-2 ${tool.isSpecial ? "text-white" : "text-gray-900"}`}>{tool.title}</h3>
                            <p className={`${tool.isSpecial ? "text-sky-100" : "text-gray-600"}`}>{tool.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};


// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---

export default function HomePage() {
    const navigate = useNavigate();
    const handleCtaClick = () => window.location.href = "mailto:contacto@evasalud.com.mx?subject=Acceso%20anticipado&body=Hola,%20quiero%20acceso%20anticipado%20a%20EVA.";

    return (
        <div className="bg-white text-gray-800 font-sans transition-colors duration-300 mt-8">
            <main className="pt-20">
                
                {/* --- 1. HERO SECTION (Mantenido) --- */}
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
                            EVA es tu asistente con IA que automatiza informes, visualiza el progreso emocional y te ayuda a conectar con nuevos pacientes. Transforma tu práctica.
                        </motion.p>
                        <motion.div
                            className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <button
                                onClick={handleCtaClick}
                                className="w-full sm:w-auto bg-[#8DC8FA] text-black font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-[#6AA5D7] transition-all duration-300 transform hover:scale-105"
                            >
                                Solicitar acceso anticipado
                            </button>
                            <a href="#video-demo" className="w-full sm:w-auto text-gray-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                                Ver demo de 30s
                            </a>
                        </motion.div>
                        <motion.p
                            className="mt-6 text-sm text-gray-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <span className="font-semibold text-gray-800">EVA</span>: La plataforma de salud mental con IA, orgullosamente desarrollada en México.
                        </motion.p>
                    </div>
                </AnimatedSection>

                {/* --- 2. "Lo que viven los psicólogos hoy" (NUEVA) --- */}
                <ColleaguePainPointsSection />

                {/* --- 3. "Cómo EVA transforma esa frustración" (Reutilizada) --- */}
                <AnimatedSection id="features" className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Cómo EVA transforma esa frustración en eficiencia</h2>
                            <p className="mt-4 text-lg text-gray-600">Potenciamos tu intuición clínica con evidencia en 3 simples pasos.</p>
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
                
                {/* --- 4. Video Demo (NUEVA) --- */}
                <VideoDemoSection />

                {/* --- 5. Radar EVA (NUEVA) --- */}
                <RadarEvaSection />

                {/* --- 6. Beneficios de negocio (NUEVA) --- */}
                <BusinessBenefitsSection />

                {/* --- 7. Resultados medibles (NUEVA) --- */}
                <MeasurableResultsSection />

                {/* --- DEMO APP PACIENTE (Mantenida) --- */}
                <AnimatedSection id="demo-paciente" className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="lg:pr-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">La experiencia de tu paciente</h2>
                                <p className="mt-4 text-lg text-gray-600">
                                    Ofrece a tus pacientes una herramienta intuitiva. EVA les permite registrar su estado de ánimo y pensamientos de forma segura, fomentando el autoconocimiento y proveyéndote de insights valiosos.
                                </p>
                                <ul className="mt-8 space-y-4">
                                    <li className="flex items-start">
                                        <ShieldCheck className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                                        <span><span className="font-semibold">Comunicación segura y encriptada</span> para la total tranquilidad.</span>
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

                {/* --- HERRAMIENTAS DE BIENESTAR (Mantenida) --- */}
                <WellnessToolsSection />

                {/* --- 8. Seguridad y ética (NUEVA) --- */}
                <SecurityEthicsSection />

                {/* --- 9. Planes y cómo empezar (NUEVA) --- */}
                <PlansSection onCtaClick={handleCtaClick} />

                {/* --- 10. Testimonios profesionales (NUEVA/Reemplazada) --- */}
                <NewTestimonialsSection />

                {/* --- 11. FINAL CTA (Mantenido y ajustado) --- */}
                <AnimatedSection className="py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="relative bg-gradient-to-br from-sky-100 to-blue-200 p-8 sm:p-12 rounded-3xl shadow-xl overflow-hidden">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Únete a la red de psicólogos EVA</h2>
                            <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
                                Sé parte de la nueva era de la salud mental. Ofrece una terapia más profunda, eficiente y humana con el poder de la IA.
                            </p>
                            <button
                                onClick={handleCtaClick}
                                className="mt-8 bg-[#0077b6] text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:bg-[#023e8a] transition-all duration-300 transform hover:scale-105"
                            >
                                Solicitar acceso anticipado a la Beta
                            </button>
                            <p className="mt-4 text-sm text-gray-600">
                                Cupos limitados para la beta gratuita. Sé pionero en el cambio.
                            </p>
                        </div>
                    </div>
                </AnimatedSection>
            </main>
        </div>
    );
}

