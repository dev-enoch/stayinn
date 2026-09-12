import { ApiReference } from "@scalar/nextjs-api-reference";

export const GET = ApiReference({
  theme: "default",
  pageTitle: "Monarch Stay API Reference",
  spec: {
    url: "/swagger.json",
  },
});
