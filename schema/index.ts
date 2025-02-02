import { Currencies } from '@/lib/currencies';
import { z } from 'zod';

export const UpdateUserCurrencySchema = z.object({
  currency: z.custom((value) => {
    const found = Currencies.some((c) => c.value === value);

    if (!found) {
      throw new Error(`Invalid currency: ${value}`);
    }

    return value;
  }),
});

export const CreateTransactionSchema = z.object({
  amount: z.coerce.number().positive().multipleOf(0.01),
  description: z.string().optional(),
  date: z.coerce.date(),
  category: z.string(),
  type: z.union([z.literal('income'), z.literal('expense')]),
});

export type CreateTransactionSchemaType = z.infer<
  typeof CreateTransactionSchema
>;

export const CreateCategrySchema = z.object({
  name: z.string().min(3).max(20),
  icon: z.string().max(20),
  type: z.enum(['expense', 'income']),
});

export type CreateCategorySchemaType = z.infer<typeof CreateCategrySchema>;
