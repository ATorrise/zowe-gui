<script>
  export let systems;
  export let defaultSystem;
  export let prevStep;

  function finish() {
    // Logic to save the configuration or send it to the backend
  }
</script>

<div>
  <h2>Review Configuration</h2>
  {#each $systems as system, index}
    <div>
      <h3>System {index + 1} {index === $defaultSystem ? '(Default)' : ''}</h3>
      <p><strong>Host:</strong> {system.host}</p>
      <p><strong>Access Method:</strong> {system.accessMethod}</p>
      <p><strong>Authentication Method:</strong> {system.authMethod}</p>
      <h4>Properties</h4>
      {#each system.properties as prop}
        <p><strong>{prop.key}:</strong> {prop.value}</p>
      {/each}
    </div>
  {/each}

  <button on:click={prevStep}>Back</button>
  <button on:click={finish}>Finish</button>
</div>

<style>
  div {
    margin-bottom: 1rem;
  }
  button {
    margin-top: 1rem;
  }
</style>
