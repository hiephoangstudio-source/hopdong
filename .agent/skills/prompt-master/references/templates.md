# Prompt Templates Reference

Full template library for Prompt Master. Read the relevant template when the user's task type matches.

## Table of Contents

| Template                    | Best For                                    |
| --------------------------- | ------------------------------------------- |
| A — RTF                     | Simple one-shot tasks                       |
| B — CO-STAR                 | Professional documents, business writing    |
| C — RISEN                   | Complex multi-step projects                 |
| D — CRISPE                  | Creative work, brand voice                  |
| E — Chain of Thought        | Logic, math, analysis, debugging            |
| F — Few-Shot                | Consistent structured output                |
| G — File-Scope              | Cursor, Windsurf, Copilot — code editing AI |
| H — ReAct + Stop Conditions | Claude Code, Devin — autonomous agents      |
| I — Visual Descriptor       | Midjourney, DALL-E, Stable Diffusion, Sora  |
| J — Reference Image Editing | Editing existing image with reference       |
| K — ComfyUI                 | ComfyUI node-based workflows                |
| L — Prompt Decompiler       | Breaking down/adapting existing prompts     |
| M — Opus 4.7 Task Brief     | Complex agentic tasks on Claude Opus 4.7    |

---

## Template A — RTF

_Role, Task, Format. For fast one-shot tasks._

```
Role: [One sentence defining who the AI is]
Task: [Precise verb + what to produce]
Format: [Exact output format and length]
```

---

## Template B — CO-STAR

_Context, Objective, Style, Tone, Audience, Response. For professional docs._

```
Context: [Background]
Objective: [Exact goal]
Style: [formal / conversational / technical]
Tone: [authoritative / empathetic / urgent / neutral]
Audience: [Who reads this]
Response: [Format, length, structure]
```

---

## Template C — RISEN

_Role, Instructions, Steps, End Goal, Narrowing. For complex multi-step._

```
Role: [Expert identity]
Instructions: [Overall task]
Steps:
  1. [First action]
  2. [Second action]
  3. [Continue as needed]
End Goal: [What final output must achieve]
Narrowing: [Constraints, scope limits, exclusions]
```

---

## Template D — CRISPE

_Capacity, Role, Insight, Statement, Personality, Experiment. For creative work._

```
Capacity: [Expertise needed]
Role: [Specific persona]
Insight: [Key background shaping response]
Statement: [Core task]
Personality: [Tone and style]
Experiment: [Request variants to explore]
```

---

## Template E — Chain of Thought

_For logic, math, debugging. ONLY standard models (Claude, GPT, Gemini). NEVER o3/R1._

```
[Task statement]

Before answering, think through this carefully:
<thinking>
1. What is the actual problem?
2. What constraints must the solution respect?
3. What are the possible approaches?
4. Which approach is best and why?
</thinking>

Give your final answer in <answer> tags only.
```

---

## Template F — Few-Shot

_When output format is easier to show than describe. 2-5 examples._

```
[Task instruction]

<examples>
  <example>
    <input>[example input 1]</input>
    <output>[example output 1]</output>
  </example>
  <example>
    <input>[example input 2]</input>
    <output>[example output 2]</output>
  </example>
</examples>

Now apply this exact pattern to: [actual input]
```

---

## Template G — File-Scope

_For Cursor, Windsurf, Copilot. Prevents editing wrong file._

```
File: [exact/path/to/file.ext]
Function/Component: [exact name]

Current Behavior: [What this code does now]
Desired Change: [What it should do after]

Scope:
Only modify [function / component / section].
Do NOT touch: [list everything to leave unchanged]

Constraints:
- Language/framework: [specify version]
- Do not add dependencies not in [package.json]
- Preserve existing [type signatures / API contracts]

Done When: [Exact condition confirming success]
```

---

## Template H — ReAct + Stop Conditions

_For Claude Code, Devin, AutoGPT. Prevents runaway loops._

```
Objective: [Single unambiguous goal]

Starting State: [Current file structure / environment]
Target State: [What should exist when done]

Allowed Actions:
- [Specific action the agent may take]

Forbidden Actions:
- Do NOT modify files outside [scope]
- Do NOT delete files without showing diff

Stop Conditions:
Pause and ask when:
- A file would be permanently deleted
- Two valid paths exist affecting architecture
- An error cannot be resolved in 2 attempts

Checkpoints:
After each step: ✅ [what was completed]
```

---

## Template I — Visual Descriptor

_For Midjourney, DALL-E 3, Stable Diffusion, Sora, Runway._

```
Subject: [Main subject — specific]
Action/Pose: [What subject is doing]
Setting: [Where scene takes place]
Style: [photorealistic / cinematic / anime / oil painting]
Mood: [dramatic / serene / eerie / joyful]
Lighting: [golden hour / studio / neon / overcast]
Color Palette: [dominant colors]
Composition: [wide shot / close-up / aerial]
Aspect Ratio: [16:9 / 1:1 / 9:16]
Negative Prompts: [blurry, watermark, extra fingers, low quality]
```

---

## Template J — Reference Image Editing

_When user has existing image to modify. ALWAYS tell user to attach image first._

```
Reference image: [attached / URL]
What to keep exactly the same: [list everything unchanged]
What to change: [specific edit only]
How much to change: [subtle / moderate / significant]
Style consistency: maintain exact style, lighting, mood
Negative prompt: [what to avoid introducing]
```

---

## Template K — ComfyUI

_Always output Positive and Negative prompts separately. Ask checkpoint model first._

```
POSITIVE PROMPT:
[subject], [style], [mood], [lighting], [composition], [quality boosters]

NEGATIVE PROMPT:
[blurry, low quality, watermark, extra limbs, bad anatomy, distorted]

CHECKPOINT: [model name]
SAMPLER: Euler a
CFG SCALE: 7
STEPS: 20-30
RESOLUTION: [width x height — divisible by 64]
```

---

## Template L — Prompt Decompiler

_For breaking down, adapting, or splitting existing prompts._

**Break down:**

```
Original prompt: [paste]
Structure analysis:
- Role/Identity: [what and why]
- Task: [action requested]
- Constraints: [limits set]
- Format: [output shape expected]
- Weaknesses: [what's missing]
Recommended fix: [rewritten version]
```

**Adapt:**

```
Original ([source tool]): [original]
Adapted for [target tool]: [rewritten]
Key changes: [list with reasons]
```

---

## Template M — Opus 4.7 Task Brief

_For complex/agentic tasks on Claude Opus 4.7. Front-loads everything._

```
## Objective
[What needs to be done — one clear sentence + WHY]

## Context
[What exists now — files, current behavior, what was tried]

## Target State
[What done looks like — specific files, behavior, tests]

## Scope
- Work only in: [specific files/directories]
- Do NOT touch: [forbidden files]

## Constraints
- [Stack version, naming conventions, no new deps without asking]
- Only make changes directly requested.

## Acceptance Criteria
- [ ] [Binary check 1]
- [ ] [Binary check 2]

## Stop Conditions
Stop and ask before:
- Deleting any file
- Adding any dependency
- Modifying database schema

## Progress
After each step: ✅ [what was done] — [file(s) affected]
```
