'use client';
import { Button } from '@/components/ui/button';
import { FaArrowRight, FaMagic } from 'react-icons/fa';
import '@/styles/home.css';
import SearchGitInput from '@/components/input/search-git-input';
import Image from 'next/image';
import Feature from '@/templates/features';
import CallToAction from '@/templates/homepage/call-to-action';
import Hero from '@/templates/homepage/hero';
import Team from '@/templates/homepage/team';
const page = () => {
  return (
    <div>
      <div className="container mx-auto">
       {/*  <div className="p-8">
          <div className="relative">
            <div className="absolute -top-40 right-40 h-96 w-96 animate-pulse rounded-full bg-orange-500 bg-opacity-20 opacity-20 blur-3xl"></div>
            <div className="absolute -left-40 top-20 h-96 w-96 animate-pulse rounded-full bg-primary/20 bg-opacity-20 opacity-20 blur-3xl"></div>
            <div className="absolute right-96 top-96 h-[200px] w-[200px] animate-pulse rounded-full bg-primary/20 bg-opacity-50 opacity-10 blur-3xl"></div>
          </div>

          <div className="">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="space-y-6 max-w-xl">
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

                <SearchGitInput />
                <p className="text-lg leading-relaxed">
                  Personalize seu perfil agora mesmo!
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-red-500/20 blur-3xl"></div>
                <div className="relative transform rounded-2xl border bg-card p-6 shadow-xl backdrop-blur-sm transition-all duration-500 hover:scale-[1.02]">
                  <Image
                    src={'/hero.png'}
                    width={700}
                    height={700}
                    alt="Hero"
                    className="rounded-2xl border"
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <Hero />
        <Feature />
      </div>
      {/* <Team /> */}
    </div>
  );
};

export default page;
