# M-Quiz 🧠⚙️  
**Version: 0.6.0**

A quiz web application focused on Material Engineering questions, designed to test and enhance users' knowledge with a simple and engaging interface.

---

## 📝 To-Do:
- [ ] Add Sound Effect (FX).
- [ ] Program Help System.
- [ ] store the progress for each level ``` localStorage.setItem(`data-of-level-${level}`, dataToSave); ```.
- [ ] Add level system (lock level if not all the previous levels are completed).
- [ ] Add same transitions when show/hide "next btn" container after user select answer.
- [ ] show the correct answer if user answer is not correct.
- [ ] add option to make user can not show the correct answer if he's answer is not correct for more difficulty.
- [x] Use (page URL) instead of (submit with form) to go the selected level.
- [x] Answer Randomly indexed Each Time.
- [x] Make Arabic As Default Language
- [x] Add Real data (Question).
- [x] Enhance App Stability (enhance and data fetching function).
- [x] Add Translation data in js file (separately) instead of fetch from json file (to avoid problems of fetching, and improve stability).
- [x] M-Quiz Game can be installed on mobile from browser (add to homepage) using Aggressive Web Application (PWA).
- [x] Issues: Some time "questions.js" file does not loaded (all other files are loaded and work well).
- 
- 



--------------------------------
## ✅ Completed
- [x] Arabic Language support ❤️.
- [x] Neglect `resultBtn`, Show Results **Automatically** after select the answer of the last question.
- [x] Back to `levels.html` after show results screen, ether using "ok" btn or "backdrop".
- [x] Replace `localStorage` with `sessionStorage` in (`levels.js`) file.
- [x] import and use data from json file (using fetch) instead of data inside js file (`data = {}`).
- [x] Game Over screen if (`power = 0`).
- [x] Add some effect for container of "next btn" to enhance user experience (something like "Your Answer Is Correct: .." or "The Correct Answer Is ...").

- [x] Game structure.
- [x] style the structure.
- [x] Improve game ui/ux.
- [x] Add Icon (svg).
- [x] Change the color of ("NextBtn") container depending on the answer (true or false ===> green or red)
- [x] create (Results) screen.
- [x] Give simple analysis for user answers (like numbers of correct answer, number of incorrect answers, total time, ..etc)
- [x] Make question counter work.
- [x] Make heart number work i.e reduce it (power -1) if answer were not correct.
- 
- 



--------------------------------
## 🐞 Fixed Issues

- [x] fix: (`NextBtn`) not work good.
- 
- 


--------------------------------
## 💡 Ideas & Concepts

### 📘 General
- Questions are about Material Engineering.
- maybe some questions about engineering (in general subjects).
- Add category for each question for example: (material, thermodynamics, fluid, ...etc).
- Add difficulty levels for each question or each level: (easy, medium, hard).
    
--------------------------------

### 🎨 UI/UX
- Dark Mode.
- Questions progress as a bar progress instead of numbers.
    
--------------------------------

### 🧠 Hint System
- [ ] Remove 2 incorrect answers (maybe only one for more difficulty).
- [ ] Give Hint i.e Explain the solution as a hint (not as an answer) if that possible.
- [ ] Give the correct answer In exchange for a one heart (power - 1).
    
--------------------------------

### 🎯 Scoring & Power System
- One point for each correct answer.
- One power for each incorrect answer.
- player have 3 or 5 chances (power).
- each group of questions has it's own chances (power).
- when player win or lose chances (power) get full.



