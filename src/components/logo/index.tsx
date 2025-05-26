import { appInformations } from '@/settings/config';
import Image from 'next/image';
import React from 'react';

const Logo = () => {
  return (
    <a href={appInformations.logo.url} className="flex items-center gap-2">
      <Image
        src={appInformations.logo.src}
        width={50}
        height={50}
        className="max-h-12 max-w-12"
        alt={appInformations.logo.alt}
      />
      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-lg font-semibold tracking-tighter text-transparent">
        {appInformations.logo.title}
      </span>
    </a>
  );
};

export default Logo;
