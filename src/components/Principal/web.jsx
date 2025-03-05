import '../Principal/web.css'

const beneficios = [
    { titulo: "Accesibilidad", descripcion: "Plataforma fácil de usar para gestionar pacientes y seguimiento." },
    { titulo: "Automatización", descripcion: "Nuestro chatbot genera informes personalizados para facilitar el tratamiento." },
    { titulo: "Soporte Profesional", descripcion: "Asesoramiento continuo sobre cómo usar la plataforma de manera efectiva." }
];

export default function HOME() {

    return (
        <>
        <div className="font-sans">
            {/* Encabezado */}
            <div className="relative w-screen h-[600px] bg-cover bg-center bg-no-repeat bg-[url('/img/EvanSinLetra.png')] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-[#023d6d] animate__animated animate__fadeIn">Eva: Salud Mental</h1>
                    <p className="text-xl mt-4 text-[#023d6d] opacity-80 animate__animated animate__fadeIn animate__delay-1s">Transforma tu consulta con la ayuda de nuestra tecnología.</p>
                </div>
            </div>

            {/* Beneficios */}
            <section className="py-16 text-center bg-gradient-to-b from-white via-blue-50 to-white">
                <h2 className="text-3xl font-semibold text-[#023d6d] mb-6 animate__animated animate__fadeIn">¿Por qué elegir Eva para tu consulta?</h2>
                <div className="mt-6 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {beneficios.map((beneficio, index) => (
                        <div key={index} className="bg-white shadow-xl p-8 rounded-lg transform hover:scale-105 transition-all ease-in-out duration-300">
                            <h3 className="font-semibold text-lg text-[#023d6d]">{beneficio.titulo}</h3>
                            <p className="text-gray-600 mt-4 text-md">{beneficio.descripcion}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Características y valor agregado */}
            <section className="py-16 bg-[#f5f9ff] backdrop-blur-md text-center rounded-3xl mx-4 md:mx-auto max-w-5xl border border-white/50 shadow-xl">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                    <div className="px-6">
                        <h3 className="text-2xl font-bold text-[#023d6d]">Optimiza tu práctica con Eva</h3>
                        <p className="mt-4 text-gray-700 text-lg">Eva te ayuda a mejorar la calidad del servicio a tus pacientes, con informes automáticos y seguimiento personalizado.</p>
                        <button className="mt-6 bg-gradient-to-r from-blue-400 to-green-400 text-white px-8 py-4 rounded-full shadow-md transition-all hover:scale-110 transform duration-300">
                            Más detalles
                        </button>
                    </div>
                    <img src="/img/psicologo.jpg" alt="Psicólogo usando EVA" className="rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300" />
                </div>
            </section>

            {/* Llamado a la acción */}
            <section className="py-16 text-center max-w-5xl mx-auto flex justify-center items-center">
                <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl transform hover:scale-105 transition-all ease-in-out duration-300">
                    <h3 className="text-2xl font-bold text-[#023d6d]">Comienza tu aventura con EVA</h3>
                    <p className="text-gray-600 mt-4 text-lg">Regístrate y ofrece a tus pacientes un servicio de calidad con la ayuda de la inteligencia artificial.</p>
                    <button
                        className="mt-6 bg-gradient-to-r from-blue-400 to-green-400 text-white px-8 py-4 rounded-full shadow-md transition-all hover:scale-110 transform duration-300"
                    >
                        Crear cuenta
                    </button>
                </div>
            </section>
        </div>
        </>
    );
}
