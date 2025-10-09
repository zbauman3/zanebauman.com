/** The base protocol and host for this deployment. Example: `http://localhost:3000`  */
const SITE_BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL!;

const requiredEnvVars = {
  SITE_BASE_URL: SITE_BASE_URL,
};

for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export { SITE_BASE_URL };
