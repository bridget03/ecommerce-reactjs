import { lazy } from 'react';
const routers = [
  {
    path: '/',
    component: lazy(() => import('@components/HomePage/HomePage.jsx')),
  },
  {
    path: '/blog',
    component: lazy(() => import('@components/Blog/Blog.jsx')),
  },
  {
    path: '/shop',
    component: lazy(() => import('@pages/OurShop/OurShop.jsx')),
  },
];

export default routers;
