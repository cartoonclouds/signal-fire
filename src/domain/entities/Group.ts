import type { UUID, ISODateString } from './types';

export interface FriendGroup {
  id: UUID;
  name: string;
  memberUserIds: UUID[];
  createdAt: ISODateString;
}
