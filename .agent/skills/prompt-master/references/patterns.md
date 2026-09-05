# Credit-Killing Patterns Reference

37 patterns that waste tokens and cause re-prompts. Read when fixing bad prompts.

---

## Task Patterns

| #   | Pattern                   | Bad Example            | Fixed                                                |
| --- | ------------------------- | ---------------------- | ---------------------------------------------------- |
| 1   | **Vague task verb**       | "help me with my code" | "Refactor `getUserData()` to use async/await"        |
| 2   | **Two tasks in one**      | "explain AND rewrite"  | Split into two prompts                               |
| 3   | **No success criteria**   | "make it better"       | "Done when function passes tests and handles null"   |
| 4   | **Over-permissive agent** | "do whatever it takes" | Explicit allowed + forbidden actions                 |
| 5   | **Emotional description** | "it's totally broken"  | "Throws TypeError on line 43 when user is null"      |
| 6   | **Build-the-whole-thing** | "build my entire app"  | Break into Prompt 1 (scaffold), 2 (core), 3 (polish) |
| 7   | **Implicit reference**    | "add the other thing"  | Always restate the full task                         |

---

## Context Patterns

| #   | Pattern                     | Bad Example                   | Fixed                                            |
| --- | --------------------------- | ----------------------------- | ------------------------------------------------ |
| 8   | **Assumed prior knowledge** | "continue where we left off"  | Include Memory Block                             |
| 9   | **No project context**      | "write a cover letter"        | Include role, experience, target                 |
| 10  | **Forgotten stack**         | Contradicts prior tech choice | Include Memory Block with stack                  |
| 11  | **Hallucination invite**    | "what do experts say?"        | "Cite only sources you are certain of."          |
| 12  | **Undefined audience**      | "write for users"             | "Non-technical B2B buyers, decision-maker level" |
| 13  | **No prior failures**       | (blank)                       | "Already tried X, didn't work because Y"         |

---

## Format Patterns

| #   | Pattern                   | Bad Example               | Fixed                                          |
| --- | ------------------------- | ------------------------- | ---------------------------------------------- |
| 14  | **Missing output format** | "explain this"            | "3 bullets, each under 20 words"               |
| 15  | **Implicit length**       | "write a summary"         | "Summary in exactly 3 sentences"               |
| 16  | **No role assignment**    | (blank)                   | "You are a senior backend engineer"            |
| 17  | **Vague aesthetic**       | "make it professional"    | "Monochrome palette, 16px base font"           |
| 18  | **No negative prompts**   | "a portrait of a woman"   | Add: "no watermark, no blur, no extra fingers" |
| 19  | **Prose for Midjourney**  | Full descriptive sentence | "subject, style, mood, --ar 16:9 --v 6"        |

---

## Scope Patterns

| #   | Pattern                     | Bad Example                 | Fixed                                        |
| --- | --------------------------- | --------------------------- | -------------------------------------------- |
| 20  | **No scope boundary**       | "fix my app"                | "Fix only login validation in `src/auth.js`" |
| 21  | **No stack constraints**    | "build a React component"   | "React 18, TypeScript strict, Tailwind only" |
| 22  | **No stop condition**       | "build the whole feature"   | Explicit stop conditions + ✅ checkpoints    |
| 23  | **No file path for IDE**    | "update the login function" | "`handleLogin()` in `src/pages/Login.tsx`"   |
| 24  | **Wrong template**          | GPT prose in Cursor         | Use File-Scope Template G                    |
| 25  | **Pasting entire codebase** | Full repo context           | Scope to relevant function only              |

---

## Reasoning Patterns

| #   | Pattern                      | Bad Example                   | Fixed                              |
| --- | ---------------------------- | ----------------------------- | ---------------------------------- |
| 26  | **No CoT for logic**         | "which is better?"            | "Think through both step by step"  |
| 27  | **CoT on reasoning models**  | "think step by step" to o3    | REMOVE — they think internally     |
| 28  | **Inter-session memory**     | "you already know my project" | Re-provide Memory Block            |
| 29  | **Contradicting prior work** | Ignores earlier architecture  | Include all established decisions  |
| 30  | **No grounding rule**        | "summarize what experts say"  | "Say [uncertain] if not confident" |

---

## Agentic Patterns

| #   | Pattern                   | Bad Example              | Fixed                                      |
| --- | ------------------------- | ------------------------ | ------------------------------------------ |
| 31  | **No starting state**     | "build me a REST API"    | "Empty Node.js project, Express installed" |
| 32  | **No target state**       | "add authentication"     | "JWT verify in `/src/middleware/auth.js`"  |
| 33  | **Silent agent**          | No progress output       | "After each step: ✅ [what was completed]" |
| 34  | **Unlocked filesystem**   | No file restrictions     | "Only edit files inside `src/`"            |
| 35  | **No human review**       | Agent decides everything | "Stop before: deleting files, adding deps" |
| 36  | **Vague first turn Opus** | "fix the auth bug"       | Use Template M, front-load everything      |
| 37  | **Context rot**           | 60+ turns same session   | New task = new session. /compact at 50%    |
