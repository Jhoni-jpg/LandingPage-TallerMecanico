import React from 'react';
import { ServicesProvider } from '../../context/services.context.jsx';
import { TipProvider } from '../../context/toolTip.context.jsx';
import SearchBar from '../../components/services/SearchBar.jsx';
import ServicesGrid from '../../components/services/ServicesGrid.jsx';
import QuickServices from '../../components/services/QuickServices.jsx';
import TooltipChatDemo from '../../components/ToolTip.jsx';
import Hero from '../../components/services/Hero.jsx';

export default function ServicesLayout() {
    return (
        <ServicesProvider>
            <Hero />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <SearchBar />
                    <QuickServices />
                    <TipProvider>
                        <ServicesGrid />
                        <TooltipChatDemo />
                    </TipProvider>
                </div>
            </div>
        </ServicesProvider>
    );
}