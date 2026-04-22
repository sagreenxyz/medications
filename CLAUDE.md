# CLAUDE.md — Pharmacology Reference Site

Based on analyzing the failures across the last two sessions, here is the advice for future sessions:

Root Causes of the Failures
1. Sub-agent commits are local-only and get lost
When a task agent makes git commits, those commits exist only in the sandboxed subprocess. They are not pushed to the remote. Only the main agent calling report_progress can push to the remote. If the main agent calls report_progress before the sub-agent has done any work, nothing gets pushed. The fix: after any sub-agent completes, the main agent must verify commits exist with git log --oneline and then call report_progress to push them.

2. Heredoc bash commands with Python code fail JSON parsing
The bash tool parameter is parsed as JSON. Heredocs containing Python code with quotes, backslashes, None, True, False, and other characters cause JSON parse error: Unterminated string. This is why all large drug-addition scripts silently failed. The fix: use the create tool to write Python scripts to /tmp/, then execute them with bash. Never embed Python code inside a bash heredoc in the bash tool.

Concrete Protocol for Future Sessions
Writing drug data scripts
DO THIS:

Code
1. Use the `create` tool to write the Python script to /tmp/add_drugs_cv17.py
2. Use bash: `cd /repo && python /tmp/add_drugs_cv17.py`
3. Validate: `node -e "JSON.parse(require('fs').readFileSync('data/drugs.json','utf8')); console.log('Valid')"`
4. Run: `git add data/drugs.json && git commit -m "data: complete task CV-17"`
5. Run `report_progress` to push the commit to remote
DO NOT:

bash
# Never embed Python inside bash heredoc like this:
cat > /tmp/script.py << 'EOF'
import json
new_drugs = [{"id": "lovastatin", ...}]  # JSON parsing WILL fail
EOF
Verification checklist after each batch
After any agent (sub-agent or self) reports completing drug additions:

bash
git log --oneline -5          # Verify commits exist
node -e "const d=JSON.parse(require('fs').readFileSync('data/drugs.json','utf8')); console.log(d.length)"  # Verify count
If count did not increase, the work was lost — redo it.

Use report_progress after every batch
Call report_progress after every task (not just at session end). This is the only mechanism that persists work. A session that ends without calling report_progress loses everything.

Preferred script structure for drug additions
Python
# /tmp/add_drugs_cv17.py  (written via `create` tool, NOT heredoc)
import json

with open('/home/runner/work/medications/medications/data/drugs.json') as f:
    drugs = json.load(f)

existing_ids = {d['id'] for d in drugs}

new_entries = [
    {
        "id": "lovastatin",
        # ... all fields using Python True/False/None (not JSON true/false/null)
    },
]

added = 0
for entry in new_entries:
    if entry['id'] not in existing_ids:
        drugs.append(entry)
        added += 1

with open('/home/runner/work/medications/medications/data/drugs.json', 'w') as f:
    json.dump(drugs, f, indent=2)

print(f"Added {added} drugs. Total: {len(drugs)}")
This approach:

Avoids all heredoc/JSON escaping issues
Is idempotent (won't add duplicates on re-run)
Validates structure by round-tripping through json.load/json.dump

---

## Project Development Status

Maintain a document at ./STATUS.md that explains the current development state 
of this project until it is completed. This will be utilized by AI agents to 
avoid repeating efforts when re-starting after sessions are abruptly ended.

## Project Bootstrap & Agent Specification

This file is read automatically by Claude Code at the start of every session.
Read it in full before taking any action. This is a multi-session project.
Always confirm the current phase completion status before beginning new work.

---

## 1. Project Identity

**What this is:** A production-quality, static, multi-schema pharmacology
reference website covering the top 500 clinical medications. The site serves
medical and nursing students at the third-year / advanced level and organizes
the same 500 drugs through nine distinct educational schemas simultaneously.

**Hosting target:** GitHub Pages (fully static, no backend, no server-side
rendering at runtime).

**Primary audiences:** Medical students (USMLE Steps 1–3), nursing students
(NCLEX), advanced practice nursing students, and clinical pharmacology
instructors.

**Pedagogical philosophy:** No single organizational schema adequately serves
all learning goals. Organ-system thinking serves clinical reasoning; mechanism-
first thinking serves prediction and transfer; prototype-class thinking serves
examination efficiency; ADME thinking serves drug interaction and dosing safety.
This site presents all nine schemas in parallel, cross-referenced at every level.

---

## 2. Technology Stack

### Framework
- **Astro** (latest stable) — static output mode only
- Adapter: `@astrojs/static` (default; do NOT use Node or server adapters)
- Configure `base` path in `astro.config.mjs` for GitHub Pages subdirectory
  deployment
- Add `.nojekyll` to `public/` to disable Jekyll processing on GitHub Pages

### Interactivity
- **Svelte** islands via `@astrojs/svelte` integration
- Use Svelte only for components that require client-side state:
  - Search overlay (Fuse.js)
  - Filter/faceted navigation panel
  - Schema 3 interactive matrix table
  - Schema Compass modal
  - Prototype+Class tab switcher (Schema 5)
  - A–Z / sort-by-class toggle on drug index
- All other pages render as pure static HTML — no JavaScript shipped to browser

### Styling
- **Tailwind CSS** via `@astrojs/tailwind`
- **DaisyUI** (latest) as Tailwind plugin
- **Fonts:** Load via Google Fonts API — `Lora` for prose headings, `Inter` for
  body text, `JetBrains Mono` for data/code values
- No external icon fonts; inline SVG only for all icons

### Search
- **Fuse.js** loaded from CDN:
  `https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.min.js`
- Client-side only; indexes drugs.json at runtime

### Dependencies to install
```bash
npm create astro@latest
npm install -D @astrojs/svelte @astrojs/tailwind tailwindcss daisyui
npm install -D svelte
```

---

## 3. Repository Structure

Create this directory and file structure exactly:

```
/
├── CLAUDE.md                         ← this file
├── README.md                         ← generated in Phase 6
├── .nojekyll
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   ├── .nojekyll
│   └── icons/                        ← SVG icons only
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── DrugProfileLayout.astro
│   │   └── SchemaLayout.astro
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── SchemaCompass.svelte       ← island
│   │   ├── SearchOverlay.svelte       ← island
│   │   ├── FilterPanel.svelte         ← island
│   │   ├── DrugCard.astro
│   │   ├── SchemaBadge.astro
│   │   ├── BBWAlert.astro
│   │   ├── PKTable.astro
│   │   ├── SchemaMembershipPanel.astro
│   │   ├── RelatedDrugsPanel.astro
│   │   └── MatrixTable.svelte         ← island
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── drug-index.astro
│   │   ├── drugs/
│   │   │   └── [slug].astro           ← generates all 500 drug pages
│   │   └── schemas/
│   │       ├── 01-organ-systems/
│   │       │   ├── index.astro
│   │       │   ├── cardiovascular.astro
│   │       │   ├── renal.astro
│   │       │   ├── respiratory.astro
│   │       │   ├── gastrointestinal.astro
│   │       │   ├── endocrine.astro
│   │       │   ├── reproductive.astro
│   │       │   ├── cns.astro
│   │       │   ├── pns-autonomic.astro
│   │       │   ├── musculoskeletal.astro
│   │       │   ├── hematology-oncology.astro
│   │       │   ├── immunology.astro
│   │       │   ├── infectious-disease.astro
│   │       │   ├── dermatology.astro
│   │       │   ├── ophthalmology-ent.astro
│   │       │   └── toxicology.astro
│   │       ├── 02-therapeutic-classes/
│   │       │   ├── index.astro
│   │       │   ├── adrenergic.astro
│   │       │   ├── cholinergic.astro
│   │       │   ├── ion-channel.astro
│   │       │   ├── enzyme-inhibitors.astro
│   │       │   ├── receptor-antagonists.astro
│   │       │   ├── transporter-inhibitors.astro
│   │       │   ├── hormones-analogs.astro
│   │       │   ├── biologics.astro
│   │       │   ├── antimicrobials.astro
│   │       │   ├── cytotoxics.astro
│   │       │   └── anticoagulants.astro
│   │       ├── 03-organ-by-class/
│   │       │   ├── index.astro        ← interactive matrix table
│   │       │   └── [intersection].astro
│   │       ├── 04-mechanism-first/
│   │       │   ├── index.astro
│   │       │   └── [target].astro
│   │       ├── 05-prototype-class/
│   │       │   ├── index.astro
│   │       │   └── [prototype].astro
│   │       ├── 06-adme/
│   │       │   ├── index.astro
│   │       │   ├── absorption.astro
│   │       │   ├── distribution.astro
│   │       │   ├── cyp-metabolism.astro
│   │       │   ├── excretion.astro
│   │       │   ├── special-populations.astro
│   │       │   └── drug-interactions-pk.astro
│   │       ├── 07-clinical-presentations/
│   │       │   ├── index.astro
│   │       │   └── [presentation].astro
│   │       ├── 08-adverse-effects/
│   │       │   ├── index.astro
│   │       │   └── [cluster].astro
│   │       └── 09-drug-interactions/
│   │           ├── index.astro
│   │           ├── cyp-inhibition.astro
│   │           ├── cyp-induction.astro
│   │           ├── transporter-interactions.astro
│   │           ├── pd-additive-toxicity.astro
│   │           ├── pd-antagonism.astro
│   │           ├── food-drug.astro
│   │           └── protein-binding.astro
│   └── styles/
│       ├── global.css
│       └── print.css
└── data/
    ├── drugs.json                     ← master database, 500 entries
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

## 4. Tailwind and DaisyUI Configuration

### tailwind.config.mjs
```js
import daisyui from 'daisyui';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            lineHeight: '1.75',
          },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light'],
    base: true,
    styled: true,
    utils: true,
  },
};
```

### Schema Color System
Each schema has a dedicated accent color applied via a `data-schema` attribute
on the `<body>` tag. Add this block to `global.css`:

```css
/* Schema accent color overrides — DaisyUI reads from --p (primary) */
[data-schema="organ-systems"]          { --schema-accent: #1d4ed8; } /* blue-700   */
[data-schema="therapeutic-classes"]    { --schema-accent: #7c3aed; } /* violet-600 */
[data-schema="organ-by-class"]         { --schema-accent: #0f766e; } /* teal-700   */
[data-schema="mechanism-first"]        { --schema-accent: #0369a1; } /* sky-700    */
[data-schema="prototype-class"]        { --schema-accent: #15803d; } /* green-700  */
[data-schema="adme"]                   { --schema-accent: #b45309; } /* amber-700  */
[data-schema="clinical-presentations"] { --schema-accent: #be123c; } /* rose-700   */
[data-schema="adverse-effects"]        { --schema-accent: #7f1d1d; } /* red-900    */
[data-schema="drug-interactions"]      { --schema-accent: #c2410c; } /* orange-700 */
```

In each schema's layout, set `<body data-schema="[schema-id]">` so all DaisyUI
components on that schema's pages inherit the correct accent.

---

## 5. DaisyUI Component Assignments

Use these specific DaisyUI components for the following UI elements:

| UI Element | DaisyUI Component | Notes |
|---|---|---|
| Drug profile wrapper | `card` + `card-body` | Outer shell for every drug page |
| Prototype badge | `badge badge-success` | "PROTOTYPE" label |
| BBW badge | `badge badge-error` | Black box warning flag |
| ISMP high-alert badge | `badge badge-error` | "HIGH ALERT" flag for ISMP-designated medications |
| Beers Criteria flag | `badge badge-warning` | Geriatric caution |
| Organ system tag | `badge badge-outline` | Schema membership |
| PK data table | `table table-zebra` | Pharmacokinetics block |
| CYP tables | `table table-pin-rows` + `overflow-x-auto` | Wide, scrollable |
| BBW callout block | `alert alert-error` | With warning SVG icon |
| Serious AE callout | `alert alert-warning` | |
| Clinical pearl | `alert alert-info` | |
| Top navigation | `navbar` | With `dropdown` for schema selector |
| Mobile nav | `drawer` | Hamburger pattern |
| Schema selector | `dropdown dropdown-hover` | In navbar |
| Schema Compass | `modal` (Svelte island) | Triggered from navbar button |
| Search overlay | `modal` + `input input-bordered` (Svelte island) | Fuse.js results in `menu` |
| Keyboard shortcut hint | `kbd` | Show ⌘K / Ctrl+K in navbar |
| Filter panel (mobile) | `drawer` (Svelte island) | Left slide-in |
| Filter panel (desktop) | `menu` sticky sidebar (Svelte island) | |
| Filter checkboxes | `checkbox checkbox-primary` in `form-control` | |
| Active filter tags | `badge` with × button | Dismissible |
| Schema landing cards | `card card-compact` | Home page grid |
| Organ system accordion | `collapse collapse-arrow` | Groups drug classes |
| Treatment hierarchy | `steps` | Schema 7 first/second/adjunct tiers |
| Prototype tabs | `tabs tabs-lifted` (Svelte island) | Swaps to `collapse` on mobile |
| Matrix cells | `badge` inside `<td>` | Drug count, color-tiered |
| Matrix cell tooltip | `tooltip` | Preview on hover |
| A–Z jump nav | `join` (button group) | Drug index page |
| Sort toggle | `swap` | Alpha ↔ by-class toggle |
| Search results list | `menu menu-compact` | Keyboard navigable |

**Avoid** using `hero` on schema landing pages — use `prose` class (DaisyUI
typography) on introductory paragraphs instead. This provides the 72ch
max-width and 1.75 line-height automatically.

---

## 6. Master Drug Database Schema

Each entry in `data/drugs.json` must exactly follow this structure:

```json
{
  "id": "lisinopril",
  "generic_name": "lisinopril",
  "brand_names": ["Prinivil", "Zestril"],
  "drug_class": "ACE inhibitor",
  "subclass": "long-acting ACE inhibitor",
  "prototype_for": true,
  "prototype_drug": null,
  "organ_systems": ["cardiovascular", "renal"],
  "therapeutic_classes": ["enzyme-inhibitors"],
  "mechanism_targets": ["ACE (angiotensin-converting enzyme)"],
  "mechanism_summary": "Inhibits ACE, preventing conversion of angiotensin I to angiotensin II, reducing vasoconstriction and aldosterone secretion.",
  "indications": [
    "hypertension",
    "heart failure",
    "post-MI cardioprotection",
    "diabetic nephropathy"
  ],
  "contraindications": [
    "pregnancy",
    "history of ACE-inhibitor-induced angioedema",
    "bilateral renal artery stenosis"
  ],
  "adverse_effects": {
    "common": ["dry cough", "hyperkalemia", "first-dose hypotension"],
    "serious": ["angioedema", "acute kidney injury", "teratogenicity"]
  },
  "black_box_warnings": ["fetal toxicity"],
  "pharmacokinetics": {
    "absorption": "25% oral bioavailability, not affected by food",
    "distribution": "does not cross BBB",
    "metabolism": "not hepatically metabolized; excreted unchanged",
    "excretion": "renal; dose adjustment required if CrCl <30 mL/min",
    "half_life": "12 hours",
    "onset": "1 hour",
    "peak": "6–7 hours",
    "duration": "24 hours",
    "protein_binding": "minimal (<5%)",
    "vd": "low"
  },
  "drug_interactions": [
    {
      "drug": "potassium-sparing diuretics",
      "mechanism": "additive hyperkalemia",
      "severity": "major"
    },
    {
      "drug": "NSAIDs",
      "mechanism": "reduced antihypertensive efficacy; AKI risk",
      "severity": "moderate"
    },
    {
      "drug": "lithium",
      "mechanism": "reduced lithium clearance; toxicity risk",
      "severity": "major"
    }
  ],
  "nursing_considerations": [
    "Monitor BP (hold if systolic <90) and serum potassium before and after administration",
    "Instruct patient to report cough or any facial, tongue, or throat swelling immediately",
    "Confirm absence of pregnancy before initiating in women of childbearing age",
    "Monitor creatinine; hold and notify prescriber if it rises >30% from baseline"
  ],
  "clinical_pearls": [
    "Preferred in diabetic nephropathy: dilates efferent arteriole, reducing intraglomerular pressure and proteinuria",
    "ACE-inhibitor cough is caused by bradykinin accumulation; switching to an ARB resolves cough while preserving renoprotection"
  ],
  "beers_criteria": false,
  "ismp_high_alert": false,
  "renal_dose_adjustment": true,
  "hepatic_dose_adjustment": false,
  "pregnancy_safety": "contraindicated (fetal toxicity)",
  "lactation_safety": "avoid",
  "tdm_required": false,
  "guideline_update_flag": false,
  "presentation_tags": [
    "hypertension",
    "heart failure",
    "edema",
    "dyspnea",
    "CKD-proteinuria"
  ],
  "adverse_effect_tags": [
    "cough",
    "hyperkalemia",
    "angioedema",
    "teratogen",
    "AKI"
  ],
  "interaction_tags": [
    "CYP450-independent",
    "renal-clearance",
    "potassium-elevating"
  ],
  "schema_memberships": {
    "organ_system": ["cardiovascular", "renal"],
    "therapeutic_class": ["enzyme-inhibitors"],
    "mechanism_family": ["ACE-inhibition"],
    "prototype_class": "ACE inhibitors",
    "adme_profile": "renally-cleared-unchanged",
    "presentation_cluster": [
      "hypertension",
      "heart-failure",
      "CKD-proteinuria"
    ],
    "adverse_cluster": [
      "electrolyte-disturbance",
      "teratogen",
      "angioedema"
    ],
    "interaction_cluster": [
      "potassium-elevating",
      "nephrotoxic-combinations"
    ]
  }
}
```

Populate all 500 entries before generating any schema or drug profile pages.
See Section 9 for the required drug list by system.

### ISMP High-Alert Medication Classification

The `ismp_high_alert` field (boolean) flags drugs that appear on the Institute
for Safe Medication Practices (ISMP) High-Alert Medications list (Acute Care
edition, 2024). High-alert medications are drugs that bear a heightened risk of
causing significant patient harm when used in error, even when used as intended.
They are NOT necessarily more likely to cause errors than other drugs — they
carry greater harm potential when errors do occur.

**Set `ismp_high_alert: true` for any drug in the following categories:**

| Category | Examples from the drug list |
|---|---|
| Anticoagulants (all forms) | warfarin, heparin, enoxaparin, dalteparin, fondaparinux, bivalirudin, argatroban, dabigatran, rivaroxaban, apixaban, edoxaban |
| Thrombolytics / fibrinolytics | alteplase, tenecteplase, reteplase |
| Glycoprotein IIb/IIIa inhibitors | abciximab, eptifibatide, tirofiban |
| Insulin (all forms) | insulin glargine, insulin detemir, insulin degludec, NPH insulin, regular insulin, insulin lispro, insulin aspart, insulin glulisine |
| Oral sulfonylurea hypoglycemics | glipizide, glyburide, glimepiride |
| Opioids (all routes) | morphine, fentanyl, buprenorphine, hydromorphone, oxycodone, codeine, tramadol, tapentadol, methadone, hydrocodone |
| Vasopressors and IV inotropes | dopamine, dobutamine, norepinephrine, epinephrine, vasopressin, milrinone |
| Neuromuscular blocking agents | succinylcholine, rocuronium, vecuronium, cisatracurium |
| IV sedation / general anesthetics | midazolam, lorazepam, diazepam, propofol, etomidate, ketamine |
| Chemotherapy agents | all cytotoxic agents (cyclophosphamide, methotrexate — all formulations oncologic and non-oncologic, doxorubicin, vincristine, paclitaxel, cisplatin, etc.) |
| Cardiac glycosides | digoxin |
| Individual drugs (by name) | amiodarone, lidocaine (IV), nitroprusside, nitroglycerin (all formulations — IV, sublingual, and topical carry risk), oxytocin, promethazine (IV), droperidol, methotrexate (all formulations — both oncologic and non-oncologic oral use are high-alert), magnesium sulfate (IV) |

**UI display requirements for `ismp_high_alert: true` drugs:**
- Display `<span class="badge badge-error">HIGH ALERT</span>` in the drug page
  header, immediately after the generic name (H1), above brand names.
- Display an `alert alert-error` callout block at the top of the Nursing
  Considerations section with text:
  > **ISMP High-Alert Medication:** This drug has been identified by the
  > Institute for Safe Medication Practices (ISMP) as a high-alert medication
  > that bears a heightened risk of causing significant harm when used in error.
  > Independent double-checks, clinical decision support, and standardized
  > concentrations are recommended wherever feasible.
- When listing drugs on schema index pages or the drug index, apply a red left
  border (`border-l-4 border-error`) to the drug card or row.
- The search index must include `"ismp_high_alert"` as a filterable field in
  `FilterPanel.svelte`.

**Reference:** ISMP High-Alert Medications in Acute Care Settings (2024).
Available at: https://www.ismp.org/recommendations/high-alert-medications-acute-list

---

## 7. The Nine Schemas

### Schema 1 — Organ Systems (`schemas/01-organ-systems/`)
Fifteen system pages: cardiovascular, renal, respiratory, gastrointestinal,
endocrine, reproductive, cns, pns-autonomic, musculoskeletal,
hematology-oncology, immunology, infectious-disease, dermatology,
ophthalmology-ent, toxicology.

**Prose hierarchy per system page:**

- **Level 1 — System Overview (4–5 paragraphs):** Organ physiology as it
  relates to drug targets; key receptors, enzymes, channels, and transporters
  available for pharmacological intervention; major disease states managed
  here; nursing priorities for the system as a whole.
- **Level 2 — Drug Class Sections (3 paragraphs each):** (a) mechanism and
  pharmacodynamic rationale; (b) shared PK characteristics and monitoring
  implications; (c) nursing considerations, interactions, and patient
  education for the class as a whole.
- **Level 3 — Individual Drug Entries (2 paragraphs + structured table):**
  (a) what distinguishes this agent from class peers, including PK nuances
  and unique indications or contraindications; (b) specific nursing
  assessment, administration, monitoring parameters, and patient education.

**Schema landing page (3 paragraphs):** Why organ-system organization is
dominant in clinical education; limitations of the schema (multi-system drugs
such as β-blockers); navigational guidance to the other eight schemas.

---

### Schema 2 — Therapeutic Classes (`schemas/02-therapeutic-classes/`)
Eleven class pages: adrenergic, cholinergic, ion-channel, enzyme-inhibitors,
receptor-antagonists, transporter-inhibitors, hormones-analogs, biologics,
antimicrobials, cytotoxics, anticoagulants.

**Prose hierarchy per class page:**

- **Level 1 — Class Overview (5 paragraphs):** (a) historical development and
  pharmacological rationale; (b) shared molecular mechanism with receptor/
  enzyme/channel biology explained; (c) class-wide PK profile and variability;
  (d) shared adverse effect profile with mechanistic explanations; (e)
  clinical context — disease states, patient populations, combination
  strategies.
- **Level 2 — Subclass distinctions (2–3 paragraphs per subclass):**
  Mechanism selectivity, PK differences, clinical niches.
- **Level 3 — Individual drug entries:** Same format as Schema 1 Level 3.

**Schema landing page (3 paragraphs):** Value of mechanism-based organization;
receptor theory and agonism/antagonism concepts; navigational guidance.

---

### Schema 3 — Organ System × Therapeutic Class Matrix
(`schemas/03-organ-by-class/`)

**Index page:** Interactive 15×11 matrix (Svelte island). Rows = organ systems,
columns = therapeutic classes. Each cell shows drug count badge and links to
intersection sub-page. Empty cells greyed out (`bg-base-200 opacity-40`). Cells
with ≥5 drugs use `bg-primary` with schema accent color. Cells use DaisyUI
`tooltip` for hover preview. Table uses DaisyUI `table table-pin-rows` with
`overflow-x-auto`.

**Index prose (3 paragraphs):** Value of cross-referencing organ system and
therapeutic class; clinical applications (drug repurposing, polypharmacy,
multi-system effects); navigational guidance.

**Intersection sub-pages (3 paragraphs each):** Why this mechanism is used in
this organ system; what makes it efficacious here; how drugs at this
intersection differ from the same class in other systems.

---

### Schema 4 — Mechanism-First (`schemas/04-mechanism-first/`)
One page per molecular target family. Target families include: GPCRs (α1, α2,
β1, β2, β3, M1–M5, D1–D5, 5-HT subtypes, opioid μ/κ/δ, H1/H2, AT1, GLP-1R,
etc.), ligand-gated ion channels (nAChR, GABA-A, NMDA, AMPA), voltage-gated
ion channels (Na+, Ca2+, K+), nuclear receptors (GR, MR, AR, ER, TR, PPAR,
RAR), receptor tyrosine kinases (EGFR, VEGFR, BCR-ABL, etc.), serine/threonine
kinases (BRAF, MEK, CDK4/6, mTOR, JAK), enzyme active sites (ACE, COX-1/2,
HMG-CoA reductase, PDE, CYP enzymes, etc.), transporter proteins (SERT, DAT,
NET, SGLT2, P-gp, OATP), and structural targets (tubulin, topoisomerase,
DNA cross-linking).

**Schema landing page (4 paragraphs):** Intellectual case for mechanism-first
learning; target biology → drug design; overview of molecular target families
across the 500 drugs; how mechanism-first thinking prevents medication errors
in nursing practice.

**Per target family page (5-paragraph Level 1):** (a) structure and normal
physiology; (b) pharmacological effects of activation vs. inhibition; (c)
disease rationale for targeting; (d) structural features drugs exploit;
(e) toxicology of over-activation or over-inhibition.

---

### Schema 5 — Prototype + Class (`schemas/05-prototype-class/`)
One page per prototype drug. Each page contains:

**Part A — Prototype deep dive (5 paragraphs):** (a) mechanism at molecular
and systems level; (b) full ADME profile; (c) therapeutic indications with
clinical evidence base; (d) adverse effect profile with mechanistic
explanations; (e) nursing considerations.

**Part B — Class variations (2 paragraphs per variation drug):** (a) how this
drug differs from prototype along four axes — PK (duration/route/half-life),
receptor selectivity, indication profile, adverse effect profile; (b) the
specific clinical scenario in which this variation is preferred, with nursing
implications.

**Schema landing page (4 paragraphs):** Cognitive science basis for
prototype-first learning; the four axes of variation; nursing implications of
the prototype model; USMLE/NCLEX examination strategy guidance.

**DaisyUI implementation:** Use `tabs tabs-lifted` (Svelte island) with
prototype as the first tab and each variation as a subsequent tab. On mobile
viewports (<640px), swap to `collapse` accordion.

**Prototype list (minimum — expand as clinically appropriate):**
Penicillin G, cephalexin (gen-1), ceftriaxone (gen-3), vancomycin, gentamicin,
erythromycin, doxycycline, ciprofloxacin, clindamycin, metronidazole, TMP-SMX,
linezolid, acyclovir, oseltamivir, fluconazole, amphotericin B, chloroquine,
metformin, glipizide, sitagliptin, liraglutide, empagliflozin, pioglitazone,
regular insulin, levothyroxine, prednisone, fludrocortisone, lisinopril,
losartan, metoprolol, amlodipine, diltiazem, furosemide, hydrochlorothiazide,
spironolactone, digoxin, amiodarone, lidocaine, warfarin, heparin (UFH),
enoxaparin, rivaroxaban, dabigatran, clopidogrel, aspirin, atorvastatin,
morphine, naloxone, diazepam, zolpidem, phenytoin, levetiracetam, valproate,
fluoxetine, venlafaxine, amitriptyline, phenelzine, bupropion, lithium,
haloperidol, risperidone, clozapine, methylphenidate, atomoxetine, donepezil,
levodopa-carbidopa, sumatriptan, propofol, succinylcholine, rocuronium,
neostigmine, atropine, albuterol, tiotropium, fluticasone inhaled, montelukast,
omeprazole, metoclopramide, ondansetron, loperamide, lactulose, infliximab,
rituximab, cyclosporine, cyclophosphamide, methotrexate, doxorubicin,
vincristine, paclitaxel, cisplatin, imatinib, erlotinib, vemurafenib,
pembrolizumab, ipilimumab.

---

### Schema 6 — ADME (`schemas/06-adme/`)
Six sub-section pages:

**absorption.astro (4 paragraphs):** Bioavailability principles, first-pass
effect, routes of administration and clinical implications, factors affecting
GI absorption. Drugs organized by route. 1-paragraph absorption narrative per
drug. Critical nursing safety note: crushability of extended-release
formulations.

**distribution.astro (4 paragraphs):** Volume of distribution, protein binding
and implications (hypoalbuminemia, displacement), BBB penetration, placental
transfer, lipophilicity. Drugs organized by Vd profile and protein binding %.
1-paragraph distribution narrative per drug with clinical implications.

**cyp-metabolism.astro (6 paragraphs — the most detailed page):**
CYP450 overview; major isoforms (1A2, 2B6, 2C8, 2C9, 2C19, 2D6, 3A4/5);
induction vs. inhibition; prodrug activation (clopidogrel, codeine, tamoxifen);
genetic polymorphisms (poor/extensive/ultrarapid metabolizers); dangerous
interaction examples.

Organize all 500 drugs into tables (use DaisyUI `table table-pin-rows` with
`overflow-x-auto`):
- CYP3A4 substrates (major) — color-code by narrow therapeutic index
- CYP3A4 inhibitors: strong (`badge-error`), moderate (`badge-warning`),
  weak (`badge-ghost`)
- CYP3A4 inducers: strong, moderate
- CYP2D6 substrates and inhibitors
- CYP2C9 substrates
- CYP2C19 substrates (flag polymorphism-sensitive drugs)
- CYP1A2 substrates
- Phase II: glucuronidation, sulfation, NAT2 acetylation (isoniazid,
  hydralazine, procainamide)

1-paragraph clinical narrative per significant interaction pair: mechanism,
magnitude, management.

**excretion.astro (4 paragraphs):** Renal excretion physiology,
Cockcroft-Gault and CKD-EPI estimation, dose adjustment principles in CKD,
hepatic/biliary excretion, enterohepatic recirculation, dialyzability.
Organize drugs into: renally cleared unchanged, hepatically cleared, both,
dialyzable vs. non-dialyzable. 1-paragraph narrative per drug with CrCl
thresholds.

**special-populations.astro (5 paragraphs):** Pediatrics (CYP ontogeny,
weight-based dosing), geriatrics (reduced clearance, Beers Criteria), pregnancy
(current FDA labeling approach, placental transfer), lactation (M:P ratio,
infant exposure), obesity (Vd changes, dosing strategies). 1-paragraph
narrative per drug with specific population guidance.

**drug-interactions-pk.astro (3 paragraphs):** PK vs. PD interaction
distinction, clinical significance grading, management strategies. Organize
all significant PK interactions by mechanism. Structured entry per pair:
drugs involved, mechanism, magnitude, management.

---

### Schema 7 — Clinical Presentations (`schemas/07-clinical-presentations/`)
One page per presentation cluster. Each page:

**Level 1 prose (4 paragraphs):** Pathophysiology of the presentation;
pharmacological rationale for treatment; hierarchy of agents (first-line,
second-line, adjuncts); monitoring the pharmacological response.

**Level 2:** Drugs organized by treatment tier using DaisyUI `steps` component
(first-line → second-line → adjuncts as step nodes).

**Schema landing page (4 paragraphs):** Clinical argument for
presentation-based learning; complementarity with mechanism-first learning;
danger of rote association without mechanism; nursing bedside application.

**Presentation clusters (minimum):**
Chest pain/ACS, hypertensive urgency/emergency, acute heart failure, chronic
heart failure, atrial fibrillation, shock (septic/cardiogenic/distributive),
dyslipidemia, DVT/PE, bleeding/anticoagulation reversal, asthma exacerbation,
COPD exacerbation, community-acquired pneumonia, tuberculosis, HIV
(antiretroviral initiation), hyperglycemia/DKA/HHS, hypothyroidism,
hyperthyroidism, adrenal insufficiency, Cushing's syndrome, acute pain, chronic
pain, opioid overdose, status epilepticus, major depression, generalized
anxiety disorder, acute psychosis, bipolar disorder (manic/depressive),
ADHD, Alzheimer's dementia, Parkinson's disease, migraine (acute/preventive),
insomnia, nausea/vomiting (acute/CINV), GI bleeding/PUD, inflammatory bowel
disease (Crohn's/UC), C. difficile infection, UTI/pyelonephritis,
sepsis/bacteremia, bacterial meningitis, invasive fungal infection, malaria,
anemia (iron-deficiency/megaloblastic/hemolytic), neutropenia, CINV,
chemotherapy-induced neutropenia, rheumatoid arthritis, acute gout/
hyperuricemia, osteoporosis, solid organ transplant rejection, anaphylaxis,
perioperative anesthesia/analgesia, alcohol withdrawal, opioid use disorder,
smoking cessation.

---

### Schema 8 — Adverse Effects (`schemas/08-adverse-effects/`)
One page per adverse effect cluster.

**Level 1 prose (5 paragraphs):** Mechanism of the adverse effect; patient
risk factors; recognition and monitoring parameters; nursing interventions;
patient education.

**Level 2:** All implicated drugs from the 500, each with 1-paragraph entry:
specific risk profile, incidence, severity grading, management. Use DaisyUI
`alert alert-error` for severe/BBW-associated adverse effects.

**Schema landing page (4 paragraphs):** Why adverse effect literacy is a core
nursing competency; on-target vs. off-target mechanistic relationship; adverse
effect clustering and shared mechanisms; the nursing process applied to
pharmacovigilance.

**Adverse effect clusters (minimum):**
Nephrotoxicity, hepatotoxicity, QT prolongation/torsades de pointes, direct
cardiotoxicity (anthracyclines), myelosuppression, peripheral neuropathy,
CNS neurotoxicity/seizure, ototoxicity, pulmonary toxicity, teratogenicity/
fetotoxicity, hyperkalemia, hypokalemia, hyponatremia (SIADH), hypoglycemia,
drug-induced hyperglycemia, drug-induced hyperlipidemia, drug-induced
osteoporosis, drug-induced weight gain, serotonin syndrome, neuroleptic
malignant syndrome, anticholinergic toxidrome, sympathomimetic toxidrome,
cholinergic toxidrome, opioid toxidrome, bleeding/hemorrhage, drug-induced
thrombosis, anaphylaxis/hypersensitivity, Stevens-Johnson syndrome/TEN,
DRESS syndrome, biologic infusion reactions.

**Three mandatory special compilation pages:**
1. **Black Box Warnings** — all BBW drugs from the 500 listed alphabetically,
   each with the full BBW paraphrased in clinical language and a nursing
   action summary.
2. **Beers Criteria** — all applicable drugs from the 500, with mechanism of
   risk in older adults and safer alternatives.
3. **Therapeutic Drug Monitoring** — vancomycin, aminoglycosides, digoxin,
   lithium, phenytoin, valproate, cyclosporine, tacrolimus, methotrexate;
   include target ranges, sampling timing, and toxicity thresholds.

---

### Schema 9 — Drug Interactions (`schemas/09-drug-interactions/`)

**Schema landing page (4 paragraphs):** Epidemiology of drug interactions and
hospital admissions; PK vs. PD interactions; polypharmacy and compounding risk
in elderly patients; nursing's role in medication reconciliation and
food-drug interaction education.

**cyp-inhibition.astro:** All clinically significant CYP inhibition-mediated
interactions. Organized by inhibitor drug. Substrates at risk listed per
inhibitor. 2-sentence clinical narrative per pair.

**cyp-induction.astro:** All significant induction interactions organized by
inducer drug with affected substrates.

**transporter-interactions.astro:** P-glycoprotein, OATP, OCT interactions.
Anchor pairs: digoxin-amiodarone, digoxin-verapamil, statins-cyclosporine,
metformin-cimetidine. Full mechanistic prose per pair.

**pd-additive-toxicity.astro (3 paragraphs + drug pair tables per category):**
Serotonin syndrome drug pairs, additive QT prolongation, additive CNS
depression, additive nephrotoxicity, additive bleeding risk, additive
hyperkalemia, additive myelosuppression.

**pd-antagonism.astro:** Pharmacodynamic antagonism interactions (β-blockers
opposing β2-agonists in asthma; NSAIDs opposing antihypertensives; opioids
opposing bowel motility agents; etc.).

**food-drug.astro:** Grapefruit/CYP3A4, tyramine/MAOIs, vitamin K/warfarin,
dairy/tetracyclines, alcohol/metronidazole, alcohol/CNS depressants, high-fat
meals/absorption effects. Full mechanistic prose plus patient education
language per interaction.

**protein-binding.astro:** Protein binding displacement interactions including
the common clinical misconception about their magnitude of effect.

---

## 8. Individual Drug Profile Pages (`src/pages/drugs/[slug].astro`)

Generate using `getStaticPaths()` from `drugs.json`. Each page contains:

1. **Header block (`card`):** Generic name (H1), brand names, drug class,
   subclass, prototype badge (`badge badge-success`) OR "variation of
   [prototype]" link.

2. **Mechanism of action (2 paragraphs):** Molecular mechanism (target,
   binding, downstream signaling); physiological and clinical consequences.

3. **Pharmacokinetics (`table table-zebra` + 1 paragraph):**
   Table fields: route, bioavailability, onset, peak, duration, half-life,
   protein binding, Vd, metabolism (CYP isoforms), excretion, dose adjustment
   thresholds. Narrative paragraph integrating key PK features and clinical
   implications.

4. **Indications (prose):** One sentence per indication explaining the
   pharmacological rationale. No bullet lists — write as connected prose with
   commas or semicolons separating indications.

5. **Contraindications & precautions (prose paragraph):** Mechanistic basis
   for each contraindication. Do not use bullet lists.

6. **Adverse effects (3-tier structure):** Common (with mechanistic
   explanation), Serious (with clinical recognition guidance), Black Box
   Warnings (`alert alert-error` with full BBW paraphrased).

7. **Drug interactions (`table` + prose paragraph):** Table of all
   interactions from the drug's JSON entry. Prose expands on the 3 most
   clinically significant.

8. **Nursing considerations (4 paragraphs):**
   (a) Pre-administration assessment — specific labs, vitals, history items.
   (b) Administration — route technique, IV diluents/rates, storage.
   (c) Monitoring — specific parameters, timing, threshold values requiring
       intervention.
   (d) Patient education — written at health-literacy-appropriate level within
       academic framing.

9. **Schema Membership Panel (sidebar or bottom panel):** Links to every
   schema page where this drug appears. Label each link with the schema name
   and the specific page title within that schema. This is mandatory for every
   drug page.

10. **Related Drugs Panel:** Links to 3–5 pharmacologically related drugs.
    One sentence per link explaining the pharmacological relationship.

---

## 9. Required Drug List (500 Drugs)

The 500 drugs must include at minimum all drugs listed below, supplemented with
clinical judgment to reach 500 total. Selection criteria: NCLEX high-priority
drugs, USMLE Steps 1–3, WHO Essential Medicines List, and high-volume
prescribing from primary care, emergency medicine, and inpatient practice.

### Cardiovascular (≥60)
Lisinopril, enalapril, ramipril, captopril, benazepril, fosinopril, quinapril,
losartan, valsartan, olmesartan, irbesartan, candesartan, telmisartan,
sacubitril-valsartan, metoprolol succinate, metoprolol tartrate, carvedilol,
atenolol, bisoprolol, propranolol, labetalol, nebivolol, amlodipine,
nifedipine, diltiazem, verapamil, hydralazine, minoxidil, clonidine,
doxazosin, prazosin, terazosin, spironolactone, eplerenone, finerenone,
furosemide, bumetanide, torsemide, hydrochlorothiazide, chlorthalidone,
indapamide, metolazone, triamterene, amiloride, digoxin, ivabradine,
amiodarone, sotalol, flecainide, propafenone, lidocaine (IV), mexiletine,
adenosine, atropine, dopamine, dobutamine, norepinephrine, epinephrine,
vasopressin, milrinone, nitroprusside, nitroglycerin, isosorbide mononitrate,
isosorbide dinitrate, nesiritide, atorvastatin, rosuvastatin, simvastatin,
pravastatin, lovastatin, pitavastatin, fluvastatin, ezetimibe, fenofibrate,
gemfibrozil, niacin, evolocumab, alirocumab, inclisiran, icosapent ethyl,
colchicine (CV indication), warfarin, heparin (UFH), enoxaparin, dalteparin,
fondaparinux, bivalirudin, argatroban, dabigatran, rivaroxaban, apixaban,
edoxaban, alteplase, tenecteplase, reteplase, clopidogrel, ticagrelor,
prasugrel, aspirin, dipyridamole, cilostazol, abciximab, eptifibatide,
tirofiban, protamine sulfate, phytonadione, idarucizumab, andexanet alfa.

### Renal (≥10, beyond diuretics)
Desmopressin, tolvaptan, conivaptan, acetazolamide, mannitol, sodium
bicarbonate, patiromer, sodium zirconium cyclosilicate, calcium acetate,
sevelamer, lanthanum carbonate, cinacalcet.

### Respiratory (≥25)
Albuterol, levalbuterol, salmeterol, formoterol, vilanterol, indacaterol,
tiotropium, ipratropium, umeclidinium, glycopyrrolate (inhaled), aclidinium,
fluticasone propionate, fluticasone furoate, budesonide (inhaled),
beclomethasone, mometasone (inhaled), ciclesonide, montelukast, zafirlukast,
zileuton, roflumilast, theophylline, cromolyn sodium, benralizumab, mepolizumab,
reslizumab, dupilumab, tezepelumab, omalizumab, guaifenesin, dextromethorphan,
acetylcysteine, dornase alfa, ivacaftor, tezacaftor-ivacaftor-elexacaftor.

### Gastrointestinal (≥25)
Omeprazole, esomeprazole, lansoprazole, pantoprazole, rabeprazole,
dexlansoprazole, vonoprazan, famotidine, sucralfate, misoprostol,
bismuth subsalicylate, metoclopramide, ondansetron, granisetron, palonosetron,
prochlorperazine, promethazine, droperidol, aprepitant, fosaprepitant,
dronabinol, scopolamine, loperamide, diphenoxylate-atropine, polyethylene
glycol, lactulose, bisacodyl, senna, psyllium, docusate, lubiprostone,
linaclotide, prucalopride, alosetron, sulfasalazine, mesalamine, balsalazide,
olsalazine, infliximab (GI), adalimumab (GI), vedolizumab, ustekinumab,
tofacitinib (GI), rifaximin, ursodiol.

### Endocrine & Metabolic (≥40)
Insulin glargine, insulin detemir, insulin degludec, NPH insulin, regular
insulin, insulin lispro, insulin aspart, insulin glulisine, metformin,
glipizide, glyburide, glimepiride, repaglinide, nateglinide, pioglitazone,
rosiglitazone, sitagliptin, saxagliptin, alogliptin, linagliptin, exenatide,
liraglutide, semaglutide, dulaglutide, tirzepatide, empagliflozin, dapagliflozin,
canagliflozin, ertugliflozin, acarbose, pramlintide, levothyroxine,
liothyronine, methimazole, propylthiouracil, potassium iodide, hydrocortisone,
prednisone, methylprednisolone, dexamethasone, betamethasone, fludrocortisone,
mifepristone (Cushing's), ketoconazole (Cushing's), metyrapone, mitotane,
octreotide, lanreotide, cabergoline, bromocriptine, somatropin, cinacalcet,
teriparatide, abaloparatide, romosozumab, alendronate, risedronate, ibandronate,
zoledronic acid, denosumab, calcitonin, calcitriol, cholecalciferol, allopurinol,
febuxostat, probenecid, rasburicase, colchicine.

### Reproductive & Genitourinary (≥20)
Estradiol, conjugated estrogens, medroxyprogesterone, norethindrone,
levonorgestrel, etonogestrel, ulipristal acetate, mifepristone (abortion),
misoprostol (obstetric), oxytocin, dinoprostone, carboprost, testosterone,
leuprolide, goserelin, nafarelin, clomiphene, letrozole (infertility),
follitropin alfa, tamoxifen, raloxifene, fulvestrant, finasteride, dutasteride,
sildenafil, tadalafil, vardenafil, avanafil, oxybutynin, solifenacin,
tolterodine, mirabegron, tamsulosin, alfuzosin.

### CNS (≥70)
Phenytoin, fosphenytoin, carbamazepine, oxcarbazepine, valproate, lamotrigine,
levetiracetam, topiramate, zonisamide, gabapentin, pregabalin, lacosamide,
perampanel, phenobarbital, ethosuximide, clonazepam (epilepsy), clobazam,
diazepam, lorazepam, midazolam, alprazolam, temazepam, zolpidem, zaleplon,
eszopiclone, ramelteon, suvorexant, buspirone, hydroxyzine, fluoxetine,
sertraline, paroxetine, citalopram, escitalopram, fluvoxamine, venlafaxine,
duloxetine, desvenlafaxine, bupropion, mirtazapine, trazodone, vilazodone,
vortioxetine, amitriptyline, nortriptyline, imipramine, desipramine,
clomipramine, phenelzine, tranylcypromine, selegiline (MAOI), lithium,
valproate (bipolar), lamotrigine (bipolar), quetiapine (bipolar), haloperidol,
chlorpromazine, fluphenazine, risperidone, olanzapine, quetiapine, ziprasidone,
aripiprazole, paliperidone, lurasidone, brexpiprazole, cariprazine, clozapine,
pimavanserin, morphine, hydromorphone, oxycodone, fentanyl, remifentanil,
codeine, tramadol, tapentadol, buprenorphine, methadone, naloxone, naltrexone,
methylphenidate, amphetamine, lisdexamfetamine, atomoxetine, guanfacine (ADHD),
clonidine (ADHD), donepezil, rivastigmine, galantamine, memantine,
levodopa-carbidopa, pramipexole, ropinirole, rotigotine, amantadine,
rasagiline, entacapone, tolcapone, benztropine, tetrabenazine,
deutetrabenazine, valbenazine, riluzole, nusinersen, risdiplam, ketamine,
propofol, etomidate, isoflurane, sevoflurane, nitrous oxide, succinylcholine,
rocuronium, vecuronium, cisatracurium, neostigmine, sugammadex, sumatriptan,
rizatriptan, lasmiditan, ubrogepant, rimegepant, atogepant, erenumab,
fremanezumab, galcanezumab, ergotamine, acetaminophen, ibuprofen, naproxen,
ketorolac, celecoxib, indomethacin, diclofenac, meloxicam.

### Infectious Disease (≥80)
Penicillin G, penicillin V, amoxicillin, ampicillin, amoxicillin-clavulanate,
ampicillin-sulbactam, piperacillin-tazobactam, oxacillin, nafcillin,
dicloxacillin, cephalexin, cefadroxil, cefazolin, cefaclor, cefuroxime,
cefoxitin, ceftriaxone, cefotaxime, cefdinir, cefpodoxime, ceftazidime,
cefepime, ceftaroline, ceftazidime-avibactam, ceftolozane-tazobactam,
imipenem-cilastatin, meropenem, ertapenem, doripenem, aztreonam, vancomycin,
telavancin, oritavancin, dalbavancin, gentamicin, tobramycin, amikacin,
streptomycin, plazomicin, azithromycin, clarithromycin, erythromycin,
fidaxomicin, doxycycline, minocycline, tetracycline, tigecycline, eravacycline,
omadacycline, ciprofloxacin, levofloxacin, moxifloxacin, delafloxacin,
clindamycin, metronidazole, tinidazole, nitrofurantoin, TMP-SMX, sulfadiazine,
linezolid, tedizolid, chloramphenicol, rifampin, rifabutin, rifapentine,
isoniazid, ethambutol, pyrazinamide, bedaquiline, delamanid, pretomanid,
dapsone, clofazimine, acyclovir, valacyclovir, famciclovir, ganciclovir,
valganciclovir, foscarnet, cidofovir, letermovir, oseltamivir, zanamivir,
peramivir, baloxavir, tenofovir disoproxil fumarate, tenofovir alafenamide,
emtricitabine, lamivudine, abacavir, zidovudine, efavirenz, rilpivirine,
doravirine, etravirine, nevirapine, lopinavir-ritonavir, atazanavir, darunavir,
raltegravir, elvitegravir, dolutegravir, bictegravir, cabotegravir, maraviroc,
enfuvirtide, sofosbuvir, ledipasvir, velpatasvir, voxilaprevir, glecaprevir,
pibrentasvir, elbasvir, grazoprevir, fluconazole, itraconazole, voriconazole,
posaconazole, isavuconazole, miconazole, clotrimazole, amphotericin B,
amphotericin B liposomal, caspofungin, micafungin, anidulafungin, flucytosine,
chloroquine, hydroxychloroquine, mefloquine, atovaquone-proguanil,
artemether-lumefantrine, quinine, primaquine, tafenoquine, metronidazole
(parasites), albendazole, mebendazole, ivermectin, praziquantel, pentamidine,
atovaquone, pyrimethamine-sulfadoxine.

### Hematology-Oncology (≥30)
Cyclophosphamide, ifosfamide, busulfan, melphalan, chlorambucil, carmustine,
temozolomide, cisplatin, carboplatin, oxaliplatin, methotrexate (onc),
5-fluorouracil, capecitabine, cytarabine, gemcitabine, azacitidine, decitabine,
6-mercaptopurine, fludarabine, doxorubicin, daunorubicin, epirubicin,
idarubicin, bleomycin, mitomycin, actinomycin D, vincristine, vinblastine,
vinorelbine, paclitaxel, docetaxel, cabazitaxel, topotecan, irinotecan,
etoposide, imatinib, dasatinib, nilotinib, ponatinib, asciminib, gefitinib,
erlotinib, afatinib, osimertinib, lapatinib, vemurafenib, dabrafenib,
trametinib, cobimetinib, palbociclib, ribociclib, abemaciclib, ibrutinib,
acalabrutinib, zanubrutinib, idelalisib, alpelisib, everolimus (onc),
temsirolimus, lenalidomide, thalidomide, pomalidomide, bortezomib, carfilzomib,
ixazomib, venetoclax, olaparib, rucaparib, niraparib, talazoparib, rituximab,
ofatumumab, obinutuzumab, trastuzumab, pertuzumab, trastuzumab deruxtecan,
cetuximab, panitumumab, bevacizumab, ramucirumab, nivolumab, pembrolizumab,
atezolizumab, durvalumab, avelumab, ipilimumab, cemiplimab, dostarlimab,
blinatumomab, inotuzumab ozogamicin, gemtuzumab ozogamicin, polatuzumab
vedotin, enfortumab vedotin, sacituzumab govitecan, epoetin alfa, darbepoetin
alfa, filgrastim, pegfilgrastim, sargramostim, eltrombopag, romiplostim,
hydroxyurea, tretinoin (ATRA), arsenic trioxide, ivosidenib, enasidenib,
gilteritinib, midostaurin, ruxolitinib, alectinib, crizotinib, lorlatinib,
cabozantinib, lenvatinib, sorafenib, sunitinib, pazopanib, axitinib.

### Immunology (≥20)
Cyclosporine, tacrolimus, mycophenolate mofetil, sirolimus, everolimus
(transplant), azathioprine, methotrexate (rheum), leflunomide,
hydroxychloroquine (DMARD), sulfasalazine (DMARD), infliximab, adalimumab,
certolizumab, golimumab, etanercept, abatacept, rituximab (rheum), tocilizumab,
sarilumab, anakinra, canakinumab, secukinumab, ixekizumab, bimekizumab,
guselkumab, risankizumab, ustekinumab, belimumab, anifrolumab, voclosporin,
baricitinib, upadacitinib, tofacitinib (rheum), belatacept, basiliximab,
antithymocyte globulin, IVIG.

---

## 10. Academic Prose Quality Standards

All generated prose must meet these standards without exception:

1. **Voice:** Third-person academic with clear pedagogical intent. Occasionally
   address the reader directly ("The student should note...") when flagging
   high-yield content.

2. **Mechanism integration:** Every clinical effect must trace to molecular
   mechanism. "This drug lowers blood pressure" without mechanistic explanation
   is insufficient.

3. **Nursing specificity:** Nursing sections must cite specific lab values,
   vital sign thresholds, and assessment findings. "Monitor the patient" is
   unacceptable. Write "Monitor serum potassium every 48–72 hours during
   initiation; hold and notify the prescriber if K+ exceeds 5.5 mEq/L."

4. **Clinical relevance:** Each system or class section must include at least
   one clinical scenario sentence illustrating the pharmacological principle
   in practice.

5. **Cross-referencing:** Prose must contain hyperlinked cross-references
   throughout. When a mechanism page mentions a prototype drug, link to the
   prototype page. When an organ system page discusses an interaction, link to
   the interactions schema.

6. **Length discipline:** Paragraphs must be 5–8 sentences. No bullet points
   within prose sections. Tables are for structured data only. Prose is prose.

7. **Accuracy:** All pharmacological content must reflect FDA labeling, and
   ACC/AHA, GINA, GOLD, ADA, IDSA, and WHO guidelines current to 2024–2025.
   Flag recently-updated guidelines with a `badge badge-warning` labeled
   "Guideline Update."

---

## 11. Execution Phases

Execute in this order. Confirm completion of each phase before beginning the
next. Report all data ambiguities encountered in Phase 2 before proceeding to
Phase 3.

### Phase 0 — Scaffold (do first, before all other work)
- Run `npm create astro@latest` and configure static output mode
- Install all dependencies: `@astrojs/svelte`, `@astrojs/tailwind`,
  `tailwindcss`, `daisyui`, `svelte`
- Configure `astro.config.mjs` with base path for GitHub Pages
- Configure `tailwind.config.mjs` per Section 4
- Create all directories in the structure defined in Section 3
- Add `src/styles/global.css` with schema color overrides
- Add `src/styles/print.css` with drug profile print rules
- Add `.nojekyll` to `public/`
- Create `BaseLayout.astro`, `DrugProfileLayout.astro`, `SchemaLayout.astro`
  with correct font imports (Google Fonts: Inter, Lora, JetBrains Mono) and
  `<body data-schema>` attribute pattern

### Phase 1 — Master Data
- Generate `data/drugs.json` with all 500 drug entries fully populated
  per the schema in Section 6
- Generate all supporting JSON files: `organ-systems.json`,
  `therapeutic-classes.json`, `mechanisms.json`, `prototypes.json`,
  `adme.json`, `presentations.json`, `adverse-effects.json`,
  `interactions.json`
- Validate all JSON files for syntax errors before proceeding

### Phase 2 — Core Pages and Navigation
- Build `Nav.astro` with `navbar`, `dropdown` schema selector, `kbd` shortcut
  hint, and hamburger mobile pattern
- Build `SchemaCompass.svelte` modal island
- Build `index.astro` (home page) with schema card grid, featured drug of the
  day module, and Start Here recommendation
- Build `about.astro`
- Build `drug-index.astro` with A–Z jump nav (`join`), alphabetical list, and
  `swap` sort toggle (Svelte island)

### Phase 3 — Schema Pages
- 3a: Schema 1 — all 15 organ system pages
- 3b: Schema 2 — all 11 therapeutic class pages
- 3c: Schema 3 — matrix index page (MatrixTable.svelte island) + all
  intersection sub-pages
- 3d: Schema 4 — all molecular target family pages
- 3e: Schema 5 — all prototype pages with variation sections
- 3f: Schema 6 — all 6 ADME sub-section pages
- 3g: Schema 7 — all clinical presentation pages
- 3h: Schema 8 — all adverse effect cluster pages + 3 special compilation pages
- 3i: Schema 9 — all 7 drug interaction mechanism pages

### Phase 4 — Individual Drug Profile Pages
- Build `src/pages/drugs/[slug].astro` template using `getStaticPaths()`
  from `drugs.json`
- Generate all 500 drug pages
- Verify that every drug page has a populated Schema Membership Panel linking
  to all schema pages where that drug appears
- Verify that every drug page has a populated Related Drugs Panel

### Phase 5 — Search and Filter
- Build `SearchOverlay.svelte` island with Fuse.js integration
- Build `FilterPanel.svelte` island with `drawer` (mobile) and `menu` sidebar
  (desktop) pattern
- Connect filter state to drug list display on all schema landing pages
- Test search: must index generic names, brand names, class, indications,
  adverse effects, and mechanism keywords

### Phase 6 — QA and Finalization
- Validate all Astro pages build without errors (`astro build`)
- Audit all prose sections for compliance with Section 10 quality standards
- Test mobile responsiveness at 375px, 768px, and 1280px viewports
- Test print stylesheet on three representative drug profile pages
- Verify GitHub Pages compatibility: all paths relative, no server-side
  dependencies, `base` path correctly set in `astro.config.mjs`
- Confirm all internal cross-reference links resolve
- Generate `README.md` documenting project structure, data schema, local
  development setup, and contribution guidelines

---

## 12. Agent Session Protocol

### At the START of every session:

1. Read this entire `CLAUDE.md` file before taking any action.
2. Read `STATUS.md` in full — specifically the **Last Session Summary** block
   at the top.
3. Run `git status` and `git log --oneline -20` to confirm current state.
4. Do **NOT** begin any work until you have confirmed the exact resume point
   from the Last Session Summary. If STATUS.md does not have a Last Session
   Summary, run `git log --oneline -10` to reconstruct state from commit
   messages.
5. Never regenerate files that already exist and are populated correctly —
   check before writing.
6. If `data/drugs.json` does not yet exist or has fewer than 500 entries, the
   current phase is Phase 1. Consult the Phase 1 task table in STATUS.md to
   find the next unclaimed task and work only that task.

### At the END of every session (or if interrupted):

1. **Update STATUS.md immediately — before any other cleanup.**
2. Fill in the **Last Session Summary** block at the top of STATUS.md with:
   - Date of session
   - Exactly which work was completed (file names, line ranges, task IDs)
   - Exactly where work was interrupted, if applicable
   - The precise resume point for the next agent
   - Files modified this session
   - Any known issues introduced
3. Mark all completed drug data tasks in the Phase 1 task table as ✅ Complete.
4. Mark the in-progress task as 🔶 Partial with a note about where it stopped.
5. Commit STATUS.md with message: `chore: update STATUS.md — session end YYYY-MM-DD`
6. Commit all in-progress data files even if incomplete, with message:
   `wip: [system] drugs — stopped at [drug-name]`

### Commit message conventions:
```
data: complete task CV-05 — 3 non-selective beta-blockers
data: complete task CNS-08 — SSRIs (6 drugs)
wip: CNS drugs — stopped at sertraline mid-entry (discarded, resume at sertraline)
chore: update STATUS.md — session end 2026-04-22
feat: build Nav.astro with schema dropdown and mobile drawer
```

---

## 13. Drug Data Entry Protocol (Phase 1)

Each session working on `drugs.json` MUST follow this protocol exactly:

### Claiming a task:
1. Open STATUS.md and find the **Phase 1 Drug Data Task Table**.
2. Identify the first task marked ❌ Not started.
3. Mark it 🔄 In Progress with today's date **before writing any drug data**.
4. Commit the STATUS.md change immediately:
   `chore: claim task [ID] — starting [drug class]`
5. Work **only that task** to completion. Do not begin a second task until the
   first is committed.

### Writing drug entries:
1. Each entry must completely satisfy the schema defined in Section 6.
   A partial entry MUST NOT be committed to `drugs.json`.
2. If a session ends before a drug entry is finished, **discard that incomplete
   entry**. Record the drug name in the Last Session Summary as the resume
   point. Commit only the fully-populated entries before it.
3. Validate JSON after every entry batch:
   ```bash
   node -e "JSON.parse(require('fs').readFileSync('data/drugs.json','utf8')); console.log('Valid JSON')"
   ```
   A broken `drugs.json` blocks the entire build and all downstream work.

### Committing completed task:
1. Commit with message: `data: complete task [ID] — [count] [drug class] drugs`
2. Immediately update STATUS.md: mark the task ✅ Complete with the count.
3. Fill in the Last Session Summary block.

### Task size guidance:
- Target 5–10 drug entries per task (one drug class or closely related group).
- If a class has >10 drugs, split it into subtasks (e.g., CNS-15a, CNS-15b).
- CNS-15 (ADHD + Alzheimer's + Parkinson's, 23 drugs) must be split.
- Complete one full task before beginning a new one.

---

*This CLAUDE.md is the single source of truth for this project.
All architecture decisions, technology choices, prose standards, drug lists,
data schemas, and execution sequencing are defined here.
Do not deviate from these specifications without updating this file first.*
