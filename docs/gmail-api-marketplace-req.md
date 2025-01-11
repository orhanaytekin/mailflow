# Gmail API & Marketplace Requirements

## Required Steps Before Publishing

1. Gmail API must be enabled in your Google Cloud Project
2. OAuth consent screen must be configured
3. Your app must be verified by Google if:
   - It's for external users (outside your organization)
   - It requests sensitive or restricted scopes (which Gmail API does)

## Important Considerations

### OAuth Verification Timeline

- Google's verification process typically takes 4-6 weeks
- You need to submit documentation, privacy policy, and demonstrate use cases
- Cost: Free, but requires thorough preparation

### Development Options While Waiting

1. **Internal Testing** (No Verification Needed):
   - Can test with up to 100 users
   - Must add test users manually
   - Perfect for development phase

2. **Organization Internal** (Simplified Process):
   - If building for just your organization
   - No verification needed
   - Limited to users within your Google Workspace domain

## Recommendation

1. Start development using internal testing mode
2. Begin the verification process early if you plan to publish publicly
3. Consider starting with an internal deployment if you're building for a specific organization

## Not Blockers for Development

- You can still develop and test the app
- You can deploy to test users
- You can build all functionality

## Real Blockers

- Cannot publish publicly without verification
- Cannot exceed 100 test users without verification
- Cannot access Gmail API without enabling it first
