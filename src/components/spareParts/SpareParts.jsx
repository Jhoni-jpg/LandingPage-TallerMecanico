import React from 'react';
import { Search, ShoppingCart, Check } from 'lucide-react';
import { parts } from "../../data/spareParts.js";
import { useParts } from '../../context/spareParts.context.jsx';

const Parts = () => {
    const { selectedCategory, searchTerm } = useParts();

    const filteredParts = parts.filter(part => {
        const matchesCategory =
            selectedCategory === "todas" || part.category === selectedCategory;

        const matchesSearch =
            (part?.name ?? "")
                .toLowerCase()
                .includes((searchTerm ?? "").toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        < div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" >
            {/* Parts Grid */}
            {
                filteredParts.map((part, index) => {
                    const IconComponent = part.icon;
                    return (
                        <div
                            key={part.id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden group"
                        >
                            {/* Stock Badge */}
                            {part.stock ? (
                                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg z-10">
                                    <Check className="w-3 h-3" />
                                    Disponible
                                </div>
                            ) : (
                                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                                    Agotado
                                </div>
                            )}

                            {/* Image Section */}
                            <div className="relative h-48 overflow-hidden bg-gray-200">
                                <img
                                    src={part.image}
                                    alt={part.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                                    <IconComponent className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {part.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                    {part.description}
                                </p>

                                {/* Price and Action */}
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                                    <div>
                                        <p className="text-sm text-gray-500">Precio</p>
                                        <p className="text-2xl font-bold text-blue-600">
                                            ${part.price}
                                        </p>
                                    </div>
                                    <button
                                        disabled={!part.stock}
                                        className={`p-3 rounded-full transition-all duration-300 ${part.stock
                                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white hover:scale-110 shadow-lg'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })
            }

            {/* Empty State */}
            {filteredParts.length === 0 && (
                <div className="text-center py-16">
                    <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">No se encontraron repuestos</h3>
                    <p className="text-gray-500">Intenta con otra búsqueda o categoría</p>
                </div>
            )}
        </div >
    );
};

export default Parts;