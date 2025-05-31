'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import SearchGitInput from '@/components/input/search-git-input';
import { FaInfo } from 'react-icons/fa';

export default function Hero() {
  return (
    <div className="relative w-full overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="absolute left-1/2 top-0 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:16px_16px] opacity-15"></div>

      <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 flex justify-center"
          >
            <div className="inline-flex items-center rounded-full border border-border bg-background/80 px-3 py-1 text-sm backdrop-blur-sm">
              <span className="mr-2 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">
                Sempre
              </span>
              <span className="text-muted-foreground">
                Melhorando sua experiência visual
              </span>
              <ChevronRight className="ml-1 h-4 w-4 text-muted-foreground" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-balance bg-gradient-to-tl from-primary/20 via-foreground/85 to-foreground/50 bg-clip-text text-center text-4xl tracking-tighter text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Mostre seu perfil no <span className="text-gradient">GitHub</span>{' '}
            de forma personalizada
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted-foreground"
          >
            Crie um perfil do GitHub único e impressionante com facilidade.
            Adicione seções customizadas, badges interativos, gráficos de
            contribuição e muito mais.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <SearchGitInput />

            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2 border-border"
            >
              <FaInfo size={10} />
              Sobre o projeto
            </Button>
          </motion.div>

          {/* Feature Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              type: 'spring',
              stiffness: 50,
            }}
            className="relative mx-auto mt-16 max-w-4xl"
          >
            <div className="overflow-hidden rounded-xl border border-border/40 bg-background/50 shadow-xl backdrop-blur-sm">
              <div className="flex h-10 items-center border-b border-border/40 bg-muted/50 px-4">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto flex items-center rounded-md bg-background/50 px-3 py-1 text-xs text-muted-foreground">
                  https://stylehub-profile.vercel.app
                </div>
              </div>
              <div className="relative">
                <Image
                  src={'/hero.png'}
                  width={1700}
                  height={1700}
                  alt="Hero"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0"></div>
              </div>
            </div>

            {/* Floating elements for visual interest */}
            <div className="absolute -right-6 -top-6 h-12 w-12 rounded-lg border border-border/40 bg-background/80 p-3 shadow-lg backdrop-blur-md">
              <div className="h-full w-full rounded-md bg-primary/20"></div>
            </div>
            <div className="absolute -bottom-4 -left-4 h-8 w-8 rounded-full border border-border/40 bg-background/80 shadow-lg backdrop-blur-md"></div>
            <div className="absolute -bottom-6 right-12 h-10 w-10 rounded-lg border border-border/40 bg-background/80 p-2 shadow-lg backdrop-blur-md">
              <div className="h-full w-full rounded-md bg-green-500/20"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
