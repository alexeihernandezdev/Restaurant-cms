import { prisma } from "../src/lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  const userCount = await prisma.user.count();

  if (userCount > 0) {
    console.log("Ya existen usuarios en la base de datos. Seed omitido.");
    return;
  }

  const tenantName = process.env.SEED_TENANT_NAME || "Restaurant";
  const tenantSlug = process.env.SEED_TENANT_SLUG || "restaurant";
  const userEmail = process.env.SEED_USER_EMAIL || "admin@restaurant.com";
  const userPassword = process.env.SEED_USER_PASSWORD || "admin123";
  const userName = process.env.SEED_USER_NAME || "Admin";

  const tenant = await prisma.tenant.create({
    data: {
      name: tenantName,
      slug: tenantSlug,
    },
  });

  const hashedPassword = await bcrypt.hash(userPassword, 10);

  await prisma.user.create({
    data: {
      name: userName,
      email: userEmail,
      password: hashedPassword,
      tenantId: tenant.id,
    },
  });

  console.log(`Usuario seed creado:`);
  console.log(`  Email: ${userEmail}`);
  console.log(`  Password: ${userPassword}`);
  console.log(`  Tenant: ${tenantName}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
