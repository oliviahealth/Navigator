import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
});
export type IUser = z.infer<typeof UserSchema>;
