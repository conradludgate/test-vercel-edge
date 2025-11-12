import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

import { neonConfig, Client } from '@neondatabase/serverless_1_0';
import ws from 'ws';

export const config = {
    runtime: 'experimental-edge',
    regions: ["cle1"],
    matcher: ['/middleware/:path*'],
};

async function check(): Promise<any[]> {
    neonConfig.webSocketConstructor = ws
    const client = new Client(process.env.DATABASE_URL);
    await client.connect();
    return (await client.query('select pg_sleep(55), 1')).rows;
}

export default function middleware(request: NextRequest, context: NextFetchEvent) {
    const result = context.waitUntil(check());
    return NextResponse.json(result)
}
