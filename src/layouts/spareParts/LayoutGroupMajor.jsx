import React from 'react';
import HeaderPieces from '../../components/spareParts/HeaderSpareParts.jsx';
import Parts from '../../components/spareParts/SpareParts.jsx';
import CategoriesPieces from '../../components/spareParts/CategoriesSpareParts.jsx';
import ContactSpareParts from '../../components/spareParts/ContactSpareParts.jsx';
import { PartsProvider } from '../../context/spareParts.context.jsx';

export default function Layout() {
    return (
        <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
            <div class="max-w-7xl mx-auto">
                <PartsProvider>
                    <HeaderPieces />
                    <CategoriesPieces />
                    <Parts />
                    <ContactSpareParts />
                </PartsProvider>
            </div>
        </div>
    );
}