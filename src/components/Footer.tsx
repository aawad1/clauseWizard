import React from 'react';
import { Mail, Phone, MapPin, Scroll } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl">
                <Scroll className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">ClauseWizzard</h3>
                <p className="text-sm text-gray-600">AI Asistent za Ugovore</p>
              </div>
            </div>
            <p className="text-gray-600">
              Moderna platforma za kreiranje pravnih ugovora uz pomoć vještačke inteligencije.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Brzi Linkovi</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Početna
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Kreiraj Ugovor
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  O Nama
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pravno</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Uslovi Korištenja
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Privatnost
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Pravna Napomena
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-600">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Sarajevo, Bosna i Hercegovina</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-5 w-5 text-blue-600" />
                <span>+387 33 123 456</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <Mail className="h-5 w-5 text-blue-600" />
                <span>info@clausewizzard.ba</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} ClauseWizzard. Sva prava pridržana.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;