# Strudel Demo

My Video Demonstration- https://youtu.be/Q3tOvgrNSm4

**React + StrudelMirror** writing, editing, and live-coding music in the Strudel environment.  

The following is a list of features created to assist you with *cooking*. 

---

## Live Code Editor (StrudelMirror)

- Syntax highlighted code editor.
- Automatically updates code inside the text editor.
- Piano roll rendering.

---

## Control Panel (Left Sidebar)

### *Mute Instruments*
Automatically scans your code for labeled sections such as:

bassline:
main_arp:
drums:
drums2:


For each detected label:
- Expandable/collapsible bootstrap card UI  
- ON/OFF toggles using radio buttons:
  - **ON** → `label:`  
  - **OFF** → `_label:` (muted version)
- Updates the textarea code
- Triggers audio updates automatically

Enables quick track muting without deleting code.

---

### *Add Sequence (Custom Step Sequencer)*

A 14-step mini-sequencer that generates Strudel patterns.

**Features:**
- Choose a sound (hh, bd, sd, etc.)
- Toggle switches to activate steps
- Builds a pattern string like: custom0: s("- hh - hh hh - - hh - - hh - ")
- Automatically inserts it into the textarea
- Keeps track of multiple custome sequences (`custom0`, `custom1`, ...)

---

## Playback Controls

### *Play / Stop*
- Starts or stops Strudel’s scheduler.
- Evaluates latest code when starting.
- Icon updates between play/stop.

---

### *CPM (Cycles Per Minute) Control*

Navbar text input that dynamically updates: 
`setcpm(x)`

### *Process Button*

Runs a custom preprocessor to modify or clean the Strudel code before evaluating.

### *Display Buttons*

Two navbar switches:

#### - Display
- Shows/hides the textarea editor

#### - Control
- Shows/hides the left control sidebar

The layout adjusts dynamically:
- Editor grows when display or control panel is hidden
- Canvas resizes accordingly

---

## Empty Textarea Alert

If the textarea is cleared:

- Shows a Bootstrap danger alert: `Please enter code.`
- Prevents evaluation of empty code
- Audio output stops safely


--- 

## How was AI used?

I used ChatGPT to assist me with the understanding of the `StrudelMirror` Class. By going to the defenition of the `StrudelMirror` class i was led to `class Ja {...}`. By showing ChatGPT `class Ja` i was able to learn about the hidden functionalities which I was not aware of within `StrudelMirror`.