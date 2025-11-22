import React from 'react';
import { parts } from "../../data/spareParts.js";
import { categories } from "../../data/spareParts.js";
import { useParts } from '../../context/spareParts.context.jsx';

const CategoriesPieces = () => {
    const { selectedCategory, setSelectedCategory } = useParts();

    const getCountByCategory = (categoryId) => {
        if (categoryId === 'todas') return parts.length;
        return parts.filter(part => part.category === categoryId).length;
    };

    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((category) => {
                    const IconComponent = category.icon;
                    const count = getCountByCategory(category.id);
                    return (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105 relative ${selectedCategory === category.id
                                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <IconComponent className="w-5 h-5" />
                            <span>{category.name}</span>
                            <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${selectedCategory === category.id
                                    ? 'bg-white/30 text-white'
                                    : 'bg-blue-100 text-blue-600'
                                }`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoriesPieces;