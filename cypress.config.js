import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://toronto.imd.ufrn.br/jerimumjobs/",
    testIsolation: false,
  },
});
