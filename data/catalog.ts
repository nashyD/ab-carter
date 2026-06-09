import { Part } from '@/lib/types';

/**
 * A. B. Carter, Inc. (abcarter.com) — spinning travelers & rings.
 *
 * Every spec below is transcribed verbatim from AB Carter's public materials:
 *   - https://www.abcarter.com/travelers/        (steel travelers, short + long staple)
 *   - https://www.abcarter.com/nylon-travelers/   (nylon travelers)
 *   - https://www.abcarter.com/ring/              (rings)
 *   - Steel Traveler J & HZ Brochure 2019 (PDF, linked from /travelers/)
 *   - Rings & Steel Traveler Reference Guide (PDF, linked from /ring/)
 *   - Sintered Metal Rings Brochure 2019 (PDF, linked from /ring/)
 *
 * Rule: no fabricated size, finish, part code, or number. Where the public
 * catalog names a product but does not pin an exact spec, the entry is
 * category-level and carries confirmWithEngineer: true so the assistant defers
 * to an AB Carter engineer rather than inventing a value.
 *
 * Source URLs used (all fetched):
 *   https://www.abcarter.com/travelers/
 *   https://www.abcarter.com/nylon-travelers/
 *   https://www.abcarter.com/ring/
 *   https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf
 *   https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf
 *   https://www.abcarter.com/wp-content/uploads/2019/05/Sintered-Metal-Rings-Brochure-2019.pdf
 */
export const CATALOG: Part[] = [
  // ===========================================================================
  // STEEL TRAVELERS — SHORT STAPLE SPINNING
  // Wire profiles (cross-sections) with documented applications.
  // Source: Rings & Steel Traveler Reference Guide, "Traveler Wire Profile".
  // ===========================================================================
  {
    id: 'trav-steel-ss-profile-f',
    category: 'traveler',
    name: 'Steel Traveler — Flat (f) wire profile, short staple',
    attributes: {
      staple: 'short',
      profile: 'flat',
      material: 'steel',
      application: '100% cotton; special applications to reduce yarn hairiness',
    },
    selectionLogic:
      'Choose the FLAT (f) wire profile for 100% cotton where reducing yarn hairiness is the goal; availability is by traveler number and profile, so confirm the specific number.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-profile-hr',
    category: 'traveler',
    name: 'Steel Traveler — Half Round (hr) wire profile, short staple',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      material: 'steel',
      application: 'synthetics and blends; reduces nep formation on fine cotton yarns',
    },
    selectionLogic:
      'Choose the half-round (hr) profile to protect fibers from damage on synthetics and blends and to reduce nep formation on fine cotton yarns.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-profile-hrw-hrwd',
    category: 'traveler',
    name: 'Steel Traveler — Half Round Wide / Wide Modified (hrw / hrwd) wire profile, short staple',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      material: 'steel',
      application: 'cotton and blends; allows maximum production rates',
    },
    selectionLogic:
      'Choose the hrw / hrwd (half round wide / wide modified) profile for cotton and blends when maximum production rate is the priority.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-profile-rwf',
    category: 'traveler',
    name: 'Steel Traveler — Round Wire Flat (rwf) wire profile, short staple',
    attributes: {
      staple: 'short',
      profile: 'round',
      material: 'steel',
      application: 'core yarns and sensitive synthetic fibers; usually for Aramid fibers',
    },
    selectionLogic:
      'Choose the rwf (round wire flat) profile for core yarns and sensitive synthetics — the round profile plus flat foot gives smooth yarn contact and maximum yarn clearance; usually for Aramid fibers.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-profile-hrff',
    category: 'traveler',
    name: 'Steel Traveler — Half Round Flat Foot (hrff) wire profile, short staple',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      material: 'steel',
      application: 'core yarns with elastic yarn as the core; also synthetic yarns',
    },
    selectionLogic:
      'Choose the hrff (half round flat foot) profile for core yarns that use an elastic yarn as the core, and for synthetic yarns.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },

  // ---------------------------------------------------------------------------
  // STEEL TRAVELERS — SHORT STAPLE FINISHES
  // Source: https://www.abcarter.com/travelers/ (short staple finishes).
  // ---------------------------------------------------------------------------
  {
    id: 'trav-steel-ss-finish-cruz',
    category: 'traveler',
    name: 'Steel Traveler — Cruz finish, short staple',
    attributes: {
      staple: 'short',
      material: 'steel',
      finish: 'Cruz — high-tech finish, up to 50% longer life',
      application: 'cotton yarns in high-speed and compact spinning',
    },
    selectionLogic:
      'Choose the Cruz finish for cotton yarns run in high-speed and compact spinning where extended traveler life matters — AB Carter rates it for up to 50% longer life.',
    source: 'https://www.abcarter.com/travelers/',
  },
  {
    id: 'trav-steel-ss-finish-jet',
    category: 'traveler',
    name: 'Steel Traveler — Jet & Jet-GS finish, short staple',
    attributes: {
      staple: 'short',
      material: 'steel',
      finish: 'Jet & Jet-GS — premium finish for chrome rings',
      application: 'cotton and blends, on chrome rings',
    },
    selectionLogic:
      'Choose the Jet (or Jet-GS) finish as a premium option when running on chrome rings with cotton and blends.',
    source: 'https://www.abcarter.com/travelers/',
  },
  {
    id: 'trav-steel-ss-finish-supreme',
    category: 'traveler',
    name: 'Steel Traveler — Supreme & Supreme-GS finish, short staple',
    attributes: {
      staple: 'short',
      material: 'steel',
      finish: 'Supreme & Supreme-GS — universal bright nickel finish',
      application: 'all fiber types',
    },
    selectionLogic:
      'Choose the Supreme (or Supreme-GS) universal bright nickel finish as the all-fiber-type default when no fiber-specific finish is called for.',
    source: 'https://www.abcarter.com/travelers/',
  },
  {
    id: 'trav-steel-ss-finish-miracle',
    category: 'traveler',
    name: 'Steel Traveler — Miracle finish, short staple',
    attributes: {
      staple: 'short',
      material: 'steel',
      finish: 'Miracle — chemically deposited nickel',
      application: 'synthetic yarns in finer counts',
    },
    selectionLogic:
      'Choose the Miracle chemically-deposited-nickel finish for synthetic yarns in finer counts.',
    source: 'https://www.abcarter.com/travelers/',
  },

  // ---------------------------------------------------------------------------
  // STEEL TRAVELERS — SHORT STAPLE STYLES (by flange class)
  // Documented style codes with verbatim count ranges + applications.
  // Source: Rings & Steel Traveler Reference Guide,
  //   "Travelers for Flange 1 and 1/2 Rings", "Travelers for Flange 2 Rings",
  //   "Travelers for Legacy Rings".
  // Count ranges use AB Carter traveler numbers (e.g. 15/0 = very fine).
  // A representative spread across flange classes, profiles, and fiber types.
  // ---------------------------------------------------------------------------
  {
    id: 'trav-steel-ss-half-fgul-hrw',
    category: 'traveler',
    name: 'Steel Traveler — 1/2 FGUL hrw (Flange 1/2)',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      size: '1/2 FGUL hrw, range 15/0 - 28/0',
      material: 'steel',
      application: 'fine counts: compact cotton in flange 1/2 rings',
    },
    selectionLogic:
      'For fine-count compact cotton in flange 1/2 rings, the 1/2 FGUL hrw style covers the 15/0 - 28/0 range.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-half-cpc-hrw',
    category: 'traveler',
    name: 'Steel Traveler — 1/2 CPC hrw (Flange 1/2)',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      size: '1/2 CPC hrw, range 12/0 - 26/0',
      material: 'steel',
      application: 'fine counts: compact cotton in flange 1/2 rings',
    },
    selectionLogic:
      'For fine-count compact cotton in flange 1/2 rings, the 1/2 CPC hrw style covers the 12/0 - 26/0 range.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-1-fgl-hrw',
    category: 'traveler',
    name: 'Steel Traveler — 1 FGL hrw (Flange 1)',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      size: '1 FGL hrw, range 10/0 - 24/0',
      material: 'steel',
      application: 'fine counts: cotton, normal and compact',
    },
    selectionLogic:
      'For fine-count cotton (normal and compact) on flange 1 rings, the 1 FGL hrw style covers the 10/0 - 24/0 range.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-1-fgm-hrw',
    category: 'traveler',
    name: 'Steel Traveler — 1 FGM hrw (Flange 1)',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      size: '1 FGM hrw, range 3/0 - 15/0',
      material: 'steel',
      application: 'medium to fine counts: cotton, normal and compact',
    },
    selectionLogic:
      'For medium-to-fine cotton (normal and compact) on flange 1 rings, the 1 FGM hrw style covers the 3/0 - 15/0 range.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-1-fgh-hrw',
    category: 'traveler',
    name: 'Steel Traveler — 1 FGH hrw (Flange 1)',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      size: '1 FGH hrw, range 1/0 - 18/0',
      material: 'steel',
      application: 'medium counts: cotton, normal and compact',
    },
    selectionLogic:
      'For medium-count cotton (normal and compact) on flange 1 rings, the 1 FGH hrw style covers the 1/0 - 18/0 range.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-1-cfh-hrw',
    category: 'traveler',
    name: 'Steel Traveler — 1 CFH hrw (Flange 1)',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      size: '1 CFH hrw, range 8/0 - 22/0',
      material: 'steel',
      application: 'fine to super fine counts: compact cotton',
    },
    selectionLogic:
      'For fine-to-super-fine compact cotton on flange 1 rings, the 1 CFH hrw style covers the 8/0 - 22/0 range.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-1-cch-hrwd',
    category: 'traveler',
    name: 'Steel Traveler — 1 CCH hrwd (Flange 1)',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      size: '1 CCH hrwd, range 1 - 10',
      material: 'steel',
      application: 'medium to coarse counts: normal and compact',
    },
    selectionLogic:
      'For medium-to-coarse counts (normal and compact) on flange 1 rings, the 1 CCH hrwd style covers the 1 - 10 range.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-1-elb-hrw',
    category: 'traveler',
    name: 'Steel Traveler — 1 ELB hrw (Flange 1)',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      size: '1 ELB hrw, range 1/0 - 10/0',
      material: 'steel',
      application: 'medium to fine counts: normal and compact',
    },
    selectionLogic:
      'For medium-to-fine counts (normal and compact) on flange 1 rings, the 1 ELB hrw style covers the 1/0 - 10/0 range.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-1-spm-hrw',
    category: 'traveler',
    name: 'Steel Traveler — 1 SPM hrw (Flange 1)',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      size: '1 SPM hrw, range 2 - 7/0',
      material: 'steel',
      application: 'medium to fine counts: blends and synthetics',
    },
    selectionLogic:
      'For medium-to-fine blends and synthetics on flange 1 rings, the 1 SPM hrw style covers the 2 - 7/0 range.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-1-em-hrw',
    category: 'traveler',
    name: 'Steel Traveler — 1 EM hrw (Flange 1)',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      size: '1 EM hrw, range 10 - 7/0',
      material: 'steel',
      application: 'coarse to medium counts: synthetics',
    },
    selectionLogic:
      'For coarse-to-medium synthetics on flange 1 rings, the 1 EM hrw style covers the 10 - 7/0 range.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-1-ul-hr-hrw',
    category: 'traveler',
    name: 'Steel Traveler — 1 UL hr/hrw (Flange 1)',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      size: '1 UL hr/hrw, range 1/0 - 20/0',
      material: 'steel',
      application: 'medium to fine counts: cotton and blends',
    },
    selectionLogic:
      'For medium-to-fine cotton and blends on flange 1 rings, the 1 UL style (hr or hrw) covers the 1/0 - 20/0 range.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-1-bkh-rwf',
    category: 'traveler',
    name: 'Steel Traveler — 1 BKH rwf (Flange 1)',
    attributes: {
      staple: 'short',
      profile: 'round',
      size: '1 BKH rwf, range 8 - 4/0',
      material: 'steel',
      application: 'medium counts: Aramid fibers',
    },
    selectionLogic:
      'For medium-count Aramid fibers on flange 1 rings, the 1 BKH rwf style (round wire flat) covers the 8 - 4/0 range.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-2-sm2-hr',
    category: 'traveler',
    name: 'Steel Traveler — 2 SM2 hr (Flange 2)',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      size: '2 SM2 hr, range 12 - 6/0',
      material: 'steel',
      application: 'coarse to medium counts: cotton, blends, core, slub and denim',
    },
    selectionLogic:
      'For coarse-to-medium cotton/blends/core/slub/denim on flange 2 rings, the 2 SM2 hr style covers the 12 - 6/0 range.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-2-ut15-hr-hrff',
    category: 'traveler',
    name: 'Steel Traveler — 2 UT1.5 hr/hrff (Flange 2)',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      size: '2 UT1.5 hr, hrff, range 28 - 3/0',
      material: 'steel',
      application: 'coarse to medium counts: cotton, blends, core, slub and denim',
    },
    selectionLogic:
      'For coarse-to-medium cotton/blends/core/slub/denim on flange 2 rings, the 2 UT1.5 style (hr or hrff) covers the wide 28 - 3/0 range.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-2-mtw2-hrw',
    category: 'traveler',
    name: 'Steel Traveler — 2 MTW2 hrw (Flange 2)',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      size: '2 MTW2 hrw, range 44 - 5',
      material: 'steel',
      application: 'coarse to medium counts: cotton, blends, core, slub and denim',
    },
    selectionLogic:
      'For the coarsest cotton/blends/core/slub/denim on flange 2 rings, the 2 MTW2 hrw style covers the 44 - 5 range.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-legacy-of-hrw',
    category: 'traveler',
    name: 'Steel Traveler — OF hrw (Legacy Rings)',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      size: 'OF hrw, ISO range 11 - 140',
      material: 'steel',
      application: 'cotton, blends and synthetics, coarse/medium yarns, compact',
    },
    selectionLogic:
      'For coarse/medium compact cotton, blends and synthetics on legacy rings, the OF hrw style covers the ISO 11 - 140 range.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },
  {
    id: 'trav-steel-ss-legacy-or-hr',
    category: 'traveler',
    name: 'Steel Traveler — OR hr (Legacy Rings)',
    attributes: {
      staple: 'short',
      profile: 'oval-half-round',
      size: 'OR hr, ISO range 11 - 140',
      material: 'steel',
      application: 'cotton and blends, medium/fine, compact',
    },
    selectionLogic:
      'For medium/fine compact cotton and blends on legacy rings, the OR hr style covers the ISO 11 - 140 range.',
    source: 'https://www.abcarter.com/wp-content/uploads/2023/06/AB_Carter_Ring__Traveler_Catalog.pdf',
  },

  // ===========================================================================
  // STEEL TRAVELERS — LONG STAPLE SPINNING & TWISTING
  // J Type (Conical) + HZ Type (Vertical), with documented ring heights.
  // Wire profiles: Round "RW", Flat "F", Oval (with documented applications).
  // Source: Steel Traveler J & HZ Brochure 2019 (PDF) and /travelers/.
  // Sizes here are the documented RING HEIGHTS the traveler type is made to fit.
  // ===========================================================================

  // --- J Type (Conical), Round "RW" wire — fine count wool & synthetics ---
  {
    id: 'trav-steel-ls-j-rw-9-1',
    category: 'traveler',
    name: 'Steel Traveler — J Type (Conical), Round (RW), 9.1 mm',
    attributes: {
      staple: 'long',
      profile: 'round',
      size: '9.1 mm (23/64") (J type, conical ring height)',
      material: 'steel',
      application: 'fine count wool and synthetics',
    },
    selectionLogic:
      'For long-staple spinning of fine-count wool and synthetics on a 9.1 mm conical ring, use the J-type traveler with the round "RW" wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },
  {
    id: 'trav-steel-ls-j-rw-11-1',
    category: 'traveler',
    name: 'Steel Traveler — J Type (Conical), Round (RW), 11.1 mm',
    attributes: {
      staple: 'long',
      profile: 'round',
      size: '11.1 mm (7/16") (J type, conical ring height)',
      material: 'steel',
      application: 'fine count wool and synthetics',
    },
    selectionLogic:
      'For long-staple spinning of fine-count wool and synthetics on an 11.1 mm conical ring, use the J-type traveler with the round "RW" wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },
  {
    id: 'trav-steel-ls-j-rw-17-0',
    category: 'traveler',
    name: 'Steel Traveler — J Type (Conical), Round (RW), 17.0 mm',
    attributes: {
      staple: 'long',
      profile: 'round',
      size: '17.0 mm (43/64") (J type, conical ring height)',
      material: 'steel',
      application: 'fine count wool and synthetics',
    },
    selectionLogic:
      'For long-staple spinning of fine-count wool and synthetics on a 17.0 mm conical ring, use the J-type traveler with the round "RW" wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },

  // --- J Type (Conical), Flat "F" wire — heavy count wool & synthetics ---
  {
    id: 'trav-steel-ls-j-f-9-1',
    category: 'traveler',
    name: 'Steel Traveler — J Type (Conical), Flat (F), 9.1 mm',
    attributes: {
      staple: 'long',
      profile: 'flat',
      size: '9.1 mm (23/64") (J type, conical ring height)',
      material: 'steel',
      application: 'heavy count wool and synthetics',
    },
    selectionLogic:
      'For long-staple spinning of heavy-count wool and synthetics on a 9.1 mm conical ring, use the J-type traveler with the flat "F" wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },
  {
    id: 'trav-steel-ls-j-f-11-1',
    category: 'traveler',
    name: 'Steel Traveler — J Type (Conical), Flat (F), 11.1 mm',
    attributes: {
      staple: 'long',
      profile: 'flat',
      size: '11.1 mm (7/16") (J type, conical ring height)',
      material: 'steel',
      application: 'heavy count wool and synthetics',
    },
    selectionLogic:
      'For long-staple spinning of heavy-count wool and synthetics on an 11.1 mm conical ring, use the J-type traveler with the flat "F" wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },
  {
    id: 'trav-steel-ls-j-f-17-0',
    category: 'traveler',
    name: 'Steel Traveler — J Type (Conical), Flat (F), 17.0 mm',
    attributes: {
      staple: 'long',
      profile: 'flat',
      size: '17.0 mm (43/64") (J type, conical ring height)',
      material: 'steel',
      application: 'heavy count wool and synthetics',
    },
    selectionLogic:
      'For long-staple spinning of heavy-count wool and synthetics on a 17.0 mm conical ring, use the J-type traveler with the flat "F" wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },

  // --- J Type (Conical), Oval wire — medium & coarse wool & synthetics ---
  {
    id: 'trav-steel-ls-j-oval-9-1',
    category: 'traveler',
    name: 'Steel Traveler — J Type (Conical), Oval, 9.1 mm',
    attributes: {
      staple: 'long',
      profile: 'oval-half-round',
      size: '9.1 mm (23/64") (J type, conical ring height)',
      material: 'steel',
      application: 'medium and coarse wool and synthetic counts',
    },
    selectionLogic:
      'For long-staple spinning of medium and coarse wool and synthetic counts on a 9.1 mm conical ring, use the J-type traveler with the oval wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },
  {
    id: 'trav-steel-ls-j-oval-11-1',
    category: 'traveler',
    name: 'Steel Traveler — J Type (Conical), Oval, 11.1 mm',
    attributes: {
      staple: 'long',
      profile: 'oval-half-round',
      size: '11.1 mm (7/16") (J type, conical ring height)',
      material: 'steel',
      application: 'medium and coarse wool and synthetic counts',
    },
    selectionLogic:
      'For long-staple spinning of medium and coarse wool and synthetic counts on an 11.1 mm conical ring, use the J-type traveler with the oval wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },
  {
    id: 'trav-steel-ls-j-oval-17-0',
    category: 'traveler',
    name: 'Steel Traveler — J Type (Conical), Oval, 17.0 mm',
    attributes: {
      staple: 'long',
      profile: 'oval-half-round',
      size: '17.0 mm (43/64") (J type, conical ring height)',
      material: 'steel',
      application: 'medium and coarse wool and synthetic counts',
    },
    selectionLogic:
      'For long-staple spinning of medium and coarse wool and synthetic counts on a 17.0 mm conical ring, use the J-type traveler with the oval wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },

  // --- HZ Type (Vertical), Round "RW" wire — fine count wool & synthetics ---
  {
    id: 'trav-steel-ls-hz-rw-9-5',
    category: 'traveler',
    name: 'Steel Traveler — HZ Type (Vertical), Round (RW), 9.5 mm',
    attributes: {
      staple: 'long',
      profile: 'round',
      size: '9.5 mm (3/8") (HZ type, vertical ring height)',
      material: 'steel',
      application: 'fine count wool and synthetics',
    },
    selectionLogic:
      'For long-staple spinning of fine-count wool and synthetics on a 9.5 mm vertical ring, use the HZ-type traveler with the round "RW" wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },
  {
    id: 'trav-steel-ls-hz-rw-10-3',
    category: 'traveler',
    name: 'Steel Traveler — HZ Type (Vertical), Round (RW), 10.3 mm',
    attributes: {
      staple: 'long',
      profile: 'round',
      size: '10.3 mm (13/32") (HZ type, vertical ring height)',
      material: 'steel',
      application: 'fine count wool and synthetics',
    },
    selectionLogic:
      'For long-staple spinning of fine-count wool and synthetics on a 10.3 mm vertical ring, use the HZ-type traveler with the round "RW" wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },
  {
    id: 'trav-steel-ls-hz-rw-11-1',
    category: 'traveler',
    name: 'Steel Traveler — HZ Type (Vertical), Round (RW), 11.1 mm',
    attributes: {
      staple: 'long',
      profile: 'round',
      size: '11.1 mm (7/16") (HZ type, vertical ring height)',
      material: 'steel',
      application: 'fine count wool and synthetics',
    },
    selectionLogic:
      'For long-staple spinning of fine-count wool and synthetics on an 11.1 mm vertical ring, use the HZ-type traveler with the round "RW" wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },
  {
    id: 'trav-steel-ls-hz-rw-17-0',
    category: 'traveler',
    name: 'Steel Traveler — HZ Type (Vertical), Round (RW), 17.0 mm',
    attributes: {
      staple: 'long',
      profile: 'round',
      size: '17.0 mm (43/64") (HZ type, vertical ring height)',
      material: 'steel',
      application: 'fine count wool and synthetics',
    },
    selectionLogic:
      'For long-staple spinning of fine-count wool and synthetics on a 17.0 mm vertical ring, use the HZ-type traveler with the round "RW" wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },

  // --- HZ Type (Vertical), Flat "F" wire — heavy count wool & synthetics ---
  {
    id: 'trav-steel-ls-hz-f-9-5',
    category: 'traveler',
    name: 'Steel Traveler — HZ Type (Vertical), Flat (F), 9.5 mm',
    attributes: {
      staple: 'long',
      profile: 'flat',
      size: '9.5 mm (3/8") (HZ type, vertical ring height)',
      material: 'steel',
      application: 'heavy count wool and synthetics',
    },
    selectionLogic:
      'For long-staple spinning of heavy-count wool and synthetics on a 9.5 mm vertical ring, use the HZ-type traveler with the flat "F" wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },
  {
    id: 'trav-steel-ls-hz-f-11-1',
    category: 'traveler',
    name: 'Steel Traveler — HZ Type (Vertical), Flat (F), 11.1 mm',
    attributes: {
      staple: 'long',
      profile: 'flat',
      size: '11.1 mm (7/16") (HZ type, vertical ring height)',
      material: 'steel',
      application: 'heavy count wool and synthetics',
    },
    selectionLogic:
      'For long-staple spinning of heavy-count wool and synthetics on an 11.1 mm vertical ring, use the HZ-type traveler with the flat "F" wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },
  {
    id: 'trav-steel-ls-hz-f-17-0',
    category: 'traveler',
    name: 'Steel Traveler — HZ Type (Vertical), Flat (F), 17.0 mm',
    attributes: {
      staple: 'long',
      profile: 'flat',
      size: '17.0 mm (43/64") (HZ type, vertical ring height)',
      material: 'steel',
      application: 'heavy count wool and synthetics',
    },
    selectionLogic:
      'For long-staple spinning of heavy-count wool and synthetics on a 17.0 mm vertical ring, use the HZ-type traveler with the flat "F" wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },

  // --- HZ Type (Vertical), Oval wire — medium & coarse wool & synthetics ---
  {
    id: 'trav-steel-ls-hz-oval-9-5',
    category: 'traveler',
    name: 'Steel Traveler — HZ Type (Vertical), Oval, 9.5 mm',
    attributes: {
      staple: 'long',
      profile: 'oval-half-round',
      size: '9.5 mm (3/8") (HZ type, vertical ring height)',
      material: 'steel',
      application: 'medium and coarse wool and synthetic counts',
    },
    selectionLogic:
      'For long-staple spinning of medium and coarse wool and synthetic counts on a 9.5 mm vertical ring, use the HZ-type traveler with the oval wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },
  {
    id: 'trav-steel-ls-hz-oval-10-3',
    category: 'traveler',
    name: 'Steel Traveler — HZ Type (Vertical), Oval, 10.3 mm',
    attributes: {
      staple: 'long',
      profile: 'oval-half-round',
      size: '10.3 mm (13/32") (HZ type, vertical ring height)',
      material: 'steel',
      application: 'medium and coarse wool and synthetic counts',
    },
    selectionLogic:
      'For long-staple spinning of medium and coarse wool and synthetic counts on a 10.3 mm vertical ring, use the HZ-type traveler with the oval wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },
  {
    id: 'trav-steel-ls-hz-oval-11-1',
    category: 'traveler',
    name: 'Steel Traveler — HZ Type (Vertical), Oval, 11.1 mm',
    attributes: {
      staple: 'long',
      profile: 'oval-half-round',
      size: '11.1 mm (7/16") (HZ type, vertical ring height)',
      material: 'steel',
      application: 'medium and coarse wool and synthetic counts',
    },
    selectionLogic:
      'For long-staple spinning of medium and coarse wool and synthetic counts on an 11.1 mm vertical ring, use the HZ-type traveler with the oval wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },
  {
    id: 'trav-steel-ls-hz-oval-17-0',
    category: 'traveler',
    name: 'Steel Traveler — HZ Type (Vertical), Oval, 17.0 mm',
    attributes: {
      staple: 'long',
      profile: 'oval-half-round',
      size: '17.0 mm (43/64") (HZ type, vertical ring height)',
      material: 'steel',
      application: 'medium and coarse wool and synthetic counts',
    },
    selectionLogic:
      'For long-staple spinning of medium and coarse wool and synthetic counts on a 17.0 mm vertical ring, use the HZ-type traveler with the oval wire profile.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Steel-Traveler-J-HZ-Brochure-2019.pdf',
  },

  // ---------------------------------------------------------------------------
  // STEEL TRAVELERS — LONG STAPLE FINISHES
  // Source: https://www.abcarter.com/travelers/ (long staple finishes) and the
  // J & HZ brochure "Available Finishes / Application".
  // ---------------------------------------------------------------------------
  {
    id: 'trav-steel-ls-finish-brilliant',
    category: 'traveler',
    name: 'Steel Traveler (long staple) — Brilliant finish',
    attributes: {
      staple: 'long',
      material: 'steel',
      finish: 'Brilliant — high polished surface',
      application: 'all fiber types',
    },
    selectionLogic:
      'For long-staple spinning/twisting across all fiber types, the Brilliant high-polished finish enhances yarn quality and runnability.',
    source: 'https://www.abcarter.com/travelers/',
  },
  {
    id: 'trav-steel-ls-finish-miracle',
    category: 'traveler',
    name: 'Steel Traveler (long staple) — Miracle finish',
    attributes: {
      staple: 'long',
      material: 'steel',
      finish: 'Miracle — special/chemically deposited nickel finish',
      application: 'synthetic yarns in finer counts; enhances wear resistance and prevents corrosion',
    },
    selectionLogic:
      'For long-staple synthetic yarns in finer counts, the Miracle nickel finish enhances wear resistance and prevents corrosion.',
    source: 'https://www.abcarter.com/travelers/',
  },
  {
    id: 'trav-steel-ls-finish-cph',
    category: 'traveler',
    name: 'Steel Traveler (long staple) — CPH (Chrome Plated Head) finish',
    attributes: {
      staple: 'long',
      material: 'steel',
      finish: 'CPH (Chrome Plated Head) — chrome plated (head only)',
      application: 'maximum wear resistance on abrasive fibers',
    },
    selectionLogic:
      'For long-staple processing of abrasive fibers, the CPH (Chrome Plated Head) finish gives maximum wear resistance — chrome plated on the head only.',
    source: 'https://www.abcarter.com/travelers/',
  },

  // ===========================================================================
  // NYLON TRAVELERS — LONG STAPLE SPINNING & TWISTING
  // Materials documented on /nylon-travelers/. Color coded for identification.
  // Specific material x size pairings are not pinned on the public page, so the
  // material entries are category-level (confirmWithEngineer: true) and the
  // documented sizes are listed separately.
  // Source: https://www.abcarter.com/nylon-travelers/
  // ===========================================================================
  {
    id: 'trav-nylon-100',
    category: 'traveler',
    name: 'Nylon Traveler — 100% Nylon',
    attributes: {
      staple: 'long',
      material: '100% nylon',
      application: 'all standard fiber types in normal processing conditions',
    },
    selectionLogic:
      'Use the 100% Nylon traveler for all standard fiber types under normal processing conditions; nylon travelers are color coded to avoid accidental mixing.',
    source: 'https://www.abcarter.com/nylon-travelers/',
    confirmWithEngineer: true,
  },
  {
    id: 'trav-nylon-carnulon-iii',
    category: 'traveler',
    name: 'Nylon Traveler — Carnulon III (glass reinforced nylon)',
    attributes: {
      staple: 'long',
      material: 'Carnulon III (glass reinforced nylon)',
      application: 'abrasive fiber types or where poor ring lubrication exists',
    },
    selectionLogic:
      'Step up to Carnulon III (glass reinforced nylon) when the fiber type is abrasive or ring lubrication is poor.',
    source: 'https://www.abcarter.com/nylon-travelers/',
    confirmWithEngineer: true,
  },
  {
    id: 'trav-nylon-carnulon-metal-insert',
    category: 'traveler',
    name: 'Nylon Traveler — Carnulon with Metal Insert',
    attributes: {
      staple: 'long',
      material: 'Carnulon with metal insert',
      application: 'extremely abrasive fiber types',
    },
    selectionLogic:
      'For extremely abrasive fiber types, use Carnulon with a metal insert.',
    source: 'https://www.abcarter.com/nylon-travelers/',
    confirmWithEngineer: true,
  },
  {
    id: 'trav-nylon-duratech',
    category: 'traveler',
    name: 'Nylon Traveler — DuraTech (glass reinforced nylon)',
    attributes: {
      staple: 'long',
      material: 'DuraTech (glass reinforced nylon)',
      application: 'greater rigidity and extended traveler life',
    },
    selectionLogic:
      'Choose DuraTech (glass reinforced nylon) when you need greater rigidity and extended traveler life.',
    source: 'https://www.abcarter.com/nylon-travelers/',
    confirmWithEngineer: true,
  },
  {
    id: 'trav-nylon-sizes',
    category: 'traveler',
    name: 'Nylon Traveler — documented sizes',
    attributes: {
      staple: 'long',
      material: 'nylon',
      size: '9.5, 11.1, 16.7, 17.1, 17.4, 25.4, 38.1',
      application: 'long staple spinning & twisting; available in a wide range of styles, sizes and weights',
    },
    selectionLogic:
      'Nylon travelers are published in these sizes (9.5, 11.1, 16.7, 17.1, 17.4, 25.4, 38.1); match the size to the ring and confirm the exact style/weight with an AB Carter engineer.',
    source: 'https://www.abcarter.com/nylon-travelers/',
    confirmWithEngineer: true,
  },

  // ===========================================================================
  // RINGS — SHORT STAPLE SPINNING
  // Source: https://www.abcarter.com/ring/ and the Reference Guide.
  // No per-frame ID/OD dimension tables are published, so sizes are deferred.
  // ===========================================================================
  {
    id: 'ring-ss-royal',
    category: 'ring',
    name: 'Royal Ring (chrome plated)',
    attributes: {
      staple: 'short',
      material: 'chrome plated — advanced chrome plating technology',
      finish: 'superior surface finish; high coating consistency, optimum adhesion, minimal standard deviation',
      application: 'all raw material types and spindle speeds',
    },
    selectionLogic:
      'Royal Rings are AB Carter\'s premium chrome-plated short-staple ring, appropriate for any raw material and spindle speed for longer life and consistent yarn quality; pair with a diffusion-treated traveler finish.',
    source: 'https://www.abcarter.com/ring/',
    confirmWithEngineer: true,
  },
  {
    id: 'ring-ss-spartan',
    category: 'ring',
    name: 'Spartan Ring (black)',
    attributes: {
      staple: 'short',
      material: 'high carbon-high chrome steel, increased hardness HRC 60-64',
      finish: 'smooth, micro-porous surface (black)',
      application: 'medium speed applications on all fiber types and counts',
    },
    selectionLogic:
      'Spartan Rings suit medium-speed spinning on all fiber types and counts and offer a strong quality/price ratio; they are available for any brand of spinning frame.',
    source: 'https://www.abcarter.com/ring/',
    confirmWithEngineer: true,
  },

  // ===========================================================================
  // RINGS — LONG STAPLE SPINNING & TWISTING
  // ===========================================================================
  {
    id: 'ring-ls-conical-9-1',
    category: 'ring',
    name: 'Conical Ring — 9.1 mm height',
    attributes: {
      staple: 'long',
      size: '9.1 mm height',
      material: 'high carbon-high chrome core hardened steel (or sintered metal)',
      finish: 'special low-roughness polished surface',
      application: 'worsted and semi-worsted spinning; twisting coarser filament yarns',
    },
    selectionLogic:
      'For worsted/semi-worsted long-staple spinning at the 9.1 mm ring height, use the Conical Ring; it pairs with J-type conical travelers.',
    source: 'https://www.abcarter.com/ring/',
  },
  {
    id: 'ring-ls-conical-11-1',
    category: 'ring',
    name: 'Conical Ring — 11.1 mm height',
    attributes: {
      staple: 'long',
      size: '11.1 mm height',
      material: 'high carbon-high chrome core hardened steel (or sintered metal)',
      finish: 'special low-roughness polished surface',
      application: 'worsted and semi-worsted spinning; twisting coarser filament yarns',
    },
    selectionLogic:
      'For worsted/semi-worsted long-staple spinning at the 11.1 mm ring height, use the Conical Ring; it pairs with J-type conical travelers.',
    source: 'https://www.abcarter.com/ring/',
  },
  {
    id: 'ring-ls-conical-17-4',
    category: 'ring',
    name: 'Conical Ring — 17.4 mm height',
    attributes: {
      staple: 'long',
      size: '17.4 mm height',
      material: 'high carbon-high chrome core hardened steel (or sintered metal)',
      finish: 'special low-roughness polished surface',
      application: 'worsted and semi-worsted spinning; twisting coarser filament yarns',
    },
    selectionLogic:
      'For worsted/semi-worsted long-staple spinning at the 17.4 mm ring height, use the Conical Ring; it pairs with J-type conical travelers.',
    source: 'https://www.abcarter.com/ring/',
  },

  // ---------------------------------------------------------------------------
  // RINGS — SINTERED METAL
  // Material types + documented standard heights/depth and internal diameters.
  // Brochure confirms Nylon 4 and Steel 1; the website additionally lists a
  // Nylon 5 (fiberglass) type, which is carried with confirmWithEngineer: true.
  // Source: Sintered Metal Rings Brochure 2019 (PDF) + https://www.abcarter.com/ring/
  // ---------------------------------------------------------------------------
  {
    id: 'ring-sintered-nylon-4',
    category: 'ring',
    name: 'Sintered Metal Ring — Nylon 4',
    attributes: {
      material: 'sintered metal, Nylon 4 type; interconnected porosity for oil flow',
      size: 'standard heights/depth (mm): 3.7, 4.8, 6.35, 9.52, 10.3, 11.1, 12.4, 12.7, 16.7, 17.1, 25.4, 38.1; internal diameter (mm): 45, 50, 60, 65, 75, 82.5, 90, 110, 120.7, 127, 133, 136, 140, 145, 146, 152, 156, 162, 165, 180, 185, 195, 216, 227, 250',
      application: 'nylon traveler applications in the fiberglass, carpet yarn and tire cord industry',
    },
    selectionLogic:
      'Choose the Sintered Metal Ring Nylon 4 type for nylon-traveler applications (fiberglass, carpet yarn, tire cord); select the height and internal diameter from the published ranges, intermediate sizes on request.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Sintered-Metal-Rings-Brochure-2019.pdf',
  },
  {
    id: 'ring-sintered-steel-1',
    category: 'ring',
    name: 'Sintered Metal Ring — Steel 1',
    attributes: {
      material: 'sintered metal, Steel 1 type; interconnected porosity for oil flow',
      size: 'standard heights/depth (mm): 3.7, 4.8, 6.35, 9.52, 10.3, 11.1, 12.4, 12.7, 16.7, 17.1, 25.4, 38.1; internal diameter (mm): 45, 50, 60, 65, 75, 82.5, 90, 110, 120.7, 127, 133, 136, 140, 145, 146, 152, 156, 162, 165, 180, 185, 195, 216, 227, 250',
      application: 'steel traveler applications in twisting worsted, semi-worsted and blended yarns',
    },
    selectionLogic:
      'Choose the Sintered Metal Ring Steel 1 type for steel-traveler applications twisting worsted, semi-worsted and blended yarns; select the height and internal diameter from the published ranges, intermediate sizes on request.',
    source: 'https://www.abcarter.com/wp-content/uploads/2019/05/Sintered-Metal-Rings-Brochure-2019.pdf',
  },
  {
    id: 'ring-sintered-nylon-5',
    category: 'ring',
    name: 'Sintered Metal Ring — Nylon 5',
    attributes: {
      material: 'sintered metal, Nylon 5 type; interconnected porosity for oil flow',
      application: 'fiberglass',
    },
    selectionLogic:
      'A Nylon 5 sintered metal ring type for fiberglass is referenced on AB Carter\'s rings page; confirm exact heights/diameters and availability with an AB Carter engineer.',
    source: 'https://www.abcarter.com/ring/',
    confirmWithEngineer: true,
  },
];
