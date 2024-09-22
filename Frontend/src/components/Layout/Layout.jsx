import React from 'react';
import Header from './Header';
import ChatBot from './ChatBot';
import VirtualCompanion from './VirtualCompanion';
import './Layout.css'; // Import your CSS file

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <ChatBot />
      <VirtualCompanion />
    </div>
  );
};

export default Layout;