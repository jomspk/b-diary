declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_GRAPHQL_SERVER_URL: string;
      }
    }
  }
}
