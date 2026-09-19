# Zecqora website

The active redesign lives in `src/zecqora/Site.tsx` and `src/zecqora/site.css`, loaded by `src/App.tsx`. Previous components remain available as references but are not mounted by the new site.

## Design

- White backgrounds, charcoal text, deep teal (#087f6d), and pale green section surfaces.
- English and Tamil content, with a persisted language preference and matching HTML language.
- Student projects first, then business websites and original web/mobile apps.
- Responsive layouts, keyboard focus, native FAQ controls, and reduced-motion support.
- Existing project illustrations are reused; they are illustrative examples, not verified client work.
- Unverified metrics, testimonials, and placeholder contact information are not displayed.

## Hero video handoff

The current `hero-stage` is a designed static composition. Replace it with the approved Flow video/optimized frame sequence when supplied. No placeholder video or frame sequence is preloaded. Keep the headline and buttons as HTML. Provide a still image on mobile/reduced-motion devices and keep normal scrolling available.

## Contact

Set `VITE_WEB3FORMS_ACCESS_KEY` in the frontend environment to enable the existing Web3Forms enquiry integration. Until configured, the form explicitly downloads a local text brief and does not claim to send a message. Confirm the actual recipient before production use. Never commit credentials.

Course schedules, fees, company contact details, and approved student photography can be added when supplied.

## Commands

`npm run dev`, `npm run build`, `npm run lint`
