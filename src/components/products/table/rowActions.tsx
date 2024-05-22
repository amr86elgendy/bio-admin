import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Ellipsis, SquarePen, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import DeleteModal from '@/lib/deleteModal';
import { useGlobalStore } from '@/store/global';
import { TProduct } from '@/global';
import { useDeleteProduct } from '@/apis/products';
import { toast } from '@/components/ui/use-toast';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions({
  row,
}: DataTableRowActionsProps<TProduct>) {
  const product = row.original;
  const toggleDeleteModal = useGlobalStore.getState().toggleDeleteModal;

  const deleteProduct = useDeleteProduct();

  function callback() {
    deleteProduct.mutate(
      { id: product._id },
      {
        onSuccess: (data) => {
          toggleDeleteModal();
          toast({
            title: 'Success',
            description: data.msg,
          });
        },
      }
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <Ellipsis className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem asChild>
            <Link to={`edit/${product._id}`}>
              <SquarePen size={20} className='text-slate-500 mr-2' />
              <span className='capitalize'>edit</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className='text-destructive focus:bg-destructive/5 focus:text-destructive'
            onClick={() => toggleDeleteModal()}
          >
            <Trash2 size={20} className='mr-2' />
            <span className='capitalize'>delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteModal
        loading={deleteProduct.isPending}
        callback={callback}
      />
    </>
  );
}
