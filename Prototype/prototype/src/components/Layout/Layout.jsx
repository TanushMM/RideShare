// src/components/Layout/Layout.jsx
import React from 'react';
import Header from './Header';
import ChatBot from '../ChatBot';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <ChatBot />
        </>
    );
};

export default Layout;