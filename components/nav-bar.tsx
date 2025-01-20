'use client';

import React, { useState } from 'react';
import Logo, { LogoMobile } from './shared/logo';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from './ui/button';
import { UserButton } from '@clerk/nextjs';
import { ModeToggle } from './shared/mode-toggle';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';

const NavBar = () => {
  return (
    <>
      <DesktopNavBar />
      <MobileNavBar />
    </>
  );
};

const items = [
  {
    label: 'Dashboard',
    link: '/',
  },
  {
    label: 'Transactions',
    link: '/transactions',
  },
  {
    label: 'Manage',
    link: '/manage',
  },
];

function DesktopNavBar() {
  return (
    <div className='hidden border-separate border-b bg-background md:block'>
      <nav className='container flex items-center justify-between px-8'>
        <div className='h-[80px] min-h-[60px] flex items-center gap-x-4'>
          <Logo />

          <div className='h-full flex'>
            {items.map((item) => (
              <NavBarItem
                key={item.label}
                label={item.label}
                link={item.link}
              />
            ))}
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <ModeToggle />
          <UserButton afterSwitchSessionUrl='/sign-in' />
        </div>
      </nav>
    </div>
  );
}

function MobileNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='block border-separate bg-background md:hidden'>
      <nav className='container flex items-center justify-between px-3'>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant='ghost' size='icon'>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className='w-[400px] sm:w-[500px]' side='left'>
            <Logo />
            <div className='flex flex-col gap-1 pt-4'>
              {items.map((item) => (
                <NavBarItem
                  key={item.label}
                  label={item.label}
                  link={item.link}
                  onClick={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className='h-[80px] min-h-[60px] flex items-center gap-x-4'>
          <LogoMobile />
        </div>
        <div className='flex items-center gap-3'>
          <ModeToggle />
          <UserButton afterSwitchSessionUrl='/sign-in' />
        </div>
      </nav>
    </div>
  );
}

function NavBarItem({
  label,
  link,
  onClick,
}: {
  label: string;
  link: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className='relative flex items-center'>
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'w-full justify-start text-lg text-muted-foreground hover:text-foreground',
          isActive && 'text-foreground'
        )}
        onClick={() => onClick && onClick()}>
        {label}
      </Link>

      {isActive && (
        <div className='h-[2px] w-[80%] absolute -bottom-[2px] left-1/2 hidden -translate-x-1/2 rounded-xl bg-foreground md:block'></div>
      )}
    </div>
  );
}

export default NavBar;
