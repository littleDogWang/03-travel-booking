# 08 Security

> Trust boundaries and unsafe sample defaults.

## Trust Boundaries

The browser is untrusted. Next.js owns the App Certificate, token signing and Agent start/stop. Agora cloud processes voice and invokes only configured business tools. `change_requested` and `cancel_requested` are request states, not a completed ticket change, cancellation or refund. No airline schedule, fare, seat inventory, payment or live traveler-authentication system is connected.

## Secrets

Keep certificates and opt-in provider keys server-side in .env.local or deployment secret storage. The App ID is public and is a Docker build argument; the certificate is never a build argument. Ignore env files, .agora bindings, generated logs and local business data in Git/images. Never include them in diagnostics or screenshots. Rotate exposed credentials with their owner and redeploy the new runtime values.

## Authentication And Authorization

Token routes issue scoped expiring RTC/RTM credentials; preserve renewal of both client identities. Sample start/stop/business endpoints are not production login or tenant authorization. Random call/session capabilities only scope the simulation; they do not authenticate a real customer or patient. Add application authentication/authorization before real-user deployment.

## Input And Output Handling

Validate route and tool arguments, preserve explicit confirmation and return actual errors. Never reveal secrets, other sessions or fixture identity keys to help a caller match. Do not derive contact permission or business success from transcript keywords. Use fictional data.

Tool-mode orders and replay records live in process-local Maps. Use one long-lived Node process for a consistent demo; restart resets state. Shared durable storage and real traveler authorization are required before multi-instance or real booking-system use.

The image runs as UID 1001 and owns .scenario-data; mounted storage must remain writable by that user. Existing session/storage lifetime constraints still apply inside a container.

## Security Reporting

Report privately to security@agora.io. Do not open public issues containing credentials or personal data.

## Related Deep Dives

- [Tokens](L2/token_model.md)
