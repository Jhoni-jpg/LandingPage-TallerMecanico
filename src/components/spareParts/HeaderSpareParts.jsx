import React from 'react';
import { Search } from 'lucide-react';
import { useParts } from '../../context/spareParts.context.jsx';

const HeaderPieces = () => {
    const { searchTerm, setSearchTerm } = useParts();

    return (
        <div className="mb-8 max-w-2xl mx-auto">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Buscar repuestos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default HeaderPieces;