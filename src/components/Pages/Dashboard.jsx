import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, UserPlus, Calendar, FileText, MessageSquare, Settings, BrainCircuit, 
    PanelLeftClose, Bell, LogOut, Search, MessageCircle, TrendingDown, AlertCircle, CalendarCheck, 
    AlertTriangle, Video, MapPin, CheckCircle2, XCircle, Clock, Download, Brain, Send, User, CalendarClock
} from 'lucide-react';

// --- Reusable Components ---

const StatsCard = ({ icon, title, value, change, iconBgColor, iconTextColor }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between">
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
            <p className={`text-xs mt-1 ${change.startsWith('+') ? 'text-green-500' : 'text-gray-400'}`}>{change}</p>
        </div>
        <div className={`p-3 rounded-full ${iconBgColor}`}>
            {React.cloneElement(icon, { className: iconTextColor })}
        </div>
    </div>
);

const PatientCard = ({ avatarSrc, name, age, interactionStatus, interactionIcon, interactionBg, interactionText }) => (
    <div className="bg-white rounded-xl shadow-sm p-5 text-center flex flex-col items-center">
        <img src={avatarSrc} alt="Avatar" className="w-20 h-20 rounded-full mb-4 object-cover" />
        <h4 className="font-bold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-500">{age}</p>
        <div className={`mt-4 flex items-center gap-2 text-sm ${interactionText} ${interactionBg} px-3 py-1 rounded-full`}>
            {interactionIcon}
            <span>{interactionStatus}</span>
        </div>
        <button className="mt-5 w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
            Ver Perfil
        </button>
    </div>
);

// --- Section Components ---

const DashboardSection = () => (
    <section id="inicio">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-11 pt-10">
            <StatsCard icon={<Users />} title="Pacientes Activos" value="24" change="+2 esta semana" iconBgColor="bg-blue-100" iconTextColor="text-blue-500" />
            <StatsCard icon={<CalendarCheck />} title="Sesiones para Hoy" value="4" change="1 pendiente de confirmar" iconBgColor="bg-purple-100" iconTextColor="text-purple-500" />
            <StatsCard icon={<AlertTriangle />} title="Alertas Importantes" value="3" change="Requieren atención" iconBgColor="bg-red-100" iconTextColor="text-red-500" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6 px-11 pt-10">
            <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4">Últimos Registros Emocionales</h3>
                <div className="flex justify-around items-end h-48 border-l border-b border-gray-200 p-2">
                    <div className="text-center w-1/5"><div className="bg-green-200 rounded-t-lg mx-auto" style={{ height: '80%' }}></div><p className="text-xs text-gray-500 mt-2">Feliz</p></div>
                    <div className="text-center w-1/5"><div className="bg-blue-200 rounded-t-lg mx-auto" style={{ height: '60%' }}></div><p className="text-xs text-gray-500 mt-2">Tranquilo</p></div>
                    <div className="text-center w-1/5"><div className="bg-yellow-200 rounded-t-lg mx-auto" style={{ height: '45%' }}></div><p className="text-xs text-gray-500 mt-2">Ansioso</p></div>
                    <div className="text-center w-1/5"><div className="bg-red-200 rounded-t-lg mx-auto" style={{ height: '30%' }}></div><p className="text-xs text-gray-500 mt-2">Triste</p></div>
                    <div className="text-center w-1/5"><div className="bg-gray-200 rounded-t-lg mx-auto" style={{ height: '50%' }}></div><p className="text-xs text-gray-500 mt-2">Neutral</p></div>
                </div>
            </div>
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4">Resúmenes de EVA AI</h3>
                <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded-lg"><p className="text-sm font-medium text-gray-700">Laura Gómez</p><p className="text-xs text-gray-500">EVA detectó un patrón de insomnio en sus últimos 3 registros de diario.</p></div>
                    <div className="bg-gray-50 p-3 rounded-lg"><p className="text-sm font-medium text-gray-700">Carlos Ruiz</p><p className="text-xs text-gray-500">El sentimiento dominante en su última semana fue la ansiedad.</p></div>
                    <div className="bg-gray-50 p-3 rounded-lg"><p className="text-sm font-medium text-gray-700">Ana Torres</p><p className="text-xs text-gray-500">Completó el test de autoestima con resultados positivos.</p></div>
                </div>
            </div>
        </div>
    </section>
);

const PatientsSection = () => {
    const patients = [
        { name: 'Laura Gómez', age: '28 años', avatarSrc: 'https://placehold.co/80x80/E2F1FE/3B82F6?text=LG', status: 'Interacción Alta', icon: <MessageCircle className="w-4 h-4" />, bg: 'bg-green-100', text: 'text-green-600' },
        { name: 'Carlos Ruiz', age: '35 años', avatarSrc: 'https://placehold.co/80x80/FEF3C7/F59E0B?text=CR', status: 'Interacción Media', icon: <TrendingDown className="w-4 h-4" />, bg: 'bg-yellow-100', text: 'text-yellow-600' },
        { name: 'Ana Torres', age: '42 años', avatarSrc: 'https://placehold.co/80x80/FEE2E2/EF4444?text=AT', status: 'Interacción Baja', icon: <AlertCircle className="w-4 h-4" />, bg: 'bg-red-100', text: 'text-red-600' },
        { name: 'Marcos Peña', age: '22 años', avatarSrc: 'https://placehold.co/80x80/D1FAE5/10B981?text=MP', status: 'Interacción Alta', icon: <MessageCircle className="w-4 h-4" />, bg: 'bg-green-100', text: 'text-green-600' }
    ];
    return (
        <section id="pacientes" className="flex flex-col flex-1 min-h-0 w-full px-11 py-5">
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:w-1/3"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Buscar paciente..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" /></div>
                <select className="w-full md:w-auto border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"><option>Filtrar por estado</option><option>Estable</option><option>Ansioso</option><option>En riesgo</option></select>
                <button className="w-full md:w-auto bg-blue-400 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors">Buscar</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1">
                {patients.map(p => (<PatientCard key={p.name} name={p.name} age={p.age} avatarSrc={p.avatarSrc} interactionStatus={p.status} interactionIcon={p.icon} interactionBg={p.bg} interactionText={p.text} />))}
            </div>
        </section>
    );
};

const AgendaSection = () => {
    const sessions = [
        { name: 'Laura Gómez', time: '10:00 AM', modality: 'Virtual', icon: <Video className="w-5 h-5 text-purple-500" />, status: 'Confirmada', statusColor: 'text-green-500', statusIcon: <CheckCircle2 /> },
        { name: 'Carlos Ruiz', time: '11:30 AM', modality: 'Presencial', icon: <MapPin className="w-5 h-5 text-blue-500" />, status: 'Confirmada', statusColor: 'text-green-500', statusIcon: <CheckCircle2 /> },
        { name: 'Marcos Peña', time: '02:00 PM', modality: 'Virtual', icon: <Video className="w-5 h-5 text-purple-500" />, status: 'Pendiente', statusColor: 'text-yellow-500', statusIcon: <Clock /> },
        { name: 'Ana Torres', time: '04:30 PM', modality: 'Presencial', icon: <MapPin className="w-5 h-5 text-blue-500" />, status: 'Cancelada', statusColor: 'text-red-500', statusIcon: <XCircle /> }
    ];
    return (
        <section id="agenda" className="flex flex-col flex-1 min-h-0 w-full px-11 py-5">
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between w-full">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <input type="date" defaultValue={new Date().toISOString().substring(0, 10)} className="border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    <select className="w-full md:w-auto border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"><option>Todos los estados</option><option>Confirmada</option><option>Pendiente</option><option>Cancelada</option></select>
                </div>
                <button className="w-full md:w-auto bg-blue-400 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2 justify-center"><CalendarClock className="w-5 h-5" /> Agendar nueva sesión</button>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Paciente</th>
                                <th scope="col" className="px-6 py-3">Hora</th>
                                <th scope="col" className="px-6 py-3">Modalidad</th>
                                <th scope="col" className="px-6 py-3">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.map(session => (
                                <tr key={session.name} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{session.name}</th>
                                    <td className="px-6 py-4">{session.time}</td>
                                    <td className="px-6 py-4 flex items-center gap-2">{session.icon} {session.modality}</td>
                                    <td className={`px-6 py-4 font-semibold ${session.statusColor}`}>
                                        <div className="flex items-center gap-2">
                                            {React.cloneElement(session.statusIcon, { className: "w-5 h-5" })} {session.status}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

const InformesSection = () => {
    const reports = [
        { patient: 'Laura Gómez', date: '2024-05-18', type: 'Estado emocional', icon: <Brain />, content: 'Patrón de ansiedad recurrente los fines de semana.' },
        { patient: 'Carlos Ruiz', date: '2024-05-17', type: 'Resultados de test', icon: <FileText />, content: 'Puntuación media-baja en el test de autoestima GAD-7.' },
        { patient: 'Marcos Peña', date: '2024-05-16', type: 'Patrones de sueño', icon: <Clock />, content: 'Insomnio intermitente detectado, con un promedio de 4.5h de sueño.' }
    ];
    return (
        <section id="informes" className="flex flex-col flex-1 min-h-0 w-full px-11 py-5">
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <select className="w-full md:w-auto border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>Todos los informes</option><option>Estado emocional</option><option>Resultados de test</option><option>Patrones de sueño</option>
                </select>
                <button className="w-full md:w-auto bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 justify-center"><Download className="w-5 h-5" /> Exportar a PDF</button>
            </div>
            <div className="space-y-4 overflow-y-auto pr-2">
                {reports.map((report, index) => (
                    <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-gray-800">{report.patient}</h4>
                                <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                    <span className="flex items-center gap-1.5">{React.cloneElement(report.icon, { className: "w-4 h-4" })} {report.type}</span>
                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {report.date}</span>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-blue-500"><Download className="w-5 h-5"/></button>
                        </div>
                        <p className="text-sm text-gray-600 mt-3">{report.content}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const MensajesSection = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const conversations = [
        { id: 1, name: 'Laura Gómez', avatar: 'https://placehold.co/40x40/E2F1FE/3B82F6?text=LG', lastMessage: 'Entendido, lo haré. ¡Gracias!', time: '10:45 AM', unread: 2 },
        { id: 2, name: 'Carlos Ruiz', avatar: 'https://placehold.co/40x40/FEF3C7/F59E0B?text=CR', lastMessage: 'Hola Dr., quería comentarle algo...', time: 'Ayer', unread: 0 },
        { id: 3, name: 'Marcos Peña', avatar: 'https://placehold.co/40x40/D1FAE5/10B981?text=MP', lastMessage: 'Perfecto, nos vemos en la sesión.', time: 'Hace 3 días', unread: 0 },
    ];
    const messages = {
        1: [
            { from: 'other', text: 'Hola Dr., he estado teniendo problemas para dormir de nuevo.', time: '10:40 AM' },
            { from: 'me', text: 'Hola Laura, lamento escuchar eso. ¿Has intentado las técnicas de respiración que discutimos?', time: '10:42 AM' },
            { from: 'other', text: 'Sí, pero mi mente sigue muy activa.', time: '10:43 AM' },
            { from: 'other', text: 'Entendido, lo haré. ¡Gracias!', time: '10:45 AM' },
        ],
        2: [{ from: 'other', text: 'Hola Dr., quería comentarle algo...', time: 'Ayer' }],
        3: [{ from: 'me', text: 'Perfecto, nos vemos en la sesión.', time: 'Hace 3 días' }]
    };
    
    const activeChat = selectedChat ? conversations.find(c => c.id === selectedChat) : null;

    return (
        <section className='px-11 py-5'>
            <div className="flex bg-white rounded-xl shadow-sm overflow-hidden " style={{minHeight: 'calc(100vh - 12rem)'}}>
                {/* Conversations List */}
                <div className={`w-full md:w-1/3 border-r border-gray-200 flex flex-col ${selectedChat && 'hidden md:flex'}`}>
                    <div className="p-4 border-b">
                        <input type="text" placeholder="Buscar en mensajes..." className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {conversations.map(conv => (
                            <div key={conv.id} onClick={() => setSelectedChat(conv.id)}
                                 className={`flex items-center gap-4 p-4 cursor-pointer border-l-4 ${selectedChat === conv.id ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:bg-gray-50'}`}>
                                <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full" />
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex justify-between items-center">
                                        <h5 className="font-semibold text-gray-800">{conv.name}</h5>
                                        <span className="text-xs text-gray-400">{conv.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                                        {conv.unread > 0 && <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{conv.unread}</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Chat Panel */}
                <div className="flex-1 flex flex-col">
                    {activeChat ? (
                        <>
                            <div className="p-4 border-b flex items-center gap-4">
                               {selectedChat && <button onClick={() => setSelectedChat(null)} className="md:hidden p-2 rounded-full hover:bg-gray-100"> &larr; </button>}
                                <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full" />
                                <h4 className="font-semibold text-gray-800">{activeChat.name}</h4>
                            </div>
                            <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
                                {messages[selectedChat].map((msg, i) => (
                                    <div key={i} className={`flex gap-3 ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.from === 'other' && <img src={activeChat.avatar} className="w-8 h-8 rounded-full" />}
                                        <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${msg.from === 'me' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                            <p>{msg.text}</p>
                                            <span className={`text-xs mt-1 block text-right ${msg.from === 'me' ? 'text-blue-200' : 'text-gray-500'}`}>{msg.time}</span>
                                        </div>
                                        {msg.from === 'me' && <img src="https://placehold.co/40x40/8DC8FA/FFFFFF?text=D" className="w-8 h-8 rounded-full" />}
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 bg-white border-t">
                                <div className="relative">
                                    <input type="text" placeholder="Escribe un mensaje..." className="w-full pr-12 pl-4 py-3 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2.5 rounded-full hover:bg-blue-600"><Send className="w-5 h-5" /></button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 bg-gray-50">
                            <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
                            <h3 className="text-xl font-semibold">Bienvenido a tus mensajes</h3>
                            <p>Selecciona una conversación para comenzar a chatear.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

// --- Layout Components ---

const navItemsList = [
    { id: 'inicio', text: 'Inicio', icon: <LayoutDashboard /> },
    { id: 'pacientes', text: 'Mis pacientes', icon: <Users /> },
    { id: 'solicitudes', text: 'Solicitudes', icon: <UserPlus /> },
    { id: 'agenda', text: 'Agenda', icon: <Calendar /> },
    { id: 'informes', text: 'Informes AI', icon: <FileText /> },
    { id: 'mensajes', text: 'Mensajes', icon: <MessageSquare /> },
];

const Sidebar = ({ isCollapsed, activeSection, setActiveSection }) => (
<aside className={`bg-white shadow-lg flex-shrink-0 flex flex-col justify-between transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20 p-2' : 'w-64 p-10'}`}>
        <div>
            <div className={`flex items-center gap-3 mb-10 ${isCollapsed ? 'justify-center' : ''}`}>
                <div className="p-2 rounded-lg">
                    <img src="/img/logo1.png" alt="Logo EVA"  className={`${isCollapsed ? 'w-12 h-12' : 'w-20 h-20'} object-contain mx-auto`} />
                </div>
                {!isCollapsed && <h1 className="text-2xl font-bold text-gray-800">EVA</h1>}
            </div>
            <nav className="flex flex-col gap-3">
                {navItemsList.map(item => (<a href="#" key={item.id} onClick={(e) => { e.preventDefault(); setActiveSection(item.id); }} className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${isCollapsed ? 'justify-center' : ''} ${activeSection === item.id ? 'bg-blue-100 font-semibold text-gray-800' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'}`}>{item.icon}{!isCollapsed && <span>{item.text}</span>}</a>))}
            </nav>
        </div>
        <div className="flex flex-col gap-3">
            <a href="#" className={`flex items-center gap-4 p-3 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 ${isCollapsed ? 'justify-center' : ''}`}><Settings />{!isCollapsed && <span>Configuración</span>}</a>
        </div>
    </aside>
);

const Header = ({ toggleSidebar, sectionTitle }) => (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100 text-gray-600"><PanelLeftClose /></button>
            <h2 className="text-xl font-semibold text-gray-800 capitalize">{sectionTitle}</h2>
        </div>
        <div className="flex items-center gap-6">
            <button className="relative text-gray-600 hover:text-gray-900"><Bell /><span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">2</span></button>
            <div className="flex items-center gap-3">
                <img src="https://placehold.co/40x40/8DC8FA/FFFFFF?text=D" alt="Avatar del psicólogo" className="w-10 h-10 rounded-full object-cover" />
                <div><p className="font-semibold text-sm text-gray-800">Adilene Ruiz</p><p className="text-xs text-gray-500">Psicólogo Clínico</p></div>
            </div>
            <button className="text-gray-600 hover:text-gray-900" title="Cerrar Sesión"><LogOut /></button>
        </div>
    </header>
);

// --- Main App Component ---

export default function App() {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');

    const renderSection = () => {
        switch (activeSection) {
            case 'inicio': return <DashboardSection />;
            case 'pacientes': return <PatientsSection />;
            case 'agenda': return <AgendaSection />;
            case 'informes': return <InformesSection />;
            case 'mensajes': return <MensajesSection />;
            default: return <DashboardSection />;
        }
    };
    
    const sectionName = navItemsList.find(item => item.id === activeSection)?.text || 'Dashboard';

    return (
        <div className="flex min-h-screen w-screen bg-gray-50 font-sans">
            <Sidebar isCollapsed={isSidebarCollapsed} activeSection={activeSection} setActiveSection={setActiveSection} />
            <div className="flex-1 flex flex-col min-h-screen w-full">
                <Header toggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)} sectionTitle={sectionName} />
                <main className="flex-1 flex flex-col w-full min-h-0 p-0">
                    {/* Elimina el div interior con padding, y aplica padding solo a los elementos que lo necesiten */}
                    {renderSection()}
                </main>
            </div>
        </div>
    );
}
