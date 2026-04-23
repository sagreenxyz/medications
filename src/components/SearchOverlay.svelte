<script>
  import { onMount } from 'svelte';
  
  let open = false;
  let query = '';
  let results = [];
  let fuse;
  let inputEl;
  let selectedIdx = -1;

  export let base = '/medications/';

  onMount(() => {
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  });

  function handleGlobalKey(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      open = true;
      setTimeout(() => inputEl && inputEl.focus(), 50);
    }
    if (e.key === 'Escape') closeOverlay();
    if (open && e.key === 'ArrowDown') { e.preventDefault(); selectedIdx = Math.min(selectedIdx + 1, results.length - 1); }
    if (open && e.key === 'ArrowUp') { e.preventDefault(); selectedIdx = Math.max(selectedIdx - 1, -1); }
    if (open && e.key === 'Enter' && selectedIdx >= 0 && results[selectedIdx]) {
      window.location.href = `${base}drugs/${results[selectedIdx].item.id}/`;
    }
  }

  function closeOverlay() {
    open = false;
    query = '';
    results = [];
    selectedIdx = -1;
  }

  async function loadFuse() {
    if (fuse) return;
    try {
      const [fuseModule, res] = await Promise.all([
        import('https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.esm.min.js'),
        fetch(`${base}drugs.json`)
      ]);
      const FuseLib = fuseModule.default || fuseModule;
      const drugs = await res.json();
      fuse = new FuseLib(drugs, {
        keys: [
          { name: 'generic_name', weight: 2 },
          { name: 'brand_names', weight: 1.5 },
          { name: 'drug_class', weight: 1 },
          { name: 'indications', weight: 0.8 },
          { name: 'adverse_effect_tags', weight: 0.5 },
          { name: 'mechanism_summary', weight: 0.5 },
        ],
        threshold: 0.35,
        includeScore: true,
      });
    } catch (err) {
      console.error('Search index load failed:', err);
    }
  }

  async function search() {
    selectedIdx = -1;
    if (query.length < 2) { results = []; return; }
    await loadFuse();
    results = fuse ? fuse.search(query).slice(0, 12) : [];
  }

  function highlight(text, q) {
    if (!text || !q) return text;
    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 rounded px-0.5">$1</mark>');
  }
</script>

{#if open}
  <!-- backdrop -->
  <div class="fixed inset-0 bg-black/50 z-[100]" on:click={closeOverlay} aria-hidden="true"></div>

  <!-- modal -->
  <div class="fixed inset-0 z-[101] flex items-start justify-center pt-[10vh] px-4" role="dialog" aria-modal="true" aria-label="Drug search">
    <div class="bg-base-100 rounded-2xl shadow-2xl w-full max-w-xl flex flex-col overflow-hidden">
      <!-- Search input -->
      <div class="flex items-center gap-3 px-4 py-3 border-b border-base-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-base-content/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          bind:this={inputEl}
          class="flex-1 bg-transparent outline-none text-base-content placeholder-base-content/40 text-base"
          placeholder="Search drugs by name, class, indication…"
          bind:value={query}
          on:input={search}
          autocomplete="off"
          spellcheck="false"
        />
        <kbd class="kbd kbd-sm hidden sm:inline-flex">Esc</kbd>
      </div>

      <!-- Results -->
      {#if results.length > 0}
        <ul class="overflow-y-auto max-h-[60vh] divide-y divide-base-200">
          {#each results as r, i}
            <li>
              <a
                href="{base}drugs/{r.item.id}/"
                class="flex items-center gap-3 px-4 py-3 hover:bg-base-200 transition-colors {i === selectedIdx ? 'bg-base-200' : ''}"
                on:click={closeOverlay}
              >
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm text-base-content truncate">
                    {@html highlight(r.item.generic_name, query)}
                    {#if r.item.ismp_high_alert}<span class="badge badge-error badge-xs ml-1">HIGH ALERT</span>{/if}
                    {#if r.item.black_box_warnings}<span class="badge badge-error badge-xs ml-1">BBW</span>{/if}
                    {#if r.item.beers_criteria}<span class="badge badge-warning badge-xs ml-1">BEERS</span>{/if}
                  </p>
                  {#if r.item.brand_names && r.item.brand_names.length > 0}
                    <p class="text-xs text-base-content/50 truncate">{r.item.brand_names.join(', ')}</p>
                  {/if}
                </div>
                <span class="text-xs text-base-content/40 shrink-0 hidden sm:block max-w-[140px] truncate text-right">{r.item.drug_class}</span>
              </a>
            </li>
          {/each}
        </ul>
      {:else if query.length >= 2}
        <div class="px-4 py-8 text-center">
          <p class="text-base-content/50">No drugs found for "<strong>{query}</strong>"</p>
          <p class="text-xs text-base-content/30 mt-1">Try a generic name, brand name, or drug class</p>
        </div>
      {:else}
        <div class="px-4 py-6 text-center">
          <p class="text-sm text-base-content/40">Type at least 2 characters to search 500 drugs</p>
          <div class="flex justify-center gap-2 mt-3 flex-wrap">
            <button class="btn btn-ghost btn-xs" on:click={() => { query = 'lisinopril'; search(); }}>lisinopril</button>
            <button class="btn btn-ghost btn-xs" on:click={() => { query = 'beta-blocker'; search(); }}>beta-blocker</button>
            <button class="btn btn-ghost btn-xs" on:click={() => { query = 'warfarin'; search(); }}>warfarin</button>
            <button class="btn btn-ghost btn-xs" on:click={() => { query = 'insulin'; search(); }}>insulin</button>
          </div>
        </div>
      {/if}

      <!-- Footer -->
      <div class="border-t border-base-300 px-4 py-2 flex items-center gap-4 text-xs text-base-content/40">
        <span><kbd class="kbd kbd-xs">↑↓</kbd> navigate</span>
        <span><kbd class="kbd kbd-xs">Enter</kbd> select</span>
        <span><kbd class="kbd kbd-xs">Esc</kbd> close</span>
      </div>
    </div>
  </div>
{/if}
