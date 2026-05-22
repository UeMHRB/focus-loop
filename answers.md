# ANSWERS.md

## 1. How to Run

Clone the repository and install dependencies:

git clone <your-repo-url>
cd focus-clock
npm install
npm run dev

Then open http://localhost:3000 in your browser.

Deployed URL: <add after Vercel deployment>

---

## 2. Stack & Design Choices

I chose Next.js with TypeScript and Tailwind CSS. Next.js made sense
for this project because it handles routing automatically and deploys
easily to Vercel. TypeScript helped me catch prop errors early,
especially when passing durations between components.

Two specific visual decisions:

**Mode indicator as a full-width colored pill:** I made the focus/break
indicator span the full width of the timer card rather than a small
label. This way the user can tell at a glance what state they are in
without having to read carefully. Red for focus signals urgency and
energy, green for break signals calm and rest.

**Large monospace font for the countdown:** I used a monospace font for
the timer digits so the numbers don't shift or jump horizontally as
they change every second. A proportional font would make "1" take less
space than "8" and the whole display would wobble. Monospace keeps it
stable and readable.

---

## 3. Responsive & Accessibility

The app uses max-w-md with px-4 padding so it stays centered on wide
screens like 1440px and properly padded on narrow screens like 360px.
The layout is a single column so nothing breaks or overflows on small
screens.

One accessibility consideration I handled: the Start button text
clearly changes between "Start", "Pause", and "Resume" so the user
always knows what will happen when they click it.

One I knowingly skipped: keyboard shortcuts for starting and pausing
the timer. A power user would expect to press Space to start/pause
without reaching for the mouse. I skipped this due to time constraints.

---

## 4. AI Usage

I used Claude (claude.ai) throughout this project as a learning aid,
not as an autonomous builder. Specifically:

- I asked Claude to help me understand how to structure the timer logic
  using useEffect and setInterval
- Claude suggested the cleanup function `return () => clearInterval(interval)`
  inside useEffect. I changed where onSessionComplete() was being called
  because React was throwing an error about updating a parent component
  during a child render. Claude explained that wrapping it in setTimeout
  with 0ms delay defers the call to after the render cycle, which fixed it.
- Claude helped me structure the localStorage logic for daily history reset

In each case I typed the code myself and asked Claude to explain parts
I did not understand before moving on.

---

## 5. Honest Gap

The audio cue is a basic sine wave beep generated with the Web Audio
API. It works but it feels abrupt and not satisfying. With another day
I would replace it with a proper chime sound — either a recorded audio
file or a more carefully shaped oscillator with a gentler attack and
decay — and add a volume control so users can adjust or mute it.