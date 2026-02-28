import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'UMBRA', href: '/umbra' },
  { name: 'Encuesta', href: '/encuesta' },
    { name: 'Términos y Condiciones', href: '/terms' },
];

const serviciosDropdown = [
  { name: 'Dinamo', href: 'https://dinamoapp.com/', external: true },
  { name: 'EVA Salud Nutricional', href: '/eva-nutricional', external: false },
  { name: 'EVA Better Job', href: '/eva-better-job', external: false },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [serviciosOpen, setServiciosOpen] = useState(false);
  const closeTimeout = useRef();

  // Mantener abierto el dropdown mientras el mouse esté sobre el botón o el menú
  const handleServiciosEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setServiciosOpen(true);
  };
  const handleServiciosLeave = () => {
    closeTimeout.current = setTimeout(() => setServiciosOpen(false), 150);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between pr-5 pl-0 py-2 sm:pl-0 sm:pr-6 lg:pl-5 lg:pr-20">
        <div className="flex lg:flex-1">
          <Link to="/" className="">
            <span className="sr-only">EVA Salud Mental</span>
            <img
              alt=""
              src="img/logo1.png"
              className="h-35 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#023d6d]"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        {/* Navbar opciones */}
        <div className="hidden lg:flex lg:gap-x-12 ">
          {/* Servicios Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleServiciosEnter}
            onMouseLeave={handleServiciosLeave}
          >
            <button
              className="border-b-4 border-b-[#8dc7fa00] px-5 rounded-md text-sm/6 font-semibold text-[#023d6d] hover:text-[#8dc7fac2] hover:border-b-4 hover:border-b-[#8dc7fac2] flex items-center gap-1"
              onClick={() => setServiciosOpen((open) => !open)}
              type="button"
            >
              Servicios
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {serviciosOpen && (
              <div
                className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                onMouseEnter={handleServiciosEnter}
                onMouseLeave={handleServiciosLeave}
              >
                <div className="py-1">
                  {serviciosDropdown.map((item) =>
                    item.external ? (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-[#023d6d] hover:bg-[#f0f8ff] hover:text-[#8dc7fac2]"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-4 py-2 text-sm text-[#023d6d] hover:bg-[#f0f8ff] hover:text-[#8dc7fac2]"
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
          {/* Resto de navegación */}
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className="border-b-4 border-b-[#8dc7fa00] px-5 rounded-md text-sm/6 font-semibold text-[#023d6d] 
              hover:text-[#8dc7fac2] hover:border-b-4 hover:border-b-[#8dc7fac2] ">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/" className="text-sm/6 font-semibold text-[#023d6d]">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* Menú móvil */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="img/logo.png"
                className="h-20 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {/* Servicios Dropdown en móvil */}
                <div className="block">
                  <span className="block px-3 py-2 text-base/7 font-semibold text-gray-900">
                    Servicios
                  </span>
                  <div className="pl-4">
                    {serviciosDropdown.map((item) =>
                      item.external ? (
                        <a
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-3 py-2 text-base/7 text-[#023d6d] hover:bg-[#f0f8ff] hover:text-[#8dc7fac2]"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block px-3 py-2 text-base/7 text-[#023d6d] hover:bg-[#f0f8ff] hover:text-[#8dc7fac2]"
                        >
                          {item.name}
                        </Link>
                      )
                    )}
                  </div>
                </div>
                {/* Resto de navegación */}
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  to="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
