<script>
    import { createEventDispatcher } from 'svelte';

    export let title;
    export let sysplex;

    const dispatch = createEventDispatcher();

    let systemName = '';

    const addSystem = () => {
        dispatch('addsystem', { systemName, sysplex });
        systemName = '';
    };
</script>

<h2>{title}</h2>
<div>
    <label>System Name</label>
    <input type="text" bind:value={systemName} />
    <button on:click={addSystem}>Add System</button>
</div>

<style>
    /* Add styles as necessary */
</style>
