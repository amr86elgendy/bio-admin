import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { columns } from './Columns';
import { DataTable } from './table';
import LoaderComponent from '../ui/loader';
import { Button } from '../ui/button';

import { useGetProducts } from '@/apis/products';

export default function ProductsPage() {
  const productsQuery = useGetProducts();
  if (productsQuery.isPending) return <LoaderComponent />;
  if (productsQuery.isError) return <div>error</div>;

  const products = productsQuery.data.pages.flatMap((page) => page.products);

  return (
    <>
      <div className='hidden h-full flex-1 flex-col space-y-8 md:flex'>
        <div className='flex justify-between items-center'>
          <h2 className='capitalize'>product list</h2>
          <Button asChild>
            <Link to='/products/create' className='space-x-2'>
              <Plus strokeWidth={3} />
              <span className='capitalize'>create product</span>
            </Link>
          </Button>
        </div>
        <DataTable data={products} columns={columns} />
      </div>
    </>
  );
}
