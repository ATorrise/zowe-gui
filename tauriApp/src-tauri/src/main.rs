#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::fs::OpenOptions;
use std::io::Write;
use tauri::generate_handler;
use tauri::{Builder, command};

#[command]
async fn write_to_pipe(message: String) -> Result<(), String> {
    let pipe_path = r"\\.\pipe\tauriNodeComm";
    let mut file = match OpenOptions::new().write(true).open(pipe_path) {
        Ok(file) => file,
        Err(e) => return Err(format!("Error opening pipe: {:?}", e)),
    };

    match file.write_all(message.as_bytes()) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Error writing to pipe: {:?}", e)),
    }
}

fn main() {
    Builder::default()
        .invoke_handler(generate_handler![write_to_pipe])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}