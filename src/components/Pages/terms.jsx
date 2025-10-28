import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Componente para animar secciones al hacer scroll (reutilizado)
const AnimatedSection = ({ children, className }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true }); // Ajustado threshold ligeramente

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

export default function TermsAndConditionsPage() {
    return (
        <div className="bg-white text-gray-900 font-sans transition-colors duration-300 pt-20 dark:bg-white dark:text-gray-900">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <AnimatedSection>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 text-center mb-8">
                        Términos y Condiciones de Uso – Versión Beta
                    </h1>
                    <p className="text-center text-sm text-gray-600 mb-12">
                        Última actualización: [26 de octubre de 2025]
                        <br />
                        Versión del documento: v0.1-beta
                    </p>

                    <div className="space-y-10 text-base leading-relaxed text-gray-800">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. ACEPTACIÓN DE LOS TÉRMINOS</h2>
                            <p className="text-gray-700">
                                Al acceder y utilizar la plataforma digital EVA (en adelante, "la Plataforma"), el usuario acepta de forma expresa, informada y voluntaria los presentes Términos y Condiciones de Uso.
                            </p>
                            <p className="mt-2 text-gray-700">
                                Si no está de acuerdo con alguno de los términos aquí establecidos, deberá abstenerse de usar la Plataforma.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. VERSIÓN BETA – USO PROVISIONAL</h2>
                            <p className="text-gray-700">EVA se encuentra en fase beta, lo que implica que:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Su contenido y funcionalidades pueden contener errores, fallas técnicas o comportamientos inestables.</li>
                                <li>Las funcionalidades pueden ser modificadas, limitadas o suspendidas sin previo aviso.</li>
                                <li>El acceso y uso de la app es gratuito durante esta etapa.</li>
                                <li>Estos términos son provisionales y se actualizarán en el lanzamiento oficial.</li>
                                <li>El uso de la versión beta implica el reconocimiento de los riesgos inherentes a una etapa de desarrollo.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. OBJETIVO DE EVA</h2>
                            <p className="text-gray-700">
                                EVA es una plataforma de acompañamiento emocional y salud mental digital. Ofrece herramientas tecnológicas como:
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Chat automatizado con inteligencia artificial</li>
                                <li>Registro emocional</li>
                                <li>Recursos expresivos</li>
                                <li>Reportes automáticos para profesionales vinculados</li>
                            </ul>
                            <p className="mt-2 text-gray-700">
                                EVA no reemplaza terapia psicológica presencial ni consultas clínicas. Es una herramienta complementaria, no sustitutiva. En ningún caso debe considerarse equivalente a una consulta médica o psicológica profesional.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. REGISTRO Y ACCESO</h2>
                            <p className="text-gray-700">Para utilizar la Plataforma, el usuario debe:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Ser mayor de 16 años</li>
                                <li>Proporcionar correo electrónico válido y número telefónico</li>
                                <li>Aceptar de forma explícita los presentes Términos y el Aviso de Privacidad</li>
                                <li>En el caso de profesionales de la psicología: acreditar su identidad profesional y cédula ante el equipo EVA</li>
                            </ul>
                            <p className="mt-2 text-gray-700">El registro de menores de edad no está permitido.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. FUNCIONES DISPONIBLES EN VERSIÓN BETA</h2>
                            <p className="text-gray-700">Durante esta fase, EVA puede incluir:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Chat con inteligencia artificial para orientación emocional inicial</li>
                                <li>Diario emocional y registro de pensamientos</li>
                                <li>Dibujo libre como herramienta terapéutica</li>
                                <li>Ejercicios de respiración y relajación</li>
                                <li>Test psicológicos interactivos</li>
                                <li>Reportes automáticos para psicólogos validados</li>
                                <li>Conexión con psicólogos previamente validados</li>
                                <li>Frases motivacionales diarias</li>
                                <li>Sistema de logros gamificados</li>
                            </ul>
                            <p className="mt-2 text-gray-700">EVA se reserva el derecho de modificar estas funciones sin previo aviso.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. DATOS PERSONALES Y TRATAMIENTO</h2>
                            <p className="text-gray-700">La Plataforma recopila y trata los siguientes tipos de datos:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Identificación: nombre, edad, sexo, correo electrónico, ubicación aproximada</li>
                                <li>Datos sensibles: respuestas a test, interacción con el chatbot, registros emocionales, dibujos, audios</li>
                                <li>Datos técnicos: tipo de dispositivo, sistema operativo, fecha/hora de uso</li>
                            </ul>
                            <p className="mt-2 text-gray-700">Dichos datos:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Se almacenan en servidores seguros (por ejemplo, AWS)</li>
                                <li>Son cifrados y tratados conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</li>
                                <li>Solo son accesibles por:
                                    <ul className="list-circle list-inside ml-5">
                                        <li>El usuario</li>
                                        <li>Psicólogos vinculados, previa autorización</li>
                                        <li>El equipo EVA, únicamente en forma anonimizada o con fines técnicos y estadísticos</li>
                                    </ul>
                                </li>
                            </ul>
                            <p className="mt-2 text-gray-700">Consulta el Aviso de Privacidad completo en: <a href="#" className="text-[#0077b6] hover:underline">[● enlace oficial ●]</a></p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. DERECHO A CANCELAR SUS DATOS</h2>
                            <p className="text-gray-700">El usuario podrá solicitar en cualquier momento:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Acceso, rectificación, cancelación o oposición al uso de sus datos (Derechos ARCO)</li>
                                <li>Eliminación total o parcial de su información, conforme a lo dispuesto en la LFPDPPP</li>
                            </ul>
                            <p className="mt-2 text-gray-700">Para ejercer estos derechos, deberá enviar una solicitud a <a href="mailto:[●correo●]" className="text-[#0077b6] hover:underline">[●correo●]</a>, indicando:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Nombre completo</li>
                                <li>Correo registrado</li>
                                <li>Motivo de la solicitud</li>
                            </ul>
                            <p className="mt-2 text-gray-700">El equipo de EVA responderá en un plazo máximo de 20 días hábiles.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. USO EN CASOS DE CRISIS O EMERGENCIA</h2>
                            <p className="text-gray-700">
                                EVA no está diseñada ni habilitada para casos de emergencia psicológica, intentos de suicidio, riesgo de daño a uno mismo o a terceros.
                            </p>
                            <p className="mt-2 text-gray-700">
                                En tales casos, el usuario debe comunicarse de inmediato con los servicios de emergencia locales o líneas de ayuda especializadas.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. TÉRMINOS PARA PSICÓLOGOS PROFESIONALES</h2>
                            <p className="text-gray-700">Los psicólogos deben ser validados previamente por el equipo EVA, mediante la presentación de:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Cédula profesional válida</li>
                                <li>Documentación oficial que acredite su formación</li>
                            </ul>
                            <p className="mt-2 text-gray-700">Al registrarse en EVA, el psicólogo acepta que:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Actuará bajo principios éticos y conforme a su formación</li>
                                <li>No realizará diagnósticos ni tratamientos definitivos sin evaluación adecuada</li>
                                <li>Tratará la información de los pacientes de forma confidencial, segura y legal</li>
                                <li>Actuará de forma independiente, eximiendo a EVA de cualquier responsabilidad derivada de su práctica profesional</li>
                            </ul>
                            <p className="mt-2 text-gray-700">EVA no establece ninguna relación laboral, comercial ni subordinada con los psicólogos, salvo que exista un contrato por separado.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. LIMITACIÓN DE RESPONSABILIDAD</h2>
                            <p className="text-gray-700">EVA se proporciona “tal cual” y “según disponibilidad”.</p>
                            <p className="mt-2 text-gray-700">En ningún caso EVA será responsable por:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Fallas en la disponibilidad o estabilidad del sistema</li>
                                <li>Consecuencias derivadas del uso de información o contenido generado por la IA</li>
                                <li>Consejos, acciones u omisiones de psicólogos independientes vinculados a la plataforma</li>
                                <li>Daños directos, indirectos, incidentales, consecuentes o punitivos</li>
                            </ul>
                            <p className="mt-2 text-gray-700">La responsabilidad total de EVA ante cualquier reclamación se limitará, en cualquier caso, al monto equivalente a $0 MXN durante la fase beta.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. RENUNCIA DE GARANTÍAS</h2>
                            <p className="text-gray-700">El uso de EVA se realiza bajo responsabilidad del usuario.</p>
                            <p className="mt-2 text-gray-700">No se garantiza:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Precisión total de la información</li>
                                <li>Resultados terapéuticos</li>
                                <li>Compatibilidad técnica con todos los dispositivos</li>
                                <li>Ausencia de errores, interrupciones o pérdidas de datos</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. INDEMNIZACIÓN</h2>
                            <p className="text-gray-700">El usuario acepta indemnizar y eximir de responsabilidad a EVA, sus fundadores, colaboradores y aliados, frente a cualquier demanda, pérdida o gasto legal ocasionado por:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Uso indebido de la Plataforma</li>
                                <li>Violación de estos Términos</li>
                                <li>Acciones derivadas de su conducta, negligencia o mala fe</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. CONDUCTAS PROHIBIDAS</h2>
                            <p className="text-gray-700">Está estrictamente prohibido:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Usar la app con fines ilegales o destructivos</li>
                                <li>Proporcionar información falsa o suplantar identidades</li>
                                <li>Interferir técnica o funcionalmente con la app</li>
                                <li>Acceder sin autorización a datos de terceros</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. CAMBIOS A LOS TÉRMINOS</h2>
                            <p className="text-gray-700">EVA se reserva el derecho de modificar los presentes Términos en cualquier momento.</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                <li>Las modificaciones serán notificadas a través de la app o por medios oficiales</li>
                                <li>El uso continuo de la Plataforma implica la aceptación tácita de los cambios</li>
                                <li>Cada cambio se asociará a una versión y fecha específicas</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. JURISDICCIÓN Y LEY APLICABLE</h2>
                            <p className="text-gray-700">
                                Cualquier conflicto será resuelto conforme a las leyes aplicables en los Estados Unidos Mexicanos, bajo la jurisdicción de los tribunales competentes en Chihuahua, México, renunciando las partes a cualquier otro fuero que pudiera corresponderles.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">16. ARBITRAJE Y RENUNCIA DE ACCIÓN COLECTIVA</h2>
                            <p className="text-gray-700">
                                En caso de disputa, el usuario acepta resolverla mediante arbitraje individual vinculante con sede en Chihuahua, excluyendo cualquier procedimiento colectivo o masivo (class action).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">17. PROPIEDAD INTELECTUAL</h2>
                            <p className="text-gray-700">
                                Todo el contenido, código fuente, diseño, textos, sistema conversacional y herramientas de EVA son propiedad intelectual de Oscar Alejandro Sinaloa García, protegido por las leyes mexicanas e internacionales.
                            </p>
                            <p className="mt-2 text-gray-700">
                                Queda prohibida su reproducción total o parcial sin autorización expresa por escrito.
                            </p>
                        </section>
                    </div>
                </AnimatedSection>
            </main>
        </div>
    );
}