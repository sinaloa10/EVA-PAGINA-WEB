import React, { useState } from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ResponsiveContainer,
    ReferenceLine,
    LabelList
} from 'recharts';
import {
    Activity,
    Brain,
    Search,
    ChevronDown,
    FileText
} from 'lucide-react';

/**
 * Datos simulados para la red clínica.
 * Se utiliza una estructura de coordenadas (x, y) para posicionar los nodos en el gráfico.
 * El nodo central es "Inutilidad".
 */
const networkData = [
    { id: 1, x: 50, y: 50, label: "Inutilidad", type: "core" },    // Nodo Central
    { id: 2, x: 30, y: 80, label: "Madre", type: "peripheral" },
    { id: 3, x: 70, y: 80, label: "Trabajo", type: "peripheral" },
    { id: 4, x: 25, y: 25, label: "Vergüenza", type: "peripheral" },
    { id: 5, x: 75, y: 25, label: "Ansiedad", type: "peripheral" },
];

/**
 * Componente principal de la aplicación.
 * Maneja el estado de la vista (edición vs análisis) y la renderización de la interfaz.
 */
export default function App() {
    const [isAnalyzed, setIsAnalyzed] = useState(false);
    const [notes, setNotes] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // Manejador para el botón de analizar
    const handleAnalyze = () => {
        if (!notes.trim()) return; // Previene análisis vacío

        setIsProcessing(true);
        // Simula un pequeño retraso de procesamiento para dar sensación de "herramienta trabajando"
        setTimeout(() => {
            setIsAnalyzed(true);
            setIsProcessing(false);
        }, 800);
    };

    /**
     * Renderizado personalizado para los puntos del gráfico (Nodos).
     * Diferencia visualmente el nodo central de los periféricos.
     */
    const CustomNode = (props) => {
        const { cx, cy, payload } = props;
        const isCore = payload.type === "core";

        return (
            <g>
                {/* Círculo del nodo */}
                <circle
                    cx={cx}
                    cy={cy}
                    r={isCore ? 25 : 18}
                    fill={isCore ? "#334155" : "#94a3b8"} // Slate-700 vs Slate-400
                    stroke="white"
                    strokeWidth={3}
                    className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                />
                {/* Etiqueta de texto debajo del nodo */}
                <text
                    x={cx}
                    y={cy + (isCore ? 45 : 35)}
                    textAnchor="middle"
                    fill="#475569" // Slate-600
                    className={`text-xs font-medium tracking-wide ${isCore ? 'font-bold' : ''}`}
                    style={{ fontSize: isCore ? '14px' : '12px' }}
                >
                    {payload.label}
                </text>
            </g>
        );
    };

    return (
        <div className="flex flex-col min-h-screen w-full bg-slate-50 font-sans text-slate-800 overflow-hidden selection:bg-slate-200">

            {/* --- BARRA SUPERIOR --- */}
            <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-slate-100 rounded-md">
                        <Brain size={18} className="text-slate-700" />
                    </div>
                    <h1 className="text-sm font-semibold tracking-wide text-slate-700 uppercase">
                        EVA <span className="text-slate-400 mx-2">|</span> Análisis Estructural del Caso
                    </h1>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                        <Activity size={14} />
                        Sistema Listo
                    </span>
                    <div className="h-4 w-px bg-slate-200"></div>
                    <span className="hover:text-slate-800 cursor-pointer">Dr. Admin</span>
                </div>
            </header>

            {/* --- CONTENEDOR PRINCIPAL --- */}
            <main className="flex-1 flex flex-col relative overflow-hidden">

                {/* --- SECCIÓN EDITOR --- */}
                <div
                    className={`
            relative w-full transition-all duration-700 ease-in-out bg-slate-50
            ${isAnalyzed ? 'h-[45%]' : 'h-full'}
          `}
                >
                    <div className="h-[300px] w-full max-w-5xl mx-auto p-8 flex flex-col">
                        <div className="flex items-center gap-2 mb-4 opacity-70">
                            <FileText size={16} className="text-slate-400" />
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Notas de Sesión</span>
                        </div>

                        <textarea
                            className="w-full h-full bg-transparent resize-none outline-none text-lg leading-relaxed text-slate-700 placeholder-slate-300 font-light"
                            placeholder="Escribe aquí tus notas clínicas... Describe los síntomas, narrativa del paciente y observaciones fenomenológicas."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            spellCheck="false"
                        />

                        {/* Botón de Análisis (Solo visible si no se ha analizado) */}
                        {!isAnalyzed && (
                            <div className="flex justify-center bottom-8 right-8">
                                <button
                                    onClick={handleAnalyze}
                                    disabled={isProcessing || !notes.trim()}
                                    className={`
                                        flex items-center gap-3 px-6 py-3 rounded-md shadow-lg transition-all duration-300
                                        ${!notes.trim() ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-800 text-white hover:bg-slate-700 hover:shadow-xl hover:-translate-y-0.5'}
                                    `}
                                >
                                    {isProcessing ? (
                                        <span className="text-sm font-medium tracking-wide">Procesando...</span>
                                    ) : (
                                        <>
                                            <span className="text-sm font-medium tracking-wide">Analizar Caso</span>
                                            <Search size={16} />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- SECCIÓN VISUALIZACIÓN DE RED (Aparece tras análisis) --- */}
                {isAnalyzed && (
                    <div className=" flex justify-center bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] animate-in fade-in slide-in-from-bottom-10 duration-700">
                        <div className="w-[1000px] p-6 flex flex-col h-[500px]">

                            {/* Cabecera de la sección de red */}
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Red Psicopatológica Identificada</h2>
                                </div>
                                <button
                                    onClick={() => setIsAnalyzed(false)}
                                    className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
                                >
                                    Ocultar análisis <ChevronDown size={14} className="rotate-180" />
                                </button>
                            </div>

                            {/* Contenedor del Gráfico (Recharts) */}
                            <div className="flex-1 w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ScatterChart margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
                                        {/* Ejes invisibles necesarios para el posicionamiento */}
                                        <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
                                        <YAxis type="number" dataKey="y" domain={[0, 100]} hide />

                                        {/* Líneas de conexión (Edges) - Renderizadas usando ReferenceLine de la librería */}
                                        {/* Conectamos cada nodo periférico al nodo central (50, 50) */}
                                        {networkData.filter(n => n.type === 'peripheral').map((node) => (
                                            <ReferenceLine
                                                key={`link-${node.id}`}
                                                segment={[
                                                    { x: 50, y: 50 }, // Origen: Nodo central
                                                    { x: node.x, y: node.y } // Destino: Nodo actual
                                                ]}
                                                stroke="#e2e8f0" // Slate-200
                                                strokeWidth={2}
                                            />
                                        ))}

                                        {/* Nodos */}
                                        <Scatter
                                            data={networkData}
                                            shape={<CustomNode />}
                                            isAnimationActive={true}
                                            animationDuration={1500}
                                        />
                                    </ScatterChart>
                                </ResponsiveContainer>

                                {/* Leyenda flotante simple */}
                                <div className="absolute bottom-4 left-4 bg-slate-50/80 backdrop-blur-sm p-3 rounded border border-slate-100 text-xs text-slate-500">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                        <span>Nodo Nuclear</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                                        <span>Nodos Asociados</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}