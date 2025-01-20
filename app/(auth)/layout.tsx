import Logo from '@/components/shared/logo';
import React, { ReactNode } from 'react';

function layout({ children }: { children: ReactNode }) {
  return (
    <div className='h-screen w-full relative flex flex-col items-center justify-center'>
      <Logo />
      <div className='mt-10'>{children}</div>
    </div>
  );
}

export default layout;
