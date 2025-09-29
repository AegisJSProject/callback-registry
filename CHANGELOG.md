<!-- markdownlint-disable -->
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v1.0.3] - 2025-09-29

### Added
- Add `onCommand` to handle `CommandEvent`s
- Add `FUNCS.ui.open` and `FUNCS.ui.close` for `<details>` elements
- Add `FUNCS.ui.reques*tFullscreen` for requesting, exiting, and toggling fullscreen

## [v1.0.2] - 2024-11-22

### Added
- Add inviividual event constant/attribute exports
- Add support for `AbortSignal`s and `AbortController`s
- Add `on()` function for more conventient event handling, similar to `addEventListener()`
- Add new pre-defined handlers (e.g. `FUNCS.ui.close`)
- Local testing page in repo, excluded from published package

## [v1.0.1] - 2024-11-17

### Added
- Add sourcemap for minified main export module

### Fixed
- Fix registration for `back` and `forward` callbacks
- Fix eslint config

## [v1.0.0] - 2024-11-16

Initial Release
