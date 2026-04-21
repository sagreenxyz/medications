<script>
  export let filters = {};
  export let onFilter = (f) => {};
  
  let activeFilters = {};

  function toggle(category, value) {
    if (!activeFilters[category]) activeFilters[category] = new Set();
    if (activeFilters[category].has(value)) {
      activeFilters[category].delete(value);
    } else {
      activeFilters[category].add(value);
    }
    activeFilters = { ...activeFilters };
    onFilter(activeFilters);
  }
</script>

<aside class="menu bg-base-200 rounded-box p-4 w-64">
  <h2 class="menu-title">Filters</h2>
  {#each Object.entries(filters) as [category, values]}
    <li>
      <h3 class="menu-title capitalize">{category}</h3>
      <ul>
        {#each values as value}
          <li>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                class="checkbox checkbox-primary checkbox-sm"
                on:change={() => toggle(category, value)}
              />
              <span class="text-sm">{value}</span>
            </label>
          </li>
        {/each}
      </ul>
    </li>
  {/each}
</aside>
