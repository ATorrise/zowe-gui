use tauri::generate_handler;

#[tauri::command]
fn send_to_node(message: String) {
    println!("Received message from frontend: {}", message);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(generate_handler![send_to_node])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}