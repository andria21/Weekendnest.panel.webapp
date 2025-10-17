'use client';
import { deleteBrand } from '@/actions/brands/brandDelete';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';

export const DeleteBrandButton = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this brand?')) return;

    startTransition(async () => {
      const success = await deleteBrand(id);
      if (success) {
        console.log('Brand deleted');
        // Optional: refresh the page or revalidate data
        window.location.reload();
      } else {
        alert('Failed to delete brand.');
      }
    });
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
      className="flex items-center gap-2 cursor-pointer"
    >
      <Trash2 className="h-4 w-4" />
      {isPending ? 'Deleting...' : 'Delete'}
    </Button>
  );
};
