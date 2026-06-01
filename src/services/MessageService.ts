import { v4 as uuid } from 'uuid';
import type { Message } from '@/domain/entities/Message';
import type { UUID } from '@/domain/entities/types';
import type { MessageRepository } from '@/domain/repositories/MessageRepository';
import { DeviceVibrationService } from './DeviceVibrationService';

export class MessageService {
  private static readonly ADMIN_VIBRATION_PATTERN: number[] = [0, 250, 120, 250, 120, 500];

  constructor(
    private readonly messages: MessageRepository,
    private readonly deviceVibration = new DeviceVibrationService()
  ) {}

  async createPendingMessage(input: {
    groupId: UUID;
    senderUserId: UUID;
    body: string;
    vibrateDevice?: boolean;
    vibrationPattern?: number | number[];
    repeatVibration?: boolean;
  }): Promise<Message> {
    const message: Message = {
      id: uuid(),
      groupId: input.groupId,
      senderUserId: input.senderUserId,
      body: input.body,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    await this.messages.save(message);
    this.deviceVibration.vibrateWhenRequired(
      input.vibrateDevice === true,
      input.vibrationPattern,
      input.repeatVibration
    );

    return message;
  }

  async createPendingAdminMessage(input: {
    groupId: UUID;
    senderUserId: UUID;
    body: string;
    vibrateDevice?: boolean;
    vibrationPattern?: number | number[];
    repeatVibration?: boolean;
  }): Promise<Message> {
    return this.createPendingMessage({
      groupId: input.groupId,
      senderUserId: input.senderUserId,
      body: `[ADMIN] ${input.body}`,
      vibrateDevice: input.vibrateDevice ?? true,
      vibrationPattern: input.vibrationPattern ?? MessageService.ADMIN_VIBRATION_PATTERN,
      repeatVibration: input.repeatVibration ?? false
    });
  }
}
