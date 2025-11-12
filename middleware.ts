import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

import { neonConfig, Client } from '@neondatabase/serverless_1_0';

export const config = {
    // runtime: 'experimental-edge',
    runtime: 'nodejs',
    regions: ["cle1"],
    matcher: ['/middleware/:path*'],
};

async function check() {
    const client = new Client(process.env.DATABASE_URL);
    await client.connect();
    console.table(await client.query('select pg_sleep(50), 1'));
}

export default function middleware(request: NextRequest, context: NextFetchEvent) {
    context.waitUntil(check());
    return NextResponse.json({})
}
