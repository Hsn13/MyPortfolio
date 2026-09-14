Perform a full repository review as a senior engineer and quality gate.

Review scope:
- Check for missing imports, broken exports, invalid component usage, and TypeScript issues.
- Validate that all page routes and navigation links point to real files in `app/`.
- Inspect for security risks such as exposed secrets, unsafe data handling, XSS-prone rendering, or improper API usage.
- Verify accessibility and responsive behavior for major UI sections.
- Check whether project code compiles cleanly and matches the current app architecture.
- Identify dead code, duplicate logic, or incorrect assumptions that could cause runtime issues.

Deliver:
- A concise summary of findings.
- Exact file references.
- Severity labels for issues: critical, high, medium, low.
- Recommended fixes with the minimum safe change set.
- A final status stating whether the project is safe and working as a portfolio site.

Validation command to run when relevant:
- `npm run lint`
- `npm run build`
