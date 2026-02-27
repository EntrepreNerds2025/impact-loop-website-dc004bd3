

## Multi-Part Update: Logos, Hero Copy, Video Reorder

### 1. Replace Logo with Uploaded Images

Copy the two uploaded logo files into the project and use them in the Header and Footer instead of the current gradient circle with "IL" text.

- Copy `Impact_Loop_Logo_White.png` to `src/assets/logos/impact-loop-white.png` (for dark backgrounds / unscrolled header / footer)
- Copy `Impact_Loop_Logo_Black.png` to `src/assets/logos/impact-loop-black.png` (for light backgrounds / scrolled header)

**Header (`src/components/layout/Header.tsx`):**
- Replace the gradient circle `<div>` with an `<img>` that swaps between the white and black logo based on the `isScrolled` state
- White logo when header is transparent (top of page), black logo when scrolled (white background)

**Footer (`src/components/layout/Footer.tsx`):**
- Replace the gradient circle `<div>` with the white logo (footer has dark background)

---

### 2. Hero Section Copy Changes

**File: `src/components/home/HeroSection.tsx`**

- Change "Watch the Reel" button text to **"See Our Work"** and update the link from `/cinematic-impact-films` to `/work`
- Remove "under scrutiny" from the subtitle -- change "Cinematic impact films and story systems built to earn trust under scrutiny." to **"Cinematic impact films and story systems built to earn trust."**

---

### 3. Rearrange Video Portfolio Order

**File: `src/components/home/VideoPortfolioSection.tsx`**

New order (following the 1-2-1-2 row pattern):
1. **Row 1 (full):** Mental Health Awareness (was #6)
2. **Row 2 (pair):** Housing First Initiative (was #5) + Youth Empowerment Program (was #2)
3. **Row 3 (full):** Education Access Campaign (was #4, stays)
4. **Row 4 (pair):** Community Health Initiative (was #1) + Environmental Restoration (was #3)

Reorder the `portfolioItems` array to: `[6, 5, 2, 4, 1, 3]` (by original IDs).

---

### Technical Details

**Files changed:**
- `src/assets/logos/impact-loop-white.png` (new -- copied from upload)
- `src/assets/logos/impact-loop-black.png` (new -- copied from upload)
- `src/components/layout/Header.tsx` (swap logo based on scroll state)
- `src/components/layout/Footer.tsx` (use white logo)
- `src/components/home/HeroSection.tsx` (button text + subtitle edit)
- `src/components/home/VideoPortfolioSection.tsx` (reorder array)

