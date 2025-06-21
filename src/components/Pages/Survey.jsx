import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { AiOutlineLoading3Quarters } from "react-icons/ai";





// --- Constantes y Componentes (sin cambios) ---
const evaColors = {
  light: '#EAF7FF',
  accent: '#8DC8FA',
};

const HeartIcon = ({ style, className }) => (<svg style={style} className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>);
const HamburgerIcon = () => (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>);
const CheckCircleIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);

// URL base de tu API. Cambia `localhost:3000` si tu backend corre en otro lugar.
const API_URL = 'https://survey-service-nf9d.onrender.com';

function Survey() {
  // --- Estados del Componente ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    experiencia: '',
    pacientes: [],
    problematicas: '',
    tareas_consumen_tiempo: [],
    tareas_otras_texto: '',
    abandono_jovenes: '',
    caso_marcado: '',
    factores_abandono: [],
    factores_otras_texto: '',
    frecuencia_contacto: '',
    disposicion_pacientes: '',
    preocupacion_ia: '',
    utilidad: {},
    factores_inversion: '',
    probar_beta: '',
    contacto_entrevista: '',
    dirigido_a: '',
    dispuesto_pagar: '',
    exito_terapeutico: '',
    footer_email: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [footerMessage, setFooterMessage] = useState(false);

  // --- Estado para control de acceso ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [accessPassword, setAccessPassword] = useState(''); // Guarda la contraseña validada
  const [stepError, setStepError] = useState('');

  const totalSteps = 5;

  // --- Manejadores de eventos (handleInputChange sin cambios) ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter(item => item !== value)
      }));
    } else if (name.startsWith('util_')) {
      const key = name.split('_')[1];
      setFormData(prev => ({
        ...prev,
        utilidad: { ...prev.utilidad, [key]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // --- Validación de campos obligatorios por paso ---
  const requiredFieldsByStep = [
    // Paso 0
    ['experiencia', 'pacientes', 'problematicas'],
    // Paso 1
    ['tareas_consumen_tiempo', 'abandono_jovenes', 'factores_abandono', 'frecuencia_contacto'],
    // Paso 2
    ['disposicion_pacientes', 'preocupacion_ia', 'utilidad'],
    // Paso 3
    ['factores_inversion', 'probar_beta'],
    // Paso 4
    ['dirigido_a', 'dispuesto_pagar', 'exito_terapeutico'],
  ];

  // Función para validar si los campos obligatorios del paso actual están completos
  const isStepValid = () => {
    const required = requiredFieldsByStep[currentStep];
    for (let field of required) {
      if (field === 'pacientes' || field === 'tareas_consumen_tiempo' || field === 'factores_abandono') {
        if (!Array.isArray(formData[field]) || formData[field].length === 0) return false;
      } else if (field === 'utilidad') {
        // Todas las herramientas deben tener respuesta
        const tools = ['diario', 'mindfulness', 'dibujo', 'chatbot', 'mascota'];
        if (!formData.utilidad || tools.some(tool => !formData.utilidad[tool])) return false;
      } else {
        if (!formData[field] || String(formData[field]).trim() === '') return false;
      }
    }
    // Validación condicional para campos dependientes
    if (currentStep === 1 && formData.abandono_jovenes === 'si' && (!formData.caso_marcado || formData.caso_marcado.trim() === '')) {
      return false;
    }
    return true;
  };

  // Modifica los handlers de navegación para validar antes de avanzar
  const handleNextStep = () => {
    setStepError('');
    if (!isStepValid()) {
      setStepError('Por favor, responde todas las preguntas obligatorias antes de continuar.');
      return;
    }
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // --- LÓGICA DE CONEXIÓN CON BACKEND ---

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setLoading(true); // Inicia el estado de carga
    setDisableButton(true); // Desactiva el botón para evitar múltiples envíos
    try {
      const response = await fetch(`${API_URL}/api/validate-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await response.json();

      if (response.ok && data.isValid) {
        setIsAuthenticated(true);
        setAccessPassword(passwordInput); // Guarda la contraseña para el envío final
        setPasswordInput('');
      } else {
        setPasswordError(data.message || 'Contraseña incorrecta');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setPasswordError('No se pudo conectar con el servidor. Inténtalo de nuevo.');
    } finally{
      setLoading(false); // Finaliza el estado de carga
      setDisableButton(false); // Reactiva el botón
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStepError('');
    if (!isStepValid()) {
      setStepError('Por favor, responde todas las preguntas obligatorias antes de enviar.');
      return;
    }

    // Mapeo de claves del estado a preguntas legibles
    const questionMap = {
      experiencia: '1. ¿Cuántos años lleva ejerciendo como psicólogo/a clínico/a?',
      pacientes: '2. ¿Con qué tipo de pacientes trabaja principalmente?',
      problematicas: '3. ¿Qué problemáticas son más comunes en su consulta?',
      tareas_consumen_tiempo: '4. ¿Cuáles son las tareas fuera de la terapia que más tiempo le consumen?',
      tareas_otras_texto: '4.1. Otras tareas que consumen tiempo',
      abandono_jovenes: '5. ¿Ha tenido pacientes jóvenes (menores de 30) que abandonen la terapia?',
      caso_marcado: '5.1. Si respondió sí: ¿Recuerda algún caso reciente que le haya marcado?',
      factores_abandono: '6. ¿Qué factores cree que influyen más en el abandono terapéutico?',
      factores_otras_texto: '6.1. Otros factores de abandono',
      frecuencia_contacto: '7. ¿Con qué frecuencia mantiene contacto con sus pacientes entre sesiones?',
      disposicion_pacientes: '12. ¿Cree que sus pacientes estarían dispuestos a usar herramientas digitales?',
      preocupacion_ia: '13. ¿Qué preocupación tendría respecto al uso de IA en terapia?',
      utilidad: '14. Utilidad de las siguientes herramientas',
      factores_inversion: '16. ¿Qué factores considera al momento de invertir en nuevas herramientas?',
      probar_beta: '17. ¿Estaría dispuesto/a a probar una herramienta en versión beta?',
      contacto_entrevista: '17.1. Email de contacto para entrevista',
      dirigido_a: '20. ¿A quién debería estar dirigida la herramienta?',
      dispuesto_pagar: '21. ¿Estaría dispuesto/a pagar por una herramienta así?',
      exito_terapeutico: '24. ¿Cómo define el éxito terapéutico?',
    };

    // Transforma el objeto formData en el array que espera el backend
    const answers = Object.entries(formData)
      .filter(([key, value]) => questionMap[key] && value && String(value).length > 0)
      .flatMap(([key, value]) => {
        if (key === 'utilidad') {
          return Object.entries(value).map(([tool, rating]) => ({
            question_text: `${questionMap.utilidad}: ${tool}`,
            answer_text: rating
          }));
        }
        return {
          question_text: questionMap[key],
          answer_text: value
        };
      });

    try {
      const response = await fetch(`${API_URL}/api/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: accessPassword, answers: answers }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        alert(`Error al enviar: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error de conexión al enviar:', error);
      alert('No se pudo conectar con el servidor para enviar las respuestas.');
    }
  };

  // El footer requeriría su propio endpoint. Por ahora, solo simula el registro.
  const handleFooterSubmit = (e) => {
    e.preventDefault();
    if (formData.footer_email) {
      console.log(`Email de contacto (footer) registrado: ${formData.footer_email}`);
      // Aquí podrías hacer una llamada a un endpoint /api/contact-interest
      setFormData(prev => ({ ...prev, footer_email: '' })); // Limpiar campo
      setFooterMessage(true);
      setTimeout(() => setFooterMessage(false), 4000);
    }
  }

  // --- Renderizado (el resto del JSX no necesita cambios) ---
  if (!isAuthenticated) {
    return (
      <div className="text-gray-700 font-sans">
        <section id="inicio" className="py-20 md:py-20 md-20 mt-20" >
          <div className="container mx-auto px-6 text-center">
            <h1
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Ayúdanos a construir,
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#8DC8FA] to-[#0077b6]">la mejor herramienta para ti</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">Las respuestas de tu encuesta serán anónimas y nos ayudarán a lanzar una herramienta valiosa</p>
            <div className="flex items-center justify-center mt-8">
              <form
                onSubmit={handlePasswordSubmit}
                className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full"
              >
                <label className="block mb-2 font-medium text-gray-700" htmlFor="survey-password">
                  Ingresa la clave de acceso:
                </label>
                <div className='flex items-stretch gap-2'>
                  <input
                    id="survey-password"
                    type="password"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    className="flex-grow p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': evaColors.accent }}
                    placeholder="Contraseña"
                    autoFocus
                  
                  />
                  {loading && (
                    <AiOutlineLoading3Quarters className="animate-spin text-[#83c6eb] text-4xl" />
                  )}
                </div>
                {passwordError && (
                  <div className="mb-4 text-red-600 text-sm">{passwordError}</div>
                )}
                <button
                  type="submit"
                  disabled={disableButton}
                  className={`w-full py-3 rounded-md font-semibold text-white transition-opacity
                            ${disableButton ? 'opacity-25  cursor-not-allowed' : 'hover:opacity-90 cursor-pointer'}`}
                  style={{ backgroundColor: evaColors.accent }}
                >
                  Ingresar
                </button>
                
              </form>
              
            </div>
          </div>
        </section>

        <section id="eva" className="py-20" style={{ backgroundColor: evaColors.light }}>
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="text-3xl font-bold text-[#023d6d]">¿Qué es EVA Salud Mental?</h2>
            <div className="w-24 h-1 mx-auto my-6 rounded" style={{ backgroundColor: evaColors.accent }}></div>
            <p className="text-lg text-gray-600 leading-relaxed">
              EVA Salud Mental es una plataforma digital diseñada para mejorar la atención psicológica, facilitando la conexión entre pacientes y profesionales de manera efectiva, accesible y continua. Su enfoque inteligente optimiza el seguimiento terapéutico y potencia los resultados del tratamiento.
            </p>
          </div>
        </section>
      </div>
    );
  }

  const renderStep = () => {
    // ... (El contenido de renderStep no cambia)
    switch (currentStep) {
      case 0: // Fase 1
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6 border-l-4 pl-4" style={{ borderColor: evaColors.accent }}>Fase 1: Contexto Profesional</h3>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">1. ¿Cuántos años lleva ejerciendo como psicólogo/a clínico/a?</label>
              <div className="space-y-2">
                {['0–2 años', '3–5 años', '6–10 años', 'Más de 10 años'].map(opt => (
                  <label key={opt} className="flex items-center"><input type="radio" name="experiencia" value={opt.replace(' años', '')} onChange={handleInputChange} checked={formData.experiencia === opt.replace(' años', '')} className="mr-2" style={{ accentColor: evaColors.accent }} /> {opt}</label>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">2. ¿Con qué tipo de pacientes trabaja principalmente?</label>
              <div className="space-y-2">
                {['niños', 'adolescentes', 'adultos', 'adultos_mayores'].map(opt => (
                  <label key={opt} className="flex items-center"><input type="checkbox" name="pacientes" value={opt} onChange={handleInputChange} checked={formData.pacientes.includes(opt)} className="mr-2 rounded" style={{ accentColor: evaColors.accent }} /> {opt.charAt(0).toUpperCase() + opt.slice(1).replace('_', ' ')}</label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="problematicas" className="block text-gray-700 font-medium mb-2">3. ¿Qué problemáticas son más comunes en su consulta?</label>
              <textarea id="problematicas" name="problematicas" value={formData.problematicas} onChange={handleInputChange} rows="4" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': evaColors.accent }} placeholder="Ansiedad, depresión, problemas de pareja, etc."></textarea>
            </div>
          </div>
        );
      case 1: // Fase 2
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6 border-l-4 pl-4" style={{ borderColor: evaColors.accent }}>Fase 2: Retos y Necesidades</h3>
            <div className="mb-6">
              <label className="block font-medium mb-2">4. ¿Cuáles son las tareas fuera de la terapia que más tiempo le consumen?</label>
              <div className="space-y-2">
                <label className="flex items-center"><input type="checkbox" name="tareas_consumen_tiempo" value="notas" onChange={handleInputChange} checked={formData.tareas_consumen_tiempo.includes('notas')} className="mr-2 rounded" style={{ accentColor: evaColors.accent }} /> Redacción de notas</label>
                <label className="flex items-center"><input type="checkbox" name="tareas_consumen_tiempo" value="horarios" onChange={handleInputChange} checked={formData.tareas_consumen_tiempo.includes('horarios')} className="mr-2 rounded" style={{ accentColor: evaColors.accent }} /> Coordinación de horarios</label>
                <label className="flex items-center"><input type="checkbox" name="tareas_consumen_tiempo" value="seguimiento" onChange={handleInputChange} checked={formData.tareas_consumen_tiempo.includes('seguimiento')} className="mr-2 rounded" style={{ accentColor: evaColors.accent }} /> Seguimiento entre sesiones</label>
                <label className="flex items-center"><input type="checkbox" name="tareas_consumen_tiempo" value="otras" onChange={handleInputChange} checked={formData.tareas_consumen_tiempo.includes('otras')} className="mr-2 rounded" style={{ accentColor: evaColors.accent }} /> Otras: <input type="text" name="tareas_otras_texto" onChange={handleInputChange} value={formData.tareas_otras_texto} className="ml-2 p-1 border-b border-gray-300 focus:outline-none" style={{ borderColor: evaColors.accent, caretColor: evaColors.accent }} /></label>
              </div>
            </div>
            <div className="mb-6">
              <label className="block font-medium mb-2">5. ¿Ha tenido pacientes jóvenes (menores de 30) que abandonen la terapia?</label>
              <div className="space-y-2">
                <label className="flex items-center"><input type="radio" name="abandono_jovenes" value="si" onChange={handleInputChange} checked={formData.abandono_jovenes === 'si'} className="mr-2" style={{ accentColor: evaColors.accent }} /> Sí</label>
                <label className="flex items-center"><input type="radio" name="abandono_jovenes" value="no" onChange={handleInputChange} checked={formData.abandono_jovenes === 'no'} className="mr-2" style={{ accentColor: evaColors.accent }} /> No</label>
              </div>
            </div>
            {formData.abandono_jovenes === 'si' && (
              <div className="mb-6">
                <label htmlFor="caso-marcado" className="block font-medium mb-2">Si respondió sí: ¿Recuerda algún caso reciente que le haya marcado? Cuéntenos brevemente.</label>
                <textarea id="caso-marcado" name="caso_marcado" rows="3" onChange={handleInputChange} value={formData.caso_marcado} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': evaColors.accent }}></textarea>
              </div>
            )}
            <div className="mb-6">
              <label className="block font-medium mb-2">6. ¿Qué factores cree que influyen más en el abandono terapéutico?</label>
              <div className="space-y-2">
                {['motivacion', 'olvido', 'emocionales', 'economicos'].map(opt => (
                  <label key={opt} className="flex items-center"><input type="checkbox" name="factores_abandono" value={opt} onChange={handleInputChange} checked={formData.factores_abandono.includes(opt)} className="mr-2 rounded" style={{ accentColor: evaColors.accent }} /> {`Falta de ${opt}`.replace('Falta de olvido', 'Olvido').replace('Falta de emocionales', 'Cambios emocionales').replace('Falta de economicos', 'Problemas económicos')}</label>
                ))}
                <label className="flex items-center"><input type="checkbox" name="factores_abandono" value="otras" onChange={handleInputChange} checked={formData.factores_abandono.includes('otras')} className="mr-2 rounded" style={{ accentColor: evaColors.accent }} /> Otras: <input type="text" name="factores_otras_texto" onChange={handleInputChange} value={formData.factores_otras_texto} className="ml-2 p-1 border-b border-gray-300 focus:outline-none" style={{ borderColor: evaColors.accent, caretColor: evaColors.accent }} /></label>
              </div>
            </div>
            <div className="mb-6">
              <label className="block font-medium mb-2">7. ¿Con qué frecuencia mantiene contacto con sus pacientes entre sesiones?</label>
              <div className="space-y-2">
                {['Nunca', 'Rara vez', 'A veces', 'Frecuentemente'].map(opt => (
                  <label key={opt} className="flex items-center"><input type="radio" name="frecuencia_contacto" value={opt.toLowerCase().replace(' ', '_')} onChange={handleInputChange} checked={formData.frecuencia_contacto === opt.toLowerCase().replace(' ', '_')} className="mr-2" style={{ accentColor: evaColors.accent }} /> {opt}</label>
                ))}
              </div>
            </div>
          </div>
        );
      case 2: // Fase 3
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6 border-l-4 pl-4" style={{ borderColor: evaColors.accent }}>Fase 3: Reacción al Concepto</h3>
            <div className="mb-6">
              <label className="block font-medium mb-2">12. ¿Cree que sus pacientes estarían dispuestos a usar herramientas digitales para apoyar su proceso?</label>
              <div className="space-y-2">
                {['Muy dispuestos', 'Algo dispuestos', 'Poco dispuestos', 'Nada dispuestos'].map(opt => (
                  <label key={opt} className="flex items-center"><input type="radio" name="disposicion_pacientes" value={opt.toLowerCase().split(' ')[0]} onChange={handleInputChange} checked={formData.disposicion_pacientes === opt.toLowerCase().split(' ')[0]} className="mr-2" style={{ accentColor: evaColors.accent }} /> {opt}</label>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="preocupacion_ia" className="block font-medium mb-2">13. ¿Qué preocupación tendría respecto al uso de IA en terapia?</label>
              <textarea id="preocupacion_ia" name="preocupacion_ia" rows="3" onChange={handleInputChange} value={formData.preocupacion_ia} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': evaColors.accent }}></textarea>
            </div>
            <div className="mb-6">
              <label className="block font-medium mb-2">14. Si existiera una herramienta que ofreciera lo siguiente, ¿cuál le parecería útil?</label>
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">Herramienta</th>
                    {['Muy útil', 'Útil', 'Poco útil', 'Nada útil'].map(h => <th key={h} className="px-2 py-2 text-center">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key: 'diario', text: 'Diario privado y guiado' },
                    { key: 'mindfulness', text: 'Ejercicios de mindfulness' },
                    { key: 'dibujo', text: 'Espacio de dibujo creativo' },
                    { key: 'chatbot', text: 'Chatbot de apoyo 24/7' },
                    { key: 'mascota', text: 'Mascota virtual para hábito' }
                  ].map(({ key, text }, index, arr) => (
                    <tr key={key} className={index < arr.length - 1 ? "border-b" : ""}>
                      <td className="px-4 py-2">{text}</td>
                      {['muy', 'util', 'poco', 'nada'].map(val => (
                        <td key={val} className="text-center"><input type="radio" name={`util_${key}`} value={val} onChange={handleInputChange} checked={formData.utilidad[key] === val} style={{ accentColor: evaColors.accent }} /></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 3: // Fase 4
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6 border-l-4 pl-4" style={{ borderColor: evaColors.accent }}>Fase 4: Viabilidad y Cierre</h3>
            <div className="mb-6">
              <label htmlFor="factores_inversion" className="block font-medium mb-2">16. ¿Qué factores considera al momento de invertir en nuevas herramientas o recursos?</label>
              <textarea id="factores_inversion" name="factores_inversion" rows="3" onChange={handleInputChange} value={formData.factores_inversion} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': evaColors.accent }}></textarea>
            </div>
            <div className="mb-6">
              <label className="block font-medium mb-2">17. ¿Estaría dispuesto/a a probar una herramienta en versión beta con 1 o 2 pacientes?</label>
              <div className="space-y-2">
                {['si', 'tal_vez', 'no'].map(opt => (
                  <label key={opt} className="flex items-center"><input type="radio" name="probar_beta" value={opt} onChange={handleInputChange} checked={formData.probar_beta === opt} className="mr-2" style={{ accentColor: evaColors.accent }} /> {opt === 'tal_vez' ? 'Tal vez' : opt.charAt(0).toUpperCase() + opt.slice(1)}</label>
                ))}
              </div>
            </div>
            {(formData.probar_beta === 'si' || formData.probar_beta === 'tal_vez') && (
              <div className="mb-6">
                <label htmlFor="contacto-entrevista" className="block font-medium mb-2">Si respondió sí o tal vez: ¿Podemos contactarlo para una futura entrevista? (Correo opcional)</label>
                <input type="email" id="contacto-entrevista" name="contacto_entrevista" onChange={handleInputChange} value={formData.contacto_entrevista} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': evaColors.accent }} placeholder="su.correo@ejemplo.com" />
              </div>
            )}
          </div>
        );
      case 4: // Fase 5
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6 border-l-4 pl-4" style={{ borderColor: evaColors.accent }}>Fase 5: Integración y Mercado</h3>
            <div className="mb-6">
              <label className="block font-medium mb-2">20. ¿Considera que esta herramienta debería estar dirigida principalmente a…?</label>
              <div className="space-y-2">
                {['Psicólogos', 'Pacientes', 'Ambos', 'No estoy seguro/a'].map(opt => (
                  <label key={opt} className="flex items-center"><input type="radio" name="dirigido_a" value={opt.toLowerCase().replace(/ /g, '_').replace('/a', '')} onChange={handleInputChange} checked={formData.dirigido_a === opt.toLowerCase().replace(/ /g, '_').replace('/a', '')} className="mr-2" style={{ accentColor: evaColors.accent }} /> {opt}</label>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block font-medium mb-2">21. ¿Estaría dispuesto/a a pagar por una herramienta así?</label>
              <div className="space-y-2">
                {['Sí', 'No', 'Depende del precio', 'Depende de la eficacia'].map(opt => (
                  <label key={opt} className="flex items-center"><input type="radio" name="dispuesto_pagar" value={opt.toLowerCase().replace(/ /g, '_')} onChange={handleInputChange} checked={formData.dispuesto_pagar === opt.toLowerCase().replace(/ /g, '_')} className="mr-2" style={{ accentColor: evaColors.accent }} /> {opt}</label>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="exito-terapeutico" className="block font-medium mb-2">24. ¿Cómo define el éxito terapéutico en su práctica clínica?</label>
              <textarea id="exito-terapeutico" name="exito_terapeutico" rows="3" onChange={handleInputChange} value={formData.exito_terapeutico} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': evaColors.accent }}></textarea>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (


    <div className="text-gray-700 font-sans">
      <Helmet>
        <title>Encuesta EVA Salud Mental</title>
      </Helmet>
      <main>
        <section id="encuesta" className="py-20 md:py-40 bg-white mt-25">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Encuesta para Profesionales</h2>
              <p className="text-center text-gray-600 mb-10">Tu participación es anónima y tomará entre 10-15 minutos. ¡Gracias por tu tiempo!</p>
              <div className="bg-gray-50 p-6 sm:p-8 rounded-xl border border-gray-200 shadow-md">
                {isSubmitted ? (
                  <div className="text-center p-8">
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800">¡Muchas gracias por su tiempo!</h3>
                    <p className="mt-4 text-gray-600">Su perspectiva es invaluable para nosotros. Hemos recibido sus respuestas y las analizaremos con detenimiento para construir una herramienta que realmente marque la diferencia.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <div className="flex justify-between mb-1">
                        <span className="text-base font-medium" style={{ color: evaColors.accent }}>Progreso</span>
                        <span className="text-sm font-medium" style={{ color: evaColors.accent }}>Fase {currentStep + 1} de {totalSteps}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="h-2.5 rounded-full" style={{ width: `${((currentStep + 1) / totalSteps) * 100}%`, backgroundColor: evaColors.accent }}></div>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                      {renderStep()}
                      {stepError && (
                        <div className="text-red-600 text-sm mt-4 mb-2">{stepError}</div>
                      )}
                      <div className="mt-8 flex justify-between items-center">
                        <button type="button" onClick={handlePrevStep} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition-all" style={{ display: currentStep === 0 ? 'none' : 'inline-block' }}>Anterior</button>
                        {currentStep < totalSteps - 1 && (
                          <button type="button" onClick={handleNextStep} className="text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-all" style={{ backgroundColor: evaColors.accent }}>Siguiente</button>
                        )}
                        {currentStep === totalSteps - 1 && (
                          <button type="submit" className="bg-green-500 text-white font-bold py-2 px-8 rounded-full hover:bg-green-600 transition-all">Enviar</button>
                        )}
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        <footer id="contacto" className="bg-white py-16">
          <div className="container mx-auto px-6 max-w-xl text-center">
            <h3 className="text-2xl font-bold text-gray-800">¿Te interesa colaborar más adelante?</h3>
            <p className="text-gray-600 mt-2 mb-8">Déjanos tu correo y te contactaremos para futuras entrevistas o pruebas de concepto.</p>
            <form onSubmit={handleFooterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" name="footer_email" required value={formData.footer_email} onChange={handleInputChange} className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': evaColors.accent }} placeholder="Tu correo electrónico" />
              <button type="submit" className="bg-gray-800 text-white font-semibold py-3 px-8 rounded-md hover:bg-gray-700 transition-all">Quiero que me contacten</button>
            </form>
            {footerMessage && (
              <div className="mt-4 text-green-600 font-medium">¡Gracias! Hemos registrado tu interés.</div>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Survey;