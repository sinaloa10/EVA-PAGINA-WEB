
import Calendar from "react-calendar";
import './Dashboard.css';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useState } from "react";

const patientsData = [
  { name: 'Carmen Alvira', emotionalState: 'Ansioso' },
  { name: 'Maria Chavez', emotionalState: 'Triste' },
  { name: 'Santiago Suarez', emotionalState: 'Estable' },
  { name: 'Homero Padilla', emotionalState: 'En crisis' },
  { name: 'Esteban Martínez', emotionalState: 'En crisis' },

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
  { message: 'Esteban reportó crisis emocional.' },
  { message: 'Karen reportó crisis emocional.' },


  
];

const tasks = [
  { task: 'Responder mensaje de Paciente 3' },
  { task: 'Revisar informe de Paciente 1' },
  { task: 'Revisar informe de Paciente 2' },
  { task: 'Responder mensaje de Paciente 1' },
  { task: 'Revisar informe de Paciente 3' },
  { task: 'Responder mensaje de Paciente 2' },
  { task: 'Revisar informe de Paciente 1' },
  { task: 'Revisar informe de Paciente 3' },
  { task: 'Responder mensaje de Paciente 1' },
  { task: 'Revisar informe de Paciente 2' },
  { task: 'Revisar informe de Paciente 1' },
  { task: 'Revisar informe de Paciente 3' },
];



const patientProgressData = [
  { name: 'Semana 1', score: 60 },
  { name: 'Semana 2', score: 65 },
  { name: 'Semana 3', score: 70 },
  { name: 'Semana 4', score: 85 }
];

const Dashboard = () => {
  const [tasksEva, setTaskEva] = useState([
    { taskEva: 'Al paciente 4 mandarle mensajes de apoyo' },
    { taskEva: 'Al paciente 2 recordarle hacer caminatas de media hora' }
   
  ]);
  const [newTaskEva, setNewTaskEva] = useState("");
  
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskEva.trim()) {
      setTaskEva([...tasksEva, { taskEva: newTaskEva }]);
      setNewTaskEva(""); // Clear the input field after submission
    }
  };
  return (
<div className = "pt-20">
    

    <div className="container mx-auto p-4 flex-wrap">

    <div className="flex flex-row gap-6 mb-6 items-center p-8 border rounded-3xl  bg-[#ffffff]">
      {/*
      <div className="flex flex-col items-center w-60">
        <div className="text-center mb-6">
          
          <img className="rounded-full w-60 h-60" 
            src="https://i.pinimg.com/736x/41/89/ab/4189ab29d7006402ae882ab4eee91022.jpg" 
            alt="image description"
          />
        </div>
        
      </div> */}

        {/*REporte General SEMANAL*/}
        <div className="flex-1 p-10">
          <div className="flex items-center">
            {/* Imagen a la izquierda */}
            <div className="mr-6">
              <img className="rounded-full w-80 h-30" 
            src="https://i.pinimg.com/736x/e9/eb/9e/e9eb9ec1b0da71003807507b2368cd21.jpg" 
            alt="image paciente"
               />
               <h3 className="text-[#000000] text-center font-bold">Paciente:</h3>
               <h3 className="text-[#000000] text-center">Guillermo Lora</h3>
            </div>

            {/* Texto a la derecha de la imagen */}
            <div>
              <div className="text-center text-4xl">
                <h2 className="text-[#b3908e]">Reporte General</h2>
                <h3 className="text-[#f6938c]">Semana 1</h3>
              </div>
              <p className="text-black text-center">
                Se ha identificado un patrón de ansiedad generalizada, acompañado de dificultades para 
                manejar el estrés y relaciones interpersonales. Se observa una tendencia a la autoexigencia
                y una baja autoestima que influyen en su estado de ánimo y bienestar general.
              </p>
              <div className="flex place-self-center space-x-8">
                  {/** BOTON IZQ  */}
              <button className="button-custom">
                <svg xmlns="http://www.w3.org/2000/svg" height="32" width="28" viewBox="0 0 448 512">
                  <path fill="#f6938c" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                </svg>
              </button>
                   {/** BOTON DERECHO  */}
              <button className="button-custom">
                <svg xmlns="http://www.w3.org/2000/svg" height="32" width="28" viewBox="0 0 448 512">
                  <path fill="#f6938d" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                </svg>
              </button>

              </div>
            </div>
          </div>
        </div>
    </div>

        
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        
        {/*Pacientes Recientes*/}
        <div className="bg-white p-4 rounded-lg shadow ">
          <h2 className="text-xl font-semibold mb-2 text-[#8ac8fb]">Pacientes Recientes</h2>
          <div className="max-h-80 overflow-y-auto scroll-container">
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
        </div>

            {/*Alertas Urgentes*/}
        <div className="bg-[#ffffff] p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-[#8ac8fb]">Alertas Urgentes</h2>
          <div className="max-h-80 overflow-y-auto scroll-container">
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
        </div>


            {/*Proximas citas*/}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-[#8ac8fb]">Próximas Citas</h2>
          <div className="flex justify-center">
            <Calendar />
          </div>
        </div>

            {/*Tareas Penientes*/}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-[#8ac8fb]">Tareas Pendientes</h2>
          <div className="max-h-96 overflow-y-auto  scroll-container">
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
        </div>

        
         {/*TAREAS PARA EVA*/}

         <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
              <h2 className="text-xl font-semibold mb-2 text-[#8ac8fb]">Establece una actividad</h2>
              <div className="flex flex-col h-[400px]"> {/* Ajuste del contenedor */}
                <div className="max-h-[288px] overflow-y-auto scroll-container flex-grow">
                  <ul>
                    {tasksEva.map((taskEva, index) => (
                      <li
                        key={index}
                        className="p-2 text-black flex items-center hover:rounded-2xl hover:bg-[#e77c7c] hover:text-amber-50 hover:font-bold svg-hover-taskEva"
                      >
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "8px", 
                            flexShrink: 0,
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" height="32" width="36" viewBox="0 0 576 512">
                          <path fill="#f6938c" d="M96 80c0-26.5 21.5-48 48-48l288 0c26.5 0 48 21.5 48 48l0 304L96 384 96 80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48l16 0 0 128 448 0 0-128 16 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48L48 480c-26.5 0-48-21.5-48-48l0-96z"/></svg>

                        </div>
                        <span>{taskEva.taskEva}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <form onSubmit={handleAddTask} className="mt-4 flex">
                  <input
                    type="text"
                    value={newTaskEva}
                    onChange={(e) => setNewTaskEva(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="p-2 border border-gray-300 rounded-l-lg flex-grow text-black"
                  />
                  <button
                    type="submit"
                    className="button-custom text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512">
                      <path fill="#f6938c" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
                    </svg>
                  </button>
                </form>
              </div>
            </div>



            {/*Gráficos de Evolución de Pacientes*/}
        <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-full">
          <h2 className="text-xl font-semibold mb-2 text-[#8ac8fb]">Gráficos de Evolución de Pacientes</h2>
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
    </div >
  );
};

export default Dashboard;
