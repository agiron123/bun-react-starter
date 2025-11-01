import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";

const prisma = new PrismaClient();

async function main() {
  const email = "test@example.com";
  const plainPassword = "Password123!";

  const hashedPassword = await hashPassword(plainPassword);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
    },
  });

  console.log(`Seeded user ${user.email} with password ${plainPassword}`);
}

main()
  .catch(err => {
    console.error("Seeding failed", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
