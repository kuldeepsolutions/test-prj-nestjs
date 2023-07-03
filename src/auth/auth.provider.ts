import { SetMetadata } from '@nestjs/common';
export const authProvider = (...args: string[]) => SetMetadata('auth', args);