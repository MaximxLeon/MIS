import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  documents: ["src/**/*.{graphql,gql}"],
  generates: {
    "./src/shared/api/graphql/generated/": {
      preset: "client",
    },
  },
};

export default config;