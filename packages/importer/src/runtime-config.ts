import fs from 'node:fs';
import path from 'node:path';

function loadEnvFromFile() {
  const envPaths = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '.env.local'),
    path.resolve(process.cwd(), '../../.env'),
    path.resolve(process.cwd(), '../../.env.local')
  ];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [key, ...valParts] = trimmed.split('=');
          const k = key.trim();
          const v = valParts.join('=').trim().replace(/^["']|["']$/g, '');
          if (k && v && !process.env[k]) {
            process.env[k] = v;
          }
        }
      }
    }
  }
}

loadEnvFromFile();

export function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (value) return value;
  
  if (name === 'SUPABASE_URL') return 'https://jhgyzgdiapiewpjgosxm.supabase.co';
  if (name === 'SUPABASE_SECRET_KEY') return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZ3l6Z2RpYXBpZXdwamdvc3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNzI2OTksImV4cCI6MjEwMzY0ODY5OX0.6SAAJarR0Er3LFFewmcJTN_oEE2OoEMLqUTQJRGA3hY';
  if (name === 'ED_LOGIN') return 'EthosAPI';
  if (name === 'ED_PASSWORD') return 'Ed_2025';
  if (name === 'ED_ENDPOINT_URL') return 'https://private-ws-sk.elinkx.biz/service.asmx';

  throw new Error(`Missing required environment variable: ${name}`);
}

export function getSupabaseRestConfig() {
  return {
    url: requiredEnv('SUPABASE_URL').replace(/\/$/, ''),
    secretKey: requiredEnv('SUPABASE_SECRET_KEY'),
  };
}

export function getEdCredentials() {
  return {
    login: requiredEnv('ED_LOGIN'),
    password: requiredEnv('ED_PASSWORD'),
  };
}

