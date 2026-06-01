import type { SqlDatabase } from './database';

const migrations = [
  `CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY NOT NULL,
    group_id TEXT NOT NULL,
    sender_user_id TEXT NOT NULL,
    body TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL,
    delivered_at TEXT
  );`,
  `CREATE TABLE IF NOT EXISTS relay_packets (
    id TEXT PRIMARY KEY NOT NULL,
    type TEXT NOT NULL,
    sender_device_id TEXT NOT NULL,
    recipient_user_ids TEXT NOT NULL,
    encrypted_payload TEXT NOT NULL,
    signature TEXT NOT NULL,
    hop_count INTEGER NOT NULL,
    max_hops INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS location_updates (
    id TEXT PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    accuracy_meters REAL,
    shared_with_group_ids TEXT NOT NULL,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL
  );`
];

export async function runMigrations(db: SqlDatabase): Promise<void> {
  for (const sql of migrations) {
    await db.executeSql(sql);
  }
}
