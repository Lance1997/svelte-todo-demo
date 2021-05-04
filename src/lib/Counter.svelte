<script lang="ts">
  let count: number = 0;

  $: console.log('the count is '+count)
  
  const increment = ():void => {
    count += 1;
  }
</script>

<button on:click={increment} class="px-4 py-2 text-white transform bg-red-500 rounded-xl focus:outline-none hover:translate-y-1 dark:text-red-500 dark:bg-white">
  Clicks: {count}
</button>

<style>
  
</style>
