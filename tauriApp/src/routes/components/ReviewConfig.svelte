<script>
    export let profiles = [];
</script>

<h2>Review Configuration</h2>

{#each profiles as profile}
    <div>
        {#if profile.sysplex}
            <h3>{profile.sysplex}</h3>
        {/if}
        {#if profile.lpar}
            <h4>{profile.lpar}</h4>
        {/if}
        <ul>
            <li>{JSON.stringify(profile)}</li>
        </ul>
    </div>
{/each}
