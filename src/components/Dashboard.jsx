import React from "react";
import Calendar from "react-calendar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './Dashboard.css'; 

const patientsData = [
  { name: 'Paciente 1', emotionalState: 'Ansioso' },
  { name: 'Paciente 2', emotionalState: 'Triste' },
  { name: 'Paciente 3', emotionalState: 'Estable' },
  { name: 'Paciente 4', emotionalState: 'En crisis' }
];

const alertas = [
  { message: 'Paciente 4 mostró señales de crisis. Revisar urgentemente.' },
  { message: 'Paciente 2 reportó aumento de tristeza.' }
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
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Bienvenido, Psicólogo</h1>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Pacientes Recientes</h2>
          <ul>
            {patientsData.map((patient, index) => (
              <li key={index}>
                <div>{patient.name}</div>
                <div className={`emotional-state ${patient.emotionalState.toLowerCase().replace(' ', '-')}`}>{patient.emotionalState}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-section">
          <h2>Alertas Urgentes</h2>
          <ul>
            {alertas.map((alert, index) => (
              <li key={index}>{alert.message}</li>
            ))}
          </ul>
        </div>

        <div className="dashboard-section">
          <h2>Próximas Citas</h2>
          <div className="calendar-container">
            <Calendar />
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Tareas Pendientes</h2>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>{task.task}</li>
            ))}
          </ul>
        </div>

        <div className="dashboard-section">
          <h2>Gráficos de Evolución de Pacientes</h2>
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
  );
};

export default Dashboard;