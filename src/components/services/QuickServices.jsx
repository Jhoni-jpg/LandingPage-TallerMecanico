import React from 'react';
import { motion } from 'framer-motion';
import { quickServices } from '../../data/service.js';
import { useServices } from '../../context/services.context.jsx';


export default function QuickServices() {
    const { selectedCategory, setSelectedCategory } = useServices();


    return (
        <div className="mb-8">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {quickServices.map((s) => {
                    const Icon = s.icon;
                    const active = selectedCategory === s.id;
                    return (
                        <motion.button
                            key={s.id}
                            onClick={() => setSelectedCategory(s.id)}
                            whileTap={{ scale: 0.97 }}
                            whileHover={{ scale: 1.03 }}
                            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-200 whitespace-nowrap shadow-lg flex-shrink-0
${active ? 'bg-white text-blue-600 border-2 border-blue-500' : 'bg-white text-gray-700 border-2 border-transparent hover:border-blue-200'}`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{s.name}</span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}