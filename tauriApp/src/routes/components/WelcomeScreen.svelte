<script>
  export let nextStep;
</script>

<div>
  <h1>Welcome to the Configuration Setup</h1>
  <p>You'll be guided through the steps to set up your systems and profiles.</p>
  <button on:click={nextStep}>Start</button>
</div>

<style>
  div {
    text-align: center;
  }
  button {
    margin-top: 1rem;
  }
</style>
