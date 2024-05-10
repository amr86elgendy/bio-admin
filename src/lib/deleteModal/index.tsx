import { Loader2, LoaderCircle } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import { useDeleteProduct } from '@/apis/products';
import { useGlobalStore } from '@/store/global';
import { toast } from '@/components/ui/use-toast';

export function DeleteProductModal({ id }: { id: string }) {
  const deleteProduct = useDeleteProduct();
  const isDeleteModalOpened = useGlobalStore().isDeleteModalOpened;
  const toggleDeleteModal = useGlobalStore().toggleDeleteModal;

  const onSuccess = (data: { msg: string }) => {
    toggleDeleteModal()
    toast({
      variant: 'success',
      title: 'Success',
      description: data.msg,
    });
  };

  return (
    <AlertDialog open={isDeleteModalOpened} onOpenChange={toggleDeleteModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant='destructive'
            disabled={deleteProduct.isPending}
            onClick={() => deleteProduct.mutate({ id }, { onSuccess })}
          >
            {deleteProduct.isPending ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
