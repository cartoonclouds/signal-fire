export interface MeshPeer {
  id: string;
  displayName?: string;
  signalStrength?: number;
}

export interface MeshTransportEvents {
  onPeerFound(peer: MeshPeer): void;
  onPeerLost(peerId: string): void;
  onPayloadReceived(peerId: string, payload: string): void;
  onError(error: Error): void;
}

export interface MeshTransport {
  start(events: MeshTransportEvents): Promise<void>;
  stop(): Promise<void>;
  send(peerId: string, payload: string): Promise<void>;
  broadcast(payload: string): Promise<void>;
}
