import { Pool, PoolClient, QueryResult } from 'pg';

export const pool = new Pool({
  user: process.env.USER_NAME || 'default', // Use 'default' as fallback
  host: process.env.HOST_NAME || 'localhost', // Use 'localhost' as fallback
  database: process.env.DB_NAME || 'mydatabase', // Use a default db name
  password: process.env.DB_PASSWORD || '', // Ensure a fallback or error if missing
  port: parseInt(process.env.PORT_NUMBER as string) || 5432, // Fallback to port 5432
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
