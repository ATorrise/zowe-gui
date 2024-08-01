<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let sysplexes = [];
    export let lpars = [];
    export let configType;

    let sysplex = '';
    let lpar = '';
    let hostAddress = '';
    let accessMethod = 'APIML';
    let authenticationMethod = 'Basic Auth';
    let serviceProfileProperties = '';

    const addProfile = () => {
        dispatch('addprofile', {
            sysplex,
            lpar,
            hostAddress,
            accessMethod,
            authenticationMethod,
            serviceProfileProperties
        });
        hostAddress = '';
        accessMethod = 'APIML';
        authenticationMethod = 'Basic Auth';
        serviceProfileProperties = '';
    };
</script>

{#if configType === '3 tiered: SYSPLEX -> LPAR -> Profiles'}
    <label>Sysplex</label>
    <select bind:value={sysplex}>
        {#each sysplexes as s}
            <option>{s}</option>
        {/each}
    </select>
{/if}

{#if configType !== 'Flat: Profiles'}
    <label>LPAR</label>
    <select bind:value={lpar}>
        {#each lpars as l}
            <option>{l}</option>
        {/each}
    </select>
{/if}

<h2>Add Profile</h2>
<div>
    <label>Host Address</label>
    <input type="text" bind:value={hostAddress} />
</div>
<div>
    <label>Access Method</label>
    <select bind:value={accessMethod}>
        <option>APIML</option>
        <option>Direct</option>
    </select>
</div>
<div>
    <label>Authentication Method</label>
    <select bind:value={authenticationMethod}>
        <option>Basic Auth</option>
        <option>Client Cert</option>
    </select>
</div>
<div>
    <label>Service Profile Properties</label>
    <input type="text" bind:value={serviceProfileProperties} />
</div>
<button on:click={addProfile}>Add Profile</button>
