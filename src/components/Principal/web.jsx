import {
    UserGroupIcon,
    LightBulbIcon,
    HeartIcon,
    UsersIcon
} from '@heroicons/react/24/outline';
import { useState } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const benefits = [
    { titulo: "Accesibilidad", descripcion: "Plataforma fácil de usar para gestionar pacientes y seguimiento." },
    { titulo: "Automatización", descripcion: "Nuestro chatbot genera informes personalizados para facilitar el tratamiento." },
    { titulo: "Soporte Profesional", descripcion: "Asesoramiento continuo sobre cómo usar la plataforma de manera efectiva." }
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
        <div className="w-[350px] h-[500px] bg-[#ebf8ff] rounded-3xl shadow-xl flex flex-col">
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
                    className="ml-2 bg-[#38b000] text-white px-4 py-2 rounded-full"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
}


export default function HOME() {
    
    return (
        <div className="font-sans">

            {/* Encabezado */}
            <div className="relative w-screen h-[600px] bg-cover bg-center bg-no-repeat bg-[url('/img/EvanSinLetra.png')] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-[#023d6d] animate__animated animate__fadeIn">EVA: Salud Mental</h1>
                    <p className="text-xl mt-4 text-[#023d6d] opacity-80 animate__animated animate__fadeIn animate__delay-1s">
                        Automatiza informes, mejora el seguimiento de pacientes y optimiza tus consultas
                    </p>
                    <button className="mt-6 bg-gradient-to-r from-blue-400 to-green-400 text-white px-8 py-4 rounded-full shadow-md transition-all hover:scale-110 transform duration-300">
                        Prueba gratis
                    </button>
                </div>
            </div>

            <section className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="mt-2 text-4xl text-[#023d6d] sm:text-5xl">
                            Los psciólogos son héroes, pero a veces necesitan un poco de ayuda
                        </h2>
                        <p className="mt-6 text-lg/8 text-gray-600">
                            Con Eva, los profesionales de la salud mental pueden centrarse en lo que realmente importa: el bienestar de sus pacientes.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl ">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {problems.map((problem) => (
                                <div key={problem.name} className="relative pl-16">
                                    <dt className="text-base/7 font-bold text-gray-700">
                                        <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-[#ffccc8]">
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



            {/* Beneficios */}
            <section className="py-16 text-center bg-gradient-to-b from-white via-blue-50 to-white">
                <h2 className="text-3xl font-semibold text-[#023d6d] mb-6 animate__animated animate__fadeIn">
                    Nuestra solución
                </h2>
                <div className="mt-6 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="bg-white shadow-xl p-8 rounded-lg transform hover:scale-105 transition-all ease-in-out duration-300">
                            <h3 className="font-semibold text-lg text-[#023d6d]">{benefit.titulo}</h3>
                            <p className="text-gray-600 mt-4 text-md">{benefit.descripcion}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Características y valor agregado */}
            <section className="mt-16 py-16 bg-[#f5f9ff] backdrop-blur-md text-center rounded-3xl mx-4 md:mx-auto max-w-5xl border border-white/50 shadow-xl">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                    <div className="px-6 text-center">
                        <h3 className="text-2xl font-bold text-[#023d6d]">Optimiza tu práctica con Eva</h3>
                        <p className="mt-4 text-gray-700 text-lg">
                            Eva te ayuda a mejorar la calidad del servicio a tus pacientes, con informes automáticos y seguimiento personalizado.
                        </p>
                        <button className="mt-6 bg-gradient-to-r from-blue-400 to-green-400 text-white px-8 py-4 rounded-full shadow-md transition-all hover:scale-110 transform duration-300">
                            Más detalles
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <img
                            src="/img/img1.png"
                            alt="Psicólogo usando EVA"
                            className="rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300"
                        />
                    </div>
                </div>
            </section>

            {/* Sección de Aplicación para Pacientes con Chatbot */}
            <section className="mt-16 py-16 bg-[#f5f9ff] backdrop-blur-md text-center rounded-3xl mx-4 md:mx-auto max-w-5xl border border-white/50 shadow-xl">
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
                        <button className="mt-6 bg-gradient-to-r from-blue-400 to-green-400 text-white px-8 py-4 rounded-full shadow-md transition-all hover:scale-110 transform duration-300">
                            Descubre más
                        </button>
                    </div>
                </div>
            </section>

            {/* Llamado a la acción */}
            <section className="py-16 text-center max-w-5xl mx-auto flex justify-center items-center">
                <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl transform hover:scale-105 transition-all ease-in-out duration-300">
                    <h3 className="text-2xl font-bold text-[#023d6d]">Comienza tu aventura con EVA</h3>
                    <p className="text-gray-600 mt-4 text-lg">
                        Regístrate y ofrece a tus pacientes un servicio de calidad con la ayuda de la inteligencia artificial.
                    </p>
                    <button
                        className="mt-6 bg-gradient-to-r from-blue-400 to-green-400 text-white px-8 py-4 rounded-full shadow-md transition-all hover:scale-110 transform duration-300"
                    >
                        Crear cuenta
                    </button>
                </div>
            </section>
        </div >
    );
}
