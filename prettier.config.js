/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  useTabs: false,
  singleQuote: false,
  trailingComma: "all",
  tabWidth: 2,
  semi: false,
  arrowParens: "avoid",
  printWidth: 79,
}

export default config
