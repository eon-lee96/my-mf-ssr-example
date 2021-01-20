import { isNode } from 'detect-node-es';
export var isBackend = isNode || typeof window === 'undefined';
