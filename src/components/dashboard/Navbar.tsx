import { ModeToggle } from '@/components/ui/mode-toggle';
import { LayoutDashboard } from 'lucide-react';

export function Navbar() {
  return (
    <header className='bg-card border-b px-4 py-3 flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <LayoutDashboard className='h-5 w-5' />
        <h1 className='text-lg font-semibold'>Dashboard Learning Analytics</h1>
      </div>
      <div className='flex items-center gap-2'>
        <ModeToggle />
      </div>
    </header>
  );
}
