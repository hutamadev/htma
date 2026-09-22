declare module '*.css';

interface Inputs {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

interface IPortfolio {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  repo?: string;
}
