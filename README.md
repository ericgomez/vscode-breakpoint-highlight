# Breakpoint Highlight

Welcome to the Breakpoint Highlight extension for Visual Studio Code! This extension enhances your debugging experience by making breakpoints more visible and manageable. With Breakpoint Highlight, you can easily navigate through your code and identify where you've set breakpoints at a glance.

## Configuration

To customize the background color of your breakpoints, follow these steps:

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and select `Preferences: Open Settings (UI)`.
2. Search for `Breakpoint Highlight`.
3. Find the `Breakpoint Highlight: Background Color` setting and enter a color value in hexadecimal format.

Alternatively, you can directly edit your `settings.json` file by adding the following line:
```json
"breakpointHighlight.backgroundColor": "#40252BAA"
```

Replace `#40252BAA` with the hexadecimal color code of your choice. Supported formats are `#RRGGBB` and `#RRGGBBAA` (e.g., `#40252B` or `#40252BAA`).