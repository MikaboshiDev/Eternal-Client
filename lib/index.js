"use strict";
/* This code snippet is exporting all the named exports from two different modules:
"./functions/akaneko" and "./functions/console". By using `export *`, it includes all the named
exports from those modules in the current module where this code is located. This allows you to
access the exported functions, variables, or classes from those modules directly in the current
module without having to import them individually. */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./functions/nekos.life"), exports);
__exportStar(require("./functions/animelist"), exports);
__exportStar(require("./functions/akaneko"), exports);
__exportStar(require("./functions/console"), exports);
//# sourceMappingURL=index.js.map