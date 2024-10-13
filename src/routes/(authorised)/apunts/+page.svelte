<script>
  export let data;
  $: apunts = data.apunts;
</script>

<svelte:head>
  <title>Apunts</title>
</svelte:head>

<div>
  {#each apunts as apunt}
    <div>
      <h2>{apunt.title}</h2>
      <p>{apunt.assignatura}</p>
    </div>
  {/each}
</div>