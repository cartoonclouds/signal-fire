import type { ISODateString, RelayPacketType, UUID } from './types';

export interface RelayPacket {
  id: UUID;
  type: RelayPacketType;
  senderDeviceId: UUID;
  recipientUserIds: UUID[];
  encryptedPayload: string;
  signature: string;
  hopCount: number;
  maxHops: number;
  createdAt: ISODateString;
  expiresAt: ISODateString;
}
