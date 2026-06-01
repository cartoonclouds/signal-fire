# signal-fire

## Festival Friend Mesh

Offline-first festival communication app for high-density, low-connectivity events.

### Core user capabilities

- Send low-data text messages to friends and groups.
- Share opt-in GPS-based last-known locations.
- Relay encrypted packets through nearby devices.
- Queue messages and sync once internet connectivity returns.

### Technical approach

1. **Phone-only mesh (MVP extension)**  
   Bluetooth/Wi-Fi peer exchange via:
   - iOS Multipeer Connectivity
   - Android Nearby Connections

2. **Festival relay nodes (recommended reliability upgrade)**  
   Fixed site nodes (stages, entries, campsites) forward traffic across venue zones.

3. **LoRa companion network (later / optional hardware)**  
   Useful for staff/safety workflows, but requires dedicated radios.

### Delivery phases

- **Phase 1:** Offline map, friend groups, queued messages, last-seen location.
- **Phase 2:** Nearby peer messaging over Bluetooth/Wi-Fi.
- **Phase 3:** Fixed relay nodes for site-wide coverage.
- **Phase 4:** Optional wearable/tag integrations for improved safety and tracking.

### Key risks

- Battery drain
- iOS background execution limits
- Pre-install/onboarding before signal loss
- Location privacy, consent, and retention
- Moderation and abuse controls
- Sparse-node/sparse-user reliability gaps

### MVP scope

- Friend groups
- Offline festival map
- Last-known location sharing
- Lightweight text chat
- Offline queue and delayed sync
- Privacy controls (opt-in sharing + pause sharing)

### React Native implementation plan

1. Initialize React Native + TypeScript project and mobile build setup.
2. Add native mesh modules:
   - iOS Multipeer Connectivity wrapper
   - Android Nearby Connections wrapper
3. Expose shared API:
   - `mesh.startDiscovery()`
   - `mesh.startAdvertising()`
   - `mesh.sendMessage(peerId, payload)`
4. Implement domain models: user, device, friend, group, message, location update, relay packet, receipt.
5. Add SQLite storage, migrations, repositories, and offline queue state tracking.
6. Build peer discovery, reconnect handling, secure packeting (key pairs, encryption, signatures, TTL/dup guard).
7. Implement location sharing (opt-in scopes, pause sharing, expiry policy).
8. Build core UX flows: map, chat, friends/groups, privacy/settings.
9. Add sync layer for online reconciliation and backup.
10. Validate on real devices (2, 5, then 20+ device tests; battery/background stress).

### Pilot and commercialization

- Start with small events (club/campsite/student events).
- Track delivery success, latency, battery impact, and location quality.
- Business model options:
  - B2C attendee app
  - B2B festival-branded app + node network
  - Hybrid attendee + organizer dashboard
