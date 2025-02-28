import './footer.css'

export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white text-center py-4 mt-8 w-screen ">
        <p className="text-sm">&copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
      </footer>
    );
  }
  