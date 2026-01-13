// import { HeroGeometric } from "../ui/shape-landing-hero";

import { HeroGeometric } from "../ui/shape-landing-hero";

function ShapeHero({
  badge = "",
  title1 = "",
  title2 = "",
  description = "",
  className = "",
}) {
  return (
    <HeroGeometric
      badge={badge}
      title1={title1}
      title2={title2}
      description={description}
      className={className}
    />
  );
}

export { ShapeHero };
