# Pharmacology Reference Site

A production-quality, open pharmacology reference website covering the **500 most
clinically important medications**, organized through **nine simultaneous educational
schemas**. Built for medical and nursing students preparing for USMLE Steps 1–3,
NCLEX, and clinical rotations.

---

## Why Nine Schemas?

No single way of organizing drugs serves all learning goals equally well.

A student studying for a medicine shelf exam thinks in organ systems. A student trying
to predict a drug interaction thinks in mechanisms. A student preparing for NCLEX
boards thinks in nursing considerations and adverse effect recognition. A student
trying to memorize efficiently thinks in prototypes. This site organizes the same 500
drugs through all nine frameworks simultaneously, so students can enter from wherever
their current goal demands and follow cross-references into the others.

| # | Schema | Best For |
|---|---|---|
| 1 | **Organ Systems** | Clinical reasoning, shelf exams, rotation prep |
| 2 | **Therapeutic Classes** | Mechanism understanding, receptor pharmacology |
| 3 | **Organ × Class Matrix** | Drug repurposing, polypharmacy, multi-system effects |
| 4 | **Mechanism-First** | Prediction and transfer across drug classes |
| 5 | **Prototype + Class** | Efficient memorization, USMLE/NCLEX exam strategy |
| 6 | **ADME** | Drug interactions, dosing in renal/hepatic failure, safety |
| 7 | **Clinical Presentations** | Bedside reasoning, "patient presents with X" thinking |
| 8 | **Adverse Effects** | Patient safety, nursing monitoring, pharmacovigilance |
| 9 | **Drug Interactions** | Polypharmacy management, medication reconciliation |

---

## What's Inside

### 500 Drugs
Every drug entry includes generic name, brand names, drug class, mechanism of action,
pharmacokinetics, indications, contraindications, adverse effects (including all Black
Box Warnings), drug interactions, nursing considerations, and clinical pearls. Each
drug is cross-referenced to every schema page where it appears.

### Academic Prose Throughout
Every page at every level of every schema contains original, scholarly prose written
at the third-year medical / advanced nursing student level. This is not a drug
database with tables — it is a pharmacology textbook in navigable website form.
Mechanism explanations connect molecular targets to clinical outcomes. Nursing
sections cite specific lab values, vital sign thresholds, and patient education
language.

### Individual Drug Profile Pages
Five hundred individual pages, one per drug. Each contains a structured
pharmacokinetics table, mechanism explanation, indications with pharmacological
rationale, adverse effect hierarchy, drug interaction table, four-part nursing
considerations section, a Schema Membership Panel linking to every schema page where
the drug appears, and a Related Drugs Panel.

### Client-Side Search
Full-text fuzzy search powered by Fuse.js, indexing generic names, brand names, drug
class, indications, adverse effects, and mechanism keywords. Fully keyboard-accessible
(`⌘K` / `Ctrl+K`).

### Faceted Filtering
Filter any drug list by organ system, drug class, prototype status, adverse effect
tag, interaction tag, or special population concern (renal, hepatic, pregnancy,
geriatric). Filters combine with AND logic and update without page reload.

### Special Compilations
- **Black Box Warnings** — all BBW drugs with full warnings paraphrased in clinical
  language and nursing action summaries
- **Beers Criteria** — all applicable drugs with mechanism of risk in older adults
  and safer alternatives
- **Therapeutic Drug Monitoring** — target ranges, sampling timing, and toxicity
  thresholds for all TDM drugs
- **CYP450 Tables** — complete substrate/inhibitor/inducer tables for all major
  isoforms, color-coded by interaction severity
- **Food-Drug Interactions** — mechanistic explanations with patient education
  language

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | [Astro](https://astro.build) (static output mode) |
| Interactivity | [Svelte](https://svelte.dev) islands via `@astrojs/svelte` |
| Styling | [Tailwind CSS](https://tailwindcss.com) + [DaisyUI](https://daisyui.com) |
| Search | [Fuse.js](https://www.fusejs.io) (CDN, client-side) |
| Fonts | Inter (body), Lora (headings), JetBrains Mono (data) via Google Fonts |
| Data | Static JSON files in `/data/` |
| Hosting | GitHub Pages (fully static, no backend) |

Astro renders all 500+ drug pages and all schema pages to static HTML at build time.
JavaScript is shipped only for components that genuinely require client-side state:
the search overlay, filter panel, the Schema 3 interactive matrix, the Schema 5
prototype tab switcher, and the navigation modals. Every other page is pure HTML and
CSS with zero JavaScript bundle.

---

## Project Structure

```
/
├── CLAUDE.md                   ← Agent specification (see Contributing)
├── README.md                   ← this file
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── .nojekyll                   ← disables Jekyll on GitHub Pages
├── public/
│   └── icons/                  ← SVG icons
├── src/
│   ├── layouts/                ← BaseLayout, DrugProfileLayout, SchemaLayout
│   ├── components/             ← Astro and Svelte components
│   ├── pages/
│   │   ├── index.astro         ← Home page
│   │   ├── about.astro
│   │   ├── drug-index.astro    ← Alphabetical index of all 500 drugs
│   │   ├── drugs/
│   │   │   └── [slug].astro    ← Generates all 500 individual drug pages
│   │   └── schemas/
│   │       ├── 01-organ-systems/
│   │       ├── 02-therapeutic-classes/
│   │       ├── 03-organ-by-class/
│   │       ├── 04-mechanism-first/
│   │       ├── 05-prototype-class/
│   │       ├── 06-adme/
│   │       ├── 07-clinical-presentations/
│   │       ├── 08-adverse-effects/
│   │       └── 09-drug-interactions/
│   └── styles/
│       ├── global.css
│       └── print.css
└── data/
    ├── drugs.json              ← Master database, 500 entries
    ├── organ-systems.json
    ├── therapeutic-classes.json
    ├── mechanisms.json
    ├── prototypes.json
    ├── adme.json
    ├── presentations.json
    ├── adverse-effects.json
    └── interactions.json
```

---

## Local Development

**Prerequisites:** Node.js 18 or later.

```bash
# Clone the repository
git clone https://github.com/your-username/pharmacology-reference.git
cd pharmacology-reference

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dev server starts at `http://localhost:4321`. Astro's dev server supports hot
module replacement — changes to `.astro` files, Svelte components, and CSS update
instantly in the browser.

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The production build outputs to `dist/`. All pages render to static HTML at build
time. The build will log a count of pages generated — expect 600+ pages total across
drug profiles and schema pages.

---

## Deployment (GitHub Pages)

This site is configured to deploy to GitHub Pages from the `main` branch.

If you are deploying to a subdirectory (e.g.,
`https://your-username.github.io/pharmacology-reference/`), confirm that the `base`
option in `astro.config.mjs` matches your repository name:

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://your-username.github.io',
  base: '/pharmacology-reference',
  output: 'static',
  // ...
});
```

The `.nojekyll` file in the project root tells GitHub Pages not to process the site
with Jekyll, which is required for Astro-generated sites.

To enable automatic deployment, add the following GitHub Actions workflow at
`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## Data Schema

The master drug database lives in `data/drugs.json`. Each of the 500 entries follows
this structure (abbreviated):

```json
{
  "id": "lisinopril",
  "generic_name": "lisinopril",
  "brand_names": ["Prinivil", "Zestril"],
  "drug_class": "ACE inhibitor",
  "prototype_for": true,
  "organ_systems": ["cardiovascular", "renal"],
  "therapeutic_classes": ["enzyme-inhibitors"],
  "mechanism_targets": ["ACE (angiotensin-converting enzyme)"],
  "mechanism_summary": "...",
  "indications": ["hypertension", "heart failure", "..."],
  "contraindications": ["pregnancy", "..."],
  "adverse_effects": {
    "common": ["dry cough", "hyperkalemia", "..."],
    "serious": ["angioedema", "AKI", "..."]
  },
  "black_box_warnings": ["fetal toxicity"],
  "pharmacokinetics": { "...": "..." },
  "drug_interactions": [{ "drug": "...", "mechanism": "...", "severity": "..." }],
  "nursing_considerations": ["..."],
  "clinical_pearls": ["..."],
  "beers_criteria": false,
  "renal_dose_adjustment": true,
  "hepatic_dose_adjustment": false,
  "pregnancy_safety": "contraindicated (fetal toxicity)",
  "tdm_required": false,
  "schema_memberships": { "...": "..." }
}
```

The full schema definition is documented in `CLAUDE.md` Section 6.

---

## Contributing

### Reporting errors

If you find a pharmacological inaccuracy, outdated guideline reference, or incorrect
drug data, please open a GitHub Issue with:
- The drug name and the specific field or page where the error appears
- The correct information with a source (FDA label, ACC/AHA guideline, package
  insert, or peer-reviewed reference)
- The date of the source

All pharmacological content targets FDA labeling and ACC/AHA, GINA, GOLD, ADA, IDSA,
and WHO guidelines current to 2024–2025. Pages for recently updated guidelines are
flagged with a "Guideline Update" badge.

### Adding or updating drug entries

Drug data lives in `data/drugs.json`. To add a drug or correct an existing entry,
edit the JSON directly and open a pull request. Every entry must include all required
fields — a JSON schema validator runs on pull requests and will flag incomplete
entries.

### Adding drugs to the database

If you believe a drug should be added to the 500-drug list, open an Issue making the
case with reference to its clinical importance (USMLE/NCLEX prevalence, prescribing
volume, WHO Essential Medicines designation, or specific educational gap it fills).

### AI-assisted development

This project was built with AI assistance using Claude Code. The `CLAUDE.md` file at
the repo root contains the complete project specification used to bootstrap and
continue development. If you are using Claude Code to contribute, Claude will read
`CLAUDE.md` automatically at the start of each session and orient itself to the
project architecture, coding conventions, prose quality standards, and current phase
status. Do not delete or rename `CLAUDE.md`.

### Code style

- Astro components: follow existing patterns in `src/components/` and
  `src/layouts/`
- Svelte islands: client-side state only — no server-side logic
- Tailwind + DaisyUI: use DaisyUI semantic component classes before writing
  custom Tailwind utilities; see the component assignment table in `CLAUDE.md`
  Section 5
- Prose: all academic prose sections must meet the quality standards in
  `CLAUDE.md` Section 10 — no bullet points within prose, minimum 5 sentences
  per paragraph, mechanism explanations required

---

## Content Scope and Limitations

This site is an **educational reference**, not a prescribing tool. It is not a
substitute for clinical judgment, institutional pharmacy resources, or current
prescribing information. Drug information evolves — always verify against the current
FDA label, your institution's formulary, and clinical pharmacist consultation before
making prescribing or administration decisions.

**The 500 drugs covered** were selected based on prevalence in USMLE Steps 1–3 and
NCLEX examinations, the WHO Essential Medicines List, and prescribing volume in
primary care, emergency medicine, and inpatient practice. The list is not exhaustive
and does not constitute a clinical recommendation to use any particular agent.

**Dosing information** is provided for educational orientation only. Dose ranges
reflect common adult dosing under typical conditions and do not account for
individual patient factors, renal or hepatic impairment thresholds, or
institution-specific protocols.

---

## Acknowledgments

Drug selection, schema architecture, and educational framework were developed with
reference to the following standard resources in pharmacology education:

- Goodman & Gilman's *The Pharmacological Basis of Therapeutics*
- Katzung's *Basic & Clinical Pharmacology*
- Brunton et al., *Pharmacology: A Short Course*
- First Aid for the USMLE Steps 1, 2, and 3
- FDA Drug Labels and MedlinePlus Drug Information
- WHO Model List of Essential Medicines (2023)
- ACC/AHA, ADA, GINA, GOLD, IDSA, and WHO clinical guidelines (2024–2025)

---

## License

Content is released under [Creative Commons Attribution-NonCommercial 4.0
International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).
You are free to share and adapt the material for non-commercial purposes with
appropriate attribution. Commercial use requires explicit permission.

Code is released under the [MIT License](LICENSE).
