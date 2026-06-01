import NetInfo from '@react-native-community/netinfo';

export class SyncService {
  async isOnline(): Promise<boolean> {
    const state = await NetInfo.fetch();
    return Boolean(state.isConnected && state.isInternetReachable !== false);
  }

  async syncWhenOnline(): Promise<void> {
    if (!(await this.isOnline())) return;
    // TODO: upload pending messages, download festival config, pull missed messages.
  }
}
