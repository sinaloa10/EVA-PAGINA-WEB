import '../Principal/web.css'


const beneficios = [
    { titulo: "Precio", descripcion: "TA BIEN VARA." },
    { titulo: "Funcionalidad", descripcion: "JALA CHIDO." },
    { titulo: "OTRO", descripcion: "PROXIMO." }
];


export default function HOME() {

    return (
        <>
        <div  >
            {/* Encabezado */}
            <div className="relative w-screen h-[600px] bg-cover bg-center bg-no-repeat bg-[url('/img/EvanSinLetra.png')] text-white flex items-center justify-center">
                <div style={{ fontFamily: "Thinkers, sans-serif" }}>
                    <h1 className="text-6xl font-bold text-[#023d6d]">Eva</h1>
                    <p className="text-lg text-[#023d6d]">El futuro en ayuda psicológica</p>
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
            <section className="py-12 bg-white/30 backdrop-blur-md text-center rounded-3xl mx-4 md:mx-auto max-w-5xl border border-white/50 shadow-lg">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-center">
                    <div>
                        <h3 className="text-xl font-bold text-black">COSAS</h3>
                        <p className="mt-2 font-bold text-gray-800">AQUI VAN COSAS.</p>
                        <button className="mt-4 bg-gradient-to-r from-blue-400 to-red-400 text-white px-6 py-3 rounded-full shadow-md transition-all hover:scale-105">
                            Más detalles
                        </button>
                    </div>
                    <img src="" alt="FOTO" className="rounded-3xl shadow-lg" />
                </div>
            </section>

            <section className="py-12 text-center max-w-5xl mx-auto flex justify-center items-center">
                <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-black">Comienza tu aventura con EVA.</h3>
                    <button
                        className="mt-4 bg-gradient-to-r from-blue-400 to-red-400 text-white px-6 py-3 rounded-full shadow-md transition-all hover:scale-105"
                    >
                        Crear cuenta.
                    </button>
                </div>
                
            </section>

            
               
            

                    
        </div>
       
        </>
    );
}