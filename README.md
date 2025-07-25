# NotaBene

NotaBene is a full-stack notes application inspired by
[Simplenote](https://simplenote.com/). NotaBene is built on a C#/ASP.NET Core
REST API backend and TypeScript/Angular SPA frontend.

## Tech Stack

**Backend:**

- C# / ASP.NET Core 8 Web API framework
- Entity Framework Core for data modeling and validation
- PostgreSQL in dev/test environments
- ASP.NET Core Identity for user authentication and authorization

**Frontend:**

- TypeScript / Angular 18
- Standalone components
- Signal-based centralized state management

## CI/CD

The project uses GitHub Actions for continuous integration and deployment
(CI/CD). On each pull request or push to `main`:

- The project is built using the .NET CLI/Node.js.
- Playwright API tests run against an internally hosted development build.
