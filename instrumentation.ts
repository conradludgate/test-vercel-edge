import { registerOTel } from '@vercel/otel'
 
export function register() {
  registerOTel({ serviceName: 'conrad-neon-edge-latency' })
}
