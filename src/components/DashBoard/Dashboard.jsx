import React from "react";
import Calendar from "react-calendar";
import './Dashboard.css';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const patientsData = [
  { name: 'Carmen Alvira', emotionalState: 'Ansioso' },
  { name: 'Maria Chavez', emotionalState: 'Triste' },
  { name: 'Santiago Suarez', emotionalState: 'Estable' },
  { name: 'Homero Padilla', emotionalState: 'En crisis' }
];

const emotionColors = {
  ansioso: "bg-yellow-300 text-yellow-900",
  triste: "bg-blue-300 text-blue-900",
  estable: "bg-green-300 text-green-900",
  "en-crisis": "bg-red-400 text-red-900",
};

const alertas = [
  { message: 'Homero mostró señales de crisis. Revisar urgentemente.' },
  { message: 'Maria reportó aumento de tristeza.' },
  { message: 'Carmen reportó ansiedad.' },
  { message: 'Santiago reportó aumento de ansiedad.' },
  
];

const tasks = [
  { task: 'Responder mensaje de Paciente 3' },
  { task: 'Revisar informe de Paciente 1' }
];

const patientProgressData = [
  { name: 'Semana 1', score: 60 },
  { name: 'Semana 2', score: 65 },
  { name: 'Semana 3', score: 70 },
  { name: 'Semana 4', score: 85 }
];

const Dashboard = () => {
  return (
<>
    

    <div className="container mx-auto p-4 flex-wrap">

    <div className="flex flex-row gap-6 mb-6 items-center p-8 border rounded-3xl  bg-[#ffffff]">
      <div className="flex flex-col items-center w-60">
        <div className="text-center mb-6">
          <img className="rounded-full w-60 h-60" 
            src="https://i.pinimg.com/736x/41/89/ab/4189ab29d7006402ae882ab4eee91022.jpg" 
            alt="image description"
          />
        </div>
        <div className="text-center text-4xl">
          <h2 className="text-[#8d6e63]">Bienvenida Psic. Ramírez</h2>
        </div>
      </div>

      <div className="flex-1 p-10">
        <p className="text-black text-justify">
          Soy la Psicóloga Ramírez, con más de 10 años de experiencia en el ámbito clínico. 
          Me especializo en el tratamiento de la ansiedad, depresión y el manejo del estrés. 
          Mi enfoque terapéutico está basado en la Terapia Cognitivo-Conductual (TCC), buscando 
          siempre un acompañamiento integral y personalizado. A lo largo de mi carrera, he ayudado 
          a numerosas personas a superar sus retos emocionales y mejorar su calidad de vida. Si necesitas 
          apoyo o guía para enfrentar cualquier desafío, no dudes en contactarme. Estoy aquí para ayudarte 
          a alcanzar tu bienestar emocional.
        </p>
      </div>
    </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="bg-white p-4 rounded-lg shadow ">
          <h2 className="text-xl font-semibold mb-2 text-[#8d6e63]">Pacientes Recientes</h2>
          <ul>
            {patientsData.map((patient, index) => (
              <li key={index} className="p-2 border-b last:border-none">
                <div className="text-[#0f0e0e]">{patient.name}</div>
                <div className={`text-sm font-medium px-2 py-1 rounded ${emotionColors[patient.emotionalState.toLowerCase().replace(' ', '-')] || "bg-gray-200"}`}>
                    {patient.emotionalState}
                      </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#ffffff] p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-[#8d6e63]">Alertas Urgentes</h2>
          <ul>
            {alertas.map((alert, index) => (
              <li key={index} className="p-2  text-black flex items-center hover:rounded-2xl  hover:bg-[#a45656] hover:text-amber-50 hover:font-bold svg-hover-task">
                <div style={{ width: '30px', height: '30px', marginRight: '8px', flexShrink: 0 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '100%', height: '100%' }}>
                    <path
                      fill="#981616"
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                    />
                  </svg>
                </div>
                <span>{alert.message}</span>
              </li>
            ))}
          </ul>
        </div>



        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-[#8d6e63]">Próximas Citas</h2>
          <div className="flex justify-center">
            <Calendar />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-[#8d6e63]">Tareas Pendientes</h2>
          <ul>
            {tasks.map((task, index) => (
              <li key={index} className="p-2  text-black flex items-center hover:rounded-2xl  hover:bg-[#7c638d] hover:text-amber-50 hover:font-bold svg-hover-task">
                <div style={{ width: '30px', height: '30px', marginRight: '8px', flexShrink: 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style={{ width: '100%', height: '100%' }}>
                      <path 
                      fill="#c4b6ec " 
                      
                      d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM128 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM80 432c0-44.2 35.8-80 80-80l64 0c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16L96 448c-8.8 0-16-7.2-16-16z"
                      />
                    </svg>
                </div>
                  <spam>{task.task}</spam>
                </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-2 text-[#8d6e63]">Gráficos de Evolución de Pacientes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={patientProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
