<script context="module" lang="ts">
  import { invoke } from '@tauri-apps/api/tauri';

  let data = '';

  async function sendData() {
    try {
      const response = await invoke('send_to_pipe', { message: data });
      console.log('Response from backend:', response);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  input {
    margin: 10px;
    padding: 5px;
    font-size: 16px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
</style>

<div class="container">
  <input type="text" bind:value={data} placeholder="Enter your message" />
  <button on:click={sendData}>Send Data to Backend</button>
</div>
