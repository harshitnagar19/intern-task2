export interface appConfigRead {
  app: {
    name: string;
    environment: "development" | "production" | "staging";
  };

  server: {
    port: number;
  };

  db: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    connectionLimit: number;
    waitForConnections: boolean;
    queueLimit: number;
    enableKeepAlive: boolean;
    keepAliveInitialDelay: number;
  };

  jwtkey: {
    JWT_SECRET: string;
    JWT_EXPIRES_IN: number;
  };
}
