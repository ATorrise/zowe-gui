<script>
    import { onMount } from 'svelte';
    import AddProfile from './components/AddProfile.svelte';
    import ThemeToggle from './components/ThemeToggle.svelte';
    import ReviewConfig from './components/ReviewConfig.svelte';
    import SystemConfig from './components/SystemConfig.svelte';
    import WelcomeScreen from './components/WelcomeScreen.svelte';

    let profiles = [];
    let nestedConfig = {
        sysplexes: []
    };
    let currentSysplex = null;
    let currentLpar = null;
    let tierType = 'flat'; // default to flat

    const addProfile = (event) => {
        const profile = event.detail;
        if (tierType === 'flat') {
            profiles = [...profiles, profile];
        } else if (tierType === '2-tiered') {
            if (currentLpar) {
                currentLpar.profiles.push(profile);
            } else {
                profiles = [...profiles, profile];
            }
        } else if (tierType === '3-tiered') {
            if (currentSysplex && currentLpar) {
                currentLpar.profiles.push(profile);
            } else {
                profiles = [...profiles, profile];
            }
        }
    };

    const addSysplex = (sysplex) => {
        nestedConfig.sysplexes.push({ name: sysplex, lpars: [] });
        currentSysplex = nestedConfig.sysplexes[nestedConfig.sysplexes.length - 1];
    };

    const addLpar = (lpar) => {
        if (currentSysplex) {
            currentSysplex.lpars.push({ name: lpar, profiles: [] });
            currentLpar = currentSysplex.lpars[currentSysplex.lpars.length - 1];
        }
    };

    const resetCurrentLpar = () => {
        currentLpar = null;
    };

    onMount(() => {
        document.documentElement.classList.add('dark-theme');
    });
</script>

<ThemeToggle />
<WelcomeScreen />
<div>
    <h2>Configuration Type</h2>
    <select bind:value={tierType}>
        <option value="flat">Flat: Profiles</option>
        <option value="2-tiered">2-tiered: LPAR -> Profiles</option>
        <option value="3-tiered">3-tiered: SYSPLEX -> LPAR -> Profiles</option>
    </select>
</div>
{#if tierType === '3-tiered'}
    <SystemConfig title="Add Sysplex" on:addsystem={event => addSysplex(event.detail.systemName)} />
{/if}
{#if tierType !== 'flat'}
    <SystemConfig title="Add LPAR" on:addsystem={event => addLpar(event.detail.systemName)} />
{/if}
<AddProfile {tierType} sysplexes={nestedConfig.sysplexes} lpars={currentSysplex ? currentSysplex.lpars : []} on:addprofile={addProfile} />
<ReviewConfig {profiles} {nestedConfig} {tierType} />

<h2>Profiles</h2>
<ul>
    {#each profiles as profile}
        <li>{JSON.stringify(profile)}</li>
    {/each}
</ul>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto:300,400,500');
    @import '../styles.css';
</style>
