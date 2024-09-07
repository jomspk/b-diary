import type { IGraphQLConfig } from "graphql-config";
import webappConfig from "./webapp/graphql.config";

const config: IGraphQLConfig = {
  projects: {
    webapp: webappConfig,
  },
};

export default config;
