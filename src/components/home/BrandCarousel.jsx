import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import logo from '../../assets/vehicleBrands/index.js';

const AutoBrandsCarousel = () => {
    const [showAllBrands, setShowAllBrands] = useState(false);

    const brands = [
        { name: 'Audi', logo: logo.AUDI.src },
        { name: 'BMW', logo: logo.BMW.src },
        { name: 'Chevrolet', logo: logo.CHEVROLET.src },
        { name: 'Dodge', logo: logo.DODGE.src },
        { name: 'Ford', logo: logo.FORD.src },
        { name: 'Honda', logo: logo.HONDA.src },
        { name: 'Hyundai', logo: logo.HYUNDAI.src },
        { name: 'Kia', logo: logo.KIA.src },
        { name: 'Mazda', logo: logo.MAZDA.src },
        { name: 'Mercedes-Benz', logo: logo.MERCEDESBENZ.src },
        { name: 'Nissan', logo: logo.NISSAN.src },
        { name: 'Toyota', logo: logo.TOYOTA.src },
        { name: 'Volkswagen', logo: logo.VOLKSWAGEN.src },
        { name: 'Renault', logo: logo.RENAULT.src },
        { name: 'Peugeot', logo: logo.PEUGEOT.src },
        { name: 'Fiat', logo: logo.FIAT.src },
        { name: 'Jeep', logo: logo.JEEP.src },
        { name: 'Mitsubishi', logo: logo.MITSUBISHI.src },
        { name: 'Suzuki', logo: logo.SUZUKI.src },
        { name: 'Volvo', logo: logo.VOLVO.src },
        { name: 'Lexus', logo: logo.LEXUS.src },
        { name: 'Porsche', logo: logo.PORSCHE.src },
    ];

    // Duplicamos las marcas para crear el efecto infinito
    const duplicatedBrands = [...brands, ...brands, ...brands];

    useEffect(() => {
        if (showAllBrands) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto"; // cleanup
        };
    }, [showAllBrands]);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 mb-40">
            {/* Header */}
            <div className="text-center mb-12 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                    Reparamos una gran variedad de marcas de automoviles
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-3">
                    Taller Mecánico Automotriz en Barranquilla
                </p>
                <div className="w-32 h-1 bg-blue-400 mx-auto rounded-full"></div>
                <p className="text-gray-600 mt-4 text-lg">
                    Trabajamos con un gran conjunto las marcas y modelos de vehículos
                </p>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full max-w-7xl overflow-hidden">
                {/* Blur gradients en los bordes - BLANCO */}
                <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                {/* Scrolling container */}
                <div className="flex gap-8 animate-scroll py-8">
                    {duplicatedBrands.map((brand, index) => (
                        <div
                            key={`${brand.name}-${index}`}
                            className="flex-shrink-0 rounded-2xl p-8 hover:drop-shadow-2xl hover:scale-105 transition-all duration-300 drop-shadow-lg"
                            style={{ width: '180px', height: '180px' }}
                        >
                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="text-6xl mb-4 filter drop-shadow-lg">
                                    <img src={`${brand.logo}`} alt="logo de marca" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12">
                <button
                    onClick={() => setShowAllBrands(true)}
                    className="group outline outline-2 outline-blue-500 hover:outline-none overflow-hidden bg-transparent text-blue-600 font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 text-lg"
                >
                    <div className='absolute -z-10 top-20 left-0 group-hover:top-0 w-full h-full bg-blue-500 transition-top duration-500'></div>
                    <span className='group-hover:text-white duration-500'>
                        + Ver Todas las Marcas
                    </span>
                </button>
            </div>

            {/* Modal con todas las marcas */}
            {showAllBrands && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={() => setShowAllBrands(false)}
                >
                    <div
                        className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full my-8 animate-slideUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header del modal */}
                        <div className="text-white rounded-t-3xl p-4 border-b-2 border-gray-200 flex justify-end items-center">
                            <button
                                onClick={() => setShowAllBrands(false)}
                                className="bg-blue-300 hover:bg-white/30 rounded-full p-2 mr-6 transition-all duration-300 hover:scale-110"
                            >
                                <X className="text-blue-500 w-6 h-6" />
                            </button>
                        </div>

                        {/* Grid de marcas */}
                        <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-h-[60vh] overflow-y-auto">
                            {brands.map((brand, index) => (
                                <div
                                    key={`modal-${brand.name}-${index}`}
                                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer animate-fadeIn"
                                    style={{ animationDelay: `${index * 0.02}s` }}
                                >
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <div className="text-5xl mb-3 filter drop-shadow-lg">
                                            <img src={`${brand.logo}`} alt="logo de marca" />
                                        </div>
                                        <h3 className="text-sm font-bold text-gray-800 text-center tracking-wide">
                                            {brand.name}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer del modal */}
                        <div className="bg-gray-50 p-6 rounded-b-3xl border-t-2 border-gray-200 text-center">
                            <p className="text-gray-600 mb-4">¿No encuentras tu marca? Contáctanos</p>
                            <button
                                onClick={() => window.location.href = "/contacto"}
                                className="relative overflow-hidden bg-transparent group outline outline-2 outline-blue-500 hover:outline-none text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className='absolute z-10 -top-36 right-40 -rotate-45 w-full h-96 group-hover:-top-56 group-hover:right-36 bg-blue-500 transition-all duration-500'></div>
                                <div className='absolute z-10 -bottom-24 left-28 -rotate-45 w-full h-96 group-hover:-bottom-48 bg-blue-500 transition-all duration-500'></div>
                                <span className='relative z-20 group-hover:text-white duration-500'>Contactar</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default AutoBrandsCarousel;