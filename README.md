# DeLux Store

## Description

This is a simple e-commerce built with React, Redux + Toolkit + RTK Query, TypeScript, Tailwind CSS and React Router.

_I've copied the task description to `TASK_README.md`._

## Installation & Configuration

- Run the following command to install the dependencies:

```bash
npm install
```

- Create a `.env` file and add the following environment variables:

```bash
VITE_API_URL=https://dummyjson.com
```

In this case, you can just rename the `.env.example` file to `.env` as we're using a public API.

## Running the project

```bash
npm run dev
```

## Linting and testing

```bash
npm run lint
npm run test
```

## Extra libraries

Extra libraries to help with the development process:

- [Lucide](https://lucide.dev/) for the icons.
- [use-debounce](https://www.npmjs.com/package/use-debounce) for debouncing the search input.
- [clsx](https://www.npmjs.com/package/clsx) to merge Tailwind classes conditionally.

## Known Issues & Improvements

### Known issues

- Only one sorting option can be applied at a time: the docs for the API don't mention how to apply multiple sorting options, and the usual ways to do it didn't work for me.
- No price filter: there is no way to do with the API, and doing it client-side would mean duplicating the state from the server, or transforming the response in the query, both of which would take extra time.
- No tests: time constraint, as I couldn't set up `react-testing-library` to work with `Redux` (was having issues with the mock store, and chose to spend time on other parts of the challenge). There is not a lot to unit test, but I added a single file spec.

### Improvements

- There are constants declared in multiple files, ideally these should be in a single source of truth.
- Performance: only memoized the components with lists of items; in this app we'd be _mostly_ safe from re-renders and multiple calls to the API thanks to `Redux` + `RTK Query`, but on a production app I'd be more thorough on doing performance checks.
- (Out of scope) Cart is not persisted, it will be reset on page refresh; could be done with backend or local storage.
- (Out of scope) There is no i18n or 100% a11y support.
- (Out of scope) No SEO optimization.
- (Out of scope) No image optimization.

## Notes

It was nice re-visiting Redux with RTK and RTK Query! Also, I didn't feel like `react-router` was a nuisance for what I needed to do.
I've prioritized features over clean architecture, as I haven't used (Redux) in a couple of years; I'd love to hear how you guys do it, to see what patterns are out there.
In total I've spent around 6-7 hours on this, sadly I couldn't add the components/e2e tests, as I spent 40-something-minutes setting it up with Redux, to no avail.

Thanks for the challenge and your consideration!
