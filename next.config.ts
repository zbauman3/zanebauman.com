import type { NextConfig } from "next";

const configFn = (phase: string) => {
  const NODE_ENV = process.env.NODE_ENV;
  const VERCEL_ENV = process.env.VERCEL_ENV;
  let NEXT_PUBLIC_SITE_BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL;

  if (NODE_ENV === "development") {
    NEXT_PUBLIC_SITE_BASE_URL = "http://localhost:3000";
  } else if (VERCEL_ENV === "preview") {
    NEXT_PUBLIC_SITE_BASE_URL = `https://${process.env.VERCEL_URL}`;
  }

  const resolvedEnv: NextConfig["env"] = {
    NEXT_PUBLIC_SITE_BASE_URL,
  };

  if (NODE_ENV !== "production") {
    console.log(`Phase: ${phase}`);
    console.log(`Env: ${JSON.stringify(resolvedEnv, null, 2)}`);
  }

  const nextConfig: NextConfig = {
    env: resolvedEnv,
    // `prismjs` uses dynamic requires, which causes webpack to accidentally tree shake required'
    // deps with the build error:
    //
    // Critical dependency: the request of a dependency is an expression
    // ...
    // Error: Cannot find module './prism-xxx
    serverExternalPackages: ["prismjs/components"],
    // allow local development from phone over local network IP
    allowedDevOrigins: ["172.*.*.*", "192.*.*.*", "10.*.*.*", "localhost"],
  };

  return nextConfig;
};

export default configFn;
