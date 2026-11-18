const UNSPLASH = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

/**
 * Image registry — every entry below was fetched and visually verified
 * during the build so no unrelated stock imagery ships on this site.
 *
 * All imagery is REFERENCE / CONCEPTUAL, labeled as such in the UI.
 * It is NOT photography of Osama Mohamed's own hardware.
 */
export const IMG = {
  humanoid: {
    src: UNSPLASH("photo-1485827404703-89b55fcc595e", 1200),
    credit: "Humanoid robot platform — reference imagery (Unsplash)",
  },
  asimo: {
    src: UNSPLASH("photo-1535378917042-10a22c95931a", 1200),
    credit: "Humanoid robot — reference imagery (Unsplash)",
  },
  trackedRobot: {
    src: UNSPLASH("photo-1563207153-f403bf289096", 1200),
    credit: "Compact tracked robot unit — reference imagery (Unsplash)",
  },
  circuit: {
    src: UNSPLASH("photo-1518770660439-4636190af475", 1200),
    credit: "PCB macro — reference imagery (Unsplash / A. Debiève)",
  },
  code: {
    src: UNSPLASH("photo-1555949963-aa79dcee981c", 1200),
    credit: "Source code — reference imagery (Unsplash)",
  },
  lab: {
    src: UNSPLASH("photo-1581091226825-a6a2a5aee158", 1200),
    credit: "Engineering laboratory — reference imagery (Unsplash)",
  },
} as const;

export type ImgSpec = { src: string; credit: string };
