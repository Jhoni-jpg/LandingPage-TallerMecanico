import { Zap, Disc, Settings, Filter, Radio, Wind, Droplets, Fuel, Thermometer, Activity } from 'lucide-react';

export const categories = [
    { id: 'todas', name: 'Todas', icon: Settings },
    { id: 'motor', name: 'Motor', icon: Settings },
    { id: 'frenos', name: 'Frenos', icon: Disc },
    { id: 'suspension', name: 'Suspensión', icon: Activity },
    { id: 'electrico', name: 'Sistema Eléctrico', icon: Zap },
    { id: 'transmision', name: 'Transmisión', icon: Settings },
    { id: 'filtros', name: 'Filtros', icon: Filter },
];

export const parts = [
    {
        id: 1,
        name: 'Pastillas de Freno',
        category: 'frenos',
        price: '150,000',
        stock: true,
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
        icon: Disc,
        description: 'Pastillas de freno de alto rendimiento'
    },
    {
        id: 2,
        name: 'Discos de Freno',
        category: 'frenos',
        price: '280,000',
        stock: true,
        image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop',
        icon: Disc,
        description: 'Discos ventilados para mayor durabilidad'
    },
    {
        id: 3,
        name: 'Amortiguadores',
        category: 'suspension',
        price: '320,000',
        stock: true,
        image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop',
        icon: Activity,
        description: 'Amortiguadores delanteros y traseros'
    },
    {
        id: 4,
        name: 'Batería',
        category: 'electrico',
        price: '450,000',
        stock: true,
        image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop',
        icon: Zap,
        description: 'Batería 12V libre de mantenimiento'
    },
    {
        id: 5,
        name: 'Alternador',
        category: 'electrico',
        price: '380,000',
        stock: true,
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
        icon: Zap,
        description: 'Alternador reconstruido con garantía'
    },
    {
        id: 6,
        name: 'Bujías',
        category: 'motor',
        price: '45,000',
        stock: true,
        image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=300&fit=crop',
        icon: Zap,
        description: 'Set de 4 bujías de platino'
    },
    {
        id: 7,
        name: 'Filtro de Aceite',
        category: 'filtros',
        price: '35,000',
        stock: true,
        image: 'https://images.unsplash.com/photo-1632058001970-02c0e8a9d6f4?w=400&h=300&fit=crop',
        icon: Filter,
        description: 'Filtro de aceite de alta eficiencia'
    },
    {
        id: 8,
        name: 'Filtro de Aire',
        category: 'filtros',
        price: '55,000',
        stock: true,
        image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop',
        icon: Wind,
        description: 'Filtro de aire de alto flujo'
    },
    {
        id: 9,
        name: 'Correa de Distribución',
        category: 'motor',
        price: '180,000',
        stock: true,
        image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=400&h=300&fit=crop',
        icon: Settings,
        description: 'Kit completo con tensor'
    },
    {
        id: 10,
        name: 'Bomba de Agua',
        category: 'motor',
        price: '220,000',
        stock: true,
        image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=400&h=300&fit=crop',
        icon: Droplets,
        description: 'Bomba de agua con sello mejorado'
    },
    {
        id: 11,
        name: 'Embrague',
        category: 'transmision',
        price: '650,000',
        stock: true,
        image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop',
        icon: Settings,
        description: 'Kit completo de embrague'
    },
    {
        id: 12,
        name: 'Rotulas',
        category: 'suspension',
        price: '120,000',
        stock: true,
        image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=400&h=300&fit=crop',
        icon: Activity,
        description: 'Rótulas de suspensión reforzadas'
    },
    {
        id: 13,
        name: 'Radiador',
        category: 'motor',
        price: '450,000',
        stock: false,
        image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop',
        icon: Thermometer,
        description: 'Radiador de aluminio'
    },
    {
        id: 14,
        name: 'Bomba de Gasolina',
        category: 'motor',
        price: '320,000',
        stock: true,
        image: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=400&h=300&fit=crop',
        icon: Fuel,
        description: 'Bomba eléctrica de combustible'
    },
    {
        id: 15,
        name: 'Sensor de Oxígeno',
        category: 'electrico',
        price: '280,000',
        stock: true,
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
        icon: Radio,
        description: 'Sensor O2 universal'
    },
    {
        id: 16,
        name: 'Filtro de Combustible',
        category: 'filtros',
        price: '48,000',
        stock: true,
        image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop',
        icon: Fuel,
        description: 'Filtro de combustible premium'
    },
    {
        id: 17,
        name: 'Termostato',
        category: 'motor',
        price: '85,000',
        stock: true,
        image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=400&h=300&fit=crop',
        icon: Thermometer,
        description: 'Termostato con junta incluida'
    },
    {
        id: 18,
        name: 'Bobinas de Encendido',
        category: 'electrico',
        price: '165,000',
        stock: true,
        image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=300&fit=crop',
        icon: Zap,
        description: 'Set de bobinas de alta energía'
    },
];