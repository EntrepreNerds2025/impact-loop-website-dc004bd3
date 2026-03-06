

# Upgrade Hero Headline Animation

Replace the current 3D cube-rotation effect in `RotatingWord.tsx` with the smoother vertical slide animation from the provided `animated-hero` component. Keep the same three headlines and the same integration in `HeroSection.tsx`.

## What Changes

**File: `src/components/home/RotatingWord.tsx`**

Replace the `AnimatePresence mode="wait"` + `rotateX` animation with the stacked approach from the reference component:

- All three headlines render simultaneously via `.map()`, but only the active one is visible
- Active headline animates in with `y: 0, opacity: 1`
- Previous headline exits upward (`y: -150, opacity: 0`)
- Next headline waits below (`y: 150, opacity: 0`)
- Uses `AnimatePresence` around all mapped items
- Container uses `relative overflow-hidden` with a fixed height
- Keep the existing `3000ms` interval and reduced-motion check
- Transition uses the spring-like ease from the reference: `type: "spring", stiffness: 50, damping: 10`

The key difference from the current approach: instead of `mode="wait"` (one exits then one enters), all headlines exist in the DOM and slide through vertically with overlap, creating a smoother conveyor-belt feel.

**No other files change.** `HeroSection.tsx` already imports and uses `<RotatingWord />` -- the API stays identical.

**No new dependencies needed** -- `framer-motion` is already installed.

