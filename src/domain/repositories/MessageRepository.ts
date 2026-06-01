import type { Message } from '../entities/Message';
import type { UUID } from '../entities/types';
import type { BaseRepository } from './BaseRepository';

export interface MessageRepository extends BaseRepository<Message, UUID> {
  listByGroup(groupId: UUID): Promise<Message[]>;
  listPending(): Promise<Message[]>;
  markStatus(id: UUID, status: Message['status']): Promise<void>;
}
