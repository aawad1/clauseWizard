import React from 'react';
import { Link } from 'react-router-dom';
import { Scroll, FileText, UserCircle, Bot } from 'lucide-react';

const Header: React.FC = () => {
  return (
      <header className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl">
                <Scroll className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ClauseWizzard</h1>
                <p className="text-sm text-gray-600">AI Asistent za Ugovore</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Početna
              </Link>
              <Link to="/create" className="text-gray-600 hover:text-blue-600 transition-colors">
                Kreiraj Ugovor
              </Link>
              <Link to="/assistant" className="text-gray-600 hover:text-blue-600 transition-colors">
                AI Asistent
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-blue-600 transition-colors">
                Profil Firme
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/assistant" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Bot className="h-6 w-6" />
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-blue-600 transition-colors">
                <UserCircle className="h-6 w-6" />
              </Link>
              <Link
                  to="/create"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl flex items-center space-x-2 transition-transform hover:scale-105"
              >
                <FileText className="h-5 w-5" />
                <span>Novi Ugovor</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;