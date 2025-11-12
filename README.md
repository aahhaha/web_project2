# Assignment 6 — Advanced Web Application Development with JavaScript

## Part A — Structure and Navigation (Aibyn)

In this part I implemented the **main layout and navigation system** of the project.  
The web app consists of six interconnected pages:

- `index.html` — main page with a carousel and “Kill Mode” toggle  
- `Killers.html` — gallery of serial killers  
- `Case_Files.html` — case database with local storage  
- `Analysis.html` — behavioral analysis lab  
- `Form.html` — login and validation terminal  
- Shared `profiles.css` and `theme.js` for design and theme control  

Each page includes:
- A consistent **navbar** and **footer** with Bootstrap 5 components.  
- Responsive structure that automatically adjusts to different screen sizes.  
- Cohesive visual theme in red, white, and black colors.  

The **page structure** and **responsiveness** satisfy the *Application Structure and Layout* requirements.  
Bootstrap’s grid, margins, and flex utilities ensure clean alignment, while custom CSS in `profiles.css` handles hover animations, spacing, and transitions.

---

## Part B — JavaScript Functionality (Farkhad)

This section demonstrates **arrays, loops, conditionals, DOM manipulation, and event handling** across multiple pages.

### Core Functionality

- Arrays store killer data and evidence entries (`Killers.html` and `Case_Files.html`).
- Loops render cards and dynamic lists directly into the DOM.
- Conditional statements classify suspects and analyze user inputs in `Analysis.html`.

### DOM Manipulation

Used both **vanilla JS** and **jQuery** to:
- Add and remove evidence tasks.
- Sort DNA samples by ascending or descending order.
- Animate the blood box using chained `.animate()` calls.
- Display live data fetched from the **TVMaze API**, filtered to show only “Dexter” results.

### Event Handling

At least three types of listeners are implemented:
- `click` — buttons, analysis triggers, theme toggles.  
- `keyup` — live query submission for the API.  
- `resize` — automatic centering of the animation box.  

All listeners dynamically update the DOM, modify CSS, and respond to user input in real time.

### Functions

Reusable JavaScript functions include:
- `setTheme()` and `getTheme()` for persistent dark/light mode.
- `sortNums(order)` for numeric sorting.
- `centerBox()` for responsive animation.
- `fetchShows()` and `render()` for API data integration.

Functions prevent code repetition and make scripts modular and maintainable.

---

## Part C — Local Storage, Form Validation & Persistence (Assem)

In this part I implemented **persistent data** and **form control**.

### Local Storage
Several pages save user state locally:
- `theme.js` remembers the chosen display theme.
- `Case_Files.html` stores to-do tasks and last opened evidence.
- `Killers.html` saves the last opened killer’s profile.
These features restore automatically after reload.

### Form Validation
In `Form.html`, input validation ensures correct user access:
- Email format validation.
- Password check (valid password: `TryME123`).
- Real-time error messages and confirmation feedback.

This improves interactivity and aligns with the “Form Validation” and “Event Handling” grading criteria.

### Advanced Features
- **Animation:** smooth fade-in and movement sequences in `Analysis.html` (Blood Box).  
- **API Integration:** live show data from *TVMaze API* displayed dynamically.  
- **Custom Theme:** dark/light theme switch via `data-bs-theme` attribute and saved preference.

---

## Conclusion

The **DEXTER Behavioral Analysis System** demonstrates:
- Clear multi-page architecture  
- Strong JavaScript interactivity  
- Use of advanced browser features  
- Consistent, creative design  

All required elements (loops, arrays, events, DOM manipulation, API, local storage, validation, and animation) are implemented and functional.  

Each member contributed to distinct parts but worked together to ensure coherence and user experience across the entire web app.
