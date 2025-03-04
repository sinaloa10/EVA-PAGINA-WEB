import React from "react";
import '../Principal/web.css'
import Footer from '../Footer/footer';

const beneficios = [
    { titulo: "Precio", descripcion: "TA BIEN VARA." },
    { titulo: "Funcionalidad", descripcion: "JALA CHIDO." },
    { titulo: "OTRO", descripcion: "PROXIMO." }
];

export default function HOME() {
    return (
        <div >
            {/* Encabezado */}
            <div className="relative w-screen h-[500px] bg-cover bg-center bg-no-repeat bg-[url('/img/EvanSinLetra.png')] text-white flex items-center justify-center">
                <div style={{ fontFamily: "Thinkers, sans-serif" }}>
                    <h1 className="text-6xl font-bold text-[#8ac8fb]">Eva</h1>
                    <p className="text-lg text-[#8ac8fb]">El futuro en ayuda psicológica</p>
                </div>
            </div>


            {/* Beneficios */}
            <section className="py-12 text-center">
                <h2 className="text-2xl font-semibold text-red-400">¿Por qué elegir Eva?</h2>
                <div className="mt-6 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {beneficios.map((beneficio, index) => (
                        <div key={index} className="bg-white shadow-lg p-6 rounded-lg">
                            <h3 className="font-semibold text-lg text-black">{beneficio.titulo}</h3>
                            <p className="text-gray-600 mt-2">{beneficio.descripcion}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Nuevas Secciones */}
            <section className="py-12 bg-gradient-to-r from-blue-300 to-red-200 text-white text-center">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-center">
                    <div>
                        <h3 className="text-xl font-bold text-black">COSAS</h3>
                        <p className="mt-2 font-blod">AQUI VAN COSAS.</p>
                        <button className="mt-4 text-white px-4 py-2 rounded-full">Más detalles</button>
                    </div>
                    <img src="" alt="FOTO" className="rounded-lg shadow-md" />
                </div>
            </section>

            <section className="py-12 text-center max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    <img src="" alt="FOTO" className="rounded-lg shadow-md" />
                    <div className="bg-white p-6 rounded-lg shadow-md text-left">
                        <h3 className="text-xl font-bold text-green-600">COSAS</h3>
                        <p className="text-gray-600 mt-2">AQUI VAN COSASsssssssssssssssssssssssssssssssssssssssssssss.</p>
                        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full">Suscríbete</button>
                    </div>
                </div>
            </section>
        </div>
    );
}