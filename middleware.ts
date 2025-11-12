import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

import { neonConfig, Client } from '@neondatabase/serverless';
import ws from 'ws';

export const config = {
    runtime: 'edge',
    region: ["cle1"],
    matcher: ['/middleware/:path*'],
};

neonConfig.webSocketConstructor = ws

async function check() {
    const client = new Client(process.env.DATABASE_URL);
    await client.connect();
    return await client.query('select pg_sleep(100), 1');
}

export default function middleware(request: NextRequest, context: NextFetchEvent) {
    const result = context.waitUntil(check());
    return NextResponse.json(result)
}
