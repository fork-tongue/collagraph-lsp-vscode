import { workspace, window } from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  ExecutableOptions,
  Executable,
} from "vscode-languageclient/node";

let client: LanguageClient | undefined;

export function activate() {
  // Check if the LSP is enabled
  const config = workspace.getConfiguration("collagraph-lsp");
  if (!config.get("enable")) {
    return;
  }

  // Get the command to start the server
  const command = config.get<string>("command") || "collagraph-lsp";

  // Server options - use the configured command
  const executable: Executable = {
    command: command,
    args: [],
    options: {
      // Run in the workspace folder if available
      cwd: workspace.workspaceFolders?.[0]?.uri.fsPath,
    } as ExecutableOptions,
  };

  const serverOptions: ServerOptions = executable;

  // Client options
  const clientOptions: LanguageClientOptions = {
    // Register the server for Collagraph documents
    documentSelector: [
      { scheme: "file", language: "collagraph" },
      { scheme: "file", pattern: "**/*.cgx" },
    ],
    synchronize: {
      // Synchronize the settings section 'collagraph-lsp' to the server
      configurationSection: "collagraph-lsp",
      // Notify the server about file changes to .cgx files
      fileEvents: workspace.createFileSystemWatcher("**/*.cgx"),
    },
    outputChannelName: "Collagraph LSP",
  };

  // Create and start the language client
  client = new LanguageClient(
    "collagraph-lsp",
    "Collagraph LSP",
    serverOptions,
    clientOptions,
  );

  // Start the client (this will also launch the server)
  client.start().catch((error) => {
    window.showErrorMessage(
      `Failed to start Collagraph LSP server: ${error.message}. ` +
        `Make sure 'collagraph-lsp' is installed and available in your PATH, ` +
        `or configure the 'collagraph-lsp.command' setting.`,
    );
  });
}

export function deactivate(): Promise<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
