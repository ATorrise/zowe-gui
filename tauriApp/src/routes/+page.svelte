<script>
    let dataToSend = { message: "Hello from Svelte!" };

    async function sendData() {
      const response = await fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      const responseData = await response.json();
      console.log(responseData); // Log the response from the server
    }
  </script>

  <button on:click={sendData}>Send Data to Node.js</button>
