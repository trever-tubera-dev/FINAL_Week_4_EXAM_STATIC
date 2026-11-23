# STATIC — Project Handoff

## 1. Project Overview

**STATIC** is an alternative music community and profile website inspired by early MySpace, personal homepages, and underground internet culture. It focuses on different alternative music genres such as Midwest emo, shoegaze, nu-metal, pop-punk, and other related genres and scenes.

**Main goal:** Give people who enjoy alternative music a place where they can discover albums, explore different genres, check tracklists, and listen to music through Spotify. It also gives users a way to see what other people are listening to and eventually create profiles that reflect their own personalities and interests.

**What has been built so far (front end only, no backend):**

- Home page with a welcome section, live search filter, featured album carousel, and community sidebar.
- About page with a welcome section, a video, and seven collapsible sections with two images each.
- Genre page with album grids and a genre information table.
- Gallery (Scene Wall) with five image tiles.
- Contact page with a demo form that checks user input.
- Three sample profiles inside `profiles/` (`profile.html`, `profile-2.html`, and `profile-3.html`). Each has its own avatar, banner, currently listening section, mini player, and message form.
- Twelve album detail pages inside `albums/`, each with a button that takes users back to the Genre page.

**Features that are not implemented yet:** User accounts, profile customization that saves changes, an actual guestbook, live currently listening information, and real gallery uploads. The forms are currently for demonstration only. They show a confirmation message but do not send or save any information.

## 2. Website Structure and HTML Semantics

The website uses a consistent layout across its pages to make navigation easier and keep the structure familiar for users.

**Project file structure:**

```text
index.html
about.html
genre.html
gallery.html
contact.html

profiles/
    profile.html
    profile-2.html
    profile-3.html

albums/
    (12 album detail pages)

css/
    style.css

js/
    main.js

assets/
    images/
        icon
        avatar
        covers/
        profiles/
        about/
        gallery/
        audit.png
```

**Main HTML elements used throughout the website:**

- **Skip link:** A link placed at the beginning of the body that allows keyboard users to skip the navigation and go directly to the main content. It becomes visible when focused.
- **Header:** Contains the website logo and navigation links. It stays at the top while scrolling. Profile pages also include a Back to Home link.
- **Navigation (`nav`):** Contains the five main navigation tabs: HOME, ABOUT, GENRE, GALLERY, and CONTACT. The active page is identified using a separate CSS class and `aria-current="page"`.
- **Main (`main`):** Holds the main content of each page. It uses `id="main-content"` as the target of the skip link.
- **Aside (`aside`):** Used on the home page for community-related content such as online users, friends, and suggestions.
- **Footer:** Contains the footer information and stays fixed at the bottom of the screen.
- **Album navigation:** Album detail pages have a Back to Genres link above the album title.

**Other HTML elements and accessibility features:**

- Each page has one main `<h1>` heading, followed by `<h2>` and `<h3>` headings where needed.
- `<details>` and `<summary>` are used for the collapsible sections on the About page.
- `<figure>` and `<figcaption>` are used for images and media that need captions.
- The genre table uses `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, and appropriate `scope` attributes to make its information easier for screen readers to understand.
- Contact and profile forms use `<fieldset>` and `<legend>` to group related inputs. Each input also has its own label.
- Decorative images use empty alt text (`alt=""`), while images that provide information have descriptive alt text.

## 3. Design Tokens and BEM Naming

**CSS design tokens:** The website's main design settings are stored as CSS custom properties inside the `:root` section at the beginning of `css/style.css`.

These include the colors, gradients, fonts, text sizes, spacing, borders, layout widths, z-index values, and other visual effects. This makes it easier to update the overall appearance of the website without having to edit every CSS rule individually.

For example, changing the `--color-accent` variable updates the accent color wherever that variable is used.

**Avoiding unnecessary fixed values:** Most colors and pixel measurements are stored in CSS variables instead of being repeated throughout the stylesheet. This keeps the design more consistent and makes future changes easier.

The main exception is the media query breakpoint. CSS variables cannot be used directly in media query conditions, so the breakpoint is written as `50em`, which is equivalent to 800px at the default font size.

**BEM naming convention:** The website uses BEM (Block, Element, Modifier) to keep CSS class names organized and easier to understand.

- **Block:** A standalone component, such as `.header`, `.album-card`, `.contact-card`, `.data-table`, and `.form`.
- **Element:** A smaller part of a block, using double underscores (`__`), such as `.header__nav-link`, `.album-card__title`, and `.profile-card__banner`.
- **Modifier:** A variation or state of an element, using double hyphens (`--`), such as `.header__nav-link--active`, `.button--small`, and `.form__status--error`.

JavaScript uses `data-` attributes for its functionality, such as `data-slider`, `data-demo-form`, and `data-search`. This keeps JavaScript behavior separate from CSS class names, so changing the styling does not automatically break the scripts.

## 4. Layout and Responsiveness

**CSS Grid:** Grid is mainly used for layouts that need rows and columns, such as the album cards and other two-column sections. It allows the number of columns to adjust depending on the available screen width.

For example, the album grid uses `repeat(auto-fill, minmax(var(--album-min), 1fr))`. This lets the browser fit as many album cards as possible without needing separate column settings for every screen size.

Grid is also used for the home page layout, album details, contact section, and About page media blocks.

**Flexbox:** Flexbox is used for layouts that mainly follow one direction, such as the header, navigation links, chips, community user rows, and album carousel.

The body also uses Flexbox with a column layout. The main content takes up the remaining available space, helping shorter pages fill the screen properly.

**Fixed footer:** The footer stays at the bottom of the viewport using `position: fixed`. Since it can overlap with content while scrolling, the main page containers have extra bottom padding to leave enough space for it.

**Featured album slider:** The home page has a horizontally scrollable featured album section. Users can drag or scroll through the albums, and the scrollbar is styled to match the website's accent color.

**Images and media:** Different aspect ratios are used depending on the content:

- Album covers and gallery images use a square `1 / 1` ratio.
- About page images use `16 / 10`.
- Profile banners use `16 / 7`.
- Images and videos have a maximum width of 100% to prevent them from overflowing their containers.
- The genre table uses horizontal scrolling inside its own container on smaller screens.

**Responsive testing (320px to 1920px):**

The website should be checked at different screen sizes using Chrome DevTools.

1. Open the website in Chrome and enable the device toolbar.
2. Test the following widths: 320px, 375px, 768px, 1024px, 1440px, and 1920px.
3. Check for horizontal overflow using this command in the browser console:

   `document.documentElement.scrollWidth > document.documentElement.clientWidth`

   The expected result is `false`.
4. Check that the fixed footer does not cover the last part of the page content.
5. Slowly resize the browser and look for overlapping, clipped, or misplaced elements.
6. Test at 200% browser zoom and check that the layout still works properly.

## 5. Accessibility and Quality Checks

The website was designed with accessibility and usability in mind. The goal is to make the pages easier to navigate and understand, including for users who rely on keyboards or screen readers.

**Lighthouse testing:** The target score is 90–100 in all four categories:

- Performance
- Accessibility
- Best Practices
- SEO

Lighthouse can be accessed through Chrome DevTools. The website should be tested in both Mobile and Desktop modes using its live URL.

Each page also includes a page title, meta description, `lang="en"`, and viewport settings.

**Keyboard and screen reader support:**

- Every page has a skip link that becomes visible when focused.
- Interactive elements have visible focus indicators using `:focus-visible`.
- Semantic HTML landmarks are used, including `header`, `nav`, `main`, `aside`, and `footer`.
- Search results, form status messages, and form errors use `aria-live="polite"` so screen readers can announce updates.

**Form validation:**

The Contact page and profile pages have forms with input validation.

- Validation runs when users type and when they leave an input field.
- All fields are required and have a minimum length of three characters.
- Email inputs must follow a valid email format.
- Error messages appear when an input is invalid.
- Invalid fields receive `aria-invalid="true"` and a red border.
- Valid fields receive a green border.
- When a user submits the form, all fields are checked and the first invalid field receives focus.
- The browser's default validation pop-ups are disabled through `noValidate` so the website can display its own error messages.

These forms are only demonstrations. A successful submission clears the form and displays a confirmation message, but no information is actually sent or saved.

**Color contrast (WCAG 2.1 AA):**

The following contrast ratios are documented for the website:

- Main text on the page background: 17.1:1
- Muted text on panel backgrounds: 7.1:1
- Button text on the accent color: 6.1:1
- Error text on panel backgrounds: approximately 6.4:1

**Other quality improvements:**

- Respects the user's reduced-motion preference by disabling transitions when requested.
- Uses `loading="lazy"` for images that do not need to load immediately.
- Includes image width and height attributes to help prevent layout shifts.
- Uses `preload="metadata"` for the video.
- Loads JavaScript with `defer` so it does not block the initial HTML parsing.

**Known limitations:**

All images and the About page video are stored locally inside `assets/images/`. Some images in the About page and Gallery are still placeholders and should be replaced with actual photos before a public release.

Album cover PNG files are stored in `assets/images/covers/`. If an album cover file is missing, the website uses a gradient as a fallback.


The Lighthouse audit screenshot is saved as `assets/images/audit.png`.

It is included below as a reference for the website's performance, accessibility, best practices, and SEO results.

![Lighthouse report for STATIC](assets/images/audit.png)