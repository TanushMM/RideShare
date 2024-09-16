// src/components/Layout/Layout.jsx
import React from 'react';
import Header from './Header';
import ChatBot from './ChatBot';
import VirtualCompanion from './VirtualCompanion';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <ChatBot />
            <VirtualCompanion />
        </>
    );
};

export default Layout;