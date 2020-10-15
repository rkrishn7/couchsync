/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

import { CONTENT_SCRIPT_ENABLED_RESPONSE } from './lib/constants/chrome';

declare global {
  export interface Window {
    COUCH_SYNC_CONTENT_SCRIPT_ENABLED: boolean;
  }

  export interface History {
    onPushState: ({ state }: { state: any }) => void;
    onReplaceState: ({ state }: { state: any }) => void;
  }
}

declare namespace chrome.tabs {
  export function sendMessage(tabId: number, message: chrome.runtime.RuntimeMessage, responseCallback?: (response: chrome.runtime.RuntimeMessage) => void): void;
}

declare namespace chrome.runtime {
  export interface RuntimeMessage {
    name: string;
    data?: Record<string, any>;
  }

  export type ListenerHandler = (message: chrome.runtime.RuntimeMessage, sender: chrome.runtime.MessageSender, sendResponse: (response?: chrome.runtime.RuntimeMessage | undefined) => void) => void

  export function sendMessage(message: RuntimeMessage, responseCallback?: (response: chrome.runtime.RuntimeMessage) => void): void;
  export interface ExtensionMessageEvent {
    addListener(callback: ListenerHandler): void;
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
