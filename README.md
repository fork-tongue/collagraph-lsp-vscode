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

<!-- TODO: make this available from the release page / builds -->

### From VSIX

1. Build the extension:
   ```bash
   cd vscode-collagraph-lsp
   npm install
   npm run compile
   npm run package
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

### Example Configuration

Add to your `settings.json`:

```json
{
  "collagraph-lsp.enable": true,
  "collagraph-lsp.command": "collagraph-lsp",
  "collagraph-lsp.trace.server": "off"
}
```

If `collagraph-lsp` is not in your PATH, use the full command:

```json
{
  "collagraph-lsp.command": "/Users/you/.local/bin/collagraph-lsp"
}
```

Or if using `uv run`:

```json
{
  "collagraph-lsp.command": "uv run --directory /path/to/collagraph-lsp collagraph-lsp"
}
```

## Usage

Once installed and configured, the extension automatically activates when you open a `.cgx` file.

### Example Collagraph File

Create a file with the `.cgx` extension:

```html
<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <button @click="handle_click" :disabled="is_loading">
      {{ button_text }}
    </button>
    <ul>
      <li v-for="item in items">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
from typing import List

def setup():
    title = "My Collagraph App"
    is_loading = False
    items = [
        {"name": "Item 1"},
        {"name": "Item 2"},
    ]

    def handle_click():
        nonlocal is_loading
        is_loading = True
        # Do something...
        is_loading = False

    return {
        "title": title,
        "is_loading": is_loading,
        "items": items,
        "button_text": "Click Me",
        "handle_click": handle_click,
    }
</script>

<style>
.container {
  padding: 20px;
}
</style>
```

You'll get:
- Syntax highlighting for all sections
- Real-time linting of Python code in `<script>` tags
- Error diagnostics with line numbers
- Auto-completion for brackets and quotes

## Troubleshooting

### Extension not working

1. Check if the LSP server is installed:
   ```bash
   which collagraph-lsp
   ```

2. Enable verbose logging:
   ```json
   {
     "collagraph-lsp.trace.server": "verbose"
   }
   ```

3. Check the Output panel:
   - View → Output (Ctrl+Shift+U / Cmd+Shift+U)
   - Select "Collagraph LSP" from the dropdown

### LSP server not found

If you see errors about the server not being found:

1. Find the full path to the server:
   ```bash
   which collagraph-lsp
   ```

2. Update the `collagraph-lsp.command` setting with the full path

3. Alternatively, add the directory to your PATH

### No diagnostics appearing

1. Make sure the file has a `.cgx` extension
2. Check that the LSP server is running (check Output panel)
3. Try saving the file to trigger validation
4. Verify Ruff configuration in your project

## Development

### Building

```bash
npm install
npm run compile
```

### Packaging

```bash
npm run package
```

This creates a `.vsix` file you can share or install.

### Publishing

To publish to the VS Code Marketplace:

```bash
npm run publish
```

(Requires appropriate credentials and publisher setup)

## Related Projects

- [Collagraph](https://github.com/fork-tongue/collagraph) - Python port of Vue.js
- [Collagraph LSP Server](../) - The LSP server this extension uses
- [Ruff](https://github.com/astral-sh/ruff) - Fast Python linter

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
