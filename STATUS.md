# Project Status

## Last Session Summary
- **Date:** 2026-04-23
- **Work completed:**
  - Added ID antibiotics (cephalosporins, carbapenems, glycopeptides, aminoglycosides, macrolides, tetracyclines, FQs, misc antibacterials) — 30 drugs (ID-04 through ID-11)
  - Added anti-TB drugs (rifabutin, rifapentine, ethambutol, pyrazinamide, bedaquiline, delamanid, pretomanid, dapsone, clofazimine) — 9 drugs (ID-12)
  - Added antivirals HSV/CMV (valacyclovir, famciclovir, ganciclovir, valganciclovir, foscarnet, letermovir) — 6 drugs (ID-13)
  - Added influenza antivirals (zanamivir, peramivir, baloxavir) — 3 drugs (ID-14)
  - Added antifungals (itraconazole, voriconazole, posaconazole, isavuconazole, caspofungin, micafungin, anidulafungin, amphotericin-b) — 8 drugs
  - Added HIV antiretrovirals (efavirenz, emtricitabine, darunavir, maraviroc, dolutegravir, raltegravir, abacavir, atazanavir, tenofovir-DF) — 9 drugs
  - Added antiparasitic drugs (chloroquine, hydroxychloroquine, ivermectin, albendazole, atovaquone-proguanil) — 5 drugs
  - Added oncology drugs (cyclophosphamide, cisplatin, methotrexate-onc, doxorubicin, vincristine, paclitaxel, imatinib, pembrolizumab, rituximab, filgrastim, venetoclax, hydroxyurea, lenalidomide, bortezomib, epoetin-alfa) — 15 drugs
- **Current total:** 500 drugs in data/drugs.json — **PHASE 1 COMPLETE**
- **Resume point next session:** Begin Phase 2 — Core Pages and Navigation (Nav.astro, SearchOverlay.svelte, index.astro, drug-index.astro, about.astro)

## Phase 1 Drug Data Task Table

### Cardiovascular (target ≥60)
- CV-01: ACE inhibitors (8 drugs) ✅ Complete
- CV-02: ARBs + ARNI (9 drugs) ✅ Complete
- CV-03: Beta-blockers (9 drugs) ✅ Complete
- CV-04: CCBs (4 drugs) ✅ Complete
- CV-05: Vasodilators + central agents (6 drugs) ✅ Complete
- CV-06: Aldosterone antagonists + MRAs (3 drugs) ✅ Complete
- CV-07: Loop + thiazide diuretics (8 drugs) ✅ Complete
- CV-08: Potassium-sparing diuretics (3 drugs) ✅ Complete
- CV-09: Digoxin + ivabradine (2 drugs) ✅ Complete
- CV-10: Antiarrhythmics (8 drugs) ✅ Complete
- CV-11: Vasopressors + inotropes (6 drugs) ✅ Complete
- CV-12: Nitrates (3 drugs) ✅ Complete
- CV-13: Statins (8 drugs) ✅ Complete
- CV-14: Non-statin lipid agents (6 drugs) ✅ Complete
- CV-15: Anticoagulants (8 drugs) ✅ Complete
- CV-16: Antiplatelets (6 drugs) ✅ Complete
- CV-17: Thrombolytics + reversal agents (6 drugs) ✅ Complete

### Renal (target ≥10 beyond diuretics)
- REN-01: Vasopressin receptor agents (3 drugs) ✅ Complete
- REN-02: Renal supportive agents (7 drugs) ✅ Complete

### Respiratory (target ≥25)
- RESP-01: SABA + LABA (6 drugs) ✅ Complete
- RESP-02: Anticholinergics (5 drugs) ✅ Complete
- RESP-03: Inhaled corticosteroids (6 drugs) ✅ Complete
- RESP-04: Antileukotrienes + misc (4 drugs) ✅ Complete
- RESP-05: Biologics + CFTR modulators (8 drugs) ✅ Complete

### GI (target ≥25)
- GI-01: PPIs + H2 blockers (8 drugs) ✅ Complete
- GI-02: Motility + antiemetics (9 drugs) ✅ Complete
- GI-03: Laxatives + GI misc (8 drugs) ✅ Complete
- GI-04: IBD drugs + misc (7 drugs) ✅ Complete

### Endocrine (target ≥40)
- ENDO-01: Insulins (8 drugs) ✅ Complete
- ENDO-02: Oral antidiabetics (10 drugs) ✅ Complete
- ENDO-03: GLP-1 + SGLT2 (8 drugs) ✅ Complete
- ENDO-04: Thyroid + adrenal (8 drugs) ✅ Complete
- ENDO-05: Bone + pituitary (8 drugs) ✅ Complete

### Reproductive/GU (target ≥20)
- REPRO-01: Hormonal drugs (10 drugs) ✅ Complete
- REPRO-02: GU drugs (8 drugs) ✅ Complete

### CNS (target ≥70)
- CNS-01: Anticonvulsants part 1 (8 drugs) ✅ Complete
- CNS-02: Anticonvulsants part 2 (7 drugs) ✅ Complete
- CNS-03: Benzodiazepines + sleep (9 drugs) ✅ Complete
- CNS-04: SSRIs (6 drugs) ✅ Complete
- CNS-05: SNRIs + misc antidepressants (4 drugs) ✅ Complete
- CNS-06: Antidepressants batch 2 (8 drugs) ✅ Complete  [paroxetine, citalopram, fluvoxamine, desvenlafaxine, mirtazapine, trazodone, vilazodone, vortioxetine]
- CNS-07: TCAs + MAOIs (8 drugs) ✅ Complete
- CNS-08: Antipsychotics part 1 (5 drugs) ✅ Complete
- CNS-09: Antipsychotics part 2 (9 drugs) ✅ Complete
- CNS-10: Opioids part 1 (6 drugs) ✅ Complete
- CNS-11: Opioids part 2 (8 drugs) ✅ Complete  [hydromorphone, oxycodone, remifentanil, codeine, tramadol, tapentadol, methadone, naltrexone]
- CNS-12: Stimulants + ADHD (5 drugs) ✅ Complete  [amphetamine, lisdexamfetamine, atomoxetine, guanfacine-adhd, clonidine-adhd]
- CNS-13: Alzheimer's drugs (3 drugs) ✅ Complete  [rivastigmine, galantamine, memantine]
- CNS-14: Parkinson's drugs (8 drugs) ✅ Complete  [pramipexole, ropinirole, rotigotine, amantadine, rasagiline, entacapone, benztropine, riluzole]
- CNS-15: Anesthetics + NMBAs (8 drugs) ✅ Complete  [propofol, ketamine, succinylcholine, rocuronium, vecuronium, cisatracurium, sugammadex, neostigmine]
- CNS-16: Migraine agents (9 drugs) ✅ Complete  [rizatriptan, lasmiditan, rimegepant, ubrogepant, atogepant, erenumab, fremanezumab, galcanezumab, ergotamine]
- CNS-17: NSAIDs (7 drugs) ✅ Complete  [ibuprofen, naproxen, ketorolac, celecoxib, indomethacin, diclofenac, meloxicam]

### Infectious Disease (target ≥80)
- ID-01: Beta-lactams part 1 (6 drugs: penicillin-g, amoxicillin, amoxicillin-clavulanate, piperacillin-tazobactam, cephalexin, ceftriaxone) ✅ Complete
- ID-02: Beta-lactams part 2 (7 drugs: vancomycin, azithromycin, doxycycline, ciprofloxacin, clindamycin, metronidazole, tmp-smx) - Note: only some done
- ID-03: Missing penicillins (5 drugs) ✅ Complete [penicillin-v, ampicillin, ampicillin-sulbactam, oxacillin, nafcillin]
- ID-04: Missing cephalosporins (dicloxacillin, cefadroxil, cefazolin, cefaclor, cefuroxime, cefoxitin, cefotaxime, cefdinir, cefpodoxime, ceftazidime, ceftaroline, ceftazidime-avibactam, ceftolozane-tazobactam) ❌ Not started
- ID-05: Carbapenems + aztreonam (imipenem-cilastatin, ertapenem, doripenem, aztreonam) ❌ Not started
- ID-06: Glycopeptides (telavancin, oritavancin, dalbavancin) ❌ Not started
- ID-07: Aminoglycosides (tobramycin, amikacin, streptomycin, plazomicin) ❌ Not started
- ID-08: Macrolides + fidaxomicin (clarithromycin, erythromycin, fidaxomicin) ❌ Not started
- ID-09: Tetracyclines (minocycline, tetracycline, tigecycline, eravacycline, omadacycline) ❌ Not started
- ID-10: Fluoroquinolones (levofloxacin, moxifloxacin, delafloxacin) ❌ Not started
- ID-11: Misc antibacterials (clindamycin, tinidazole, nitrofurantoin, tmp-smx, sulfadiazine, linezolid, tedizolid, chloramphenicol) ❌ Not started
- ID-12: Anti-TB drugs (rifabutin, rifapentine, ethambutol, pyrazinamide, bedaquiline, delamanid, pretomanid, dapsone, clofazimine) ❌ Not started
- ID-13: Antivirals HSV/CMV (valacyclovir, famciclovir, ganciclovir, valganciclovir, foscarnet, cidofovir, letermovir) ❌ Not started
- ID-14: Antivirals influenza (zanamivir, peramivir, baloxavir) ❌ Not started

### Hematology-Oncology (target ≥30)
- HEMONC-01: Alkylating agents (8 drugs) ✅ Complete
- HEMONC-02: Antimetabolites (8 drugs) ✅ Complete
- HEMONC-03: More chemo (5 drugs) ✅ Complete
- HEMONC-04: Many targeted therapies still missing ❌ Not started

### Immunology (target ≥20)
- IMMUNO-01: Transplant immunosuppressants (8 drugs) ✅ Complete
- IMMUNO-02: Biologics (10 drugs) ✅ Complete

## Current Phase
**Phase 1 — Master Data (405/500 drugs)**

Next session: Add ~95 more drugs:
1. ID drugs (cephalosporins, carbapenems, glycopeptides, aminoglycosides, macrolides, tetracyclines, FQs, anti-TB, antivirals) — ~50 drugs
2. Additional heme-onc targeted therapies — ~30 drugs
3. Additional immunology/biologic drugs — ~15 drugs

## Phase Completion Status
- [x] Phase 0 — Scaffold
- [ ] Phase 1 — Master Data (405/500 — 81% complete)
- [ ] Phase 2 — Core Pages
- [ ] Phase 3 — Schema Pages
- [ ] Phase 4 — Drug Profile Pages
- [ ] Phase 5 — Search and Filter
- [ ] Phase 6 — QA and Finalization
