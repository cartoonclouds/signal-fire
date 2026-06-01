import { open, type QueryResult } from 'react-native-quick-sqlite';

type SqlParameter = string | number | boolean | null;

export interface SqlDatabase {
  executeSql(sql: string, params?: SqlParameter[]): Promise<[QueryResult]>;
}

export async function openDatabase(): Promise<SqlDatabase> {
  const db = open({ name: 'festival_mesh.db', location: 'default' });

  return {
    async executeSql(sql: string, params: SqlParameter[] = []): Promise<[QueryResult]> {
      const result = await db.executeAsync(sql, params);
      return [result];
    }
  };
}
