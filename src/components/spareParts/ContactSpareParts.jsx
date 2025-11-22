import React from 'react';

const ContactSpareParts = () => {
    return (
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 text-center text-white shadow-2xl">
            {/* Contact CTA */ }
            <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
            <p className="text-xl mb-6 text-blue-100">
                Contáctanos y te ayudaremos a conseguir el repuesto que necesitas
            </p>
            <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg">
                Contactar Ahora
            </button>
        </div>
    );
}

export default ContactSpareParts;