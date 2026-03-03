FROM oven/bun:1.3.0 AS base
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

FROM base AS deps
COPY package.json bun.lock turbo.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/auth/package.json packages/auth/package.json
COPY packages/config-eslint/package.json packages/config-eslint/package.json
COPY packages/config-tailwind/package.json packages/config-tailwind/package.json
COPY packages/config-typescript/package.json packages/config-typescript/package.json
COPY packages/database/package.json packages/database/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/ui/package.json packages/ui/package.json
RUN bun install --frozen-lockfile

FROM deps AS build
COPY . .
RUN bun run --filter @repo/database prisma:generate
RUN bun run build

FROM base AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL=file:./dev.db

COPY --from=build /app ./
EXPOSE 3000

CMD ["sh", "-c", "bunx prisma migrate deploy --schema packages/database/prisma/schema.prisma && bun apps/api/src/index.tsx"]
