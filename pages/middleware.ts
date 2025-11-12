import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { neonConfig, Client } from '@neondatabase/serverless';
import ws from 'ws';

export const config = {
    runtime: 'edge',
};

neonConfig.webSocketConstructor = ws

export default async function middleware(request: NextRequest) {
    const client = new Client(process.env.DATABASE_URL);
    client.connect();
    const result = await client.query('select pg_sleep(100), 1');
    console.table(result);

    return NextResponse.next()
}
