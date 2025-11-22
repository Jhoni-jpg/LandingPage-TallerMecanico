import React, { useState, useEffect } from 'react';
import { Wrench, Cpu, AlertCircle, Zap, Repeat, Activity, Settings } from 'lucide-react';

const servicesData = [
  {
    title: "Mantenimiento General",
    description:
      "Revisiones y mantenimiento preventivo para asegurar el correcto funcionamiento del vehículo.",
    icon: <Wrench size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Diagnóstico Computarizado",
    description:
      "Uso de escáneres avanzados para identificar fallos electrónicos en el vehículo.",
    icon: <Cpu size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Reparación de Frenos",
    description:
      "Servicio especializado en sistemas de freno para mayor seguridad en cada frenada.",
    icon: <AlertCircle size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Electricidad Automotriz",
    description:
      "Mantenimiento y reparación de sistemas eléctricos y electrónicos del vehículo.",
    icon: <Zap size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Alineación y Balanceo",
    description:
      "Alineamos y balanceamos las ruedas para un manejo más estable y seguro.",
    icon: <Repeat size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cambio de Llantas",
    description:
      "Servicio rápido y profesional para cambiar tus neumáticos cuando sea necesario.",
    icon: <Activity size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Reparación de Motor",
    description:
      "Diagnóstico profundo y reparación del motor para restaurar potencia y eficiencia.",
    icon: <Settings size={32} className="text-white" />,
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80",
  },
];

const Services = () => {
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setOffset((prev) => (prev - 0.5) % (servicesData.length * 350));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <>
      <style>{`
        @keyframes pulse-icon {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.15);
            opacity: 0;
          }
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        .service-card {
          border-radius: 20px;
          padding: 40px 30px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          min-height: 350px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        .service-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
          z-index: 3;
        }

        .service-card:hover::after {
          left: 100%;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 1;
        }

        .service-card:hover::before {
          opacity: 1;
        }

        .service-card-content {
          position: relative;
          z-index: 2;
          transition: all 0.4s ease;
        }

        .service-card:hover .service-card-content {
          transform: translateY(-10px);
        }

        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(37, 99, 235, 0.3), 0 0 0 2px rgba(37, 99, 235, 0.2);
          border-color: rgba(37, 99, 235, 0.3);
        }

        .service-icon {
          width: 80px;
          height: 80px;
          background: #1e40af;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px;
          transition: all 0.4s ease;
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
          position: relative;
        }

        .service-icon::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #1e40af);
          opacity: 0.3;
          z-index: -1;
          animation: pulse-icon 2s ease-in-out infinite;
        }

        .service-card:hover .service-icon {
          background: white;
          transform: scale(1.1) rotate(5deg);
        }

        .service-icon svg {
          color: white;
          transition: color 0.4s ease;
        }

        .service-card:hover .service-icon svg {
          color: rgb(97, 97, 97);
        }

        .service-card h3 {
          font-size: 1.5rem;
          color: #1e293b;
          margin-bottom: 15px;
          text-align: center;
          transition: color 0.4s ease;
          font-weight: 700;
        }

        .service-card:hover h3 {
          color: white;
        }

        .service-card p {
          color: #64748b;
          line-height: 1.6;
          text-align: center;
          transition: color 0.4s ease;
        }

        .service-card:hover p {
          color: rgba(255, 255, 255, 0.95);
        }
      `}</style>

      <section className="max-w-full py-12 px-12 mb-40 flex justify-center items-center" id="servicios">
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
            <p className="text-gray-600 text-lg mt-4">Soluciones integrales para mantener tu vehículo en perfecto estado</p>
          </div>
          
          <div className="relative overflow-hidden pb-14 pt-4">
            {/* Degradados en los bordes */}
            <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none" style={{
              background: 'linear-gradient(to right, white, transparent)'
            }} />
            <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none" style={{
              background: 'linear-gradient(to left, white, transparent)'
            }} />
            
            {/* Carrusel */}
            <div 
              className="relative flex gap-8"
              style={{
                transform: `translateX(${offset}px)`,
                width: 'fit-content'
              }}
            >
              {/* Duplicamos los servicios para el efecto infinito */}
              {[...servicesData, ...servicesData, ...servicesData].map((service, index) => (
                <div 
                  key={index}
                  className="service-card flex-shrink-0 w-80"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="service-card-content">
                    <div className="service-icon">
                      {service.icon}
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  
                  <style>{`
                    .service-card:nth-child(${index + 1})::before {
                      background-image: linear-gradient(
                          rgba(0, 0, 0, 0.5),
                          rgba(0, 0, 0, 0.5)
                        ),
                        url('${service.image}');
                    }
                  `}</style>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;