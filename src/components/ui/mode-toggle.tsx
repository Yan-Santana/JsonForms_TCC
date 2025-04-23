import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button variant='outline' size='icon' onClick={toggleTheme} className='relative w-10 h-10'>
      <Sun className='h-[1.2rem] w-[1.2rem] dark:hidden' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] hidden dark:block' />
    </Button>
  );
}
