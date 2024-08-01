<script>
    let theme = 'dark';

    function toggleTheme() {
        theme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.classList.toggle('dark-theme', theme === 'dark');
        document.documentElement.classList.toggle('light-theme', theme === 'light');
    }
</script>

<button on:click={toggleTheme}>
    Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
</button>

<style>
    :global(.dark-theme) {
        background-color: #252628;
        color: white;
    }
    :global(.light-theme) {
        background-color: white;
        color: black;
    }
</style>
