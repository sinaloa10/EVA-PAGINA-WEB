import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Componente para animar secciones al hacer scroll (reutilizado)
const AnimatedSection = ({ children, className }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

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

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-white text-gray-800 font-sans transition-colors duration-300 pt-20">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <AnimatedSection>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 text-center mb-8">
                        Aviso de Privacidad para Pacientes – Versión Beta
                    </h1>
                    <p className="text-center text-sm text-gray-500 mb-12">
                        Plataforma EVA – Salud Mental Digital
                        <br />
                        Última actualización: 4 de julio de 2025
                        <br />
                        Versión: v0.9-beta
                    </p>

                    <div className="space-y-10 text-lg leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. DATOS PERSONALES QUE SE RECABAN</h2>
                            <p className="text-gray-700">Durante el uso de la aplicación EVA, se podrán recopilar los siguientes datos:</p>
                            <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">a) Datos de identificación:</h3>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Nombre completo</li>
                                <li>Edad</li>
                                <li>Sexo</li>
                                <li>Correo electrónico</li>
                                <li>Número telefónico</li>
                                <li>Ubicación aproximada (ciudad, estado o país)</li>
                            </ul>
                            <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">b) Datos sensibles (emocionales o clínicos):</h3>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Estados de ánimo registrados en el diario emocional</li>
                                <li>Respuestas a preguntas del chatbot</li>
                                <li>Resultados de test psicológicos</li>
                                <li>Audios, dibujos, notas y entradas en la app</li>
                                <li>Información proporcionada en actividades de seguimiento emocional</li>
                                <li>Todo lo que compartes con la aplicación de EVA se utiliza únicamente para mejorar tu experiencia, ofrecerte orientación personalizada y ayudar a tu especialista a darte un mejor seguimiento. Nunca usamos tus conversaciones con fines de publicidad ni las compartimos con terceros. Parte de la información puede analizarse de forma anónima para mejorar el funcionamiento de la aplicación y sus herramientas de bienestar.</li>
                            
                            </ul>
                            <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">c) Datos técnicos y de uso:</h3>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Tipo de dispositivo y sistema operativo</li>
                                <li>IP pública</li>
                                <li>Navegador o versión de app</li>
                                <li>Fecha y hora de uso</li>
                                <li>Interacción general con las funcionalidades</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. FINALIDADES DEL TRATAMIENTO DE LOS DATOS</h2>
                            <p className="text-gray-700">Los datos personales recabados tienen las siguientes finalidades primarias:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Crear y mantener su cuenta de usuario</li>
                                <li>Brindar acceso a herramientas de salud mental y acompañamiento emocional</li>
                                <li>Generar reportes automáticos útiles para su proceso terapéutico</li>
                                <li>Facilitar la vinculación con psicólogos profesionales validados</li>
                                <li>Personalizar su experiencia dentro de la app</li>
                                <li>Proteger la seguridad del sistema y prevenir abusos</li>
                                </ul>
                            <p className="text-gray-700 mt-4">Y las siguientes finalidades secundarias (opcionales):</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Realizar análisis estadísticos y de mejora del sistema</li>
                                <li>Evaluar la usabilidad de las herramientas</li>
                                <li>Contactarle para invitaciones a estudios piloto o encuestas de mejora</li>
                            </ul>
                            <p className="mt-2 text-gray-700">Usted puede oponerse al uso secundario de sus datos enviando un correo a: <a href="mailto:avisoprivacidad@evasalud.com.mx" className="text-[#0077b6] hover:underline">avisoprivacidad@evasalud.com.mx</a>.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. CONSENTIMIENTO EXPRESO Y REVOCACIÓN</h2>
                            <p className="text-gray-700">
                                Al registrarse, usted otorga consentimiento expreso e informado para el tratamiento de sus datos, incluyendo los sensibles.
                            </p>
                            <p className="mt-2 text-gray-700">
                                Podrá revocar este consentimiento en cualquier momento mediante solicitud escrita al correo anteriormente mencionado. La revocación no tendrá efectos retroactivos.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. TRANSFERENCIA DE DATOS</h2>
                            <p className="text-gray-700">EVA no vende ni renta sus datos personales.</p>
                            <p className="mt-2 text-gray-700">Sólo se transfieren sus datos en los siguientes casos:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>A su psicólogo vinculado, previa autorización de su parte</li>
                                <li>A proveedores de servicios tecnológicos (ej. AWS) que operan como encargados del tratamiento y se comprometen contractualmente a cumplir con estándares de seguridad</li>
                                <li>A autoridades competentes, en caso de requerimiento legal</li>
                            </ul>
                            <p className="mt-2 text-gray-700">En todos los casos se procurará que el tratamiento sea bajo estándares de confidencialidad, proporcionalidad y minimización de riesgos.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. DERECHOS ARCO (ACCESO, RECTIFICACIÓN, CANCELACIÓN Y OPOSICIÓN)</h2>
                            <p className="text-gray-700">Usted tiene derecho a:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Conocer qué datos tenemos de usted y cómo los usamos (Acceso)</li>
                                <li>Solicitar corrección de datos inexactos (Rectificación)</li>
                                <li>Solicitar su eliminación (Cancelación)</li>
                                <li>Oponerse a que se usen para fines no esenciales (Oposición)</li>
                            </ul>
                            <p className="mt-2 text-gray-700">Para ejercer estos derechos, deberá enviar un correo a <a href="mailto:avisoprivacidad@evasalud.com.mx" className="text-[#0077b6] hover:underline">avisoprivacidad@evasalud.com.mx</a> con:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Nombre completo</li>
                                <li>Correo registrado en la app</li>
                                <li>Identificación oficial adjunta</li>
                                <li>Descripción clara de la solicitud</li>
                            </ul>
                            <p className="mt-2 text-gray-700">Le responderemos en un plazo máximo de 20 días hábiles.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. MEDIDAS DE SEGURIDAD</h2>
                            <p className="text-gray-700">
                                Sus datos son almacenados en servidores seguros, cifrados, con protocolos de acceso restringido y monitoreo continuo. EVA realiza revisiones periódicas de su infraestructura y políticas para proteger su información contra pérdida, robo, acceso no autorizado o modificación.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. LIMITACIÓN DE RESPONSABILIDAD</h2>
                            <p className="text-gray-700">
                                La aplicación se encuentra en fase beta. EVA no garantiza disponibilidad continua ni libre de errores. Usted reconoce y acepta que el uso de la aplicación es voluntario y bajo su propia responsabilidad.
                            </p>
                            <p className="mt-2 text-gray-700">
                                En situaciones de riesgo emocional, ideas de suicidio, autolesión o cualquier emergencia, el usuario debe contactar de inmediato a profesionales capacitados o líneas de ayuda.
                            </p>
                            <p className="mt-2 text-gray-700">
                                El uso de herramientas de expresión, mindfulness o juegos es bajo la responsabilidad del usuario, y EVA no garantiza resultados terapéuticos.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. CAMBIOS AL AVISO DE PRIVACIDAD</h2>
                            <p className="text-gray-700">
                                Este aviso puede ser modificado en cualquier momento. Las modificaciones se notificarán por correo electrónico o mediante la aplicación. El uso continuo de la plataforma tras una modificación implica su aceptación.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. AUTORIDAD COMPETENTE</h2>
                            <p className="text-gray-700">
                                Si considera que su derecho de protección de datos ha sido vulnerado, puede acudir al Secretaria Anticorrupción y buen gobierno (SABG) en México.
                            </p>
                        </section>
                    </div>
                </AnimatedSection>
            </main>
        </div>
    );
}