import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@/components/layout';
// ROUTES
import PrivateRoute from './privateRoute';
import PersistLoggedIn from './persistLoggedIn';
import PageNotFound from './NotFound';
// PAGES
import LoginPage from '@/components/auth';
import HomePage from '@/components/dashboard';
import OrdersPage from '@/components/orders';
import CustomersPage from '@/components/customers';
import ProductForm from '@/components/products/Form';
import ProductsPage from '@/components/products';
import UserForm from '@/components/customers/Form';
import CategoriesPage from '@/components/categories';
import CategoriesForm from '@/components/categories/Form';
import CategoryForm from '@/components/categories/Form';

export const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        errorElement: <div>error</div>,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'orders',
            element: <OrdersPage />,
          },
          {
            path: 'products',
            element: <ProductsPage />,
          },
          {
            path: 'products/create',
            element: <ProductForm />,
          },
          { path: 'products/edit/:productId', element: <ProductForm /> },
          {
            path: 'categories',
            element: <CategoriesPage />,
          },
          {
            path: 'categories/create',
            element: <CategoriesForm />,
          },
          { path: 'categories/edit/:categoryId', element: <CategoryForm /> },
          {
            path: 'customers',
            element: <CustomersPage />,
          },
          { path: 'customers/edit/:userId', element: <UserForm /> },
          {
            path: 'analytics',
            element: <div>analytics</div>,
          },
        ],
      },
    ],
  },
  {
    element: <PersistLoggedIn />,
    children: [{ path: '/login', element: <LoginPage /> }],
  },
  {
    path: '/*',
    element: <PageNotFound />,
  },
]);
