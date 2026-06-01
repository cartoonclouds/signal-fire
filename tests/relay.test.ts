import { RelayService } from '../src/services/RelayService';
import { MockMeshTransport } from '../src/infrastructure/mesh/MockMeshTransport';
import type { MeshPeer, MeshTransport, MeshTransportEvents } from '../src/infrastructure/mesh/MeshTransport';
import type { RelayPacket } from '../src/domain/entities/RelayPacket';

test('RelayService can start with mock transport', async () => {
  const service = new RelayService(new MockMeshTransport());
  await expect(service.start()).resolves.toBeUndefined();
});

class TestMeshTransport implements MeshTransport {
  private events: MeshTransportEvents | undefined;
  readonly sent: Array<{ peerId: string; payload: string }> = [];

  async start(events: MeshTransportEvents): Promise<void> {
    this.events = events;
  }

  async stop(): Promise<void> {
    this.events = undefined;
  }

  async send(peerId: string, payload: string): Promise<void> {
    this.sent.push({ peerId, payload });
  }

  async broadcast(_payload: string): Promise<void> {
    return Promise.resolve();
  }

  emitPeerFound(peer: MeshPeer): void {
    this.events?.onPeerFound(peer);
  }

  emitPeerLost(peerId: string): void {
    this.events?.onPeerLost(peerId);
  }
}

const makeAdminPacketInput = (): Omit<RelayPacket, 'id' | 'hopCount' | 'createdAt' | 'type'> => ({
  senderDeviceId: 'sender-device',
  recipientUserIds: ['user-1', 'user-2'],
  encryptedPayload: 'encrypted-admin-content',
  signature: 'admin-signature',
  maxHops: 3,
  expiresAt: new Date(Date.now() + 60_000).toISOString()
});

test('RelayService tracks connected peers from mesh events', async () => {
  const transport = new TestMeshTransport();
  const service = new RelayService(transport);

  await service.start();
  transport.emitPeerFound({ id: 'peer-1' });
  transport.emitPeerFound({ id: 'peer-2' });
  transport.emitPeerLost('peer-1');

  expect(service.getConnectedPeerIds()).toEqual(['peer-2']);
});

test('RelayService sends admin payload to all connected peers', async () => {
  const transport = new TestMeshTransport();
  const service = new RelayService(transport);

  await service.start();
  transport.emitPeerFound({ id: 'peer-1' });
  transport.emitPeerFound({ id: 'peer-2' });

  const sentCount = await service.sendAdminPayloadToAllConnectedDevices(makeAdminPacketInput());

  expect(sentCount).toBe(2);
  expect(transport.sent).toHaveLength(2);
  expect(transport.sent.map((entry) => entry.peerId)).toEqual(['peer-1', 'peer-2']);

  const firstSent = transport.sent[0];
  expect(firstSent).toBeDefined();
  const firstPacket = JSON.parse(firstSent!.payload) as RelayPacket;
  expect(firstPacket.type).toBe('announcement');
  expect(firstPacket.hopCount).toBe(0);
  expect(firstPacket.id).toBeTruthy();
});

test('RelayService sends admin payload only to requested connected peers', async () => {
  const transport = new TestMeshTransport();
  const service = new RelayService(transport);

  await service.start();
  transport.emitPeerFound({ id: 'peer-1' });
  transport.emitPeerFound({ id: 'peer-2' });

  const sentCount = await service.sendAdminPayloadToSpecificDevices(makeAdminPacketInput(), ['peer-2', 'offline-peer']);

  expect(sentCount).toBe(1);
  expect(transport.sent).toHaveLength(1);
  const firstSent = transport.sent[0];
  expect(firstSent).toBeDefined();
  expect(firstSent!.peerId).toBe('peer-2');

  const packet = JSON.parse(firstSent!.payload) as RelayPacket;
  expect(packet.type).toBe('announcement');
});
