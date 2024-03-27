/* This code snippet is exporting all the named exports from two different modules:
"./functions/akaneko" and "./functions/console". By using `export *`, it includes all the named
exports from those modules in the current module where this code is located. This allows you to
access the exported functions, variables, or classes from those modules directly in the current
module without having to import them individually. */

export * from "./functions/nekos.life";
export * from './functions/animelist';
export * from './functions/akaneko';
export * from './functions/console';