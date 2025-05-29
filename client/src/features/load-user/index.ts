import { createEffect } from 'effector';
import { getUser } from '@shared/api/auth/auth';
import { User } from '@shared/api/auth/model';

export const getUserFx = createEffect<string, User>(async (token) => {
    const user = await getUser(token);
    return user;
  });
