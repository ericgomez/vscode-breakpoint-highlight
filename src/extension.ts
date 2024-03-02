import * as vscode from 'vscode';

const breakpointDecorationType = vscode.window.createTextEditorDecorationType({
    isWholeLine: true,
    backgroundColor: '#40252B',
});

let decorations: vscode.DecorationOptions[] = [];

function updateDecorations() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const docPath = editor.document.uri.toString();
    const breakpoints = vscode.debug.breakpoints;
    decorations = [];

    breakpoints.forEach(b => {
        if (b instanceof vscode.SourceBreakpoint && b.location.uri.toString() === docPath && b.enabled) {
            const line = b.location.range.start.line;
            const range = new vscode.Range(line, 0, line, 0);
            const decoration: vscode.DecorationOptions = { range };
            decorations.push(decoration);
        }
    });

    editor.setDecorations(breakpointDecorationType, decorations);
}

function updateDecorationsDebug() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    if (!vscode.debug.activeDebugSession) {
        editor.setDecorations(breakpointDecorationType, decorations);
    } else {
        editor.setDecorations(breakpointDecorationType, []);
    }
}

export function activate(context: vscode.ExtensionContext) {
    vscode.window.onDidChangeActiveTextEditor(updateDecorations);
    vscode.debug.onDidChangeBreakpoints(updateDecorations);
    vscode.debug.onDidStartDebugSession(updateDecorationsDebug);
    vscode.debug.onDidTerminateDebugSession(() => setTimeout(updateDecorationsDebug, 0));

    updateDecorations();
}

export function deactivate() {}
