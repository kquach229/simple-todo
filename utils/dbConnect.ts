import { Pool, PoolClient, QueryResult } from 'pg';

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function dbConnect(): Promise<void> {
  let client: PoolClient | undefined;
  try {
    client = await pool.connect();
    const result: QueryResult<{ now: string }> = await client.query(
      'SELECT NOW()'
    );
    console.log('Connected to the DB:', result.rows[0].now);
  } catch (err: any) {
    console.error('Error connecting to database:', err.stack);
  } finally {
    if (client) {
      client.release();
    }
  }
}
