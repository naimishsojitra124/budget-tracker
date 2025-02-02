'use server';

import { db } from '@/lib/db';
import { CreateCategorySchemaType, CreateCategrySchema } from '@/schema';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function CreateCategory(form: CreateCategorySchemaType) {
  const parsedBody = CreateCategrySchema.safeParse(form);

  if (!parsedBody.success) {
    throw new Error('bad request');
  }

  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const { name, icon, type } = parsedBody.data;

  return await db.category.create({
    data: {
      userId: user.id,
      name,
      icon,
      type,
    },
  });
}
