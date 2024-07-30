#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tokio::runtime::Runtime;

mod comm;
use comm::{connect_to_pipe, write_to_pipe, read_from_pipe};

#[tauri::command]
fn send_to_pipe(message: String) -> Result<String, String> {
    println!("Received message from frontend: {}", message); // Print the message in the terminal

    let runtime = Runtime::new().unwrap();
    let pipe_name = r"\\.\pipe\tauriNodeComm";

    runtime.block_on(async {
        let mut client = connect_to_pipe(pipe_name).await.map_err(|e| e.to_string())?;
        write_to_pipe(&mut client, &message).await.map_err(|e| e.to_string())?;
        let response = read_from_pipe(&mut client).await.map_err(|e| e.to_string())?;
        Ok(response)
    })
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![send_to_pipe])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
