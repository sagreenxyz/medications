<script>
  export let drugs = [];
  export let base = '/medications/';

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Filter state
  let searchText = '';
  let filterOrgan = '';
  let filterClass = '';
  let filterISMP = false;
  let filterBeers = false;
  let filterBBW = false;
  let filterControlled = false;

  const organOptions = [
    { value: 'cardiovascular', label: 'Cardiovascular' },
    { value: 'renal', label: 'Renal' },
    { value: 'respiratory', label: 'Respiratory' },
    { value: 'gastrointestinal', label: 'Gastrointestinal' },
    { value: 'endocrine', label: 'Endocrine' },
    { value: 'reproductive', label: 'Reproductive' },
    { value: 'cns', label: 'CNS' },
    { value: 'pns-autonomic', label: 'PNS/Autonomic' },
    { value: 'musculoskeletal', label: 'Musculoskeletal' },
    { value: 'hematology-oncology', label: 'Hematology/Oncology' },
    { value: 'immunology', label: 'Immunology' },
    { value: 'infectious-disease', label: 'Infectious Disease' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'ophthalmology-ent', label: 'Ophthalmology/ENT' },
    { value: 'toxicology', label: 'Toxicology' },
  ];

  const classOptions = [
    { value: 'adrenergic', label: 'Adrenergic' },
    { value: 'cholinergic', label: 'Cholinergic' },
    { value: 'ion-channel', label: 'Ion Channel' },
    { value: 'enzyme-inhibitors', label: 'Enzyme Inhibitors' },
    { value: 'receptor-antagonists', label: 'Receptor Antagonists' },
    { value: 'transporter-inhibitors', label: 'Transporter Inhibitors' },
    { value: 'hormones-analogs', label: 'Hormones & Analogs' },
    { value: 'biologics', label: 'Biologics' },
    { value: 'antimicrobials', label: 'Antimicrobials' },
    { value: 'cytotoxics', label: 'Cytotoxics' },
    { value: 'anticoagulants', label: 'Anticoagulants' },
  ];

  $: filtered = drugs.filter(d => {
    if (searchText) {
      const q = searchText.toLowerCase();
      const match =
        d.generic_name.toLowerCase().includes(q) ||
        (d.brand_names || []).some(b => b.toLowerCase().includes(q)) ||
        (d.drug_class || '').toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filterOrgan && !(d.organ_systems || []).includes(filterOrgan)) return false;
    if (filterClass) {
      const tc = d.schema_memberships?.therapeutic_class;
      const tcArr = Array.isArray(tc) ? tc : (tc ? [tc] : []);
      if (!tcArr.includes(filterClass)) return false;
    }
    if (filterISMP && !d.ismp_high_alert) return false;
    if (filterBeers && !d.beers_criteria) return false;
    if (filterBBW && !(d.black_box_warnings && d.black_box_warnings.length > 0)) return false;
    if (filterControlled && !d.controlled_substance_schedule) return false;
    return true;
  });

  $: drugsByLetter = letters.reduce((acc, l) => {
    const group = filtered.filter(d => d.generic_name.toUpperCase().startsWith(l));
    if (group.length > 0) acc[l] = group;
    return acc;
  }, {});

  $: activeLetters = new Set(Object.keys(drugsByLetter));

  $: hasFilters = searchText || filterOrgan || filterClass || filterISMP || filterBeers || filterBBW || filterControlled;

  function clearFilters() {
    searchText = '';
    filterOrgan = '';
    filterClass = '';
    filterISMP = false;
    filterBeers = false;
    filterBBW = false;
    filterControlled = false;
  }
</script>

<!-- Filter bar -->
<div class="card bg-base-200 shadow-sm mb-6">
  <div class="card-body p-4">
    <div class="flex flex-wrap gap-3 items-end">
      <!-- Text search -->
      <div class="form-control flex-1 min-w-48">
        <label class="label py-0 pb-1"><span class="label-text text-xs font-semibold uppercase">Search</span></label>
        <input
          type="text"
          placeholder="Name, brand, or class..."
          class="input input-bordered input-sm w-full"
          bind:value={searchText}
        />
      </div>

      <!-- Organ system filter -->
      <div class="form-control min-w-40">
        <label class="label py-0 pb-1"><span class="label-text text-xs font-semibold uppercase">Organ System</span></label>
        <select class="select select-bordered select-sm" bind:value={filterOrgan}>
          <option value="">All systems</option>
          {#each organOptions as opt}
            <option value={opt.value}>{opt.label}</option>
          {/each}
        </select>
      </div>

      <!-- Therapeutic class filter -->
      <div class="form-control min-w-40">
        <label class="label py-0 pb-1"><span class="label-text text-xs font-semibold uppercase">Drug Class</span></label>
        <select class="select select-bordered select-sm" bind:value={filterClass}>
          <option value="">All classes</option>
          {#each classOptions as opt}
            <option value={opt.value}>{opt.label}</option>
          {/each}
        </select>
      </div>

      <!-- Safety flags -->
      <div class="flex flex-wrap gap-3 items-center">
        <label class="flex items-center gap-1 cursor-pointer">
          <input type="checkbox" class="checkbox checkbox-error checkbox-xs" bind:checked={filterISMP} />
          <span class="text-xs font-medium">ISMP High Alert</span>
        </label>
        <label class="flex items-center gap-1 cursor-pointer">
          <input type="checkbox" class="checkbox checkbox-warning checkbox-xs" bind:checked={filterBeers} />
          <span class="text-xs font-medium">Beers Criteria</span>
        </label>
        <label class="flex items-center gap-1 cursor-pointer">
          <input type="checkbox" class="checkbox checkbox-error checkbox-xs" bind:checked={filterBBW} />
          <span class="text-xs font-medium">BBW</span>
        </label>
        <label class="flex items-center gap-1 cursor-pointer">
          <input type="checkbox" class="checkbox checkbox-error checkbox-xs" bind:checked={filterControlled} />
          <span class="text-xs font-medium">Controlled (DEA)</span>
        </label>
      </div>

      {#if hasFilters}
        <button class="btn btn-ghost btn-sm" on:click={clearFilters}>Clear filters</button>
      {/if}
    </div>

    <div class="text-xs text-base-content/60 mt-2">
      Showing {filtered.length} of {drugs.length} drugs
    </div>
  </div>
</div>

<!-- A–Z jump nav -->
<div class="join flex flex-wrap gap-1 mb-8">
  {#each letters as letter}
    {#if activeLetters.has(letter)}
      <a href={`#letter-${letter}`} class="join-item btn btn-sm btn-outline">{letter}</a>
    {:else}
      <button class="join-item btn btn-sm btn-disabled opacity-30" disabled>{letter}</button>
    {/if}
  {/each}
</div>

{#if filtered.length === 0}
  <div class="alert alert-info">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <span>No drugs match the current filters. <button class="link" on:click={clearFilters}>Clear filters</button> to see all drugs.</span>
  </div>
{:else}
  {#each letters as letter}
    {#if drugsByLetter[letter]}
      <section id={`letter-${letter}`} class="mb-10">
        <h2 class="text-2xl font-serif font-bold border-b border-base-300 pb-2 mb-4">{letter}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {#each drugsByLetter[letter] as drug}
            <a
              href={`${base}drugs/${drug.id}`}
              class="flex items-center gap-2 p-2 rounded hover:bg-base-200 transition-colors border-l-4 {drug.ismp_high_alert ? 'border-error' : 'border-transparent'}"
            >
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1 flex-wrap">
                  <span class="font-medium truncate capitalize">{drug.generic_name}</span>
                  {#if drug.prototype_for}<span class="badge badge-success badge-xs">P</span>{/if}
                  {#if drug.ismp_high_alert}<span class="badge badge-error badge-xs">HA</span>{/if}
                  {#if drug.black_box_warnings && drug.black_box_warnings.length > 0}<span class="badge badge-error badge-outline badge-xs">BBW</span>{/if}
                  {#if drug.controlled_substance_schedule}<span class="badge badge-warning badge-xs">C-{drug.controlled_substance_schedule}</span>{/if}
                </div>
                <div class="text-xs text-base-content/60 truncate">{drug.drug_family ? drug.drug_family + ' — ' : ''}{drug.drug_class}</div>
              </div>
            </a>
          {/each}
        </div>
      </section>
    {/if}
  {/each}
{/if}
