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
  {
    path: '/cart',
    component: lazy(() => import('@pages/Cart/Cart.jsx')),
  },
  {
    path: '/about-us',
    component: lazy(() => import('@pages/AboutUs/AboutUs.jsx')),
  },
  {
    path: '/my-account',
    component: lazy(() => import('@pages/MyAccount/MyAccount.jsx')),
  },
];

export default routers;
