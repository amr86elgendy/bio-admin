import CustomersPage from '@/components/customers';
import HomePage from '@/components/dashboard';
import { AppLayout } from '@/components/layout';
import OrdersPage from '@/components/orders';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import PersistLoggedIn from './persistLoggedIn';
import LoginPage from '@/components/auth';
import PageNotFound from './NotFound';
import ProductForm from '@/components/products/Form';
import ProductsPage from '@/components/products';
import UserForm from '@/components/customers/Form';

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
