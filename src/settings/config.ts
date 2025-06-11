export const appInformations = {
  logo: {
    url: '/',
    src: '/gitlogo.png',
    alt: 'logo',
    title: 'StyledHub',
  },
};

export const siteConfig = {
  site: {
    name: 'StyledHub',
    url: 'https://styledhub.dev',
    ogImage: '/ogimg.png',

    description:
      'StyledHub é um projeto open-source para compartilhar componentes estilizados e reutilizáveis. Desenvolvido por José Antonio Motta, explore o código-fonte e contribua no GitHub!',
    links: {
      instagram: 'https://www.instagram.com/joseantonio.motta/',
      linkedin: 'https://www.linkedin.com/in/jos%C3%A9-antonio-bueno-motta-61006a26b/',
      github: 'https://github.com/EuMotta',
    },
  },
  personalInfo: {
    name: 'José Antonio Motta',
    role: 'Desenvolvedor Fullstack',
    city: 'Guaratinguetá',
    state: 'SP',
    years_exp: '3+',
    projects_qty: '17+',
    country: 'Brazil',
    age: Idade(),
    email: 'hyperxmotta@gmail.com',
    phone: '+55 12 98765-4321',
    socialMedia: {
      instagram: 'https://www.instagram.com/joseantonio.motta/',
      linkedin: 'https://www.linkedin.com/in/jos%C3%A9-antonio-bueno-motta-61006a26b/',
      github: 'https://github.com/EuMotta',
    },
  },
};

function Idade() {
  const hoje = new Date();
  const nascimento = new Date('1999-11-05');
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
}
export type SiteConfig = typeof siteConfig;
