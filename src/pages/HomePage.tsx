import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, Clock, CheckCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg')] opacity-10 bg-cover bg-center"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            Kreirajte ugovore <span className="text-amber-300">brzo i jednostavno</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100">
            Profesionalni ugovori prilagođeni vašim potrebama, spremni za nekoliko minuta
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/create"
              className="bg-white text-blue-700 py-4 px-8 rounded-xl text-lg font-semibold flex items-center justify-center space-x-2 transition-transform hover:scale-105"
            >
              <FileText className="h-5 w-5" />
              <span>Kreiraj Ugovor</span>
            </Link>
            <Link
              to="#kako-radi"
              className="bg-blue-600 text-white py-4 px-8 rounded-xl text-lg font-semibold transition-transform hover:scale-105"
            >
              Saznaj Više
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="kako-radi" className="py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Kako Funkcioniše</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tri jednostavna koraka do vašeg profesionalnog ugovora
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform -rotate-6">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">1. Popunite podatke</h3>
            <p className="text-gray-600 text-lg">
              Unesite osnovne informacije o ugovornim stranama kroz naš intuitivni formular
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="bg-amber-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform -rotate-6">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">2. AI generacija</h3>
            <p className="text-gray-600 text-lg">
              Naš sistem automatski kreira prilagođen ugovor prema vašim potrebama
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="bg-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform -rotate-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">3. Preuzmite</h3>
            <p className="text-gray-600 text-lg">
              Pregledajte i preuzmite vaš profesionalno formatirani ugovor
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Zašto ClauseWizzard?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Moderna rješenja za moderne poslovne potrebe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto px-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-blue-600 p-3 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Pravna Sigurnost</h3>
              <p className="text-gray-600 text-lg">
                Svi ugovori su usklađeni sa važećim zakonima BiH i redovno se ažuriraju
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-amber-500 p-3 rounded-xl">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Ušteda Vremena</h3>
              <p className="text-gray-600 text-lg">
                Završite proces za nekoliko minuta umjesto nekoliko dana
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-green-600 p-3 rounded-xl">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Personalizacija</h3>
              <p className="text-gray-600 text-lg">
                Svaki ugovor je prilagođen vašim specifičnim potrebama
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-indigo-600 p-3 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Pristupačnost</h3>
              <p className="text-gray-600 text-lg">
                Profesionalni pravni dokumenti bez visokih advokatskih naknada
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl py-16 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Spremni za kreiranje vašeg ugovora?
          </h2>
          <Link
            to="/create"
            className="inline-flex items-center bg-white text-blue-700 py-4 px-8 rounded-xl text-lg font-semibold transition-transform hover:scale-105"
          >
            <FileText className="h-5 w-5 mr-2" />
            Započni Odmah
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;