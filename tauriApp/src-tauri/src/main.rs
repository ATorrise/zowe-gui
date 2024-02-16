#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]


#[tauri::command]
fn send_to_node(message: String) {
    println!("Received message from frontend: {}", message);
    // Handle the message, perhaps sending it to a Node.js server
}

fn main() {
  tauri::Builder::default()
    // Pass the command handler function names to `generate_handler!`
    .invoke_handler(tauri::generate_handler![send_to_node])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}