import { prisma } from "@lib/prisma";
import bcrypt from "bcrypt";

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: { tenant: true },
  });
}

export async function createUserWithTenant(data: {
  name: string;
  restaurantName: string;
  slug: string;
  email: string;
  password: string;
}) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.$transaction(async (tx) => {
    const tenant = await tx.tenant.create({
      data: {
        name: data.restaurantName,
        slug: data.slug,
      },
    });

    await tx.menuStyle.create({
      data: {
        tenantId: tenant.id,
      },
    });

    await tx.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        tenantId: tenant.id,
      },
    });

    return tenant;
  });
}

export async function userExistsByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}