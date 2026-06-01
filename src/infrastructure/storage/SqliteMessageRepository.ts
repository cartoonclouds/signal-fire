import type { Message } from '@/domain/entities/Message';
import type { UUID } from '@/domain/entities/types';
import type { MessageRepository } from '@/domain/repositories/MessageRepository';
import type { SqlDatabase } from './database';

export class SqliteMessageRepository implements MessageRepository {
  constructor(private readonly db: SqlDatabase) {}

  async findById(id: UUID): Promise<Message | null> {
    const [result] = await this.db.executeSql('SELECT * FROM messages WHERE id = ? LIMIT 1', [id]);
    const rows = this.readRows(result);
    if (rows.length === 0) return null;
    return this.mapRow(rows[0]);
  }

  async listByGroup(groupId: UUID): Promise<Message[]> {
    const [result] = await this.db.executeSql('SELECT * FROM messages WHERE group_id = ? ORDER BY created_at ASC', [groupId]);
    const rows = this.readRows(result);
    return rows.map(row => this.mapRow(row));
  }

  async listPending(): Promise<Message[]> {
    const [result] = await this.db.executeSql('SELECT * FROM messages WHERE status = ?', ['pending']);
    const rows = this.readRows(result);
    return rows.map(row => this.mapRow(row));
  }

  async save(message: Message): Promise<void> {
    await this.db.executeSql(
      `INSERT OR REPLACE INTO messages (id, group_id, sender_user_id, body, status, created_at, delivered_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [message.id, message.groupId, message.senderUserId, message.body, message.status, message.createdAt, message.deliveredAt ?? null]
    );
  }

  async delete(id: UUID): Promise<void> {
    await this.db.executeSql('DELETE FROM messages WHERE id = ?', [id]);
  }

  async markStatus(id: UUID, status: Message['status']): Promise<void> {
    await this.db.executeSql('UPDATE messages SET status = ? WHERE id = ?', [status, id]);
  }

  private readRows(result: { rows?: { _array: any[] } }): any[] {
    return result.rows?._array ?? [];
  }

  private mapRow(row: any): Message {
    return {
      id: row.id,
      groupId: row.group_id,
      senderUserId: row.sender_user_id,
      body: row.body,
      status: row.status,
      createdAt: row.created_at,
      deliveredAt: row.delivered_at ?? undefined
    };
  }
}
