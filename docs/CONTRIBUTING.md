# Contributing to DevFlow Pro

First off, thank you for considering contributing to DevFlow Pro! 🎉

It's people like you that make DevFlow Pro such a great tool. We welcome contributions from everyone, whether it's a bug fix, new feature, documentation update, or just a typo fix.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Find an Issue

- Look for issues labeled [`good first issue`](https://github.com/devflow/devflow-pro/labels/good%20first%20issue) — these are great for newcomers
- Check [`help wanted`](https://github.com/devflow/devflow-pro/labels/help%20wanted) for issues where we need community help
- Browse [`enhancement`](https://github.com/devflow/devflow-pro/labels/enhancement) for feature requests

### No Issue Exists?

If you've found a bug or have a feature idea:

1. **Search existing issues** to avoid duplicates
2. **Open a new issue** with a clear title and description
3. **Wait for feedback** before starting major work

## How to Contribute

### Reporting Bugs

Create an issue with:

- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, version, etc.)
- Screenshots if applicable

### Suggesting Features

We love feature suggestions! Please include:

- Problem you're trying to solve
- Proposed solution
- Alternative solutions considered
- Any relevant examples

### Submitting Code

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write/update tests
5. Commit with conventional commits
6. Push and open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/devflow-pro.git
cd devflow-pro

# Add upstream remote
git remote add upstream https://github.com/devflow/devflow-pro.git

# Install dependencies
npm install

# Set up pre-commit hooks
npm run prepare

# Run the development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint
```

## Pull Request Process

### Before Submitting

- [ ] Tests pass locally (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Documentation updated if needed
- [ ] Commit messages follow [Conventional Commits](https://conventionalcommits.org/)

### PR Guidelines

1. **Title**: Use conventional commit format (`feat: add new feature`)
2. **Description**: Explain what, why, and how
3. **Link Issues**: Reference related issues (`Fixes #123`)
4. **Small PRs**: Keep changes focused and reviewable

### Review Process

1. Maintainers will review within 3 business days
2. Address feedback with new commits
3. Once approved, maintainers will merge

## Style Guidelines

### Code Style

- Use Prettier for formatting
- Follow ESLint rules
- Write meaningful variable names
- Comment complex logic

### Commit Messages

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

### Documentation

- Use clear, concise language
- Include code examples
- Keep README up to date
- Add JSDoc comments for public APIs

## Community

- 💬 [Discord](https://discord.gg/devflow)
- 🐦 [Twitter](https://twitter.com/devflowpro)
- 📧 [Email](mailto:contributors@devflow.pro)

---

Thank you for contributing! 🙏
