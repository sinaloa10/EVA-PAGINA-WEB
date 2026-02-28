import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const evaColors = {
  accent: '#8DC8FA',
};

function PilotForm() {

  const [formData, setFormData] = useState({
    alias: '',
    edad: '',
    correo: '',
    ciudad: '',
    riesgo_autolesion: '',
    violencia_activa: '',
    motivo: '',
    categorias: [],
    expectativas: '',
    consentimiento_atencion: false,
    consentimiento_datos: false,
    consentimiento_validacion: false,
    consentimiento_retiro: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [excluded, setExcluded] = useState(false);
  const [loading, setLoading] = useState(false);

  const categoriasOpciones = [
    "Estrés",
    "Ansiedad leve",
    "Dudas vocacionales",
    "Conflictos relacionales no violentos",
    "Otro"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === "categorias") {
      setFormData(prev => ({
        ...prev,
        categorias: checked
          ? [...prev.categorias, value]
          : prev.categorias.filter(c => c !== value)
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (
      !formData.alias ||
      !formData.edad ||
      !formData.correo ||
      !formData.riesgo_autolesion ||
      !formData.violencia_activa ||
      !formData.motivo ||
      formData.categorias.length === 0 ||
      !formData.expectativas ||
      !formData.consentimiento_atencion ||
      !formData.consentimiento_datos ||
      !formData.consentimiento_validacion ||
      !formData.consentimiento_retiro
    ) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }

    if (formData.riesgo_autolesion === "si" || formData.violencia_activa === "si") {
      setExcluded(true);
      return;
    }

    try {
      setLoading(true);
      await fetch('http://localhost:8000/enviar-datos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.error("Ocurrió un error al enviar tu solicitud. Por favor intenta nuevamente.");
    } finally {
      setLoading(false);
    }
    setSubmitted(true);
  };

  if (excluded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="max-w-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Gracias por tu interés</h2>
          <p className="text-gray-600">
            En este momento no podemos incluir tu caso en este piloto.
            Si estás atravesando una situación de riesgo inmediato,
            te recomendamos acudir a servicios de emergencia o a un profesional especializado.
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="max-w-lg text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Solicitud enviada</h2>
          <p className="mt-4 text-gray-600">
            Gracias por confiar en este espacio. Nos pondremos en contacto contigo
            si eres seleccionado/a para participar en esta sesión exploratoria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-white text-gray-700">
      <Helmet>
        <title>Solicitud Sesión Contención | EVA</title>
      </Helmet>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-4">
          Sesión de Contención Psicológica Exploratoria
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Este formulario es para solicitar una sesión gratuita de contención.
          No sustituye terapia formal ni atención de emergencia.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Datos básicos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-l-4 pl-4"
              style={{ borderColor: evaColors.accent }}>
              Datos básicos
            </h3>

            <input
              type="text"
              name="alias"
              placeholder="Nombre o alias"
              value={formData.alias}
              onChange={handleChange}
              className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:outline-none"
              style={{ '--tw-ring-color': evaColors.accent }}
            />

            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={formData.edad}
              onChange={handleChange}
              className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:outline-none"
              style={{ '--tw-ring-color': evaColors.accent }}
            />

            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:outline-none"
              style={{ '--tw-ring-color': evaColors.accent }}
            />

            <input
              type="text"
              name="ciudad"
              placeholder="Ciudad (opcional)"
              value={formData.ciudad}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:outline-none"
              style={{ '--tw-ring-color': evaColors.accent }}
            />
          </div>

          {/* Filtro de riesgo */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-l-4 pl-4"
              style={{ borderColor: evaColors.accent }}>
              Preguntas de seguridad
            </h3>

            <div className="mb-4">
              <p className="mb-2">¿Actualmente tienes pensamientos de hacerte daño?</p>
              <label className="mr-4">
                <input type="radio" name="riesgo_autolesion" value="si" onChange={handleChange} /> Sí
              </label>
              <label>
                <input type="radio" name="riesgo_autolesion" value="no" onChange={handleChange} /> No
              </label>
            </div>

            <div>
              <p className="mb-2">¿Estás viviendo una situación de violencia activa?</p>
              <label className="mr-4">
                <input type="radio" name="violencia_activa" value="si" onChange={handleChange} /> Sí
              </label>
              <label>
                <input type="radio" name="violencia_activa" value="no" onChange={handleChange} /> No
              </label>
            </div>
          </div>

          {/* Motivo */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-l-4 pl-4"
              style={{ borderColor: evaColors.accent }}>
              Motivo de consulta
            </h3>

            {categoriasOpciones.map(op => (
              <label key={op} className="block mb-2">
                <input
                  type="checkbox"
                  name="categorias"
                  value={op}
                  onChange={handleChange}
                  className="mr-2"
                />
                {op}
              </label>
            ))}

            <textarea
              name="motivo"
              rows="4"
              placeholder="¿Qué te gustaría trabajar o conversar?"
              value={formData.motivo}
              onChange={handleChange}
              className="w-full mt-4 p-3 border rounded-md focus:ring-2 focus:outline-none"
              style={{ '--tw-ring-color': evaColors.accent }}
            />

            <textarea
              name="expectativas"
              rows="3"
              placeholder="¿Qué esperas obtener de esta sesión?"
              value={formData.expectativas}
              onChange={handleChange}
              className="w-full mt-4 p-3 border rounded-md focus:ring-2 focus:outline-none"
              style={{ '--tw-ring-color': evaColors.accent }}
            />
          </div>

          {/* Consentimientos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-l-4 pl-4"
              style={{ borderColor: evaColors.accent }}>
              Consentimiento
            </h3>

            <label className="block mb-2">
              <input type="checkbox" name="consentimiento_atencion" onChange={handleChange} className="mr-2" />
              Entiendo que esta sesión no constituye terapia formal.
            </label>

            <label className="block mb-2">
              <input type="checkbox" name="consentimiento_datos" onChange={handleChange} className="mr-2" />
              Autorizo el uso anonimizado de mi información para desarrollo tecnológico.
            </label>

            <label className="block mb-2">
              <input type="checkbox" name="consentimiento_validacion" onChange={handleChange} className="mr-2" />
              Entiendo que mi caso podrá ser compartido de forma anonimizada con otro profesional.
            </label>

            <label className="block">
              <input type="checkbox" name="consentimiento_retiro" onChange={handleChange} className="mr-2" />
              Entiendo que puedo retirar mi consentimiento en cualquier momento.
            </label>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-bold py-3 rounded-full transition-all disabled:opacity-60"
            style={{ backgroundColor: evaColors.accent }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Enviando...
              </span>
            ) : "Enviar solicitud"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default PilotForm;