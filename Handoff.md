# STATIC — Project Handoff

## 1. Project Overview

STATIC is a website made for people who are into alternative music and want a place to discover albums, check out artists, and explore different music genres. The design is inspired by older internet communities and personal profile pages, especially the style of early MySpace.

The website focuses on music discovery and giving visitors a look into the alternative music scene. It includes different pages for albums, genres, profiles, and other content.

The main goal was to make the website feel like a place for people with similar music interests, instead of just making another basic music website.

**Known limitations:** The forms are demos only. They show a confirmation message but do not send or save anything. The profiles and 'currently listening' info are sample data, and some images are placeholders. User accounts, saved profile customization, a guestbook, live listening info, and gallery uploads are not built yet.

## 2. Website Structure and HTML Semantics

The project is separated into different HTML pages so the content is easier to organize and maintain.

**Main pages:**
- `index.html` – Home page with the welcome section, featured albums, and community sidebar.
- `about.html` – Explains the website and its purpose.
- `genre.html` – Shows different music genres and their albums.
- `gallery.html` – Displays images related to the alternative music scene.
- `contact.html` – Contains a contact form.

**Other pages:**
- `profiles/profile.html`
- `profiles/profile-2.html`
- `profiles/profile-3.html`
- `albums/` – Contains the individual pages for the 12 albums.

**Main folders:**
- `css/style.css` – Contains the website's styling.
- `js/main.js` – Contains the JavaScript used for interactive parts.
- `assets/images/` – Stores the images used throughout the website.
  - `icon.png`
  - `covers/`
  - `profiles/`
  - `about/`
  - `gallery/`

I used separate pages and folders to keep everything organized. This also makes it easier to find and edit specific parts without having to work with everything in one file.

For the HTML, I used elements based on what the content is for, such as `header`, `nav`, `main`, `aside`, and `footer`. I also used things like `figure` and `figcaption` for images, and `details` and `summary` for collapsible sections.

**Why:** Using the right HTML elements makes the page easier to understand and organize. It also helps with accessibility instead of using random elements for everything.

## 3. Design Tokens and BEM Naming

I used CSS variables in `:root` for the main colors and other repeated design values. This makes it easier to change the overall look of the website without having to edit the same values in multiple places.

The main colors used are:

- Background: `#0D0D0D`
- Secondary background: `#171717`
- Cards: `#202020`
- Main text: `#F0EEEE`
- Red accent: `#B03636`

I also used BEM naming for CSS classes. This helps keep class names organized and makes it easier to tell which styles belong to certain parts of the website.

For example:
- `.chip`
- `.chip--active`

**Why:** I used CSS variables so the colors stay consistent across the pages. BEM also helps avoid confusing class names, especially when the website has many different sections and components.

The main exception to the CSS variables is the media query breakpoint (50em), because CSS variables can't be used inside media queries.

## 4. Layout and Responsiveness

I used CSS Grid and Flexbox depending on the layout.

- **CSS Grid** is used for layouts with rows and columns, such as album grids.
- **Flexbox** is used for arranging items in one direction, such as navigation links and smaller content sections.

I also used fixed sizes and aspect ratios where needed to keep images and album covers from looking stretched.

For smaller screens, the layouts adjust so the content still fits properly. I checked the pages at different screen sizes to make sure the layout does not cause horizontal scrolling.

**Why:** Grid and Flexbox make it easier to arrange content without relying on too many fixed positions. Making the website responsive also means it can be viewed on different screen sizes instead of only working properly on a desktop.

Checked all 20 pages at 320px and 1920px with no horizontal overflow (`document.documentElement.scrollWidth > document.documentElement.clientWidth` returned false).

## 5. Accessibility and Quality Checks

I added a few things to make the website easier to use and navigate.

These include:
- A skip link so users can skip straight to the main content.
- Visible focus styles when navigating with a keyboard.
- Alt text for images.
- Labels for form inputs.
- Proper headings and page sections.
- Feedback messages for search and form interactions using `aria-live`.
- Form validation to help identify missing or incorrect information.
- Reduced motion support for users who prefer less animation.
- Lazy loading for images that do not need to load immediately.

I also checked the contrast between the text and background colors to make sure the content is readable.

The contrast results are:
- Main text: 17.1:1
- Muted text: 7.1:1
- Button: 6.1:1
- Error text: around 6.4:1

The red accent (#B03636) is only about 3.2:1 on the page background, so it is used for large text, borders, and UI elements, not small body text.

**Why:** These changes help make the website easier to use, especially for people who navigate with a keyboard or need clearer text and feedback. Accessibility is important because the website should be usable by more than just people browsing normally with a mouse.

## 6. Credits

- **Fonts:** Courier New and Verdana (system fonts).
- **Music links:** Spotify (open.spotify.com).
- **Album covers:** Official cover art by the artists and their labels, taken from Genius.com. I do not own these images.
- **Other images:** Most of the other images were found through Google image searches. I did not keep track of the original sources or owners, so I can't credit them individually. They are only used for this class project and should be replaced with my own photos before any public release.
- **AI assistance:** DeepSeek was used for coding help. ChatGPT was used for planning, design ideas, and help writing this document. Claude was used to make the presentation slides and script and to review the site.
- **Other sources or libraries:** None. The website uses plain HTML, CSS, and JavaScript.

## 7. User Testing and Fixes

A classmate reviewed the site and found these problems:

- **Some buttons didn't work:** I rechecked every button and link. The search and form buttons and all page links now work.
- **Wrong aspect ratio on phone:** I set fixed aspect ratios and `object-fit: cover` so images crop instead of stretching on small screens.
- **All profiles led to one:** I made three separate profile pages, and each user in "Online now" opens their own.
- **Search bar didn't work:** I'm not sure if the search bar is fully working yet. I still need to double-check if it filters albums properly by artist, album, genre, or year.
- **Lack of UX usability:** I added a skip link, an active tab highlight, form hints with live error messages, and back links.