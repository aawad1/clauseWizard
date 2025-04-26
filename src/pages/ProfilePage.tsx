import React, { useState, useEffect } from 'react';
import { AdminProfile } from '../types';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile>({
    naziv_firme: '',
    oib_firme: '',
    adresa_firme: '',
    ime_prezime_zastupnika: '',
    oib_zastupnika: '',
    broj_ziro_racuna: '',
    naziv_banke: ''
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('adminProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('adminProfile', JSON.stringify(profile));
    alert('Profil je uspješno sačuvan!');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Podaci o firmi</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Naziv firme
              </label>
              <input
                type="text"
                name="naziv_firme"
                value={profile.naziv_firme}
                onChange={handleChange}
                placeholder="npr. Firma Admin d.o.o."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OIB firme
              </label>
              <input
                type="text"
                name="oib_firme"
                value={profile.oib_firme}
                onChange={handleChange}
                placeholder="npr. 12345678901"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresa firme
            </label>
            <input
              type="text"
              name="adresa_firme"
              value={profile.adresa_firme}
              onChange={handleChange}
              placeholder="npr. Ulica Admina 1, 71000 Sarajevo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ime i prezime zastupnika
              </label>
              <input
                type="text"
                name="ime_prezime_zastupnika"
                value={profile.ime_prezime_zastupnika}
                onChange={handleChange}
                placeholder="npr. Admin Korisnik"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OIB zastupnika
              </label>
              <input
                type="text"
                name="oib_zastupnika"
                value={profile.oib_zastupnika}
                onChange={handleChange}
                placeholder="npr. 10987654321"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Broj žiro računa
              </label>
              <input
                type="text"
                name="broj_ziro_racuna"
                value={profile.broj_ziro_racuna}
                onChange={handleChange}
                placeholder="npr. 123-456789-012"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Naziv banke
              </label>
              <input
                type="text"
                name="naziv_banke"
                value={profile.naziv_banke}
                onChange={handleChange}
                placeholder="npr. Banka Admin d.d."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Sačuvaj podatke
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;