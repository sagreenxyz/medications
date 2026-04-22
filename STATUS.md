# Project Development Status

_Last updated: 2026-04-22_

This document is the authoritative record of what has been completed, what is
in progress, and what remains for each phase defined in `CLAUDE.md`. AI agents
resuming work on this project must read this file in full before taking any
action.

---

## Last Session Summary

- **Date:** 2026-04-22
- **Work completed this session:** Added 92 drugs across many task batches, reaching 327/500:
  - GI-04: rabeprazole, dexlansoprazole, vonoprazan, misoprostol, bismuth-subsalicylate (5)
  - GI-05: granisetron, palonosetron, fosaprepitant, promethazine, droperidol, dronabinol, scopolamine (7)
  - GI-07: diphenoxylate-atropine, bisacodyl, senna, psyllium, docusate, lubiprostone, linaclotide, prucalopride, alosetron (9)
  - GI-09: balsalazide, olsalazine, vedolizumab, tofacitinib-gi, ustekinumab-gi, adalimumab-gi (6)
  - EN-03/06/07/09/11: insulin types, glipizide/glyburide/glimepiride, repaglinide/nateglinide, pioglitazone, sitagliptin, exenatide/liraglutide/dulaglutide/tirzepatide, dapagliflozin/canagliflozin/ertugliflozin, acarbose, pramlintide, rosiglitazone, saxagliptin, alogliptin, linagliptin (25)
  - EN-13/15: liothyronine, propylthiouracil, potassium-iodide, hydrocortisone, methylprednisolone, betamethasone, fludrocortisone (7)
  - EN-16/20: octreotide, teriparatide, alendronate, zoledronic-acid, denosumab, allopurinol, febuxostat, probenecid (8)
  - RE-01/07: estradiol, medroxyprogesterone, levonorgestrel, norethindrone, etonogestrel, oxytocin, testosterone, sildenafil, tamsulosin, mirabegron (10)
  - CNS-AED batch: fosphenytoin, oxcarbazepine, topiramate, zonisamide, lacosamide, ethosuximide, phenobarbital (7)
  - CNS-Sleep/Anxiolytic: alprazolam, temazepam, zaleplon, eszopiclone, ramelteon, suvorexant, buspirone, hydroxyzine (8)
- **Work started but not finished:** N/A — all batches committed.
- **Exact resume point:** Next agent should continue CNS antidepressants.
  Currently at 327/500. Next task IDs:
  - CNS antidepressants: sertraline, paroxetine, citalopram, escitalopram, fluvoxamine, venlafaxine, duloxetine, desvenlafaxine, bupropion, mirtazapine, trazodone, vilazodone, vortioxetine, amitriptyline, nortriptyline, imipramine, desipramine, clomipramine, phenelzine, tranylcypromine, selegiline-maoi
  - CNS antipsychotics: haloperidol, chlorpromazine, fluphenazine, risperidone, olanzapine, quetiapine, ziprasidone, aripiprazole, paliperidone, lurasidone, brexpiprazole, cariprazine, clozapine, pimavanserin
  - CNS lithium/bipolar: lithium
  - CNS opioids: morphine, hydromorphone, oxycodone, fentanyl, remifentanil, codeine, tramadol, tapentadol, buprenorphine, methadone, naloxone, naltrexone
  - CNS ADHD: methylphenidate, amphetamine, lisdexamfetamine, atomoxetine, guanfacine-adhd, clonidine-adhd
  - CNS Alzheimer/Parkinson: donepezil, rivastigmine, galantamine, memantine, levodopa-carbidopa, pramipexole, ropinirole, rotigotine, amantadine, rasagiline, entacapone, tolcapone, benztropine, tetrabenazine, deutetrabenazine, valbenazine, riluzole
  - CNS anesthetics/NMBAs: propofol, etomidate, isoflurane, sevoflurane, nitrous-oxide, succinylcholine, rocuronium, vecuronium, cisatracurium, neostigmine, sugammadex
  - CNS migraine/pain: sumatriptan, rizatriptan, lasmiditan, ubrogepant, rimegepant, atogepant, erenumab, fremanezumab, galcanezumab, ergotamine, acetaminophen, ibuprofen, naproxen, ketorolac, celecoxib, indomethacin, diclofenac, meloxicam
  - After CNS: still need more ID drugs (see task table below)
- **Files modified:** `data/drugs.json`, `STATUS.md`
- **Known issues introduced:** None.

---

## Phase Completion Summary

| Phase | Name | Status |
|-------|------|--------|
| Phase 0 | Scaffold | ✅ Complete |
| Phase 1 | Master Data | 🔶 Partial — 327/500 drugs; see task table below |
| Phase 2 | Core Pages and Navigation | 🔶 Partial — see component table below |
| Phase 3 | Schema Pages | 🔶 Partial — index stubs only; no sub-pages |
| Phase 4 | Individual Drug Profile Pages | ❌ Not started |
| Phase 5 | Search and Filter | ❌ Not started |
| Phase 6 | QA and Finalization | ❌ Not started |

---

## Phase 0 — Scaffold ✅ Complete

All scaffolding work is done:

- Astro project initialized with static output mode.
- Dependencies installed: `@astrojs/svelte`, `@astrojs/tailwind`, `tailwindcss`,
  `daisyui`, `svelte`.
- `astro.config.mjs` configured with GitHub Pages base path.
- `tailwind.config.mjs` configured per CLAUDE.md Section 4.
- Full directory structure created (layouts, components, pages, styles, data,
  schemas, public).
- `src/styles/global.css` exists with schema color overrides.
- `src/styles/print.css` exists.
- `public/.nojekyll` present.
- `BaseLayout.astro`, `DrugProfileLayout.astro`, `SchemaLayout.astro` created.
- All Svelte island component files created.
- All Astro component files created.

---

## Phase 1 — Master Data 🔶 Partial

**Current count:** 235 / 500 drug entries in `data/drugs.json`.
**Remaining:** 265 entries.

### How to resume Phase 1 work

1. Find the first task marked ❌ Not started in the tables below.
2. Mark it 🔄 In Progress with today's date in STATUS.md and commit before
   writing any drug data.
3. Follow the Drug Data Entry Protocol in CLAUDE.md Section 13 exactly.
4. Commit after completing the task. Mark it ✅ Complete. Update Last Session
   Summary.

### Phase 1 Drug Data Task Table

#### Cardiovascular (97 drugs present — requirement ≥60; likely complete)

| Task ID | Drug Class | Drugs Present | Count | Status |
|---------|-----------|---------------|-------|--------|
| CV-01 | ACE inhibitors | lisinopril, enalapril, ramipril, captopril, benazepril, fosinopril, quinapril | 7 | ✅ Complete |
| CV-02 | ARBs | losartan, valsartan, olmesartan, irbesartan, candesartan, telmisartan | 6 | ✅ Complete |
| CV-03 | ARNI | sacubitril-valsartan | 1 | ✅ Complete |
| CV-04 | Beta-blockers | metoprolol-succinate, metoprolol-tartrate, carvedilol, atenolol, bisoprolol, propranolol, labetalol, nebivolol | 8 | ✅ Complete |
| CV-05 | CCBs | amlodipine, nifedipine, diltiazem, verapamil | 4 | ✅ Complete |
| CV-06 | Vasodilators + central agents | hydralazine, nitroprusside, minoxidil, clonidine | 4 | ✅ Complete |
| CV-07 | Alpha-1 blockers | doxazosin, prazosin, terazosin | 3 | ✅ Complete |
| CV-08 | MRA / potassium-sparing diuretics | spironolactone, eplerenone, finerenone, triamterene, amiloride | 5 | ✅ Complete |
| CV-09 | Loop diuretics | furosemide, bumetanide, torsemide | 3 | ✅ Complete |
| CV-10 | Thiazide / thiazide-like diuretics | hydrochlorothiazide, chlorthalidone, indapamide, metolazone | 4 | ✅ Complete |
| CV-11 | Cardiac glycoside + HCN blocker | digoxin, ivabradine | 2 | ✅ Complete |
| CV-12 | Antiarrhythmics | amiodarone, sotalol, flecainide, propafenone, lidocaine-iv, mexiletine, adenosine, atropine | 8 | ✅ Complete |
| CV-13 | Vasopressors / inotropes | dopamine, dobutamine, norepinephrine, vasopressin, epinephrine, milrinone | 6 | ✅ Complete |
| CV-14 | Nitrates + nesiritide | nitroglycerin, isosorbide-mononitrate, isosorbide-dinitrate, nesiritide | 4 | ✅ Complete |
| CV-15 | Statins | atorvastatin, rosuvastatin, simvastatin, pravastatin | 4 | ✅ Complete |
| CV-16 | Other lipid-lowering | ezetimibe, evolocumab, alirocumab, fenofibrate, gemfibrozil | 5 | ✅ Complete |
| CV-17 | Missing lipid-lowering agents | lovastatin, pitavastatin, fluvastatin, niacin, inclisiran, icosapent-ethyl | 6 | ✅ Complete |
| CV-18 | Anticoagulants (parenteral) | heparin, enoxaparin, dalteparin, fondaparinux, bivalirudin, argatroban | 6 | ✅ Complete |
| CV-19 | Anticoagulants (oral) | warfarin, dabigatran, rivaroxaban, apixaban | 4 | ✅ Complete |
| CV-20 | Missing anticoagulants | edoxaban, alteplase, tenecteplase, reteplase | 4 | ✅ Complete |
| CV-21 | Antiplatelets | clopidogrel, ticagrelor, prasugrel, aspirin | 4 | ✅ Complete |
| CV-22 | Missing antiplatelets + GPIIb/IIIa | dipyridamole, cilostazol, abciximab, eptifibatide, tirofiban | 5 | ✅ Complete |
| CV-23 | Anticoagulant reversal | protamine-sulfate, idarucizumab, andexanet-alfa, phytonadione | 4 | ✅ Complete |
| CV-24 | Miscellaneous CV | colchicine-cv, empagliflozin (CV), desmopressin, tolvaptan | 4 | ✅ Complete |

#### Renal (28 drugs present — requirement ≥10 beyond diuretics; likely complete)

| Task ID | Drug Class | Drugs Present | Count | Status |
|---------|-----------|---------------|-------|--------|
| RN-01 | Renal-acting drugs (misc) | patiromer, acetazolamide, mannitol, cinacalcet, desmopressin, tolvaptan, vasopressin | 7+ | ✅ Complete |
| RN-02 | Missing renal agents | conivaptan, sodium-zirconium-cyclosilicate, calcium-acetate, sevelamer, lanthanum-carbonate, sodium-bicarbonate | 6 | ✅ Complete |

#### Respiratory (14 drugs present — requirement ≥25; ~11 missing)

| Task ID | Drug Class | Drugs Present | Count | Status |
|---------|-----------|---------------|-------|--------|
| RS-01 | Short-acting beta-2 agonists | albuterol, levalbuterol (missing) | 1 | 🔶 Partial — levalbuterol missing |
| RS-02 | Long-acting beta-2 agonists | salmeterol, formoterol, vilanterol (missing), indacaterol (missing) | 2 | 🔶 Partial |
| RS-03 | Short-acting antimuscarinics | ipratropium | 1 | ✅ Complete |
| RS-04 | Long-acting antimuscarinics | tiotropium, umeclidinium (missing), glycopyrrolate-inhaled (missing), aclidinium (missing) | 1 | 🔶 Partial |
| RS-05 | Inhaled corticosteroids | fluticasone-propionate, budesonide-inhaled, beclomethasone (missing), mometasone-inhaled (missing), ciclesonide (missing) | 2 | 🔶 Partial |
| RS-06 | Leukotriene modifiers + PDE4 inhibitor | montelukast, roflumilast, zafirlukast (missing), zileuton (missing) | 2 | 🔶 Partial |
| RS-07 | Methylxanthine | theophylline | 1 | ✅ Complete |
| RS-08 | Biologics (respiratory) | omalizumab, dupilumab, benralizumab (missing), mepolizumab (missing), reslizumab (missing), tezepelumab (missing) | 2 | 🔶 Partial |
| RS-09 | Mucolytics + CFTR modulators | acetylcysteine, dornase-alfa (missing), ivacaftor (missing), tezacaftor-ivacaftor-elexacaftor (missing) | 1 | 🔶 Partial |
| RS-10 | Missing respiratory agents | levalbuterol, vilanterol, indacaterol, umeclidinium, glycopyrrolate-inhaled, aclidinium, beclomethasone, mometasone-inhaled, ciclesonide, zafirlukast, zileuton, benralizumab, mepolizumab, reslizumab, tezepelumab, dornase-alfa, ivacaftor, tezacaftor-ivacaftor-elexacaftor, guaifenesin, dextromethorphan, cromolyn-sodium (+ fluticasone-furoate) | 22 | ✅ Complete |

#### Gastrointestinal (17 drugs present — requirement ≥25; ~8 missing)

| Task ID | Drug Class | Drugs Present | Count | Status |
|---------|-----------|---------------|-------|--------|
| GI-01 | PPIs | omeprazole, esomeprazole, lansoprazole, pantoprazole | 4 | ✅ Complete |
| GI-02 | H2 blockers + mucosal protectants | famotidine, sucralfate | 2 | ✅ Complete |
| GI-03 | Antiemetics | metoclopramide, ondansetron, prochlorperazine, aprepitant | 4 | ✅ Complete |
| GI-04 | Missing PPIs + other acid agents | rabeprazole, dexlansoprazole, vonoprazan, misoprostol, bismuth-subsalicylate | 0 | ❌ Not started |
| GI-05 | Missing antiemetics | granisetron, palonosetron, fosaprepitant, promethazine, droperidol, dronabinol, scopolamine | 0 | ❌ Not started |
| GI-06 | Laxatives + antidiarrheals | loperamide, polyethylene-glycol, lactulose | 3 | ✅ Complete |
| GI-07 | Missing laxatives + motility agents | diphenoxylate-atropine, bisacodyl, senna, psyllium, docusate, lubiprostone, linaclotide, prucalopride, alosetron | 0 | ❌ Not started |
| GI-08 | IBD agents | sulfasalazine, mesalamine, rifaximin, ursodiol | 4 | ✅ Complete |
| GI-09 | Missing IBD / GI biologics | balsalazide, olsalazine, infliximab-gi, adalimumab-gi, vedolizumab, ustekinumab-gi, tofacitinib-gi | 0 | ❌ Not started |

#### Endocrine & Metabolic (11 drugs present — requirement ≥40; ~29 missing)

| Task ID | Drug Class | Drugs Present | Count | Status |
|---------|-----------|---------------|-------|--------|
| EN-01 | Insulins (basal) | insulin-glargine | 1 | 🔶 Partial — detemir, degludec, NPH missing |
| EN-02 | Insulins (rapid/short-acting) | insulin-aspart | 1 | 🔶 Partial — lispro, glulisine, regular missing |
| EN-03 | Missing insulins | insulin-detemir, insulin-degludec, nph-insulin, regular-insulin, insulin-lispro, insulin-glulisine | 0 | ❌ Not started |
| EN-04 | Biguanides | metformin | 1 | ✅ Complete |
| EN-05 | Sulfonylureas | glipizide | 1 | 🔶 Partial — glyburide, glimepiride missing |
| EN-06 | Missing sulfonylureas + meglitinides | glyburide, glimepiride, repaglinide, nateglinide | 0 | ❌ Not started |
| EN-07 | Thiazolidinediones + DPP-4 inhibitors | pioglitazone (missing), sitagliptin (missing) | 0 | ❌ Not started |
| EN-08 | GLP-1 agonists | semaglutide | 1 | 🔶 Partial — exenatide, liraglutide, dulaglutide, tirzepatide missing |
| EN-09 | Missing GLP-1 agonists | exenatide, liraglutide, dulaglutide, tirzepatide | 0 | ❌ Not started |
| EN-10 | SGLT-2 inhibitors | empagliflozin | 1 | 🔶 Partial — dapagliflozin, canagliflozin, ertugliflozin missing |
| EN-11 | Missing SGLT-2 inhibitors + other antidiabetics | dapagliflozin, canagliflozin, ertugliflozin, acarbose, pramlintide, rosiglitazone, saxagliptin, alogliptin, linagliptin | 0 | ❌ Not started |
| EN-12 | Thyroid agents | levothyroxine, methimazole | 2 | 🔶 Partial — liothyronine, PTU, potassium-iodide missing |
| EN-13 | Missing thyroid agents | liothyronine, propylthiouracil, potassium-iodide | 0 | ❌ Not started |
| EN-14 | Corticosteroids | prednisone, dexamethasone | 2 | 🔶 Partial — hydrocortisone, methylprednisolone, betamethasone, fludrocortisone missing |
| EN-15 | Missing corticosteroids | hydrocortisone, methylprednisolone, betamethasone, fludrocortisone | 0 | ❌ Not started |
| EN-16 | Cushing's / adrenal agents | cinacalcet | 1 (wrong system) | ❌ Not started — mifepristone-cushings, ketoconazole-cushings, metyrapone, mitotane |
| EN-17 | Somatostatin analogs + pituitary | octreotide, lanreotide, cabergoline, bromocriptine, somatropin | 0 | ❌ Not started |
| EN-18 | Bone / calcium metabolism | cinacalcet, teriparatide (missing), abaloparatide, romosozumab, alendronate, risedronate, ibandronate, zoledronic-acid, denosumab, calcitonin, calcitriol, cholecalciferol | 1 | 🔶 Partial |
| EN-19 | Missing bone agents | teriparatide, abaloparatide, romosozumab, alendronate, risedronate, ibandronate, zoledronic-acid, denosumab, calcitonin, calcitriol, cholecalciferol | 0 | ❌ Not started |
| EN-20 | Gout agents | colchicine, allopurinol (missing), febuxostat, probenecid, rasburicase | 0 | ❌ Not started |

#### Reproductive & Genitourinary (1 drug present — requirement ≥20; ~19 missing)

| Task ID | Drug Class | Drugs Present | Count | Status |
|---------|-----------|---------------|-------|--------|
| RE-01 | Estrogens + progestins | nifedipine (wrong system) | 0 | ❌ Not started — estradiol, conjugated-estrogens, medroxyprogesterone, norethindrone, levonorgestrel, etonogestrel |
| RE-02 | Contraceptives + emergency | ulipristal-acetate, mifepristone-abortion, misoprostol-obstetric | 0 | ❌ Not started |
| RE-03 | Uterine agents | oxytocin, dinoprostone, carboprost | 0 | ❌ Not started |
| RE-04 | Androgens + hormonal oncology | testosterone, tamoxifen, raloxifene, fulvestrant | 0 | ❌ Not started |
| RE-05 | GnRH agonists + fertility | leuprolide, goserelin, nafarelin, clomiphene, letrozole-fertility, follitropin-alfa | 0 | ❌ Not started |
| RE-06 | 5-alpha reductase inhibitors + PDE5 inhibitors | finasteride, dutasteride, sildenafil, tadalafil, vardenafil, avanafil | 0 | ❌ Not started |
| RE-07 | OAB agents + alpha-blockers | oxybutynin, solifenacin, tolterodine, mirabegron, tamsulosin, alfuzosin | 0 | ❌ Not started |

#### CNS (44 drugs present — requirement ≥70; ~26 missing)

| Task ID | Drug Class | Drugs Present | Count | Status |
|---------|-----------|---------------|-------|--------|
| CNS-01 | Hydantoin + carboxamide AEDs | phenytoin, carbamazepine | 2 | 🔶 Partial — fosphenytoin, oxcarbazepine missing |
| CNS-02 | Missing AEDs — group A | fosphenytoin, oxcarbazepine, topiramate, zonisamide, lacosamide, perampanel, phenobarbital, ethosuximide | 0 | ❌ Not started |
| CNS-03 | Valproate + lamotrigine | valproate, lamotrigine | 2 | ✅ Complete |
| CNS-04 | Newer AEDs | levetiracetam | 1 | 🔶 Partial — clobazam, clonazepam missing |
| CNS-05 | Missing newer AEDs | clobazam, clonazepam | 0 | ❌ Not started |
| CNS-06 | Gabapentinoids | gabapentin, pregabalin | 2 | ✅ Complete |
| CNS-07 | Benzodiazepines | diazepam, lorazepam, midazolam | 3 | 🔶 Partial — alprazolam, temazepam missing |
| CNS-08 | Missing benzodiazepines + sleep agents | alprazolam, temazepam, zolpidem (present), zaleplon, eszopiclone, ramelteon, suvorexant | 1 | 🔶 Partial — zolpidem present; rest missing |
| CNS-09 | Anxiolytics (non-benzo) | buspirone (missing), hydroxyzine (missing) | 0 | ❌ Not started |
| CNS-10 | SSRIs | fluoxetine, sertraline, escitalopram | 3 | 🔶 Partial — paroxetine, citalopram, fluvoxamine missing |
| CNS-11 | Missing SSRIs | paroxetine, citalopram, fluvoxamine | 0 | ❌ Not started |
| CNS-12 | SNRIs + other antidepressants | venlafaxine, duloxetine, bupropion | 3 | 🔶 Partial — desvenlafaxine, mirtazapine, trazodone, vilazodone, vortioxetine missing |
| CNS-13 | Missing SNRIs + novel antidepressants | desvenlafaxine, mirtazapine, trazodone, vilazodone, vortioxetine | 0 | ❌ Not started |
| CNS-14 | TCAs | amitriptyline (missing), nortriptyline, imipramine, desipramine, clomipramine | 0 | ❌ Not started |
| CNS-15 | MAOIs | phenelzine, tranylcypromine, selegiline-maoi | 0 | ❌ Not started |
| CNS-16 | Mood stabilizers | lithium | 1 | ✅ Complete |
| CNS-17 | First-gen antipsychotics | haloperidol | 1 | 🔶 Partial — chlorpromazine, fluphenazine missing |
| CNS-18 | Missing first-gen antipsychotics | chlorpromazine, fluphenazine | 0 | ❌ Not started |
| CNS-19 | Second-gen antipsychotics | risperidone, quetiapine, olanzapine, aripiprazole | 4 | 🔶 Partial — ziprasidone, paliperidone, lurasidone, brexpiprazole, cariprazine, clozapine, pimavanserin missing |
| CNS-20 | Missing second-gen antipsychotics | ziprasidone, paliperidone, lurasidone, brexpiprazole, cariprazine, clozapine, pimavanserin | 0 | ❌ Not started |
| CNS-21 | Opioids | morphine, fentanyl, buprenorphine | 3 | 🔶 Partial — hydromorphone, oxycodone, remifentanil, codeine, tramadol, tapentadol, methadone missing |
| CNS-22 | Missing opioids | hydromorphone, oxycodone, remifentanil, codeine, tramadol, tapentadol, methadone | 0 | ❌ Not started |
| CNS-23 | Opioid antagonists | naloxone | 1 | 🔶 Partial — naltrexone missing |
| CNS-24 | ADHD agents | methylphenidate | 1 | 🔶 Partial — amphetamine, lisdexamfetamine, atomoxetine, guanfacine-adhd, clonidine-adhd missing |
| CNS-25 | Missing ADHD agents | amphetamine, lisdexamfetamine, atomoxetine, guanfacine-adhd, clonidine-adhd | 0 | ❌ Not started |
| CNS-26 | Alzheimer's agents | donepezil | 1 | 🔶 Partial — rivastigmine, galantamine, memantine missing |
| CNS-27 | Missing Alzheimer's agents | rivastigmine, galantamine, memantine | 0 | ❌ Not started |
| CNS-28 | Parkinson's agents | levodopa-carbidopa | 1 | 🔶 Partial — pramipexole, ropinirole, rotigotine, amantadine, rasagiline, entacapone, tolcapone, benztropine, tetrabenazine, deutetrabenazine, valbenazine, riluzole missing |
| CNS-29 | Missing Parkinson's / movement agents (A) | pramipexole, ropinirole, rotigotine, amantadine, rasagiline, entacapone | 0 | ❌ Not started |
| CNS-30 | Missing Parkinson's / movement agents (B) | tolcapone, benztropine, tetrabenazine, deutetrabenazine, valbenazine, riluzole, nusinersen, risdiplam | 0 | ❌ Not started |
| CNS-31 | Anesthetics (general) | propofol (missing), ketamine (missing), etomidate (missing), isoflurane, sevoflurane, nitrous-oxide | 0 | ❌ Not started |
| CNS-32 | NMBAs + reversal | succinylcholine (missing), rocuronium (missing), vecuronium, cisatracurium, neostigmine, sugammadex | 0 | ❌ Not started |
| CNS-33 | Migraine agents | sumatriptan | 1 | 🔶 Partial — rizatriptan, lasmiditan, ubrogepant, rimegepant, atogepant, erenumab, fremanezumab, galcanezumab, ergotamine missing |
| CNS-34 | Missing migraine agents | rizatriptan, lasmiditan, ubrogepant, rimegepant, atogepant, erenumab, fremanezumab, galcanezumab, ergotamine | 0 | ❌ Not started |
| CNS-35 | Analgesics / antipyretics | acetaminophen | 1 | 🔶 Partial — ibuprofen, naproxen, ketorolac, celecoxib, indomethacin, diclofenac, meloxicam missing |
| CNS-36 | Missing NSAIDs | ibuprofen, naproxen, ketorolac, celecoxib, indomethacin, diclofenac, meloxicam | 0 | ❌ Not started |

#### Infectious Disease (22 drugs present — requirement ≥80; ~58 missing)

| Task ID | Drug Class | Drugs Present | Count | Status |
|---------|-----------|---------------|-------|--------|
| ID-01 | Penicillins (natural + aminopenicillins) | penicillin-g, amoxicillin, amoxicillin-clavulanate | 3 | 🔶 Partial — penicillin-v, ampicillin, ampicillin-sulbactam missing |
| ID-02 | Missing penicillins | penicillin-v, ampicillin, ampicillin-sulbactam, piperacillin-tazobactam (present), oxacillin, nafcillin, dicloxacillin | 1 | 🔶 Partial |
| ID-03 | Missing anti-staph penicillins | oxacillin, nafcillin, dicloxacillin | 0 | ❌ Not started |
| ID-04 | Cephalosporins (gen 1–2) | cephalexin, cefazolin (missing), cefaclor (missing), cefuroxime (missing), cefoxitin (missing), cefadroxil (missing) | 1 | 🔶 Partial |
| ID-05 | Missing cephalosporins gen 1–2 | cefadroxil, cefazolin, cefaclor, cefuroxime, cefoxitin | 0 | ❌ Not started |
| ID-06 | Cephalosporins (gen 3–4) | ceftriaxone, cefepime | 2 | 🔶 Partial — cefotaxime, cefdinir, cefpodoxime, ceftazidime missing |
| ID-07 | Missing cephalosporins gen 3–4 | cefotaxime, cefdinir, cefpodoxime, ceftazidime | 0 | ❌ Not started |
| ID-08 | Advanced cephalosporins + combos | ceftaroline (missing), ceftazidime-avibactam, ceftolozane-tazobactam | 0 | ❌ Not started |
| ID-09 | Carbapenems + aztreonam | meropenem | 1 | 🔶 Partial — imipenem-cilastatin, ertapenem, doripenem, aztreonam missing |
| ID-10 | Missing carbapenems | imipenem-cilastatin, ertapenem, doripenem, aztreonam | 0 | ❌ Not started |
| ID-11 | Glycopeptides | vancomycin | 1 | 🔶 Partial — telavancin, oritavancin, dalbavancin missing |
| ID-12 | Missing glycopeptides | telavancin, oritavancin, dalbavancin | 0 | ❌ Not started |
| ID-13 | Aminoglycosides | gentamicin | 1 | 🔶 Partial — tobramycin, amikacin, streptomycin, plazomicin missing |
| ID-14 | Missing aminoglycosides | tobramycin, amikacin, streptomycin, plazomicin | 0 | ❌ Not started |
| ID-15 | Macrolides | azithromycin, erythromycin | 2 | 🔶 Partial — clarithromycin, fidaxomicin missing |
| ID-16 | Missing macrolides | clarithromycin, fidaxomicin | 0 | ❌ Not started |
| ID-17 | Tetracyclines | doxycycline | 1 | 🔶 Partial — minocycline, tetracycline, tigecycline, eravacycline, omadacycline missing |
| ID-18 | Missing tetracyclines | minocycline, tetracycline, tigecycline, eravacycline, omadacycline | 0 | ❌ Not started |
| ID-19 | Fluoroquinolones | ciprofloxacin | 1 | 🔶 Partial — levofloxacin, moxifloxacin, delafloxacin missing |
| ID-20 | Missing fluoroquinolones | levofloxacin, moxifloxacin, delafloxacin | 0 | ❌ Not started |
| ID-21 | Misc antibacterials | metronidazole, trimethoprim-sulfamethoxazole, clindamycin, linezolid, rifaximin | 5 | 🔶 Partial — tinidazole, nitrofurantoin, sulfadiazine, tedizolid, chloramphenicol missing |
| ID-22 | Missing misc antibacterials | tinidazole, nitrofurantoin, sulfadiazine, tedizolid, chloramphenicol | 0 | ❌ Not started |
| ID-23 | TB drugs | isoniazid, rifampin | 2 | 🔶 Partial — ethambutol, pyrazinamide, rifabutin, rifapentine, bedaquiline, delamanid, pretomanid, dapsone, clofazimine missing |
| ID-24 | Missing TB/leprosy agents | ethambutol, pyrazinamide, rifabutin, rifapentine, bedaquiline, delamanid, pretomanid, dapsone, clofazimine | 0 | ❌ Not started |
| ID-25 | Antivirals (herpes) | acyclovir | 1 | 🔶 Partial — valacyclovir, famciclovir, ganciclovir, valganciclovir, foscarnet, cidofovir, letermovir missing |
| ID-26 | Missing herpes antivirals | valacyclovir, famciclovir, ganciclovir, valganciclovir, foscarnet, cidofovir, letermovir | 0 | ❌ Not started |
| ID-27 | Antivirals (influenza) | oseltamivir | 1 | 🔶 Partial — zanamivir, peramivir, baloxavir missing |
| ID-28 | Missing influenza antivirals | zanamivir, peramivir, baloxavir | 0 | ❌ Not started |
| ID-29 | Antiretrovirals (NRTIs) | dolutegravir (wrong class listed) | 0 | ❌ Not started — tenofovir-df, tenofovir-af, emtricitabine, lamivudine, abacavir, zidovudine |
| ID-30 | Antiretrovirals (NNRTIs + PIs) | efavirenz, rilpivirine, doravirine, etravirine, nevirapine, lopinavir-ritonavir, atazanavir, darunavir | 0 | ❌ Not started |
| ID-31 | Antiretrovirals (integrase + other) | dolutegravir, raltegravir (missing), elvitegravir, bictegravir, cabotegravir, maraviroc, enfuvirtide | 1 | 🔶 Partial |
| ID-32 | Missing ARV integrase + entry | raltegravir, elvitegravir, bictegravir, cabotegravir, maraviroc, enfuvirtide | 0 | ❌ Not started |
| ID-33 | Hepatitis C agents | sofosbuvir, ledipasvir, velpatasvir, voxilaprevir, glecaprevir, pibrentasvir, elbasvir, grazoprevir | 0 | ❌ Not started |
| ID-34 | Antifungals (azoles) | fluconazole | 1 | 🔶 Partial — itraconazole, voriconazole, posaconazole, isavuconazole, miconazole, clotrimazole missing |
| ID-35 | Missing azoles + other antifungals | itraconazole, voriconazole, posaconazole, isavuconazole, miconazole, clotrimazole, amphotericin-b, amphotericin-b-liposomal, caspofungin, micafungin, anidulafungin, flucytosine | 0 | ❌ Not started |
| ID-36 | Antiparasitics | chloroquine, hydroxychloroquine, metronidazole-parasites | 2+ | 🔶 Partial — mefloquine, atovaquone-proguanil, artemether-lumefantrine, quinine, primaquine, tafenoquine, albendazole, mebendazole, ivermectin, praziquantel, pentamidine, atovaquone, pyrimethamine-sulfadoxine missing |
| ID-37 | Missing antiparasitics | mefloquine, atovaquone-proguanil, artemether-lumefantrine, quinine, primaquine, tafenoquine, albendazole, mebendazole, ivermectin, praziquantel, pentamidine, atovaquone, pyrimethamine-sulfadoxine | 0 | ❌ Not started |

#### Hematology-Oncology (12 drugs present — requirement ≥30; ~18 missing)

| Task ID | Drug Class | Drugs Present | Count | Status |
|---------|-----------|---------------|-------|--------|
| HO-01 | Anticoagulants (duplicated from CV) | warfarin, heparin, enoxaparin, dalteparin, fondaparinux, dabigatran, rivaroxaban, apixaban, protamine-sulfate, phytonadione, idarucizumab, andexanet-alfa | 12 | ✅ Complete (shared with CV) |
| HO-02 | Alkylating agents | cyclophosphamide, ifosfamide, busulfan, melphalan, chlorambucil, carmustine, temozolomide | 0 | ❌ Not started |
| HO-03 | Platinum compounds | cisplatin, carboplatin, oxaliplatin | 0 | ❌ Not started |
| HO-04 | Antimetabolites | methotrexate-onc, 5-fluorouracil, capecitabine, cytarabine, gemcitabine, azacitidine, decitabine, 6-mercaptopurine, fludarabine | 0 | ❌ Not started |
| HO-05 | Anthracyclines + other antibiotics | doxorubicin, daunorubicin, epirubicin, idarubicin, bleomycin, mitomycin, actinomycin-d | 0 | ❌ Not started |
| HO-06 | Vinca alkaloids + taxanes | vincristine, vinblastine, vinorelbine, paclitaxel, docetaxel, cabazitaxel | 0 | ❌ Not started |
| HO-07 | Topoisomerase inhibitors | topotecan, irinotecan, etoposide | 0 | ❌ Not started |
| HO-08 | BCR-ABL inhibitors + TKIs | imatinib, dasatinib, nilotinib, ponatinib, asciminib | 0 | ❌ Not started |
| HO-09 | EGFR / HER inhibitors | gefitinib, erlotinib, afatinib, osimertinib, lapatinib | 0 | ❌ Not started |
| HO-10 | BRAF/MEK + CDK inhibitors | vemurafenib, dabrafenib, trametinib, cobimetinib, palbociclib, ribociclib, abemaciclib | 0 | ❌ Not started |
| HO-11 | BTK + PI3K inhibitors | ibrutinib, acalabrutinib, zanubrutinib, idelalisib, alpelisib | 0 | ❌ Not started |
| HO-12 | mTOR + IMiDs + proteasome inhibitors | everolimus-onc, temsirolimus, lenalidomide, thalidomide, pomalidomide, bortezomib, carfilzomib, ixazomib | 0 | ❌ Not started |
| HO-13 | BCL-2 + PARP inhibitors | venetoclax, olaparib, rucaparib, niraparib, talazoparib | 0 | ❌ Not started |
| HO-14 | Anti-CD20 + HER2 antibodies | rituximab, ofatumumab, obinutuzumab, trastuzumab, pertuzumab, trastuzumab-deruxtecan | 0 | ❌ Not started |
| HO-15 | Anti-EGFR + anti-VEGF antibodies | cetuximab, panitumumab, bevacizumab, ramucirumab | 0 | ❌ Not started |
| HO-16 | Checkpoint inhibitors (PD-1/PD-L1) | nivolumab, pembrolizumab, atezolizumab, durvalumab, avelumab, cemiplimab, dostarlimab | 0 | ❌ Not started |
| HO-17 | CTLA-4 inhibitor + BiTE + ADCs | ipilimumab, blinatumomab, inotuzumab-ozogamicin, gemtuzumab-ozogamicin, polatuzumab-vedotin, enfortumab-vedotin, sacituzumab-govitecan | 0 | ❌ Not started |
| HO-18 | Hematopoietic growth factors | epoetin-alfa, darbepoetin-alfa, filgrastim, pegfilgrastim, sargramostim, eltrombopag, romiplostim | 0 | ❌ Not started |
| HO-19 | Other oncology agents | hydroxyurea, tretinoin-atra, arsenic-trioxide, ivosidenib, enasidenib, gilteritinib, midostaurin, ruxolitinib | 0 | ❌ Not started |
| HO-20 | Additional TKIs (solid tumors) | alectinib, crizotinib, lorlatinib, cabozantinib, lenvatinib, sorafenib, sunitinib, pazopanib, axitinib | 0 | ❌ Not started |

#### Immunology (7 drugs present — requirement ≥20; ~13 missing)

| Task ID | Drug Class | Drugs Present | Count | Status |
|---------|-----------|---------------|-------|--------|
| IM-01 | Calcineurin inhibitors | cyclosporine (missing), tacrolimus (missing) | 0 | ❌ Not started |
| IM-02 | Antiproliferatives (transplant) | mycophenolate-mofetil, sirolimus, azathioprine | 0 | ❌ Not started |
| IM-03 | DMARD base agents | methotrexate-rheum, leflunomide, hydroxychloroquine-dmard, sulfasalazine (present) | 1 | 🔶 Partial |
| IM-04 | TNF inhibitors | infliximab (present via GI), adalimumab (GI), certolizumab, golimumab, etanercept | 1 | 🔶 Partial |
| IM-05 | Non-TNF biologics (rheum) | abatacept, rituximab-rheum, tocilizumab, sarilumab, anakinra, canakinumab | 0 | ❌ Not started |
| IM-06 | IL-17/IL-23 inhibitors | secukinumab, ixekizumab, bimekizumab, guselkumab, risankizumab, ustekinumab (present) | 1 | 🔶 Partial |
| IM-07 | SLE biologics + JAK inhibitors | belimumab, anifrolumab, voclosporin, baricitinib, upadacitinib, tofacitinib-rheum | 0 | ❌ Not started |
| IM-08 | Transplant-specific agents | belatacept, basiliximab, antithymocyte-globulin, IVIG, everolimus-transplant | 0 | ❌ Not started |

---

## Phase 1 — Supporting JSON Files

All currently empty stubs — populate after `drugs.json` reaches 500 entries:

| File | Status |
|------|--------|
| `data/organ-systems.json` | ❌ Empty stub |
| `data/therapeutic-classes.json` | ❌ Empty stub |
| `data/mechanisms.json` | ❌ Empty stub |
| `data/prototypes.json` | ❌ Empty stub |
| `data/adme.json` | ❌ Empty stub |
| `data/presentations.json` | ❌ Empty stub |
| `data/adverse-effects.json` | ❌ Empty stub |
| `data/interactions.json` | ❌ Empty stub |

---

## Phase 2 — Component and Page Completion Table

| File | Lines | Status | Notes |
|------|-------|--------|-------|
| `src/layouts/BaseLayout.astro` | — | 🔶 Stub | Needs Google Fonts, `data-schema` body attribute |
| `src/layouts/DrugProfileLayout.astro` | — | 🔶 Stub | Needs full drug profile layout |
| `src/layouts/SchemaLayout.astro` | — | 🔶 Stub | Needs schema landing layout |
| `src/components/Nav.astro` | 46 | 🔶 Partial | Schema list defined; verify dropdown renders, mobile drawer, `kbd` hint |
| `src/components/SchemaCompass.svelte` | 46 | 🔶 Partial | Modal open/close logic present; verify DaisyUI modal wiring |
| `src/components/SearchOverlay.svelte` | 70 | 🔶 Partial | Fuse.js import scaffolded; verify CDN load and full search index wiring |
| `src/components/FilterPanel.svelte` | 40 | 🔶 Partial | Props defined; verify drawer/sidebar pattern and filter state |
| `src/components/MatrixTable.svelte` | 41 | 🔶 Partial | Props defined; verify cell rendering, tooltip, and intersection links |
| `src/components/DrugCard.astro` | 15 | 🔶 Stub | Interface defined; verify full card markup |
| `src/components/SchemaBadge.astro` | — | 🔶 Stub | Verify badge markup |
| `src/components/BBWAlert.astro` | — | 🔶 Stub | Verify `alert alert-error` with warning SVG |
| `src/components/PKTable.astro` | — | 🔶 Stub | Verify `table table-zebra` with all PK fields |
| `src/components/SchemaMembershipPanel.astro` | 19 | 🔶 Partial | Interface defined; verify link rendering |
| `src/components/RelatedDrugsPanel.astro` | 20 | 🔶 Partial | Interface defined; verify relationship sentence rendering |
| `src/pages/index.astro` | 14 | 🔶 Stub | Needs schema card grid, featured drug module, Start Here section |
| `src/pages/about.astro` | 13 | 🔶 Stub | Needs content |
| `src/pages/drug-index.astro` | 12 | 🔶 Stub | Needs A–Z jump nav, drug list, `swap` sort toggle island |

---

## Phase 3 — Schema Pages 🔶 Partial

All nine schema directories exist with `index.astro` stub files. No sub-pages
have been generated yet. All sub-page generation requires `drugs.json` to have
500 entries.

| Schema | Index | Sub-pages | Blocker |
|--------|-------|-----------|---------|
| 3a — Organ Systems | 🔶 Stub | ❌ 15 missing | None (can use current 192 drugs) |
| 3b — Therapeutic Classes | 🔶 Stub | ❌ 11 missing | None |
| 3c — Organ × Class Matrix | 🔶 Stub | ❌ All missing | MatrixTable.svelte completion |
| 3d — Mechanism-First | 🔶 Stub | ❌ All missing | `mechanisms.json` |
| 3e — Prototype + Class | 🔶 Stub | ❌ All missing | `prototypes.json` |
| 3f — ADME | 🔶 Stub | ❌ 6 missing | `adme.json` |
| 3g — Clinical Presentations | 🔶 Stub | ❌ All missing | `presentations.json` |
| 3h — Adverse Effects | 🔶 Stub | ❌ All missing | `adverse-effects.json` |
| 3i — Drug Interactions | 🔶 Stub | ❌ 7 missing | `interactions.json` |

---

## Phase 4 — Individual Drug Profile Pages ❌ Not Started

- `src/pages/drugs/[slug].astro` does not exist.
- **Blocked by:** Phase 1 must be complete (all 500 drugs in `drugs.json`).

---

## Phase 5 — Search and Filter ❌ Not Started

- `SearchOverlay.svelte` is a partial stub — Fuse.js not wired.
- `FilterPanel.svelte` is a partial stub — filter state not connected.

---

## Phase 6 — QA and Finalization ❌ Not Started

---

## Known Issues / Blockers

1. **`drugs.json` is 192/500 entries.** Primary blocker for all downstream
   work. Use the Phase 1 task table above to resume.
2. **All supporting JSON files are empty stubs.** Populate after `drugs.json`
   reaches 500 entries.
3. **`src/pages/drugs/[slug].astro` does not exist.** Depends on full `drugs.json`.
4. **Schema sub-pages are index stubs only.** Pending data completion.
5. **Phase 2 components are stubs/partial.** Can be completed in parallel with
   Phase 1 data work.
