import {
    UserGroupIcon,
    LightBulbIcon,
    HeartIcon,
    UsersIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'



const benefits = [
    {
        titulo: "Mejora la calidad en la atención psicólogica: ",
        descripcion: "EVA facilita el acceso a datos detallados sobre el historial emocional y de comportamiento de los pacientes, lo que permite a los psicólogos ofrecer una atención más precisa, personalizada y fundamentada en hechos.",
    },
    {
        titulo: "Aumento en la eficiencia de las consultas: ",
        descripcion: "EVA reduce el tiempo dedicado a la recopilación de datos y la elaboración de informes, permitiendo a los psicólogos centrarse en el tratamiento y la atención al paciente.",
    },
    {
        titulo: "Mejora de la salud mental de los pacientes: ",
        descripcion: "La aplicación para pacientes ofrece herramientas interactivas y ejercicios que ayudan a mantener el bienestar emocional entre sesiones, lo que fomenta la autoayuda y el autocuidado, mejorando la salud mental de manera continua fuera del entorno terapéutico.",
    },
];


const problems = [
    {
        name: 'Sin seguimiento entre sesiones',
        description:
            'Los psicólogos pueden perder de vista el estado emocional del paciente entre consultas, dejando pasar crisis o retrocesos clave.',
        icon: UserGroupIcon,
    },
    {
        name: 'Progreso difícil de medir',
        description:
            'Sin datos precisos y constantes, evaluar el bienestar emocional real se vuelve casi imposible.',
        icon: LightBulbIcon,
    },
    {
        name: 'Autocuidado fuera de control',
        description:
            'Muchos pacientes descuidan su bienestar fuera del consultorio, afectando seriamente su avance.',
        icon: HeartIcon,
    },
    {
        name: 'Miedo a hablar',
        description:
            'El estigma emocional impide a muchos pacientes abrirse, bloqueando el proceso terapéutico desde la raíz.',
        icon: UsersIcon,
    },
];





// Componente de chatbot
function ChatBot() {
    const [messages, setMessages] = useState([
        { text: "¡Hola! Soy EVA. ¿En qué puedo ayudarte?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");

    const handleSendMessage = () => {
        if (input.trim() === "") return;

        const userMessage = { text: input, sender: "user" };
        const botResponse = { text: "Lo siento, aún estoy en desarrollo. 😊", sender: "bot" };

        setMessages([...messages, userMessage, botResponse]);
        setInput("");
    };

    return (
        <div id='appmovil' className="w-[350px] h-[500px] bg-[#ebf8ff] rounded-3xl shadow-xl flex flex-col">
            {/* Encabezado */}
            <div className="bg-[#0077b6] text-white text-lg font-bold p-3 rounded-t-3xl">
                EVA - Chat de prueba
            </div>

            {/* Chat */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded-lg text-black text-sm max-w-[80%] 
                            ${msg.sender === "user" ? "bg-[#8cc8fa] self-end" : "bg-[#ffffff]"}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-3 bg-[#ffffff] border-t flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-black border rounded-full text-sm outline-none"
                    placeholder="Escribe un mensaje..."
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-2 bg-[#38b000] text-white px-4 py-2 rounded-full cursor-pointer hover:bg-[#0077b6] transition duration-300"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
}


export default function HOME() {

    const location = useLocation(); // Obtener la ruta actual
    // Verificar si la ruta actual tiene un hash
    // y hacer scroll a ese elemento si existe
    useEffect(() => {
        if (location.hash) {
          const element = document.querySelector(location.hash);
          if (element) {
            const centerID = ['#appmovil', '#acerca','#producto'];
            const isCenter = centerID.includes(location.hash);
            element.scrollIntoView({ behavior: 'smooth', block: isCenter ? 'center': 'start' });
          }
        }
      }, [location]);

    const navigate = useNavigate();
    return (
        <div className="font-sans">

            {/* Encabezado */}
            <div className="relative w-screen h-[600px] bg-cover bg-center bg-no-repeat bg-[url('/img/EvanSinLetra.png')] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-[#023d6d] animate__animated animate__fadeIn">EVA: Salud Mental</h1>
                    <p className="text-xl mt-4 text-[#023d6d] opacity-80 animate__animated animate__fadeIn animate__delay-1s">
                        Automatiza informes, mejora el seguimiento de pacientes y optimiza tus consultas
                    </p>
                    <button className="mt-6 bg-[#8DC8FA] text-white px-8 py-4 rounded-full shadow-md transition-all hover:scale-110 transform duration-300 cursor-pointer animate__animated animate__fadeIn animate__delay-2s">
                        Prueba gratis
                    </button>
                </div>
            </div>

            <section id='producto' className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="mt-2 text-4xl text-[#023d6d] sm:text-5xl text-center">
                            Los psciólogos son héroes, pero a veces necesitan un poco de ayuda
                        </h2>
                        <p className="mt-6 text-lg/8 text-gray-600 text-center" >
                            Con Eva, los profesionales de la salud mental pueden centrarse en lo que realmente importa: el bienestar de sus pacientes.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl ">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {problems.map((problem) => (
                                <div key={problem.name} className="relative pl-16">
                                    <dt className="text-base/7 font-bold text-gray-700">
                                        <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-[#8DC8FA]">
                                            <problem.icon aria-hidden="true" className="size-6 text-white" />
                                        </div>
                                        {problem.name}
                                    </dt>
                                    <dd className="mt-2 text-base/7 text-gray-600">{problem.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            <section id="acerca"  className="relative bg-[#EAF7FF] py-10 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#023d6d] leading-tight mb-4">
                            Conoce EVA
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            Una herramienta innovadora diseñada para transformar la salud mental. EVA conecta a profesionales y pacientes a través de plataformas inteligentes y fáciles de usar.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-stretch">
                        <div className="bg-white rounded-3xl p-10 shadow-2xl border-t-4 border-[#8DC8FA] hover:scale-[1.02] transition duration-300 ease-in-out h-full">
                            <h3 className="text-2xl font-semibold text-[#023d6d] mb-4">
                                Plataforma para Psicólogos
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Administra tus pacientes con eficiencia. Obtén informes emocionales automáticos, lleva un historial completo de sesiones y mejora tu práctica con datos en tiempo real.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl p-10 shadow-2xl border-t-4 border-[#8DC8FA] hover:scale-[1.02] transition duration-300 ease-in-out h-full">
                            <h3 className="text-2xl font-semibold text-[#023d6d] mb-4">
                                App EVA Tracking
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Otorga una aplicación para tus pacientes, donde podrán hablar con un chatbot de salud mental, recibir recomendaciones y ejercicios personalizados, y llevar un seguimiento de su bienestar emocional. ¡Todo al alcance de su mano!
                            </p>
                        </div>
                    </div>

                </div>

            </section>

            {/* Sección de Beneficios */}
            <section   className="overflow-hidden bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pt-4 lg:pr-8">
                            <div className="lg:max-w-lg">
                                <h2  id='funcion' className="text-base/7">Mejora tu práctica</h2>
                                <p
                                    style={{ fontStyle: 'normal', fontWeight: 400 }}
                                    className="mt-3 text-4xl tracking-tight text-[#023d6d] sm:text-5xl"
                                >
                                    Beneficios de EVA para Psicólogos
                                </p>
                                <p style={{ fontStyle: 'normal', fontWeight: 400 }} className="mt-6 text-lg/8 text-gray-700">
                                    Obtén informes automáticos, seguimiento de pacientes y herramientas de gestión que te ayudarán a optimizar tu práctica profesional.
                                </p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-black lg:max-w-none">
                                    {benefits.map((benefit) => (
                                        <div key={benefit.titulo} className="relative pl-9">
                                            <dt className="inline font-semibold text-black">
                                                <span className="absolute top-1 left-1 size-5 text-indigo-600"></span>
                                                {benefit.titulo}
                                            </dt>
                                            <dd className="inline ">{benefit.descripcion}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                        <img
                            alt="Psicólogo usando EVA"
                            src="/img/foto_psicologo.jpg"
                            className="w-[30rem] h-[30rem] lg:w-[40rem] lg:h-[55rem] rounded-xl object-contain ml-auto"
                        />
                    </div>
                </div>
            </section>


            {/* Sección de Aplicación para Pacientes con Chatbot */}
            <section className="mt-1 py-5 bg-[#f5f9ff] backdrop-blur-md text-center rounded-3xl mx-4 md:mx-auto max-w-5xl border border-white/50 shadow-xl">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                    {/* ChatBot en lugar de imagen */}
                    <div className="flex justify-center">
                        <ChatBot />
                    </div>
                    <div className="px-6 text-center">
                        <h3 className="text-2xl font-bold text-[#023d6d]">Eva para pacientes</h3>
                        <p className="mt-4 text-gray-700 text-lg">
                            Nuestra aplicación facilita el acceso a herramientas de apoyo emocional y seguimiento personalizado para cada paciente.
                        </p>
                        <button className="mt-6 bg-[#8DC8FA] to-green-400 text-white px-8 py-4 rounded-full shadow-md transition-all hover:scale-110 transform duration-300 cursor-pointer">
                            Descubre más
                        </button>
                    </div>
                </div>
            </section>

            {/* Llamado a la acción */}
            <section className="py-34 text-center max-w-5xl mx-auto flex justify-center items-center">
                <div className="w-full max-w-lg bg-white border-t-4 border-[#8DC8FA]  p-8 rounded-lg shadow-xl transform hover:scale-105 transition-all ease-in-out duration-300">
                    <h3 className="text-2xl font-bold text-[#023d6d]">Comienza tu aventura con EVA</h3>
                    <p className="text-gray-600 mt-4 text-lg">
                        Regístrate y ofrece a tus pacientes un servicio de calidad con la ayuda de la inteligencia artificial.
                    </p>
                    <button
                        className="mt-6 bg-[#8DC8FA] text-white px-8 py-4 rounded-full shadow-md transition-all hover:scale-110 transform duration-300 cursor-pointer"
                        onClick={() => navigate('/register')}
                    >
                        Crear cuenta
                    </button>
                </div>
            </section>
        </div >
    );
}
