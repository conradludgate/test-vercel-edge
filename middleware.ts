import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

import { neonConfig, Client } from '@neondatabase/serverless';
import ws from 'ws';

export const config = {
    runtime: 'experimental-edge',
};

neonConfig.webSocketConstructor = ws

async function check() {
    const client = new Client(process.env.DATABASE_URL);
    await client.connect();
    const result = await client.query('select pg_sleep(100), 1');
    console.table(result);
}

export default function middleware(request: NextRequest, context: NextFetchEvent) {
    context.waitUntil(check());
    return NextResponse.next()
}
