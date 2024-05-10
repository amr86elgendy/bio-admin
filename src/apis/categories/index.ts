import { useQuery } from '@tanstack/react-query';
import { request } from '../client';

type TCategory = {
  _id: string;
  name: string;
};

// ####################### Get Categories #######################
const getCategories = async (): Promise<TCategory[]> => {
  const { data } = await request({
    url: `categories`,
    method: 'GET',
  });
  return data;
};
export function useGetCategories() {
  return useQuery({
    queryKey: ['get-categories'],
    queryFn: getCategories,
  });
}
