import { AxiosError } from 'axios';
import { APP_COMPANIES, DOSAGE_FORMS } from './constants';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<{ msg: string }>;
  }
}

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
};

export type TProduct = {
  _id: string;
  name: string;
  slug: string;
  images: { url: string; name: string; size: number }[];
  description: string;
  nutritionFacts: string;
  company: typeof APP_COMPANIES[number];
  itemForm: typeof DOSAGE_FORMS[number];
  category: { name: string; _id: string }[];
  freeShipping: boolean;
  numReviews: number;
  averageRating: number;
  price: number;
  quantity: number;
  featured: boolean;
  sold: number;
  createdAt: string;
  updatedAt: string;
};
