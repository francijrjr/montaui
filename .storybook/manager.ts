import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

const montaTheme = create({
  base: "dark",
  brandTitle: "Monta UI Design System",
  brandUrl: "https://github.com/francijrjr/wf-willfran",
  brandImage: undefined,
  brandTarget: "_self",

  colorPrimary: "#753399",
  colorSecondary: "#753399",

  // UI
  appBg: "#09090b",
  appContentBg: "#09090b",
  appPreviewBg: "#09090b",
  appBorderColor: "#27272a",
  appBorderRadius: 8,

  // Text
  textColor: "#fafafa",
  textInverseColor: "#09090b",

  // Toolbar
  barTextColor: "#a1a1aa",
  barSelectedColor: "#753399",
  barBg: "#09090b",

  // Form colors
  inputBg: "#18181b",
  inputBorder: "#27272a",
  inputTextColor: "#fafafa",
  inputBorderRadius: 6,
});

addons.setConfig({
  theme: montaTheme,
});
