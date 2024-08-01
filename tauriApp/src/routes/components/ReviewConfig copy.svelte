<script>
    export let profiles = [];
    export let nestedConfig = { sysplexes: [] };
    export let tierType = 'flat';
</script>

<h2>Review Configuration</h2>
{#if tierType === 'flat'}
    <ul>
        {#each profiles as profile}
            <li>{JSON.stringify(profile)}</li>
        {/each}
    </ul>
{:else if tierType === '2-tiered'}
    <ul>
        {#each nestedConfig.lpars as lpar}
            <li>
                {lpar.name}
                <ul>
                    {#each lpar.profiles as profile}
                        <li>{JSON.stringify(profile)}</li>
                    {/each}
                </ul>
            </li>
        {/each}
    </ul>
{:else if tierType === '3-tiered'}
    <ul>
        {#each nestedConfig.sysplexes as sysplex}
            <li>
                {sysplex.name}
                <ul>
                    {#each sysplex.lpars as lpar}
                        <li>
                            {lpar.name}
                            <ul>
                                {#each lpar.profiles as profile}
                                    <li>{JSON.stringify(profile)}</li>
                                {/each}
                            </ul>
                        </li>
                    {/each}
                </ul>
            </li>
        {/each}
    </ul>
{/if}
