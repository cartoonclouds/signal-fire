import type { UUID, ISODateString } from './types';

export interface User {
  id: UUID;
  displayName: string;
  avatarUrl?: string;
  createdAt: ISODateString;
}
