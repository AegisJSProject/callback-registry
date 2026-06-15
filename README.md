# `@aegisjsproject/callback-registry`

A template repo for npm packages

[![CodeQL](https://github.com/AegisJSProject/callback-registry/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/AegisJSProject/callback-registry/actions/workflows/codeql-analysis.yml)
![Node CI](https://github.com/AegisJSProject/callback-registry/workflows/Node%20CI/badge.svg)
![Lint Code Base](https://github.com/AegisJSProject/callback-registry/workflows/Lint%20Code%20Base/badge.svg)

[![GitHub license](https://img.shields.io/github/license/AegisJSProject/callback-registry.svg)](https://github.com/AegisJSProject/callback-registry/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/AegisJSProject/callback-registry.svg)](https://github.com/AegisJSProject/callback-registry/commits/master)
[![GitHub release](https://img.shields.io/github/release/AegisJSProject/callback-registry?logo=github)](https://github.com/AegisJSProject/callback-registry/releases)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/shgysk8zer0?logo=github)](https://github.com/sponsors/shgysk8zer0)

[![npm](https://img.shields.io/npm/v/@aegisjsproject/callback-registry)](https://www.npmjs.com/package/@aegisjsproject/callback-registry)
![node-current](https://img.shields.io/node/v/@aegisjsproject/callback-registry)
![npm bundle size gzipped](https://img.shields.io/bundlephobia/minzip/@aegisjsproject/callback-registry)
[![npm](https://img.shields.io/npm/dw/@aegisjsproject/callback-registry?logo=npm)](https://www.npmjs.com/package/@aegisjsproject/callback-registry)

[![GitHub followers](https://img.shields.io/github/followers/AegisJSProject.svg?style=social)](https://github.com/shgysk8zer0)
![GitHub forks](https://img.shields.io/github/forks/AegisJSProject/callback-registry.svg?style=social)
![GitHub stars](https://img.shields.io/github/stars/AegisJSProject/callback-registry.svg?style=social)
[![Twitter Follow](https://img.shields.io/twitter/follow/shgysk8zer0.svg?style=social)](https://twitter.com/shgysk8zer0)

[![Donate using Liberapay](https://img.shields.io/liberapay/receives/shgysk8zer0.svg?logo=liberapay)](https://liberapay.com/shgysk8zer0/donate "Donate using Liberapay")
- - -

- [Code of Conduct](./.github/CODE_OF_CONDUCT.md)
- [Contributing](./.github/CONTRIBUTING.md)
- [Security Policy](./.github/SECURITY.md)

A lightweight, modular JavaScript library for managing DOM events and callbacks. The library is designed for flexibility and efficiency, with a focus on leveraging modern JavaScript standards.

## Features

- **Callback Management**: Centralized registration and retrieval of reusable callback functions.
- **Event Handling**: Simplified DOM event binding with support for custom attributes (e.g., `data-aegis-event-on-*`).
- **Custom Events**: Easily define and trigger application-specific events.
- **Declarative Attributes**: Leverages custom data attributes for declarative event configuration.

## Installation

```bash
npm install @aegisjsproject/callback-registry
```

## Example usage
```js
import { createCallback, observeEvents, EVENTS } from '@aegisjsproject/callback-registry';

observeEvents();

const el = document.querySelector('.container');

el.setHTMLUnsafe(`<button ${EVENTS.onClick}="${createCallback(({ target }) => alert(target.innerHTML))}">Hello, World!</button>`);
```
