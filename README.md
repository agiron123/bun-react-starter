# bun-react-tailwind-shadcn-template

To install dependencies:

```bash
bun install
```

To start a development server:

```bash
bun dev
```

To run for production:

```bash
bun start
```

## Docker Compose (Dev + Hot Reload)

Run the app in Docker with live reload while editing files locally:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Stop it:

```bash
docker compose -f docker-compose.dev.yml down
```

Notes:
- Source code is bind-mounted into the container for hot reload.
- Dependencies are kept in Docker-managed volumes (`bun_node_modules`, `bun_cache`) for faster restarts.
- The app is available at `http://localhost:3000`.

This project was created using `bun init` in bun v1.3.0. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
