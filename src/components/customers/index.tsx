import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { columns } from './Columns';
import { DataTable } from './table';
import LoaderComponent from '../ui/loader';
import { Button } from '../ui/button';

import { useGetUsers } from '@/apis/customers';

export default function CustomersPage() {
  const usersQuery = useGetUsers();
  if (usersQuery.isPending) return <LoaderComponent />;
  if (usersQuery.isError) return <div>error</div>;

  // const products = usersQuery.data.pages.flatMap((page) => page.products);

  return (
    <>
      <div className='hidden h-full flex-1 flex-col space-y-8 md:flex'>
        <h2 className='capitalize'>customer list</h2>

        <DataTable data={usersQuery.data.users} columns={columns} />
      </div>
    </>
  );
}
