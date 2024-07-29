## Design Document
https://docs.google.com/document/d/1O_Kh8d5py-Emobe-op5IVTBpx0sc2tpo2zJawpNNpx4/edit?usp=sharing 

## Running the project

### 1. Build and integrate Svelte and Tauri
```sh
# For Svelte
cd tauriApp
npm install
npm run build
```
```sh
# For Tauri
cd tauriApp/src-tauri
cargo build
```

### 2. Build Zowe
```sh
npm install
npm run build
```

### 3. Run Zowe
Use npx 
  ```sh
  npx zowe config init # triggers gui
  ```
or  <br /> <br />
Run the debugger after modifying `.vscode/launch.json`
  ```sh
  {
      "commonSettings": {
          "outFilesDirectory": "${workspaceFolder}/dist"
      },
      "configurations": [
      {
          "type": "node",
          "request": "launch",
          "name": "config init",
          "program": "${workspaceFolder}/zowe-cli/packages/cli/lib/main.js",
          "console": "integratedTerminal",
          "args": ["config", "init"],
          "outputCapture": "std",
          "resolveSourceMapLocations": null
      }
    ]
  }
  ```
