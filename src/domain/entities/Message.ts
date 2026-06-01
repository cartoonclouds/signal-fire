import type { DeliveryStatus, ISODateString, UUID } from './types';

export interface Message {
  id: UUID;
  groupId: UUID;
  senderUserId: UUID;
  body: string;
  status: DeliveryStatus;
  createdAt: ISODateString;
  deliveredAt?: ISODateString;
}
