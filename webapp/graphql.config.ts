import path from "node:path";
import { fileURLToPath } from "node:url";
import type { IGraphQLConfig } from "graphql-config";
import type { CodegenConfig } from "@graphql-codegen/cli";
import type { ClientPresetConfig } from "@graphql-codegen/client-preset";
import type { TypeScriptPluginConfig } from "@graphql-codegen/typescript";
import type { TypeScriptDocumentsPluginConfig } from "@graphql-codegen/typescript-operations";
import type { AddPluginConfig } from "@graphql-codegen/add";
import type { FragmentMatcherConfig } from "@graphql-codegen/fragment-matcher";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const config = {
  schema: path.join(dirname, "*.graphqls"),
  documents: path.join(dirname, "./src/**/*.{ts,tsx}"),
  extensions: {
    codegen: {
      ignoreNoDocuments: true,
      generates: {
        "./src/gql/__generated__/": {
          preset: "client",
          presetConfig: {
            fragmentMasking: false,
            gqlTagName: "gql",
          } satisfies ClientPresetConfig,
          config: {
            strictScalars: true,
            useTypeImports: true,
            skipTypename: true,
            arrayInputCoercion: true,
            avoidOptionals: {
              field: true,
              inputValue: false,
              object: true,
              defaultValue: false,
            },
            enumsAsTypes: true,
            scalars: {
              Uint: "number",
              Uint32: "number",
              Date: "DateString",
              Time: "TimeString",
            },
          } satisfies TypeScriptPluginConfig & TypeScriptDocumentsPluginConfig,
          plugins: [
            {
              add: {
                content: [
                  "export type DateString = string & { readonly brand: unique symbol };",
                  "export type TimeString = string & { readonly brand: unique symbol };",
                ],
              } satisfies AddPluginConfig,
            },
          ],
        },
        "./src/gql/__generated__/introspection.ts": {
          plugins: ["fragment-matcher"],
          config: {
            apolloClientVersion: 3,
            useExplicitTyping: true,
          } satisfies FragmentMatcherConfig,
        },
      },
      hooks: {
        afterAllFileWrite: ["prettier --write"],
      },
    } satisfies CodegenConfig,
  },
} satisfies IGraphQLConfig;

export default config;
