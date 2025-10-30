# Collagraph LSP for VS Code

Language Server Protocol (LSP) support for [Collagraph](https://github.com/fork-tongue/collagraph) `.cgx` files in Visual Studio Code. Includes linting, formatting and syntax highlighting.

## Prerequisites

Before installing this extension, you need to have the Collagraph LSP server installed:

```bash
uv tool install collagraph-lsp
# or with pip
pip install collagraph-lsp
```

## Installation

### From VSIX

1. Build the extension:
   ```bash
   # Install dependencies
   npm install
   # Build the bundled extension
   npm run package
   # Package into vsix file
   npm run vsce:package
   ```

2. Install the `.vsix` file in VS Code:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
   - Click the "..." menu at the top
   - Select "Install from VSIX..."
   - Choose the generated `.vsix` file

## Configuration

The extension can be configured through VS Code settings:

### Settings

- `collagraph-lsp.enable` (boolean, default: `true`)
  - Enable/disable the Collagraph LSP server

- `collagraph-lsp.command` (string, default: `"collagraph-lsp"`)
  - Command to start the LSP server
  - Modify this if the server is not in your PATH or installed in a custom location
  - Example: `"/path/to/uv run collagraph-lsp"`

- `collagraph-lsp.trace.server` (string, default: `"off"`)
  - Trace communication between VS Code and the language server
  - Options: `"off"`, `"messages"`, `"verbose"`
  - Use `"verbose"` for debugging

## Related Projects

- [Collagraph](https://github.com/fork-tongue/collagraph) - Python port of Vue.js
- [Collagraph LSP Server](https://github.com/fork-tongue/collagraph-lsp) - The LSP server this extension uses
- [ruff-cgx](https://github.com/fork-tongue/ruff-cgx) - Collagraph linter and formatter
