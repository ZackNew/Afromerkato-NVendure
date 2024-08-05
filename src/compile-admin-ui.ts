import { compileUiExtensions, setBranding } from "@vendure/ui-devkit/compiler";
import * as path from "path";

compileUiExtensions({
  outputPath: path.join(__dirname, "../admin-ui"),
  extensions: [
    setBranding({
      // The small logo appears in the top left of the screen
      smallLogoPath: path.join(__dirname, "images/afro2.png"),
      // The large logo is used on the login page
      largeLogoPath: path.join(__dirname, "images/afro2.png"),
      faviconPath: path.join(__dirname, "images/afro2.png"),
    }),
    {
      translations: { en: path.join(__dirname, "translations/en.json") },
    },
  ],
})
  .compile?.()
  .then(() => {
    process.exit(0);
  });
