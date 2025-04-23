import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function UserButton() {
  return (
    <Button variant='ghost' size='icon' className='h-8 w-8'>
      <User className='h-4 w-4' />
      <span className='sr-only'>Perfil do usuário</span>
    </Button>
  );
}
