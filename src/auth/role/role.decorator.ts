import { SetMetadata } from '@nestjs/common';
import ROLE from './role.enum';
export const ROLE_KEY = 'ROLE';
export const Roles = (...role: ROLE[]) => SetMetadata(ROLE_KEY, role);
