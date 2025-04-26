import React, { useState, useEffect } from 'react';
import { AdminProfile } from '../types';
import { ToastContainer, toast } from 'react-toastify';
import { Check } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

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
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

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
    setSaveSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      localStorage.setItem('adminProfile', JSON.stringify(profile));

      // Simulate a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 600));

      setSaveSuccess(true);
      toast.success('Profil je uspješno sačuvan!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error('Došlo je do greške prilikom čuvanja profila.');
    } finally {
      setIsSaving(false);
    }
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
                disabled={isSaving}
                className={`w-full py-3 px-6 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    saveSuccess
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
            >
              {isSaving ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : saveSuccess ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    <span>Sačuvano</span>
                  </>
              ) : (
                  'Sačuvaj podatke'
              )}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
  );
};

export default ProfilePage;