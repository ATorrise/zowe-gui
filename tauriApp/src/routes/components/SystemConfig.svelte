<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let configType;

    let systemName = '';

    const addSystem = () => {
        dispatch('addsystem', { systemName });
        systemName = '';
    };
</script>

{#if configType !== 'Flat: Profiles'}
    <h2>Add {configType === '3 tiered: SYSPLEX -> LPAR -> Profiles' ? 'Sysplex' : 'LPAR'}</h2>
    <div>
        <label>System Name</label>
        <input type="text" bind:value={systemName} />
    </div>
    <button on:click={addSystem}>Add System</button>
{/if}
