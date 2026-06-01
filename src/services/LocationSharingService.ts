import type { LocationUpdate } from '@/domain/entities/LocationUpdate';
import type { UUID } from '@/domain/entities/types';

export class LocationSharingService {
  async createLocationUpdate(input: {
    userId: UUID;
    latitude: number;
    longitude: number;
    accuracyMeters?: number;
    sharedWithGroupIds: UUID[];
  }): Promise<LocationUpdate> {
    const now = new Date();
    const expires = new Date(now.getTime() + 30 * 60 * 1000);

    return {
      id: crypto.randomUUID?.() ?? `${Date.now()}`,
      userId: input.userId,
      latitude: input.latitude,
      longitude: input.longitude,
      accuracyMeters: input.accuracyMeters,
      sharedWithGroupIds: input.sharedWithGroupIds,
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString()
    };
  }
}
