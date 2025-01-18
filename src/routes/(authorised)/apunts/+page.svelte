<script lang="ts">
  let { data } = $props();
  let apunts = $derived(data.apunts);
</script>

<svelte:head>
  <title>Apunts - Apunts Dades</title>
</svelte:head>

<div>
  {#each apunts as apunt}
    <div>
      <h2>{apunt.title}</h2>
    </div>
  {/each}
</div>