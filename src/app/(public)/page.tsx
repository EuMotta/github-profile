import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import React from 'react';
import { FaArrowRight, FaMagic, FaPlayCircle } from 'react-icons/fa';
import '@/styles/home.css';
const page = () => {
  return (
    <div>
      <div>
        <div className="overflow-hidden bg-background p-8 font-sans text-white">
          <div className="relative">
            <div className="absolute -right-40 -top-40 h-96 w-96 animate-pulse rounded-full bg-orange-500 bg-opacity-20 opacity-20 blur-3xl"></div>
            <div className="absolute -left-40 top-20 h-96 w-96 animate-pulse rounded-full bg-purple-500 bg-opacity-20 opacity-20 blur-3xl"></div>
            <div className="absolute right-96 top-72 h-[500px] w-[500px] animate-pulse rounded-full bg-blue-500 bg-opacity-50 opacity-10 blur-3xl"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <nav className="mb-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Logo />
              </div>

              <div className="hidden items-center gap-8 md:flex">
                <a href="#" className="transition-colors hover:text-purple-300">
                  Features
                </a>
                <a href="#" className="transition-colors hover:text-purple-300">
                  Pricing
                </a>
                <a href="#" className="transition-colors hover:text-purple-300">
                  Showcase
                </a>
                <a href="#" className="transition-colors hover:text-purple-300">
                  Community
                </a>
              </div>

              <div className="flex items-center gap-4">
                <button className="rounded-full border border-purple-500/30 px-4 py-2 transition-all duration-300 hover:bg-purple-500/10">
                  Login
                </button>
                <button className="transform rounded-full bg-gradient-to-r from-purple-500 to-red-500 px-6 py-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 hover:from-purple-600 hover:to-red-600">
                  Get Started
                </button>
              </div>
            </nav>

            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="space-y-8">
                <h2 className="text-5xl font-bold leading-tight md:text-6xl">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                    Personalize
                  </span>{' '}
                  seu perfil no GitHub
                </h2>
                <p className="text-lg leading-relaxed text-gray-300">
                  Crie um perfil do GitHub único e impressionante com
                  facilidade. Adicione seções customizadas, badges interativos,
                  gráficos de contribuição e muito mais.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button className="bg-gradient flex items-center gap-2 rounded-full px-8 py-4 text-lg font-medium shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 hover:from-purple-600 hover:to-red-600">
                    Comece Agora
                    <FaArrowRight className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-full border-purple-500/30 px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-purple-500/10"
                  >
                    <FaPlayCircle className="h-5 w-5" />
                    Ver Demonstração
                  </Button>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-4">
                    <img
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?..."
                      alt="User"
                      className="h-10 w-10 rounded-full border-2 border-gray-900"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?..."
                      alt="User"
                      className="h-10 w-10 rounded-full border-2 border-gray-900"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?..."
                      alt="User"
                      className="h-10 w-10 rounded-full border-2 border-gray-900"
                    />
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-900 bg-purple-500/20 text-sm text-white">
                      +5k
                    </div>
                  </div>
                  <div className="text-sm text-gray-300">
                    Mais de 5.000 desenvolvedores já estão personalizando seus
                    perfis
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-red-500/20 blur-3xl"></div>
                <div className="relative transform rounded-2xl border border-purple-500/20 bg-gray-800/50 p-6 shadow-xl backdrop-blur-sm transition-all duration-500 hover:scale-[1.02]">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="transform rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/70 to-gray-900/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                      <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?..."
                        alt="GitHub Bio"
                        className="mb-3 h-40 w-full rounded-lg object-cover"
                      />
                      <h3 className="text-sm font-medium text-purple-300">
                        Bio Estilizada
                      </h3>
                    </div>
                    <div className="transform rounded-xl border border-red-500/20 bg-gradient-to-br from-red-900/70 to-gray-900/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                      <img
                        src="https://images.unsplash.com/photo-1655635949212-1d8f4f103ea1?..."
                        alt="Contribution graph"
                        className="mb-3 h-40 w-full rounded-lg object-cover"
                      />
                      <h3 className="text-sm font-medium text-red-300">
                        Gráficos Dinâmicos
                      </h3>
                    </div>
                    <div className="col-span-2 transform rounded-xl border border-purple-500/20 bg-gradient-to-br from-gray-900/70 to-purple-900/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                      <img
                        src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?..."
                        alt="Profile layout"
                        className="mb-3 h-48 w-full rounded-lg object-cover"
                      />
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-300">
                          Layouts Personalizados
                        </h3>
                        <div className="flex gap-2">
                          {/* ícones de interação aqui (curtir, comentar, etc.) */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-4 rounded-xl border border-purple-500/10 bg-gray-800/50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-red-500">
                      <FaMagic className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700/50">
                        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-purple-500 to-red-500"></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-gray-400">
                        <span>Gerando perfil...</span>
                        <span>75%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
