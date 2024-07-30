use std::io;
use tokio::io::AsyncWriteExt;
use tokio::io::AsyncReadExt;

#[cfg(target_family = "windows")]
use tokio::net::windows::named_pipe::{ClientOptions, NamedPipeClient};

#[cfg(target_family = "windows")]
type DaemonClient = NamedPipeClient;

#[cfg(target_family = "unix")]
type DaemonClient = tokio::net::UnixStream;

pub async fn connect_to_pipe(pipe_name: &str) -> io::Result<DaemonClient> {
    let client = ClientOptions::new().open(pipe_name)?;
    Ok(client)
}

pub async fn write_to_pipe(client: &mut DaemonClient, message: &str) -> io::Result<()> {
    client.write_all(message.as_bytes()).await?;
    Ok(())
}

pub async fn read_from_pipe(client: &mut DaemonClient) -> io::Result<String> {
    let mut buffer = vec![0; 1024];
    let n = client.read(&mut buffer).await?;
    let response = String::from_utf8_lossy(&buffer[..n]).to_string();
    Ok(response)
}
