import type { ISODateString, UUID } from './types';

export interface LocationUpdate {
  id: UUID;
  userId: UUID;
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
  sharedWithGroupIds: UUID[];
  createdAt: ISODateString;
  expiresAt: ISODateString;
}
