import { Paintbrush, Code, PlusCircle } from 'lucide-react';
import React from 'react';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: <Paintbrush className="h-6 w-6" />,
    title: 'Personalize seu Perfil',
    description:
      'Altere cores, bordas, temas e estilos para deixar seu perfil do GitHub com a sua cara.',
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: 'Totalmente Editável',
    description:
      'Modifique layouts, fontes e componentes facilmente com opções flexíveis e intuitivas.',
  },
  {
    icon: <PlusCircle className="h-6 w-6" />,
    title: 'Adicione Funcionalidades',
    description: 'Inclua blocos extras, como estatísticas, contribuições e repositórios favoritos.',
  },
];

interface FeatureCardProps {
  feature: FeatureItem;
}

const FeatureCard: React.FC<FeatureCardProps> = React.memo(({ feature }) => (
  <li className="transform-gpu space-y-3 rounded-xl border bg-transparent p-4 [box-shadow:0_-20px_80px_-20px_hsla(var(--primary)_/_0.2)_inset]">
    <div className="w-fit transform-gpu rounded-full border p-4 text-primary [box-shadow:0_-20px_80px_-20px_#ff7aa43f_inset] dark:[box-shadow:0_-20px_80px_-20px_#ff7aa40f_inset]">
      {feature.icon}
    </div>
    <h4 className="font-geist text-lg font-bold tracking-tighter">{feature.title}</h4>
    <p className="text-muted-foreground">{feature.description}</p>
  </li>
));

const Feature: React.FC = () => (
  <section className="relative flex h-screen items-center py-14">
    <div className="mx-auto max-w-screen-xl px-4 md:px-8">
      <header className="relative mx-auto max-w-2xl sm:text-center">
        <div className="relative z-10">
          <h3 className="font-geist mt-4 text-3xl font-normal tracking-tighter sm:text-4xl md:text-5xl">
            Personalize seu perfil do GitHub
          </h3>
          <p className="font-geist mt-3 text-foreground/60">
            Crie um visual único para o seu perfil com temas, estilos e componentes personalizados.
          </p>
        </div>
        <div
          className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
          style={{
            background:
              'linear-gradient(152.92deg, rgba(192, 15, 102, 0.2) 4.54%, rgba(192, 11, 109, 0.26) 34.2%, rgba(192, 15, 102, 0.1) 77.55%)',
          }}
        />
      </header>
      <hr className="mx-auto mt-5 h-px w-1/2 bg-foreground/30" />
      <ul className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </ul>
    </div>
  </section>
);

export default Feature;
