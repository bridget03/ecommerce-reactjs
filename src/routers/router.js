// import { lazy } from 'react';
// const AdminLogin = lazy(() => import('@pages/Admin/login/Login.jsx'));
// const AdminDashboard = lazy(() =>
//   import('@pages/Admin/Dashboard/Dashboard.jsx')
// );
// const AdminUsers = lazy(() => import('@pages/Admin/Users/Users.jsx'));
// const AppRoutes = [
//   {
//     path: '/',
//     component: lazy(() => import('@components/HomePage/HomePage.jsx')),
//   },
//   {
//     path: '/blog',
//     component: lazy(() => import('@components/Blog/Blog.jsx')),
//   },
//   {
//     path: '/shop',
//     component: lazy(() => import('@pages/User/OurShop/OurShop.jsx')),
//   },
//   {
//     path: '/product/:id',
//     component: lazy(() =>
//       import('@pages/User/DetailProduct/DetailProduct.jsx')
//     ),
//   },
//   {
//     path: '/cart',
//     component: lazy(() => import('@pages/User/Cart/Cart.jsx')),
//   },
//   {
//     path: '/about-us',
//     component: lazy(() => import('@pages/User/AboutUs/AboutUs.jsx')),
//   },
//   {
//     path: '/my-account',
//     component: lazy(() => import('@pages/User/MyAccount/MyAccount.jsx')),
//   },
//   {
//     path: '/checkout',
//     component: lazy(() => import('@pages/User/CheckOut/CheckOutPage.jsx')),
//   },
//   {
//     path: '/admin/login',
//     component: lazy(() => import('@pages/Admin/login/Login.jsx')),
//   },
//   {
//     path: '/admin/login',
//     component: lazy(() => import('@pages/Admin/login/Login.jsx')),
//   },
// ];

// export default AppRoutes;

import { lazy } from 'react';

// USER ROUTES
const HomePage = lazy(() => import('@components/HomePage/HomePage.jsx'));
const Blog = lazy(() => import('@components/Blog/Blog.jsx'));
const OurShop = lazy(() => import('@pages/User/OurShop/OurShop.jsx'));
const DetailProduct = lazy(() =>
  import('@pages/User/DetailProduct/DetailProduct.jsx')
);
const Cart = lazy(() => import('@pages/User/Cart/Cart.jsx'));
const AboutUs = lazy(() => import('@pages/User/AboutUs/AboutUs.jsx'));
const MyAccount = lazy(() => import('@pages/User/MyAccount/MyAccount.jsx'));
const CheckOutPage = lazy(() =>
  import('@pages/User/CheckOut/CheckOutPage.jsx')
);
const OrderSuccess = lazy(() =>
  import('@pages/User/CheckOut/components/OrderSuccess/OrderSuccess.jsx')
);

// ADMIN ROUTES
const AdminLogin = lazy(() => import('@pages/Admin/login/Login.jsx'));

const AdminPage = lazy(() => import('@pages/Admin/AdminPage/AdminPage.jsx'));
// const AdminUsers = lazy(() => import('@pages/Admin/Users/Users.jsx'));

const AppRoutes = [
  // PUBLIC ROUTES
  { path: '/', component: HomePage },
  { path: '/blog', component: Blog },
  { path: '/shop', component: OurShop },
  { path: '/product/:id', component: DetailProduct },
  { path: '/cart', component: Cart },
  { path: '/about-us', component: AboutUs },
  { path: '/my-account', component: MyAccount },
  { path: '/checkout', component: CheckOutPage },
  { path: '/order-success', component: OrderSuccess },

  // ADMIN ROUTES (with "/admin" prefix)
  { path: '/admin/login', component: AdminLogin },
  { path: '/admin/admin-page', component: AdminPage },
  // { path: '/admin/users', component: AdminUsers },
];

export default AppRoutes;
