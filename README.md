## Design Document
https://docs.google.com/document/d/1O_Kh8d5py-Emobe-op5IVTBpx0sc2tpo2zJawpNNpx4/edit?usp=sharing 

## Running the project
Build and integrate Svelte and Tauri
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
Build and run zowe
```sh
npm install
npm run build
npx zowe config init # triggers gui
```
