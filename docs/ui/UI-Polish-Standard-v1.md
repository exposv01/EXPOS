# EXPOS UI Polish Standard v1

Tanggal: 2026-07-04
Status: Active standard for Sprint 7 UI polish

## Objective

Menetapkan standar polish UI untuk EXPOS setelah fungsi utama siap.

## Device Standard

- Primary width: 390px
- Reference: iPhone 16 style mobile viewport
- No horizontal scroll
- Touch-friendly controls

## Visual Foundation

- Primary blue: #0f3d73
- Secondary blue: #145aa0
- Background: #f4f7fb
- Card background: #ffffff
- Border: #e5eaf2
- Text: #172033
- Muted text: #667085

## Layout Rules

- App shell max-width 390px
- Safe area top and bottom support
- Rounded header bottom corners
- Card radius 16px to 22px
- Sticky bottom action for form submit
- Minimum button height 48px
- Form input minimum height 44px

## State Rules

Every page should have:

- Loading state
- Empty state
- Success toast
- Error toast
- Disabled submitting button state

## Copywriting Rules

- Use Bahasa Indonesia
- Short and clear labels
- Error message must tell user what to fix
- Avoid technical jargon in user-facing UI

## Accessibility Rules

- Buttons must have readable text or aria-label
- Inputs must have labels
- Touch target minimum 40px
- Color should not be the only status indicator

## Design Priority

1. Clarity
2. Speed
3. Mobile usability
4. Brand consistency
5. Light animation only when useful

## Out of Scope

- Complex animation
- Desktop dashboard redesign
- Heavy charting
- Non-mobile-first layout
