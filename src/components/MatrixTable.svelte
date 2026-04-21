<script>
  export let organSystems = [];
  export let therapeuticClasses = [];
  export let matrix = {};
  export let base = '/medications/';
</script>

<div class="overflow-x-auto">
  <table class="table table-pin-rows text-xs">
    <thead>
      <tr>
        <th class="bg-base-200">System \ Class</th>
        {#each therapeuticClasses as tc}
          <th class="bg-base-200 text-center">{tc.label}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each organSystems as os}
        <tr>
          <td class="font-medium">{os.label}</td>
          {#each therapeuticClasses as tc}
            {@const count = matrix[os.id]?.[tc.id] ?? 0}
            <td class="text-center">
              {#if count > 0}
                <a
                  href="{base}schemas/03-organ-by-class/{os.id}-{tc.id}/"
                  class="badge {count >= 5 ? 'badge-primary' : 'badge-ghost'}"
                >
                  {count}
                </a>
              {:else}
                <span class="bg-base-200 opacity-40 block w-full h-full">&nbsp;</span>
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
