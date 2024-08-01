<script>
  import { writable } from 'svelte/store';
  import WelcomeScreen from './components/WelcomeScreen.svelte';
  import SystemConfig from './components/SystemConfig.svelte';
  import ReviewConfig from './components/ReviewConfig.svelte';

  const currentStep = writable(0);
  const systems = writable([]);
  const defaultSystem = writable(null);

  function nextStep() {
    currentStep.update(n => n + 1);
  }

  function prevStep() {
    currentStep.update(n => n - 1);
  }
</script>

<main>
  {#if $currentStep === 0}
    <WelcomeScreen {nextStep} />
  {:else if $currentStep === 1}
    <SystemConfig {systems} {defaultSystem} {nextStep} {prevStep} />
  {:else if $currentStep === 2}
    <ReviewConfig {systems} {defaultSystem} {prevStep} />
  {/if}
</main>

<style>
  main {
    padding: 2rem;
  }
</style>
