Instead of trying to "reverse" actions, store complete states:
State management:
- past: [state1, state2, state3]  // older states
- present: state4                  // current state
- future: [state5, state6]         // for redo
On UNDO:
Move present → push to future
Pop last item from past → becomes new present

On REDO:
Move present → push to past
Pop last item from future → becomes new present

On NEW ACTION:
Move present → push to past
Clear future (any redo history is invalidated)
New state becomes present



### 📜 Activity Log

* Every action leaves a trace
* Teaches event-driven thinking
* Looks very impressive

### 📆 Timeline View (Gantt-Style)

* Pure derived data
* Forces date logic clarity
* Visual complexity without state complexity



## 🚫 What to Delay (On Purpose)
Don’t touch yet:
* Virtualized lists
* Drag-drop undo
* Team collaboration simulation