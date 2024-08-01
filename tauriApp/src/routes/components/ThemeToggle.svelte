<script>
    let theme = 'dark';

    function toggleTheme() {
        theme = theme === 'dark' ? 'light' : 'dark';
        document.body.className = theme;
    }
</script>

<button on:click={toggleTheme}>
    Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
</button>

<style>
    :global(body.dark) {
        background-color: #252628;
        color: white;
    }
    :global(body.light) {
        background-color: white;
        color: black;
    }
</style>
