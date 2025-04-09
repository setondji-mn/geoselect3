You're building a minimal interactive web app using only HTML, CSS, and vanilla JavaScript.

**Goal:**
Create a full-screen responsive interface that displays a static SVG map of Portugal, allowing users to select municipalities.

**You already have the SVG file.**
(./portugal.svg)
Each municipality is a <path> element with a unique `id` attribute (e.g., "Lisboa", "Porto", etc.). You will copy and paste the full SVG contents directly into the HTML — do not modify or generate the SVG.

**Functionality:**
1. On page load, show the SVG map centered and responsive.
2. Users can click one or more municipalities to select them.
3. Selected municipalities should visually change (e.g., highlight with a different fill color).
4. Below the map, display the names (ids) of selected municipalities in real time.
5. Re-clicking a selected municipality should unselect it.

**Constraints:**
- Do not use any JavaScript libraries or frameworks (no React, no Leaflet, etc.)
- All interactivity should be handled with vanilla JavaScript.
- Use CSS for hover and selected styles.
- Do not modify the structure of the SVG.
- Assume the SVG is inlined directly into the HTML.
- Keep code clean, minimal, and easy to extend.
- Use semantic HTML where appropriate.

**Deliverable:**
A single `index.html` file that includes:
- The SVG contents (to be pasted in a placeholder)
- Embedded CSS styles
- Inline JavaScript to handle interaction

Start with a fully working HTML file and leave a placeholder comment where the SVG should be inserted.