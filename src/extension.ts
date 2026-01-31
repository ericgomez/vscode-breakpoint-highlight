import * as vscode from 'vscode';

function createBreakpointDecoration(): vscode.TextEditorDecorationType {
  const backgroundColor = vscode.workspace
    .getConfiguration()
    .get<string>('breakpointHighlight.backgroundColor', '#7A354166');

  return vscode.window.createTextEditorDecorationType({
    isWholeLine: true,
    backgroundColor: backgroundColor,
  });
}

let breakpointDecoration = createBreakpointDecoration();
let decorations: vscode.DecorationOptions[] = [];

function updateDecorations() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  const docPath = editor.document.uri.toString();
  const breakpoints = vscode.debug.breakpoints;
  decorations = [];

  breakpoints.forEach((b) => {
    if (
      b instanceof vscode.SourceBreakpoint &&
      b.location.uri.toString() === docPath &&
      b.enabled
    ) {
      const line = b.location.range.start.line;
      const range = new vscode.Range(line, 0, line, 0);
      const decoration: vscode.DecorationOptions = { range };

      decorations.push(decoration);
    }
  });

  editor.setDecorations(breakpointDecoration, decorations);
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration('breakpointHighlight.backgroundColor')) {
        breakpointDecoration.dispose();
        breakpointDecoration = createBreakpointDecoration();
        updateDecorations();
      }
    }),
  );

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateDecorations),
  );

  context.subscriptions.push(
    vscode.debug.onDidChangeBreakpoints(updateDecorations),
  );

  context.subscriptions.push(breakpointDecoration);

  updateDecorations();
}

export function deactivate() { }
