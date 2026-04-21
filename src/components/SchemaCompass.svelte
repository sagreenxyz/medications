<script>
  let open = false;
  
  const schemas = [
    { id: '01-organ-systems', label: 'Organ Systems', color: '#1d4ed8' },
    { id: '02-therapeutic-classes', label: 'Therapeutic Classes', color: '#7c3aed' },
    { id: '03-organ-by-class', label: 'Organ × Class Matrix', color: '#0f766e' },
    { id: '04-mechanism-first', label: 'Mechanism-First', color: '#0369a1' },
    { id: '05-prototype-class', label: 'Prototype + Class', color: '#15803d' },
    { id: '06-adme', label: 'ADME', color: '#b45309' },
    { id: '07-clinical-presentations', label: 'Clinical Presentations', color: '#be123c' },
    { id: '08-adverse-effects', label: 'Adverse Effects', color: '#7f1d1d' },
    { id: '09-drug-interactions', label: 'Drug Interactions', color: '#c2410c' },
  ];

  export let base = '/medications/';
</script>

<button class="btn btn-ghost btn-sm" on:click={() => open = true}>
  Schema Compass
</button>

{#if open}
  <div class="modal modal-open">
    <div class="modal-box max-w-2xl">
      <h3 class="font-bold text-lg mb-4">Navigate Schemas</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {#each schemas as schema}
          <a
            href="{base}schemas/{schema.id}/"
            class="card bg-base-200 hover:bg-base-300 transition-colors"
            on:click={() => open = false}
          >
            <div class="card-body p-3">
              <span class="text-sm font-medium">{schema.label}</span>
            </div>
          </a>
        {/each}
      </div>
      <div class="modal-action">
        <button class="btn" on:click={() => open = false}>Close</button>
      </div>
    </div>
    <div class="modal-backdrop" on:click={() => open = false}></div>
  </div>
{/if}
