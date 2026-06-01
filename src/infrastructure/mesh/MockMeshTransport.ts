import type { MeshTransport, MeshTransportEvents } from './MeshTransport';

export class MockMeshTransport implements MeshTransport {
  private events?: MeshTransportEvents;

  async start(events: MeshTransportEvents): Promise<void> {
    this.events = events;
    setTimeout(() => {
      this.events?.onPeerFound({ id: 'mock-peer-1', displayName: 'Nearby Test Device', signalStrength: 0.8 });
    }, 500);
  }

  async stop(): Promise<void> {
    this.events = undefined;
  }

  async send(peerId: string, payload: string): Promise<void> {
    this.events?.onPayloadReceived(peerId, payload);
  }

  async broadcast(payload: string): Promise<void> {
    this.events?.onPayloadReceived('mock-peer-1', payload);
  }
}
