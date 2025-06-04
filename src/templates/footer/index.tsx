import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/settings/config';
import { Dribbble, Facebook, Github, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const socialLinks = [
  { icon: FaLinkedin, label: 'Linkedin', href: siteConfig.personalInfo.socialMedia.linkedin },
  { icon: FaGithub, label: 'GitHub', href: siteConfig.personalInfo.socialMedia.github },
];

export default function Footer() {
  return (
    <footer className="mt-16 w-full place-self-end rounded-t-xl bg-card dark:bg-card/20">
      <div className="space-y-5 px-4 py-8">
        <ul className="flex justify-center gap-6 md:gap-8">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <Button
                href={link.href}
                target="_blank"
                variant={'link'}
                className="text-primary transition hover:text-primary/80"
              >
                <span className="sr-only">{link.label}</span>
                <link.icon className="size-6" />
              </Button>
            </li>
          ))}
        </ul>
        <Separator orientation="horizontal" />

        <div>
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm sm:flex-row sm:text-left">
            <div className="flex items-center gap-2 text-secondary-foreground/70">
              <span>&copy; {new Date().getFullYear()}</span>
              <Logo />
            </div>

            <p className="text-sm text-secondary-foreground/70">All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
