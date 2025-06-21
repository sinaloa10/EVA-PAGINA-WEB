import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  const socialLinks = [
    { name: 'Facebook', icon: FaFacebookF, url: 'https://facebook.com' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com' },
    { name: 'LinkedIn', icon: FaLinkedinIn, url: 'https://linkedin.com' },
  ];

  const linkSections = [
    {
      title: 'Nuestra Misión',
      links: [
        { name: 'Acerca de Nosotros', path: '/about' },
        { name: 'Nuestro Equipo', path: '/team' },
        { name: 'Blog', path: '/blog' },
      ],
    },
    {
      title: 'Recursos',
      links: [
        { name: 'Artículos', path: '/articles' },
        { name: 'Guías', path: '/guides' },
        { name: 'Testimonios', path: '/testimonials' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Términos y Condiciones', path: '/terms' },
        { name: 'Política de Privacidad', path: '/privacy' },
        { name: 'Contacto', path: '/contact' },
      ],
    },
  ];

  return (
    // CAMBIO: Se reemplaza "bg-brand" por el color estático.
    <footer className="bg-[#8DC8FA] text-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Contenedor principal del grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Sección de la Marca */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900">
              EVA SALUD MENTAL
            </Link>
            <p className="mt-4 text-sm text-gray-700">
              Tu espacio seguro para el bienestar emocional. Estamos aquí para apoyarte en cada paso de tu camino.
            </p>
            <div className="flex space-x-5 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Síguenos en ${social.name}`}
                  // CAMBIO: Se reemplazan "hover:text-brand-dark" y "dark:hover:text-brand" por colores estáticos.
                  className="text-gray-600 hover:text-[#5F97C9] transition-transform duration-300 hover:scale-110"
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Secciones de Enlaces */}
          {linkSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-900">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      // CAMBIO: Se reemplazan "hover:text-brand-dark" y "dark:hover:text-brand" por colores estáticos.
                      className="text-base text-gray-700 hover:text-[#5F97C9] transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Separador y Copyright */}
        <div className="mt-12 border-t border-gray-400/50 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-700">
            &copy; {new Date().getFullYear()} EVA SALUD MENTAL. Todos los derechos reservados.
          </p>
          <p className="text-sm text-gray-700 mt-4 sm:mt-0">
            Escucharte con empatía, ayudarte con inteligencia.
          </p>
        </div>

      </div>
    </footer>
  );
}