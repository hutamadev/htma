declare module '*.css';
declare module 'baffle';

interface Inputs {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

interface IPortfolio {
  id: string;
  title: string;
  image: string;
  url: string;
  repo?: string;
}
