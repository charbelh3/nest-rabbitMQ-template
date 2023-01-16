import { SetMetadata } from '@nestjs/common';

export enum Role {
  Admin = 'admin',
  Merchant = 'merchant',
  Payer = 'payer',
}

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
