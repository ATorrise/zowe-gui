<script>
    export let profiles = [];
    export let nestedConfig = {};
    export let tierType;
</script>

<h2>Review Configuration</h2>

{#if tierType === 'flat'}
    <div>
        {#each profiles as profile}
            <div>
                Host Address: {profile.hostAddress}<br />
                Authentication Method: {profile.authenticationMethod}<br />
                Profile Type: {profile.profileType}<br />
                Port: {profile.port}<br />
                {#if profile.rejectUnauthorized !== undefined}
                    Reject Unauthorized: {profile.rejectUnauthorized ? 'true' : 'false'}<br />
                {/if}
                {#if profile.user}
                    User: {profile.user}<br />
                {/if}
                {#if profile.password}
                    Password: {profile.password}<br />
                {/if}
                {#if profile.certFilePath}
                    Cert File Path: {profile.certFilePath}<br />
                {/if}
                {#if profile.certKeyFile}
                    Cert Key File: {profile.certKeyFile}<br />
                {/if}
            </div>
        {/each}
    </div>
{:else if tierType === '2-tiered'}
    <div>
        {#each nestedConfig.sysplexes as sysplex}
            <div>
                <h3>Sysplex: {sysplex.name}</h3>
                {#each sysplex.lpars as lpar}
                    <div>
                        <h4>LPAR: {lpar.name}</h4>
                        <ul>
                            {#each lpar.profiles as profile}
                                <li>
                                    Host Address: {profile.hostAddress}<br />
                                    Authentication Method: {profile.authenticationMethod}<br />
                                    Profile Type: {profile.profileType}<br />
                                    Port: {profile.port}<br />
                                    {#if profile.rejectUnauthorized !== undefined}
                                        Reject Unauthorized: {profile.rejectUnauthorized ? 'true' : 'false'}<br />
                                    {/if}
                                    {#if profile.user}
                                        User: {profile.user}<br />
                                    {/if}
                                    {#if profile.password}
                                        Password: {profile.password}<br />
                                    {/if}
                                    {#if profile.certFilePath}
                                        Cert File Path: {profile.certFilePath}<br />
                                    {/if}
                                    {#if profile.certKeyFile}
                                        Cert Key File: {profile.certKeyFile}<br />
                                    {/if}
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
{:else if tierType === '3-tiered'}
    <div>
        {#each nestedConfig.sysplexes as sysplex}
            <div>
                <h3>Sysplex: {sysplex.name}</h3>
                {#each sysplex.lpars as lpar}
                    <div>
                        <h4>LPAR: {lpar.name}</h4>
                        <ul>
                            {#each lpar.profiles as profile}
                                <li>
                                    Host Address: {profile.hostAddress}<br />
                                    Authentication Method: {profile.authenticationMethod}<br />
                                    Profile Type: {profile.profileType}<br />
                                    Port: {profile.port}<br />
                                    {#if profile.rejectUnauthorized !== undefined}
                                        Reject Unauthorized: {profile.rejectUnauthorized ? 'true' : 'false'}<br />
                                    {/if}
                                    {#if profile.user}
                                        User: {profile.user}<br />
                                    {/if}
                                    {#if profile.password}
                                        Password: {profile.password}<br />
                                    {/if}
                                    {#if profile.certFilePath}
                                        Cert File Path: {profile.certFilePath}<br />
                                    {/if}
                                    {#if profile.certKeyFile}
                                        Cert Key File: {profile.certKeyFile}<br />
                                    {/if}
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
{/if}
