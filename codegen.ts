import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // This assumes your server is running on the standard port
  // and with the default admin API path. Adjust accordingly.
  schema: "http://localhost:3000/admin-api",
  config: {
    // This tells codegen that the `Money` scalar is a number
    scalars: { Money: "number" },
    // This ensures generated enums do not conflict with the built-in types.
    namingConvention: { enumValues: "keep" },
  },
  generates: {
    // './src/plugins/my-new-feature/gql/generated.ts': { plugins: ['typescript'] },
    "./src/plugins/activity-log/gql/generated.ts": { plugins: ["typescript"] },
    "./src/plugins/activity-log/ui/gql/": {
      preset: "client",
      documents: "./src/plugins/activity-log/ui/**/*.ts",
      presetConfig: {
        fragmentMasking: false,
      },
    },
    "./src/plugins/charts/gql/generated.ts": { plugins: ["typescript"] },
    "./src/plugins/charts/ui/gql/": {
      preset: "client",
      documents: "./src/plugins/charts/ui/**/*.ts",
      presetConfig: {
        fragmentMasking: false,
      },
    },
    "./src/plugins/reports/gql/generated.ts": { plugins: ["typescript"] },
    "./src/plugins/reports/ui/gql/": {
      preset: "client",
      documents: "./src/plugins/reports/ui/**/*.ts",
      presetConfig: {
        fragmentMasking: false,
      },
    },
    "./src/plugins/reviews/gql/generated.ts": { plugins: ["typescript"] },
    "./src/plugins/reviews/ui/gql/": {
      preset: "client",
      documents: "./src/plugins/reviews/ui/**/*.ts",
      presetConfig: {
        fragmentMasking: false,
      },
    },
      './src/plugins/payment-method/gql/generated.ts': { plugins: ['typescript'] },
},
};

export default config;
