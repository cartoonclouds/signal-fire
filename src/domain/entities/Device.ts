import type { UUID, ISODateString } from './types';

export interface Device {
  id: UUID;
  userId: UUID;
  publicKey: string;
  platform: 'ios' | 'android';
  lastSeenAt?: ISODateString;
}
