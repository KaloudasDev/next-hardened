# Contributing to Next.js Secure Starter

<div align="center">
  
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
  [![Security](https://img.shields.io/badge/Security-Reviewed-blue.svg?style=flat-square)](SECURITY.md)
  [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
  
</div>

First off, thank you for considering contributing to this security-hardened Next.js starter. This project maintains **enterprise-level security standards**, and every contribution must pass rigorous security review.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Security First](#security-first)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Security Review Process](#security-review-process)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)
- [Security Vulnerability Reporting](#security-vulnerability-reporting)
- [Community](#community)

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md) that all contributors must follow. By participating, you are expected to uphold this code. Report unacceptable behavior to conduct@yourdomain.com.

## Security First

### IMPORTANT SECURITY NOTICE

This is a **security-hardened template**. All contributions must:

1. **NOT weaken or bypass existing security measures**
2. **Maintain all security headers and configurations**
3. **Pass security review before merge**
4. **Include security considerations in PR description**
5. **Not introduce new dependencies without security audit**

### Security Review Required For:

- Any change to `next.config.ts`
- Modifications to security headers
- New dependencies or package updates
- Changes to authentication/authorization
- Modifications to CSP or other security policies
- Any code that handles user input
- Changes to build process or deployment

## Getting Started

### Prerequisites

- Node.js 18+ (LTS version recommended)
- npm 9+ or yarn 1.22+
- Git
- Basic understanding of:
  - Next.js 15+ architecture
  - TypeScript 5+
  - Web security (OWASP Top 10)
  - React 19+ patterns

### Development Setup

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/KaloudasDev/next-hardened.git
cd next-hardened

# Add upstream remote
git remote add upstream https://github.com/KaloudasDev/next-hardened.git

# Install dependencies
npm install

# Run development server
npm run dev

# Run security audit
npm audit --production
```

## Development Workflow

### Branch Naming Convention

```
feature/[issue-number]-brief-description
fix/[issue-number]-brief-description
security/[issue-number]-brief-description
docs/[issue-number]-brief-description
test/[issue-number]-brief-description
```

Examples:
- `feature/42-add-rate-limiting`
- `security/87-update-csp-headers`
- `fix/103-fix-xss-vulnerability`

### Commit Message Convention

We follow **Conventional Commits** with security emphasis:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature (requires security review)
- `fix`: Bug fix (requires security review)
- `security`: Security enhancement (high priority review)
- `perf`: Performance improvement
- `docs`: Documentation only
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code change that neither fixes bug nor adds feature
- `test`: Adding or correcting tests
- `chore`: Changes to build process, tools, etc.

**Examples:**
```
security: add rate limiting to API routes
fix: resolve XSS vulnerability in user input
feat(auth): implement MFA support
docs: update security headers documentation
```

## Security Review Process

### For Contributors

1. **Pre-Submission Checklist**
   - [ ] Code follows security best practices
   - [ ] No new vulnerabilities introduced
   - [ ] All existing security measures maintained
   - [ ] Dependencies checked for known vulnerabilities
   - [ ] Input validation and output encoding implemented
   - [ ] Error handling doesn't leak sensitive info

2. **PR Description Must Include**
   - Security impact assessment
   - Any new dependencies and their security audit
   - Testing performed (including security tests)
   - Screenshots for UI changes
   - Link to related issue (if applicable)

3. **Post-Submission**
   - Security team will review within 48 hours
   - May request changes or clarifications
   - Final approval requires security lead sign-off

### Security Review Timeline

| Priority | Review Time | Response |
|----------|-------------|----------|
| **Critical Security** | 4 hours | Emergency review |
| **High Security** | 24 hours | Priority review |
| **Medium Security** | 48 hours | Normal review |
| **Low Risk** | 72 hours | Regular review |

## Pull Request Guidelines

### PR Template

```markdown
## Description
[Describe your changes]

## Type of Change
- [ ] Security enhancement
- [ ] Bug fix (non-breaking)
- [ ] New feature (non-breaking)
- [ ] Breaking change
- [ ] Documentation update

## Security Impact Assessment
- [ ] No security impact
- [ ] Low (minor security improvement)
- [ ] Medium (significant security feature)
- [ ] High (critical security update)

## Testing Performed
- [ ] Unit tests
- [ ] Integration tests
- [ ] Security tests
- [ ] Manual testing

## Dependencies Added
[List any new dependencies and their security audit results]

## Checklist
- [ ] My code follows project security guidelines
- [ ] I have performed a self-security review
- [ ] I have commented complex security-related code
- [ ] I have updated documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] All tests pass locally
- [ ] Security headers remain intact
```

### PR Requirements

- Must pass all CI/CD checks
- Must have at least one security review approval
- Must be up-to-date with main branch
- Must include tests for new functionality
- Must update documentation
- Must not introduce new vulnerabilities

## Coding Standards

### TypeScript

- Strict mode enabled
- Explicit return types
- No `any` type (exceptions require security review)
- Proper error handling with custom error types
- Input validation at boundaries

### React/Next.js

- Use Server Components by default
- Client Components only when necessary
- Proper error boundaries
- Secure data fetching patterns
- No sensitive data in client components

### Security Patterns

```typescript
// Secure pattern
import { headers } from 'next/headers';

async function getData() {
  'use server';
  // Server-side only - secure
  const apiKey = process.env.SECRET_KEY;
  // ... validate input
  // ... sanitize output
}

// Insecure pattern
// Never expose secrets to client
const apiKey = process.env.NEXT_PUBLIC_SECRET_KEY;
```

## Testing Requirements

### Required Tests

| Test Type | Required For | Coverage Target |
|-----------|--------------|-----------------|
| Unit Tests | All new code | 80% minimum |
| Integration Tests | API routes, auth | 70% minimum |
| Security Tests | All security features | 100% critical paths |
| E2E Tests | Critical user flows | Key scenarios |

### Security Test Scenarios

- XSS attempts
- SQL injection (where applicable)
- CSRF protection
- Rate limiting
- Authentication bypass
- Authorization checks
- Input validation
- Output encoding

## Documentation

### Required Documentation for PRs

1. **README updates** for user-facing changes
2. **Code comments** for complex security logic
3. **JSDoc** for public APIs
4. **Security considerations** in PR
5. **Examples** for new features

### Documentation Standards

```typescript
/**
 * Validates user input against security rules
 * 
 * @param input - User-provided string to validate
 * @returns Validated and sanitized string
 * @throws ValidationError if input fails security checks
 * 
 * @security
 * - Prevents XSS by encoding output
 * - Limits input length to 1000 chars
 * - Rejects dangerous patterns
 */
function validateUserInput(input: string): string {
  // Implementation
}
```

## Security Vulnerability Reporting

Do not report security vulnerabilities through public GitHub issues.

Instead, follow our [Security Policy](SECURITY.md):

1. Email: `security@yourdomain.com` (PGP encrypted)
2. Include detailed steps to reproduce
3. Allow 72 hours for initial response
4. Coordinate public disclosure

## Release Process

1. **Security Review** - All changes security-approved
2. **Testing** - Full test suite passes
3. **Documentation** - Updated
4. **CHANGELOG** - Updated
5. **Version Bump** - Semantic versioning
6. **Tag Release** - Git tag
7. **Publish** - npm and GitHub release
8. **Announce** - Community channels

## Getting Help

- Check existing [Issues](https://github.com/KaloudasDev/next-hardened/issues)
- Read [Documentation](https://github.com/KaloudasDev/next-hardened/wiki)
- Ask in [Discussions](https://github.com/KaloudasDev/next-hardened/discussions)
- Contact maintainers: `kaloudasdev@gmail.com`