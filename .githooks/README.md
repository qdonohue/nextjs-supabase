# Git Hooks

This project includes git hooks to maintain code quality automatically.

## Post-Commit Hook

The post-commit hook automatically runs ESLint with `--fix` and TypeScript type checking after each commit.

### What it does:
1. Runs `npm run lint -- --fix` after every commit
2. Runs `npm run typecheck` to verify TypeScript types
3. If the linter makes changes, automatically stages them and amends the commit
4. If TypeScript errors are found, the hook fails and prevents the commit
5. Prevents infinite loops with `SKIP_POST_COMMIT_LINT` environment variable

### Setup:
The hook is automatically installed in `.git/hooks/post-commit` and should work out of the box.

### Disabling:
If you need to temporarily disable the hook, you can:
```bash
# Rename the hook to disable it
mv .git/hooks/post-commit .git/hooks/post-commit.disabled

# Or skip it for a single commit
SKIP_POST_COMMIT_LINT=1 git commit -m "your message"
```

### Re-enabling:
```bash
# Rename it back
mv .git/hooks/post-commit.disabled .git/hooks/post-commit
```

## Benefits

- Ensures consistent code formatting across all commits
- Automatically fixes common linting issues  
- Catches TypeScript errors early in the development process
- Reduces the need for separate formatting commits
- Maintains clean git history with properly formatted and type-safe code
- Prevents commits with TypeScript errors from entering the repository