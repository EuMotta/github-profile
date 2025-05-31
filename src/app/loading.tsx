'use client';

import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex h-[70vh] flex-1 flex-col items-center justify-center">
      <div className="animate-bounce">
        <div className="z-50">
          <Image
            src="/logo.png"
            alt="Leonardo.Ai logo"
            width={100}
            height={100}
            className="object-contain"
            priority
          />
        </div>
      </div>
      <span className="bg-gradient-to-r text-2xl from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
        Carregando...
      </span>
    </div>
  );
}
