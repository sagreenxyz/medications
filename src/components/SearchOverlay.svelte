<script>
  import { onMount } from 'svelte';
  
  let open = false;
  let query = '';
  let results = [];
  let fuse;

  export let base = '/medications/';

  onMount(() => {
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        open = true;
      }
      if (e.key === 'Escape') open = false;
    });
  });

  async function loadFuse() {
    if (fuse) return;
    const [{ default: Fuse }, res] = await Promise.all([
      import('https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.esm.min.js'),
      fetch(`${base}drugs.json`).catch(() => ({ json: () => [] }))
    ]);
    const drugs = await res.json().catch(() => []);
    fuse = new Fuse(drugs, {
      keys: ['generic_name', 'brand_names', 'drug_class', 'indications', 'adverse_effect_tags'],
      threshold: 0.3,
    });
  }

  async function search() {
    await loadFuse();
    results = query.length > 1 ? fuse.search(query).slice(0, 10) : [];
  }
</script>

{#if open}
  <div class="modal modal-open">
    <div class="modal-box max-w-lg">
      <input
        class="input input-bordered w-full mb-4"
        placeholder="Search drugs..."
        bind:value={query}
        on:input={search}
        autofocus
      />
      {#if results.length > 0}
        <ul class="menu menu-compact bg-base-200 rounded-box">
          {#each results as r}
            <li>
              <a href="{base}drugs/{r.item.id}" on:click={() => open = false}>
                <span class="font-medium">{r.item.generic_name}</span>
                <span class="text-xs text-base-content/60 ml-2">{r.item.drug_class}</span>
              </a>
            </li>
          {/each}
        </ul>
      {:else if query.length > 1}
        <p class="text-center text-base-content/50">No results found.</p>
      {/if}
      <div class="modal-action">
        <button class="btn btn-sm" on:click={() => open = false}>Close</button>
      </div>
    </div>
    <div class="modal-backdrop" on:click={() => open = false}></div>
  </div>
{/if}
