import coinWatch from '@public/assets/images/portfolio/coin-watch-mockup.webp';
import garuda from '@public/assets/images/portfolio/garuda-mockup.webp';
import ibrahim from '@public/assets/images/portfolio/ibrahim-law-mockup.webp';
import taskify from '@public/assets/images/portfolio/taskify-mockup.webp';
import todoApp from '@public/assets/images/portfolio/todo-app-mockup.webp';
import urban from '@public/assets/images/portfolio/urban-shop-mockup.webp';
import shortfly from '@public/assets/images/portfolio/url-shortly-mockup.webp';

export const portfolioData: IPortfolio[] = [
  {
    id: '01',
    title: 'Garuda Universe',
    description:
      'Validator site for Classic Chain with auto-compounding delegation and live network stats.',
    image: garuda.src,
    url: 'https://garudaverse.tech/',
    repo: undefined,
  },
  {
    id: '02',
    title: 'Ibrahim Law',
    description:
      'Law firm profile site with practice areas, attorney roster, and an appointment enquiry form.',
    image: ibrahim.src,
    url: 'https://ibrahim-law.vercel.app/',
    repo: undefined,
  },
  {
    id: '03',
    title: 'Urban Fashion Shop',
    description:
      'Online fashion store with product catalog, wishlist, cart, and a full checkout flow.',
    image: urban.src,
    url: 'https://urban-fashion.htma.my.id/',
    repo: 'https://github.com/hutamadev/urban-fashion-shop',
  },
  {
    id: '04',
    title: 'Taskify',
    description:
      'Task management app with categories, progress tracking, and user authentication.',
    image: taskify.src,
    url: 'https://github.com/hutamadev/taskify/releases/tag/1.1.0',
    repo: 'https://github.com/hutamadev/taskify',
  },
  {
    id: '05',
    title: 'Crypto Price Watcher',
    description:
      'Real-time crypto price tracker powered by CoinGecko, with market news and pagination.',
    image: coinWatch.src,
    url: 'https://cryptoprices-watcher.vercel.app/',
    repo: 'https://github.com/hutamadev/cryptoprices-watcher',
  },
  {
    id: '06',
    title: 'Url Shortfly',
    description:
      'URL shortener with one-click copy and a persistent history of shortened links.',
    image: shortfly.src,
    url: 'https://url-shortfly.vercel.app/',
    repo: 'https://github.com/hutamadev/url-shortfly',
  },
  {
    id: '07',
    title: 'Todolist App',
    description:
      'Todo app with categories, status filters, and a separate backend service.',
    image: todoApp.src,
    url: 'https://todolist-app-project.vercel.app/',
    repo: 'https://github.com/hutamadev/todolist-app',
  },
];
