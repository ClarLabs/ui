# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automating builds, tests, and deployments.

## Workflows

### 1. Build Pipeline (`build.yml`)

**Trigger**: Push or Pull Request to `main` branch

**What it does**:
- Builds the library with Vite
- Builds Storybook documentation
- Uploads Storybook to FTP server (main branch only)

**Required Secrets**:
- `FTP_SERVER` - FTP server hostname (e.g., `ftp.example.com`)
- `FTP_USERNAME` - FTP username
- `FTP_PASSWORD` - FTP password
- `FTP_SERVER_DIR` - Target directory on FTP server (e.g., `/public_html/storybook/`)

### 2. NPM Publish Pipeline (`npm-publish.yml`)

**Triggers**:
- Automatically on GitHub Release creation
- Manually via workflow dispatch (with version bump)

**What it does**:
- Installs dependencies and runs tests
- Builds the package
- Bumps version (manual trigger only)
- Publishes to NPM with provenance
- Creates GitHub release (manual trigger only)

**Required Secrets**:
- `NPM_TOKEN` - NPM authentication token with publish permissions

## Setup Instructions

### Setting up NPM Publishing

1. **Create an NPM Access Token**:
   - Go to https://www.npmjs.com/
   - Sign in to your account
   - Click your profile picture → Access Tokens
   - Click "Generate New Token" → "Granular Access Token"
   - Configure the token:
     - Name: `GitHub Actions - @clarlabs/ui`
     - Expiration: Choose your preferred duration
     - Packages and scopes: Select your package
     - Permissions: Check "Read and write"
   - Copy the generated token

2. **Add NPM Token to GitHub Secrets**:
   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste your NPM token
   - Click "Add secret"

3. **Add FTP Credentials (for Storybook deployment)**:
   - In the same Secrets page, add the following secrets:
     - `FTP_SERVER`: Your FTP server hostname
     - `FTP_USERNAME`: Your FTP username
     - `FTP_PASSWORD`: Your FTP password
     - `FTP_SERVER_DIR`: Target directory path

### Publishing to NPM

#### Method 1: Manual Workflow Dispatch (Recommended)

1. Go to Actions tab in your GitHub repository
2. Select "Publish to NPM" workflow
3. Click "Run workflow"
4. Choose version bump type:
   - `patch` - Bug fixes (0.1.0 → 0.1.1)
   - `minor` - New features (0.1.0 → 0.2.0)
   - `major` - Breaking changes (0.1.0 → 1.0.0)
5. Click "Run workflow"

This will:
- Bump the version in package.json
- Create a git tag
- Publish to NPM
- Create a GitHub release

#### Method 2: GitHub Release

1. Go to Releases in your GitHub repository
2. Click "Draft a new release"
3. Create a new tag (e.g., `v0.1.1`)
4. Fill in release title and description
5. Click "Publish release"

This will automatically publish to NPM without bumping the version in package.json.

## Package Configuration

The package is configured in `package.json`:

- **Package name**: `@clarlabs/ui`
- **Entry points**:
  - CommonJS: `./dist/index.js`
  - ES Module: `./dist/index.mjs`
  - TypeScript types: `./dist/index.d.ts`
  - Styles: `./dist/styles.css` or `./dist/index.css`
- **Published files**: Only the `dist` folder
- **Access**: Public (scoped package)

## Usage After Publishing

Users can install your package with:

```bash
npm install @clarlabs/ui
```

Then import components:

```typescript
import { Button, Input, Modal } from '@clarlabs/ui'
import '@clarlabs/ui/dist/index.css'
```

## Troubleshooting

### Publishing fails with "403 Forbidden"

- Check that your NPM token has publish permissions
- Verify the token hasn't expired
- Ensure you have permissions to publish to the `@clarlabs` scope

### Version already exists

- NPM doesn't allow publishing the same version twice
- Bump the version in package.json before publishing
- Or use the manual workflow dispatch to automatically bump the version

### Build fails

- Check that all dependencies are correctly specified
- Ensure the build script works locally: `npm run build`
- Review the GitHub Actions logs for specific errors

## Best Practices

1. **Always test locally before publishing**:
   ```bash
   npm run build
   npm pack
   ```

2. **Follow semantic versioning**:
   - MAJOR: Breaking changes
   - MINOR: New features (backwards compatible)
   - PATCH: Bug fixes

3. **Update CHANGELOG.md** before each release

4. **Use conventional commits** for automatic changelog generation

5. **Test the package** in a separate project before publishing:
   ```bash
   npm pack
   # Creates a .tgz file
   # Install in test project: npm install /path/to/clarlabs-ui-0.1.0.tgz
   ```
