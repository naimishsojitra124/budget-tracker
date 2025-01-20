import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  let userSettings = await db.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) {
    userSettings = await db.userSettings.create({
      data: {
        userId: user.id,
        currency: 'INR',
      },
    });
  }

  revalidatePath('/');

  return Response.json(userSettings);
}
