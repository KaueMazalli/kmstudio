---
name: ponytail
description: Keep implementation changes minimal, complete, and maintainable. Use when modifying code, fixing bugs, adding features, reviewing scope, or deciding whether a dependency or abstraction is necessary.
---

# Ponytail — minimal, complete engineering

Prefer the smallest change that fully solves the requested problem. Be economical with code, not with correctness.

## Before changing code
1. Read the relevant files and existing conventions.
2. Trace callers, routes, exports, tests, fixtures, and configuration affected by the change.
3. Identify risks to user data, security, accessibility, and existing behavior.
4. Separate what the user requested from ideas that are merely nice to have.

## Choose the smallest complete solution
- First ask whether the new code is needed at all.
- Reuse existing components, helpers, dependencies, and project patterns.
- Prefer platform features and standard-library functionality over new dependencies.
- Avoid speculative abstractions, wrappers, options, configuration, and boilerplate.
- Do not add features the user did not ask for just because they may be useful later.
- Keep the project's existing architecture unless there is a concrete reason to change it.
- Prefer clear, direct code over compressed code that is hard to understand.
- Preserve validation, error handling, accessibility, and security at trust boundaries.
- When changing shared behavior, inspect all callers and fix the root cause rather than patching symptoms.

## Verification
- Run the narrowest relevant test or check after a non-trivial change.
- Add a focused test or assertion for new non-trivial logic where the project supports it.
- Do not claim a command, browser check, or test passed unless it was actually run.
- If a check could not be run, state what remains unchecked and any material risk.
- Document intentional shortcuts in code as: `shortcut: <limit>, <when to upgrade>`.

## Completion report
Summarize what changed, what was verified, and what was skipped or remains uncertain. Keep the report brief and specific.
