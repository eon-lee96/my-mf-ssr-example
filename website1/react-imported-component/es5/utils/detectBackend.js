"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var detect_node_es_1 = require("detect-node-es");
exports.isBackend = detect_node_es_1.isNode || typeof window === 'undefined';
