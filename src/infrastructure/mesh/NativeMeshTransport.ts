import { NativeModules } from 'react-native';
import type { MeshTransport, MeshTransportEvents } from './MeshTransport';

const { FestivalMeshNative } = NativeModules;

export class NativeMeshTransport implements MeshTransport {
  async start(_events: MeshTransportEvents): Promise<void> {
    // TODO: wire native event emitters from iOS Multipeer Connectivity and Android Nearby Connections.
    await FestivalMeshNative?.start?.();
  }

  async stop(): Promise<void> {
    await FestivalMeshNative?.stop?.();
  }

  async send(peerId: string, payload: string): Promise<void> {
    await FestivalMeshNative?.send?.(peerId, payload);
  }

  async broadcast(payload: string): Promise<void> {
    await FestivalMeshNative?.broadcast?.(payload);
  }
}
