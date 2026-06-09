// Where to verify each part in its linked source (page + table/section).
// sourcePage powers a deep link (source#page=N); omit it for web-page sources.
//
// Page numbers below were confirmed by reading the actual PDF page text:
//   - Rings & Steel Traveler Reference Guide (AB_Carter_Ring__Traveler_Catalog.pdf, 54pp):
//       p11 "Traveler Wire Profile"            -> the 5 wire-profile entries
//       p15 "Travelers for Flange 1 and ½ Flange Rings" -> 1/2 + flange-1 style codes
//       p16 "Travelers for Flange 2 Rings" / "Travelers for Legacy Rings" -> flange-2 + legacy
//   - Steel Traveler J & HZ Brochure 2019 (Steel-Traveler-J-HZ-Brochure-2019.pdf, 2pp):
//       p2 holds the full spec: "Ring Heights Available" table (J: 9.1/11.1/17.0;
//       HZ: 9.5/10.3/11.1/17.0) + "Wire Profile and Application" (Round "RW", Flat "F",
//       Oval) + "Available Finishes / Application". (p1 is an unrelated products page.)
//   - Sintered Metal Rings Brochure 2019 (Sintered-Metal-Rings-Brochure-2019.pdf, 1pp):
//       p1 holds "Material Types" (Nylon 4 / Steel 1) + "Specifications".
// Web-page sources carry a section-level locator only (no page number).
export const LOCATORS: Record<string, { sourcePage?: number; locator: string }> = {
  // --- Steel travelers, short staple: wire profiles (Reference Guide p11) ---
  'trav-steel-ss-profile-f': { sourcePage: 11, locator: 'Traveler Wire Profile' },
  'trav-steel-ss-profile-hr': { sourcePage: 11, locator: 'Traveler Wire Profile' },
  'trav-steel-ss-profile-hrw-hrwd': { sourcePage: 11, locator: 'Traveler Wire Profile' },
  'trav-steel-ss-profile-rwf': { sourcePage: 11, locator: 'Traveler Wire Profile' },
  'trav-steel-ss-profile-hrff': { sourcePage: 11, locator: 'Traveler Wire Profile' },

  // --- Steel travelers, short staple: finishes (website) ---
  'trav-steel-ss-finish-cruz': { locator: 'Short Staple Steel Travelers — Traveler Finishes' },
  'trav-steel-ss-finish-jet': { locator: 'Short Staple Steel Travelers — Traveler Finishes' },
  'trav-steel-ss-finish-supreme': { locator: 'Short Staple Steel Travelers — Traveler Finishes' },
  'trav-steel-ss-finish-miracle': { locator: 'Short Staple Steel Travelers — Traveler Finishes' },

  // --- Steel travelers, short staple: flange 1/2 + flange 1 styles (Reference Guide p15) ---
  'trav-steel-ss-half-fgul-hrw': { sourcePage: 15, locator: 'Travelers for Flange 1 and ½ Flange Rings' },
  'trav-steel-ss-half-cpc-hrw': { sourcePage: 15, locator: 'Travelers for Flange 1 and ½ Flange Rings' },
  'trav-steel-ss-1-fgl-hrw': { sourcePage: 15, locator: 'Travelers for Flange 1 and ½ Flange Rings' },
  'trav-steel-ss-1-fgm-hrw': { sourcePage: 15, locator: 'Travelers for Flange 1 and ½ Flange Rings' },
  'trav-steel-ss-1-fgh-hrw': { sourcePage: 15, locator: 'Travelers for Flange 1 and ½ Flange Rings' },
  'trav-steel-ss-1-cfh-hrw': { sourcePage: 15, locator: 'Travelers for Flange 1 and ½ Flange Rings' },
  'trav-steel-ss-1-cch-hrwd': { sourcePage: 15, locator: 'Travelers for Flange 1 and ½ Flange Rings' },
  'trav-steel-ss-1-elb-hrw': { sourcePage: 15, locator: 'Travelers for Flange 1 and ½ Flange Rings' },
  'trav-steel-ss-1-spm-hrw': { sourcePage: 15, locator: 'Travelers for Flange 1 and ½ Flange Rings' },
  'trav-steel-ss-1-em-hrw': { sourcePage: 15, locator: 'Travelers for Flange 1 and ½ Flange Rings' },
  'trav-steel-ss-1-ul-hr-hrw': { sourcePage: 15, locator: 'Travelers for Flange 1 and ½ Flange Rings' },
  'trav-steel-ss-1-bkh-rwf': { sourcePage: 15, locator: 'Travelers for Flange 1 and ½ Flange Rings' },

  // --- Steel travelers, short staple: flange 2 + legacy styles (Reference Guide p16) ---
  'trav-steel-ss-2-sm2-hr': { sourcePage: 16, locator: 'Travelers for Flange 2 Rings' },
  'trav-steel-ss-2-ut15-hr-hrff': { sourcePage: 16, locator: 'Travelers for Flange 2 Rings' },
  'trav-steel-ss-2-mtw2-hrw': { sourcePage: 16, locator: 'Travelers for Flange 2 Rings' },
  'trav-steel-ss-legacy-of-hrw': { sourcePage: 16, locator: 'Travelers for Legacy Rings' },
  'trav-steel-ss-legacy-or-hr': { sourcePage: 16, locator: 'Travelers for Legacy Rings' },

  // --- Steel travelers, long staple: J Type (Conical), Round "RW" (J/HZ Brochure p2) ---
  'trav-steel-ls-j-rw-9-1': { sourcePage: 2, locator: 'Ring Heights Available — J Type (Conical); Wire Profile and Application (Round "RW")' },
  'trav-steel-ls-j-rw-11-1': { sourcePage: 2, locator: 'Ring Heights Available — J Type (Conical); Wire Profile and Application (Round "RW")' },
  'trav-steel-ls-j-rw-17-0': { sourcePage: 2, locator: 'Ring Heights Available — J Type (Conical); Wire Profile and Application (Round "RW")' },

  // --- Steel travelers, long staple: J Type (Conical), Flat "F" (J/HZ Brochure p2) ---
  'trav-steel-ls-j-f-9-1': { sourcePage: 2, locator: 'Ring Heights Available — J Type (Conical); Wire Profile and Application (Flat "F")' },
  'trav-steel-ls-j-f-11-1': { sourcePage: 2, locator: 'Ring Heights Available — J Type (Conical); Wire Profile and Application (Flat "F")' },
  'trav-steel-ls-j-f-17-0': { sourcePage: 2, locator: 'Ring Heights Available — J Type (Conical); Wire Profile and Application (Flat "F")' },

  // --- Steel travelers, long staple: J Type (Conical), Oval (J/HZ Brochure p2) ---
  'trav-steel-ls-j-oval-9-1': { sourcePage: 2, locator: 'Ring Heights Available — J Type (Conical); Wire Profile and Application (Oval)' },
  'trav-steel-ls-j-oval-11-1': { sourcePage: 2, locator: 'Ring Heights Available — J Type (Conical); Wire Profile and Application (Oval)' },
  'trav-steel-ls-j-oval-17-0': { sourcePage: 2, locator: 'Ring Heights Available — J Type (Conical); Wire Profile and Application (Oval)' },

  // --- Steel travelers, long staple: HZ Type (Vertical), Round "RW" (J/HZ Brochure p2) ---
  'trav-steel-ls-hz-rw-9-5': { sourcePage: 2, locator: 'Ring Heights Available — HZ Type (Vertical); Wire Profile and Application (Round "RW")' },
  'trav-steel-ls-hz-rw-10-3': { sourcePage: 2, locator: 'Ring Heights Available — HZ Type (Vertical); Wire Profile and Application (Round "RW")' },
  'trav-steel-ls-hz-rw-11-1': { sourcePage: 2, locator: 'Ring Heights Available — HZ Type (Vertical); Wire Profile and Application (Round "RW")' },
  'trav-steel-ls-hz-rw-17-0': { sourcePage: 2, locator: 'Ring Heights Available — HZ Type (Vertical); Wire Profile and Application (Round "RW")' },

  // --- Steel travelers, long staple: HZ Type (Vertical), Flat "F" (J/HZ Brochure p2) ---
  'trav-steel-ls-hz-f-9-5': { sourcePage: 2, locator: 'Ring Heights Available — HZ Type (Vertical); Wire Profile and Application (Flat "F")' },
  'trav-steel-ls-hz-f-11-1': { sourcePage: 2, locator: 'Ring Heights Available — HZ Type (Vertical); Wire Profile and Application (Flat "F")' },
  'trav-steel-ls-hz-f-17-0': { sourcePage: 2, locator: 'Ring Heights Available — HZ Type (Vertical); Wire Profile and Application (Flat "F")' },

  // --- Steel travelers, long staple: HZ Type (Vertical), Oval (J/HZ Brochure p2) ---
  'trav-steel-ls-hz-oval-9-5': { sourcePage: 2, locator: 'Ring Heights Available — HZ Type (Vertical); Wire Profile and Application (Oval)' },
  'trav-steel-ls-hz-oval-10-3': { sourcePage: 2, locator: 'Ring Heights Available — HZ Type (Vertical); Wire Profile and Application (Oval)' },
  'trav-steel-ls-hz-oval-11-1': { sourcePage: 2, locator: 'Ring Heights Available — HZ Type (Vertical); Wire Profile and Application (Oval)' },
  'trav-steel-ls-hz-oval-17-0': { sourcePage: 2, locator: 'Ring Heights Available — HZ Type (Vertical); Wire Profile and Application (Oval)' },

  // --- Steel travelers, long staple: finishes (website) ---
  'trav-steel-ls-finish-brilliant': { locator: 'Long Staple Steel Travelers — Traveler Finishes' },
  'trav-steel-ls-finish-miracle': { locator: 'Long Staple Steel Travelers — Traveler Finishes' },
  'trav-steel-ls-finish-cph': { locator: 'Long Staple Steel Travelers — Traveler Finishes' },

  // --- Nylon travelers (website) ---
  'trav-nylon-100': { locator: 'Material Types' },
  'trav-nylon-carnulon-iii': { locator: 'Material Types' },
  'trav-nylon-carnulon-metal-insert': { locator: 'Material Types' },
  'trav-nylon-duratech': { locator: 'Material Types' },
  'trav-nylon-sizes': { locator: 'Resources and Materials — size-specific Nylon Traveler brochures' },

  // --- Rings (website) ---
  'ring-ss-royal': { locator: 'Royal Rings' },
  'ring-ss-spartan': { locator: 'Spartan Rings' },
  'ring-ls-conical-9-1': { locator: 'Conical Rings' },
  'ring-ls-conical-11-1': { locator: 'Conical Rings' },
  'ring-ls-conical-17-4': { locator: 'Conical Rings' },

  // --- Sintered metal rings: Nylon 4 / Steel 1 confirmed in brochure (p1); Nylon 5 is web-only ---
  'ring-sintered-nylon-4': { sourcePage: 1, locator: 'Material Types (Nylon 4) / Specifications' },
  'ring-sintered-steel-1': { sourcePage: 1, locator: 'Material Types (Steel 1) / Specifications' },
  'ring-sintered-nylon-5': { locator: 'Sintered Metal Rings — Material Types (Nylon 5)' },
};
