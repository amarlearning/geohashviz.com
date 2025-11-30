# Git Hooks Configuration

This directory contains Git hooks managed by [Husky](https://typicode.github.io/husky/).

## Hooks

### pre-commit
Runs on every `git commit`:
- Formats staged files with Prettier (via lint-staged)
- Runs TypeScript type checking
- Runs all tests

**Fast checks** - Only formats changed files, but runs full type-check and tests.

### pre-push
Runs on every `git push`:
- Formats all code with Prettier
- Runs TypeScript type checking
- Runs all tests
- Builds the project for production

**Full CI simulation** - Ensures your code will pass CI before pushing.

## Bypassing Hooks

If you need to bypass hooks (not recommended):

```bash
# Skip pre-commit hook
git commit --no-verify -m "message"

# Skip pre-push hook
git push --no-verify
```

## Manual Validation

Run all checks manually:

```bash
npm run validate
```

This runs the same checks as CI:
1. Format check
2. Type check
3. Tests
4. Build

## Troubleshooting

If hooks aren't running:

```bash
# Reinstall hooks
npm run prepare

# Make hooks executable
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```
