import Logo from '@/components/logo';
import { Separator } from '@/components/ui/separator';
import {
  Dribbble,
  Facebook,
  Github,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Github, label: 'GitHub' },
  { icon: Dribbble, label: 'Dribbble' },
];

const aboutLinks = [
  { text: 'Company History', href: '#' },
  { text: 'Meet the Team', href: '#' },
  { text: 'Employee Handbook', href: '#' },
  { text: 'Careers', href: '#' },
];

const serviceLinks = [
  { text: 'Web Development', href: '#' },
  { text: 'Web Design', href: '#' },
  { text: 'Marketing', href: '#' },
  { text: 'Google Ads', href: '#' },
];

const helpfulLinks = [
  { text: 'FAQs', href: '#' },
  { text: 'Support', href: '#' },
  { text: 'Live Chat', href: '#', hasIndicator: true },
];

const contactInfo = [
  { icon: Mail, text: 'Subhadeep' },
  { icon: Phone, text: '8637373116' },
  { icon: MapPin, text: 'Kolkata, India', isAddress: true },
];

export default function Footer() {
  return (
    <footer className="mt-16 w-full place-self-end rounded-t-xl bg-card dark:bg-card/20">
      <div className="px-4 py-8 space-y-5">
        <ul className="flex justify-center gap-6 md:gap-8">
          {socialLinks.map(({ icon: Icon, label }) => (
            <li key={label}>
              <Link
                href="#"
                className="text-primary transition hover:text-primary/80"
              >
                <span className="sr-only">{label}</span>
                <Icon className="size-6" />
              </Link>
            </li>
          ))}
        </ul>
        <Separator orientation='horizontal'/>

        <div>
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm sm:flex-row sm:text-left">
            <div className="flex items-center gap-2 text-secondary-foreground/70">
              <span>&copy; {new Date().getFullYear()}</span>
              <Logo />
            </div>

            <p className="text-sm text-secondary-foreground/70">
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
