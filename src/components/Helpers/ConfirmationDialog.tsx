import { ReactNode } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type Props = {
  title: string;
  confirmLabel?: string;
  cancelLabel?: string;
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
  onConfirm: () => void;
  children: ReactNode;
};
export default function ConfirmationDialog({
  title,
  confirmLabel,
  cancelLabel,
  setIsOpen,
  isOpen,
  onConfirm,
  children,
}: Props) {
  function cancelAction() {
    setIsOpen(false);
  }

  function confirmAction() {
    setIsOpen(false);

    if (onConfirm) onConfirm();
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{children}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancelAction}>{cancelLabel || 'Cancel'}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmAction}>
            {confirmLabel || 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
