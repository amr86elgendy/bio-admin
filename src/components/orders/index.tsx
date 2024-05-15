import { columns } from './Columns';
import { DataTable } from './table';
import LoaderComponent from '../ui/loader';

import { useGetOrders } from '@/apis/orders';

export default function OrdersPage() {
  const ordersQuery = useGetOrders();
  if (ordersQuery.isPending) return <LoaderComponent />;
  if (ordersQuery.isError) return <div>error</div>;

  const orders = ordersQuery.data.pages.flatMap((page) => page.orders);

  return (
    <>
      <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
        <h2 className='capitalize'>order list</h2>

        <DataTable data={orders} columns={columns} />
      </div>
    </>
  );
}
