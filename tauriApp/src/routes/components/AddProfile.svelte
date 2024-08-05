<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let sysplexes = [];
    export let lpars = [];
    export let tierType;

    let sysplex = '';
    let lpar = '';
    let hostAddress = '';
    let authenticationMethod = 'APIML';
    let profileType = 'base';
    let port = '';
    let rejectUnauthorized = true;
    let user = '';
    let password = '';
    let certFilePath = '';
    let certKeyFile = '';

    const addProfile = () => {
        const profile = {
            hostAddress,
            authenticationMethod,
            profileType,
            port,
            rejectUnauthorized: rejectUnauthorized === false ? false : undefined,
            user: authenticationMethod === 'Basic (User, Password)' ? user : undefined,
            password: authenticationMethod === 'Basic (User, Password)' ? password : undefined,
            certFilePath: authenticationMethod === 'Cert' ? certFilePath : undefined,
            certKeyFile: authenticationMethod === 'Cert' ? certKeyFile : undefined
        };
        dispatch('addprofile', profile);
    };

    const clearProfileInfo = () => {
        authenticationMethod = 'APIML';
        profileType = 'base';
        hostAddress = '';
        port = '';
        rejectUnauthorized = true;
        user = '';
        password = '';
        certFilePath = '';
        certKeyFile = '';
    };
</script>

<h2>Add Profile</h2>
{#if tierType === '3-tiered'}
    <label>SYSPLEX</label>
    <select bind:value={sysplex}>
        <option value="">Select SYSPLEX</option>
        {#each sysplexes as s}
            <option>{s.name}</option>
        {/each}
    </select>
{/if}

{#if tierType !== 'flat'}
    <label>LPAR</label>
    <select bind:value={lpar}>
        <option value="">Select LPAR</option>
        {#each lpars as l}
            <option>{l.name}</option>
        {/each}
    </select>
{/if}

<div>
    <label>Authentication Method</label>
    <select bind:value={authenticationMethod}>
        <option>APIML</option>
        <option>Basic (User, Password)</option>
        <option>Cert</option>
    </select>
</div>
<div>
    <label>Profile Type</label>
    <select bind:value={profileType}>
        <option>base</option>
        <option>zosmf</option>
        <option>tso</option>
        <option>zftp</option>
        <option>ssh</option>
    </select>
</div>
<div>
    <label>Host Address</label>
    <input type="text" bind:value={hostAddress} />
</div>
<div>
    <label>Port</label>
    <input type="text" bind:value={port} />
</div>
<div>
    <label>Reject Unauthorized</label>
    <input type="checkbox" bind:checked={rejectUnauthorized} />
</div>
{#if authenticationMethod === 'Basic (User, Password)'}
    <div>
        <label>User</label>
        <input type="text" bind:value={user} />
    </div>
    <div>
        <label>Password</label>
        <input type="password" bind:value={password} />
    </div>
{/if}
{#if authenticationMethod === 'Cert'}
    <div>
        <label>Cert File Path</label>
        <input type="text" bind:value={certFilePath} />
    </div>
    <div>
        <label>Cert Key File</label>
        <input type="text" bind:value={certKeyFile} />
    </div>
{/if}
<button on:click={addProfile}>Add Profile</button>
<button on:click={clearProfileInfo}>Clear Profile Info</button>