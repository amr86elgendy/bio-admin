import { Loader2 } from 'lucide-react';

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

import { useGlobalStore } from '@/store/global';

export default function DeleteModal({
  loading,
  callback,
  warningMessage = 'This action cannot be undone. This will permanently delete your data from our servers.',
}: {
  loading: boolean;
  callback: () => void;
  warningMessage?: string;
}) {
  const isDeleteModalOpened = useGlobalStore().isDeleteModalOpened;
  const toggleDeleteModal = useGlobalStore().toggleDeleteModal;

  return (
    <AlertDialog open={isDeleteModalOpened} onOpenChange={toggleDeleteModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{warningMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant='destructive' disabled={loading} onClick={callback}>
            {loading ? (
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
