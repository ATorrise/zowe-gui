<script>
  import { writable } from 'svelte/store';
  export let systems;
  export let defaultSystem;
  export let nextStep;
  export let prevStep;

  let numberOfSystems = 0;
  let currentSystemIndex = 0;
  let tempSystems = [];

  function addSystem() {
    if (currentSystemIndex < numberOfSystems) {
      tempSystems[currentSystemIndex] = {
        host: '',
        accessMethod: 'APIML',
        authMethod: 'Basic Auth',
        properties: []
      };
      currentSystemIndex++;
    }
  }

  function saveSystem() {
    systems.set(tempSystems);
    nextStep();
  }
</script>

<div>
  <h2>Configure Systems</h2>
  <label>Number of Systems</label>
  <input type="number" bind:value={numberOfSystems} min="1" on:change={addSystem} />

  {#each tempSystems as system, index}
    <div>
      <h3>System {index + 1}</h3>
      <label>Host Address</label>
      <input type="text" bind:value={system.host} />

      <label>Access Method</label>
      <select bind:value={system.accessMethod}>
        <option>APIML</option>
        <option>Direct-to-Service</option>
      </select>

      <label>Authentication Method</label>
      <select bind:value={system.authMethod}>
        <option>Basic Auth</option>
        <option>Client Cert</option>
      </select>

      <h4>Service Profile Properties</h4>
      <button on:click={() => system.properties.push({ key: '', value: '' })}>Add Property</button>
      {#each system.properties as prop}
        <div>
          <input type="text" placeholder="Key" bind:value={prop.key} />
          <input type="text" placeholder="Value" bind:value={prop.value} />
        </div>
      {/each}
    </div>
  {/each}

  <label>Default System</label>
  <select bind:value={$defaultSystem}>
    {#each tempSystems as system, index}
      <option value={index}>System {index + 1}</option>
    {/each}
  </select>

  <button on:click={prevStep}>Back</button>
  <button on:click={saveSystem}>Next</button>
</div>

<style>
  div {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    margin-top: 1rem;
  }
  button {
    margin-top: 1rem;
  }
</style>
