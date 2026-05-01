import { prisma } from "../src/lib/prisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

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

  const categoriesData: Prisma.CategoryCreateInput[] = [
    { name: "Entradas", description: "Para abrir el apetito", order: 1, tenantId: tenant.id },
    { name: "Platos Principales", description: "El corazón de nuestra cocina", order: 2, tenantId: tenant.id },
    { name: "Postres", description: "El toque dulce perfecto", order: 3, tenantId: tenant.id },
    { name: "Bebidas", description: "Refrescos y cócteles", order: 4, tenantId: tenant.id },
  ];

  const categories = await Promise.all(
    categoriesData.map((data) => prisma.category.create({ data }))
  );

  const dishesData: Prisma.DishCreateInput[] = [
    // Entradas
    { name: "Bruschetta Mediterránea", description: "Pan tostado con tomate, albahaca y aceite de oliva extra virgin", price: new Prisma.Decimal("8.50"), imageUrl: "https://images.unsplash.com/photo-1572695157366-5e4ab235b5c4?w=400", available: true, order: 1, categoryId: categories[0].id, tenantId: tenant.id },
    { name: "Calamares Fritos", description: "Calamares crujientes con alioli casero", price: new Prisma.Decimal("12.00"), imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400", available: true, order: 2, categoryId: categories[0].id, tenantId: tenant.id },
    { name: "Carpaccio de Res", description: "Finas láminas de res con rúcula y parmesano", price: new Prisma.Decimal("14.00"), imageUrl: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?w=400", available: true, order: 3, categoryId: categories[0].id, tenantId: tenant.id },
    // Principales
    { name: "Risotto de Hongos", description: "Arroz arbóreo con mezcla de hongos y parmesano", price: new Prisma.Decimal("18.00"), imageUrl: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400", available: true, order: 1, categoryId: categories[1].id, tenantId: tenant.id },
    { name: "Pasta Carbonara", description: "Spaghetti con bacon, huevo, parmesano y pimienta negra", price: new Prisma.Decimal("16.50"), imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400", available: true, order: 2, categoryId: categories[1].id, tenantId: tenant.id },
    { name: "Salmón a la Parrilla", description: "Filete de salmón con verduras salteadas y salsa de limón", price: new Prisma.Decimal("24.00"), imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400", available: true, order: 3, categoryId: categories[1].id, tenantId: tenant.id },
    { name: "Filete de Res", description: " corte premium con puré de papá y salsa de vino tinto", price: new Prisma.Decimal("28.00"), imageUrl: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400", available: true, order: 4, categoryId: categories[1].id, tenantId: tenant.id },
    { name: "Pollo al Curry", description: "Pechuga de pollo en salsa curry con arroz basmati", price: new Prisma.Decimal("19.00"), imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400", available: true, order: 5, categoryId: categories[1].id, tenantId: tenant.id },
    // Postres
    { name: "Tiramisú", description: "Postre clásico italiano con café y mascarpone", price: new Prisma.Decimal("9.00"), imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400", available: true, order: 1, categoryId: categories[2].id, tenantId: tenant.id },
    { name: "Cheesecake de Frutos Rojos", description: "Tarta cremosa con cobertura de frutos del bosque", price: new Prisma.Decimal("10.00"), imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400", available: true, order: 2, categoryId: categories[2].id, tenantId: tenant.id },
    { name: "Brownie con Helado", description: "Bizcocho de chocolate con bola de helado de vainilla", price: new Prisma.Decimal("8.50"), imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400", available: true, order: 3, categoryId: categories[2].id, tenantId: tenant.id },
    // Bebidas
    { name: "Limonada Casera", description: "Limón fresco conhierbabuena y miel", price: new Prisma.Decimal("5.00"), imageUrl: "https://images.unsplash.com/photo-1621263764928-df1449c5e859?w=400", available: true, order: 1, categoryId: categories[3].id, tenantId: tenant.id },
    { name: "Mojito", description: "Ron blanco, hierbabuena, lima, azúcar y soda", price: new Prisma.Decimal("9.00"), imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400", available: true, order: 2, categoryId: categories[3].id, tenantId: tenant.id },
    { name: "Café Espresso", description: "Café concentrado italiano", price: new Prisma.Decimal("3.00"), imageUrl: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400", available: true, order: 3, categoryId: categories[3].id, tenantId: tenant.id },
  ];

  await Promise.all(dishesData.map((data) => prisma.dish.create({ data })));

  console.log(`Seed completado:`);
  console.log(`  Email: ${userEmail}`);
  console.log(`  Password: ${userPassword}`);
  console.log(`  Tenant: ${tenantName}`);
  console.log(`  Categorías: ${categories.length}`);
  console.log(`  Platos: ${dishesData.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
