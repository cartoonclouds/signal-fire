import { v4 as uuid } from 'uuid';
import type { MeshTransport } from '@/infrastructure/mesh/MeshTransport';
import type { RelayPacket } from '@/domain/entities/RelayPacket';

type OutboundRelayPacket = Omit<RelayPacket, 'id' | 'hopCount' | 'createdAt'>;
type AdminRelayPacketInput = Omit<OutboundRelayPacket, 'type'>;

export class RelayService {
  private readonly seenPacketIds = new Set<string>();
  private readonly connectedPeerIds = new Set<string>();

  constructor(private readonly mesh: MeshTransport) {}

  async start(): Promise<void> {
    await this.mesh.start({
      onPeerFound: (peer) => {
        this.connectedPeerIds.add(peer.id);
      },
      onPeerLost: (peerId) => {
        this.connectedPeerIds.delete(peerId);
      },
      onPayloadReceived: (_peerId, payload) => this.handleIncomingPayload(payload),
      onError: console.error
    });
  }

  async broadcastEncryptedPayload(packet: OutboundRelayPacket): Promise<void> {
    const relayPacket = this.createRelayPacket(packet);

    this.seenPacketIds.add(relayPacket.id);
    await this.mesh.broadcast(JSON.stringify(relayPacket));
  }

  async sendAdminPayloadToAllConnectedDevices(input: AdminRelayPacketInput): Promise<number> {
    const relayPacket = this.createRelayPacket({ ...input, type: 'announcement' });
    return this.sendRelayPacketToPeers(relayPacket, this.getConnectedPeerIds());
  }

  async sendAdminPayloadToSpecificDevices(input: AdminRelayPacketInput, peerIds: string[]): Promise<number> {
    const connectedTargets = peerIds.filter((peerId) => this.connectedPeerIds.has(peerId));
    const relayPacket = this.createRelayPacket({ ...input, type: 'announcement' });
    return this.sendRelayPacketToPeers(relayPacket, connectedTargets);
  }

  getConnectedPeerIds(): string[] {
    return Array.from(this.connectedPeerIds);
  }

  private async sendRelayPacketToPeers(relayPacket: RelayPacket, peerIds: string[]): Promise<number> {
    const payload = JSON.stringify(relayPacket);

    this.seenPacketIds.add(relayPacket.id);
    await Promise.all(peerIds.map((peerId) => this.mesh.send(peerId, payload)));

    return peerIds.length;
  }

  private createRelayPacket(packet: OutboundRelayPacket): RelayPacket {
    return {
      ...packet,
      id: uuid(),
      hopCount: 0,
      createdAt: new Date().toISOString()
    };
  }

  private async handleIncomingPayload(payload: string): Promise<void> {
    const packet = JSON.parse(payload) as RelayPacket;
    if (this.seenPacketIds.has(packet.id)) return;
    if (Date.parse(packet.expiresAt) < Date.now()) return;

    this.seenPacketIds.add(packet.id);

    if (packet.hopCount < packet.maxHops) {
      const nextPacket = { ...packet, hopCount: packet.hopCount + 1 };
      await this.mesh.broadcast(JSON.stringify(nextPacket));
    }
  }
}
