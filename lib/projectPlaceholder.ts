// Rotating placeholder gradients standing in for real project photography
// across the site (project grid cards, map hover previews). Swap for
// <Image src={project.image} .../> once files exist in
// /public/images/projects and `image` is set in data/projects.ts.
const gradients = [
  "linear-gradient(150deg,#0f1720,#2c4356 55%,#9fb6ad)",
  "linear-gradient(150deg,#1c130d,#6b3a26 55%,#d99a5b)",
  "linear-gradient(150deg,#0d1a1c,#215c56 55%,#7fb9a8)",
  "linear-gradient(150deg,#141922,#33465c 55%,#8ea3c2)",
];

export function placeholderGradient(index: number): string {
  return gradients[index % gradients.length];
}
