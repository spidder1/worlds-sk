export function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
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
