<script>
  export let filters = {
    organ_systems: [],
    therapeutic_classes: [],
    ismp_high_alert: false,
    beers_criteria: false,
    black_box_warning: false,
    tdm_required: false,
    controlled_substance: false,
  };
  export let onFilter = (f) => {};
  export let mobile = false;

  let activeFilters = {
    organ_systems: new Set(),
    therapeutic_classes: new Set(),
    ismp_high_alert: false,
    beers_criteria: false,
    black_box_warning: false,
    tdm_required: false,
    controlled_substance: false,
  };

  const organOptions = [
    'cardiovascular','renal','respiratory','gastrointestinal','endocrine',
    'reproductive','cns','pns-autonomic','musculoskeletal','hematology-oncology',
    'immunology','infectious-disease','dermatology','ophthalmology-ent','toxicology',
  ];
  const classOptions = [
    'adrenergic','cholinergic','ion-channel','enzyme-inhibitors','receptor-antagonists',
    'transporter-inhibitors','hormones-analogs','biologics','antimicrobials',
    'cytotoxics','anticoagulants',
  ];

  const organLabels = {
    cardiovascular: 'Cardiovascular', renal: 'Renal', respiratory: 'Respiratory',
    gastrointestinal: 'Gastrointestinal', endocrine: 'Endocrine', reproductive: 'Reproductive',
    cns: 'CNS', 'pns-autonomic': 'PNS/Autonomic', musculoskeletal: 'Musculoskeletal',
    'hematology-oncology': 'Hematology/Oncology', immunology: 'Immunology',
    'infectious-disease': 'Infectious Disease', dermatology: 'Dermatology',
    'ophthalmology-ent': 'Ophthalmology/ENT', toxicology: 'Toxicology',
  };
  const classLabels = {
    adrenergic: 'Adrenergic', cholinergic: 'Cholinergic', 'ion-channel': 'Ion Channel',
    'enzyme-inhibitors': 'Enzyme Inhibitors', 'receptor-antagonists': 'Receptor Antagonists',
    'transporter-inhibitors': 'Transporter Inhibitors', 'hormones-analogs': 'Hormones & Analogs',
    biologics: 'Biologics', antimicrobials: 'Antimicrobials', cytotoxics: 'Cytotoxics',
    anticoagulants: 'Anticoagulants',
  };

  function toggleSet(category, value) {
    if (activeFilters[category].has(value)) {
      activeFilters[category].delete(value);
    } else {
      activeFilters[category].add(value);
    }
    activeFilters = { ...activeFilters };
    emit();
  }

  function toggleBool(key) {
    activeFilters[key] = !activeFilters[key];
    activeFilters = { ...activeFilters };
    emit();
  }

  function clearAll() {
    activeFilters = {
      organ_systems: new Set(),
      therapeutic_classes: new Set(),
      ismp_high_alert: false,
      beers_criteria: false,
      black_box_warning: false,
      tdm_required: false,
      controlled_substance: false,
    };
    emit();
  }

  function emit() {
    onFilter({
      organ_systems: [...activeFilters.organ_systems],
      therapeutic_classes: [...activeFilters.therapeutic_classes],
      ismp_high_alert: activeFilters.ismp_high_alert,
      beers_criteria: activeFilters.beers_criteria,
      black_box_warning: activeFilters.black_box_warning,
      tdm_required: activeFilters.tdm_required,
      controlled_substance: activeFilters.controlled_substance,
    });
  }

  $: activeCount = activeFilters.organ_systems.size + activeFilters.therapeutic_classes.size
    + (activeFilters.ismp_high_alert ? 1 : 0) + (activeFilters.beers_criteria ? 1 : 0)
    + (activeFilters.black_box_warning ? 1 : 0) + (activeFilters.tdm_required ? 1 : 0)
    + (activeFilters.controlled_substance ? 1 : 0);
</script>

<aside class="menu bg-base-200 rounded-box p-4 {mobile ? 'w-full' : 'w-64 sticky top-20 self-start'}">
  <div class="flex items-center justify-between mb-3">
    <h2 class="text-sm font-bold uppercase tracking-wider text-base-content/70">Filters</h2>
    {#if activeCount > 0}
      <button class="btn btn-ghost btn-xs text-error" on:click={clearAll}>
        Clear all ({activeCount})
      </button>
    {/if}
  </div>

  <!-- Active filter badges -->
  {#if activeCount > 0}
    <div class="flex flex-wrap gap-1 mb-3">
      {#each [...activeFilters.organ_systems] as v}
        <button class="badge badge-primary badge-sm gap-1" on:click={() => toggleSet('organ_systems', v)}>
          {organLabels[v] || v} ×
        </button>
      {/each}
      {#each [...activeFilters.therapeutic_classes] as v}
        <button class="badge badge-secondary badge-sm gap-1" on:click={() => toggleSet('therapeutic_classes', v)}>
          {classLabels[v] || v} ×
        </button>
      {/each}
      {#if activeFilters.ismp_high_alert}
        <button class="badge badge-error badge-sm gap-1" on:click={() => toggleBool('ismp_high_alert')}>HIGH ALERT ×</button>
      {/if}
      {#if activeFilters.beers_criteria}
        <button class="badge badge-warning badge-sm gap-1" on:click={() => toggleBool('beers_criteria')}>BEERS ×</button>
      {/if}
      {#if activeFilters.black_box_warning}
        <button class="badge badge-error badge-sm gap-1" on:click={() => toggleBool('black_box_warning')}>BBW ×</button>
      {/if}
      {#if activeFilters.tdm_required}
        <button class="badge badge-info badge-sm gap-1" on:click={() => toggleBool('tdm_required')}>TDM ×</button>
      {/if}
      {#if activeFilters.controlled_substance}
        <button class="badge badge-error badge-sm gap-1" on:click={() => toggleBool('controlled_substance')}>CONTROLLED ×</button>
      {/if}
    </div>
  {/if}

  <!-- Safety Flags -->
  <div class="mb-4">
    <h3 class="text-xs font-semibold uppercase tracking-wide text-base-content/50 mb-2">Safety Flags</h3>
    <div class="space-y-1">
      {#each [
        { key: 'ismp_high_alert', label: 'ISMP High Alert', cls: 'badge-error' },
        { key: 'beers_criteria', label: 'Beers Criteria', cls: 'badge-warning' },
        { key: 'black_box_warning', label: 'Black Box Warning', cls: 'badge-error' },
        { key: 'tdm_required', label: 'TDM Required', cls: 'badge-info' },
        { key: 'controlled_substance', label: 'Controlled Substance (DEA)', cls: 'badge-error' },
      ] as flag}
        <label class="flex items-center gap-2 cursor-pointer hover:bg-base-300 rounded px-2 py-1">
          <input
            type="checkbox"
            class="checkbox checkbox-primary checkbox-xs"
            checked={activeFilters[flag.key]}
            on:change={() => toggleBool(flag.key)}
          />
          <span class="text-sm">{flag.label}</span>
        </label>
      {/each}
    </div>
  </div>

  <!-- Organ Systems -->
  <div class="mb-4">
    <h3 class="text-xs font-semibold uppercase tracking-wide text-base-content/50 mb-2">Organ System</h3>
    <div class="space-y-1 max-h-48 overflow-y-auto pr-1">
      {#each organOptions as opt}
        <label class="flex items-center gap-2 cursor-pointer hover:bg-base-300 rounded px-2 py-1">
          <input
            type="checkbox"
            class="checkbox checkbox-primary checkbox-xs"
            checked={activeFilters.organ_systems.has(opt)}
            on:change={() => toggleSet('organ_systems', opt)}
          />
          <span class="text-sm">{organLabels[opt] || opt}</span>
        </label>
      {/each}
    </div>
  </div>

  <!-- Therapeutic Class -->
  <div>
    <h3 class="text-xs font-semibold uppercase tracking-wide text-base-content/50 mb-2">Therapeutic Class</h3>
    <div class="space-y-1">
      {#each classOptions as opt}
        <label class="flex items-center gap-2 cursor-pointer hover:bg-base-300 rounded px-2 py-1">
          <input
            type="checkbox"
            class="checkbox checkbox-secondary checkbox-xs"
            checked={activeFilters.therapeutic_classes.has(opt)}
            on:change={() => toggleSet('therapeutic_classes', opt)}
          />
          <span class="text-sm">{classLabels[opt] || opt}</span>
        </label>
      {/each}
    </div>
  </div>
</aside>
