import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';
import CreateTransactionDialog from './_components/create-transaction-dialog';

const page = async () => {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }

  const userSettings = await db.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) {
    redirect('/wizard');
  }
  return (
    <div className='h-full bg-background'>
      <div className='border-b bg-card'>
        <div className='container flex flex-wrap items-center justify-between gap-6 py-8 px-6'>
          <p className='text-3xl font-bold'>Hello, {user.firstName}!👋🏻</p>
          <div className='flex items-center gap-3'>
            <CreateTransactionDialog
              trigger={
                <Button
                  variant='outline'
                  className='border-emerald-500 bg-emerald-800 text-white hover:bg-emerald-700 hover:text-white'>
                  New Income 💵
                </Button>
              }
              type='income'
            />

            <CreateTransactionDialog
              trigger={
                <Button
                  variant='outline'
                  className='border-rose-500 bg-rose-800 text-white hover:bg-rose-700 hover:text-white'>
                  New Expense 💴
                </Button>
              }
              type='expense'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
