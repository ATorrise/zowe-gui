<script context="module" lang="ts">
  import { onMount } from 'svelte';

  export let data: string = '';

  async function sendData() {
    const { exec } = require('child_process');
    const fs = require('fs');
    const pipeName = '\\\\.\\pipe\\tauriNodeComm';

    fs.open(pipeName, 'w', (err, fd) => {
      if (err) {
        console.error('Failed to open named pipe:', err);
        return;
      }
      fs.write(fd, data, (err) => {
        if (err) {
          console.error('Failed to write to named pipe:', err);
        }
        fs.close(fd, () => {});
      });
    });
  }

  onMount(() => {
    // You can initialize or call sendData() here if needed
  });
</script>

<input type="text" bind:value={data} placeholder="Enter your message" />
<button on:click={sendData}>Send Data to Named Pipe</button>
