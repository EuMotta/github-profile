import { MdFavorite } from 'react-icons/md';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Organizations = () => {
  const organizations = [
    {
      name: 'React Community',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png',
    },
    {
      name: 'TypeScript',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png',
    },
    {
      name: 'Node.js Foundation',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png',
    },
    {
      name: 'Open Source Collective',
      logo: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <MdFavorite className="text-primary" />
          Organizations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {organizations.map((org, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 rounded-lg bg-muted p-3 transition-colors duration-200 hover:bg-muted-foreground/10"
            >
              <img
                src={org.logo}
                alt={org.name}
                className="h-12 w-12 object-contain"
              />
              <div className="text-center text-sm font-medium">{org.name}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default Organizations;
