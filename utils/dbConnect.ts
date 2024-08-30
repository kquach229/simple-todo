import { Pool, PoolClient, QueryResult } from 'pg';

export const pool = new Pool({
  user: process.env.USER_NAME as string,
  host: process.env.HOST_NAME as string,
  database: process.env.DB_NAME as string,
  password: process.env.DB_PASSWORD as string,
  port: parseInt(process.env.PORT_NUMBER as string), // parse port as number
});

export default async function dbConnect(): Promise<void> {
  let client: PoolClient | undefined;
  try {
    client = await pool.connect();
    const result: QueryResult<{ now: string }> = await client.query(
      'SELECT NOW()'
    );
    console.log('connected to the db:', result.rows[0].now);
  } catch (err: any) {
    console.error('error connecting to database: ', err.stack);
  } finally {
    if (client) {
      client.release();
    }
  }
}
