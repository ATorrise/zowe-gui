use std::fs::OpenOptions;
use std::io::{Write, Read};
use std::sync::mpsc::{channel, Receiver};
use std::thread;
use std::time::Duration;

use tauri::generate_handler;
use tauri::Manager;

#[tauri::command]
fn send_to_node(message: String) {
    let pipe_path = r"\\.\pipe\tauriNodeComm";

    // Write to named pipe
    match OpenOptions::new().write(true).open(pipe_path) {
        Ok(mut pipe) => {
            if let Err(e) = pipe.write_all(message.as_bytes()) {
                eprintln!("Failed to write to pipe: {}", e);
            }
        }
        Err(e) => {
            eprintln!("Failed to open pipe: {}", e);
        }
    }

    // Read response from named pipe
    let response = read_from_pipe(pipe_path).unwrap_or_else(|e| format!("Failed to read from pipe: {}", e));
    println!("Received response from pipe: {}", response);
}

fn read_from_pipe(pipe_path: &str) -> std::io::Result<String> {
    let mut buffer = String::new();
    match OpenOptions::new().read(true).open(pipe_path) {
        Ok(mut pipe) => {
            pipe.read_to_string(&mut buffer)?;
        }
        Err(e) => {
            eprintln!("Failed to open pipe for reading: {}", e);
        }
    }
    Ok(buffer)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(generate_handler![send_to_node])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
