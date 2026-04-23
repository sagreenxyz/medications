import type { APIRoute } from 'astro';
import drugsData from '../../data/drugs.json';

export const GET: APIRoute = () => {
  // Return a slim version for the search index (omit large fields to keep payload small)
  const slim = (drugsData as any[]).map(d => ({
    id: d.id,
    generic_name: d.generic_name,
    brand_names: d.brand_names,
    drug_class: d.drug_class,
    subclass: d.subclass,
    indications: d.indications,
    adverse_effect_tags: d.adverse_effect_tags,
    mechanism_summary: d.mechanism_summary,
    organ_systems: d.organ_systems,
    ismp_high_alert: d.ismp_high_alert,
    beers_criteria: d.beers_criteria,
    black_box_warnings: d.black_box_warnings && d.black_box_warnings.length > 0,
  }));
  return new Response(JSON.stringify(slim), {
    headers: { 'Content-Type': 'application/json' },
  });
};
