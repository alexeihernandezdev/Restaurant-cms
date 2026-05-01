import type { CSSProperties } from "react";
import type { MenuStyle } from "../../../types";
import {
  RADIUS_VALUES,
  SPACING_VALUES,
  getFontFamily,
} from "../menu-styles/templates";

interface Dish {
  id: string;
  name: string;
  description: string | null;
  price: number | { toString: () => string };
  imageUrl: string | null;
  available: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
  dishes: Dish[];
}

export interface MenuDisplayTenant {
  name: string;
  slug: string;
  logoUrl: string | null;
  menuStyle: MenuStyle | null;
  categories: Category[];
}

interface MenuDisplayProps {
  tenant: MenuDisplayTenant;
  preview?: boolean;
}

const DEFAULT_STYLE: MenuStyle = {
  id: "default",
  tenantId: "default",
  template: "classic",
  primaryColor: "#1a1a1a",
  secondaryColor: "#f5f5f5",
  accentColor: "#d4a574",
  backgroundColor: "#ffffff",
  fontFamily: "inter",
  headingFont: "playfair",
  layout: "grid",
  cardStyle: "elevated",
  borderRadius: "medium",
  spacing: "cozy",
  showImages: true,
  showDescriptions: true,
  priceStyle: "inline",
  headerStyle: "centered",
  dividerStyle: "line",
  currency: "$",
  tagline: null,
  logoUrl: null,
  coverImageUrl: null,
};

function withAlpha(color: string, alphaHex: string) {
  if (!color || !color.startsWith("#")) return color;
  return `${color}${alphaHex}`;
}

function formatPrice(price: Dish["price"], currency: string): string {
  const num =
    typeof price === "number"
      ? price
      : Number(typeof price === "object" ? price.toString() : price);
  return `${currency}${num.toFixed(2)}`;
}

function Divider({ style, color }: { style: string; color: string }) {
  if (style === "none") return null;
  if (style === "dots") {
    return (
      <div
        className="my-3 flex items-center justify-center gap-1.5"
        aria-hidden
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1 w-1 rounded-full"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    );
  }
  if (style === "ornament") {
    return (
      <div
        className="my-3 flex items-center justify-center gap-3"
        aria-hidden
        style={{ color }}
      >
        <span
          className="h-px w-10"
          style={{ backgroundColor: "currentColor", opacity: 0.5 }}
        />
        <span className="text-sm tracking-widest">✦</span>
        <span
          className="h-px w-10"
          style={{ backgroundColor: "currentColor", opacity: 0.5 }}
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className="my-3 h-px w-12"
      style={{ backgroundColor: withAlpha(color, "55") }}
    />
  );
}

function PriceTag({
  price,
  style,
  color,
  currency,
}: {
  price: Dish["price"];
  style: string;
  color: string;
  currency: string;
}) {
  const formatted = formatPrice(price, currency);
  if (style === "pill") {
    return (
      <span
        className="shrink-0 rounded-full px-3 py-1 text-sm font-semibold"
        style={{ backgroundColor: color, color: "#fff" }}
      >
        {formatted}
      </span>
    );
  }
  if (style === "bold") {
    return (
      <span
        className="shrink-0 text-xl font-extrabold tracking-tight"
        style={{ color }}
      >
        {formatted}
      </span>
    );
  }
  return (
    <span className="shrink-0 text-lg font-bold" style={{ color }}>
      {formatted}
    </span>
  );
}

function getCardClasses(cardStyle: string): string {
  switch (cardStyle) {
    case "flat":
      return "";
    case "bordered":
      return "border";
    case "glass":
      return "backdrop-blur-md bg-white/40 border border-white/40 shadow-sm";
    case "elevated":
    default:
      return "shadow-md hover:shadow-xl transition-shadow";
  }
}

function getCardBackground(cardStyle: string, fallback: string): string {
  if (cardStyle === "glass") return "rgba(255, 255, 255, 0.55)";
  return fallback;
}

interface RenderContext {
  style: MenuStyle;
  radius: string;
  spacing: { gap: string; padding: string };
  bodyFont: string;
  headingFont: string;
}

function MenuHeader({
  tenant,
  ctx,
}: {
  tenant: MenuDisplayTenant;
  ctx: RenderContext;
}) {
  const { style, headingFont } = ctx;
  const { headerStyle } = style;

  if (headerStyle === "minimal") {
    return (
      <header
        className="border-b"
        style={{ borderColor: withAlpha(style.primaryColor, "15") }}
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            {tenant.logoUrl && (
              <img
                src={tenant.logoUrl}
                alt={tenant.name}
                className="h-10 w-10 object-contain"
              />
            )}
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ color: style.primaryColor, fontFamily: headingFont }}
            >
              {tenant.name}
            </h1>
          </div>
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: withAlpha(style.primaryColor, "99") }}
          >
            Carta
          </span>
        </div>
      </header>
    );
  }

  if (headerStyle === "hero") {
    return (
      <header className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${style.primaryColor} 0%, ${style.accentColor} 100%)`,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${withAlpha(style.accentColor, "aa")} 0%, transparent 60%)`,
          }}
        />
        <div className="relative container mx-auto px-6 py-20 text-center sm:py-28">
          {tenant.logoUrl && (
            <img
              src={tenant.logoUrl}
              alt={tenant.name}
              className="mx-auto mb-6 h-24 w-24 rounded-full bg-white/20 object-contain p-3 backdrop-blur"
            />
          )}
          <span className="mb-5 inline-block rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur">
            Carta digital
          </span>
          <h1
            className="text-balance text-5xl font-bold tracking-tight text-white sm:text-7xl"
            style={{ fontFamily: headingFont }}
          >
            {tenant.name}
          </h1>
          {style.tagline && (
            <p className="mx-auto mt-4 max-w-xl text-base text-white/85 sm:text-lg">
              {style.tagline}
            </p>
          )}
        </div>
      </header>
    );
  }

  if (headerStyle === "banner") {
    return (
      <header
        className="relative border-y"
        style={{
          borderColor: withAlpha(style.accentColor, "60"),
          backgroundColor: withAlpha(style.accentColor, "12"),
        }}
      >
        <div className="container mx-auto flex flex-col items-center gap-2 px-6 py-12 text-center sm:py-16">
          {tenant.logoUrl && (
            <img
              src={tenant.logoUrl}
              alt={tenant.name}
              className="mb-4 h-20 w-20 object-contain"
            />
          )}
          <h1
            className="text-balance text-4xl font-bold tracking-tight sm:text-5xl"
            style={{ color: style.primaryColor, fontFamily: headingFont }}
          >
            {tenant.name}
          </h1>
          {style.tagline && (
            <p
              className="max-w-xl text-sm sm:text-base"
              style={{ color: withAlpha(style.primaryColor, "aa") }}
            >
              {style.tagline}
            </p>
          )}
          <Divider style="ornament" color={style.accentColor} />
        </div>
      </header>
    );
  }

  return (
    <header
      className="relative overflow-hidden border-b"
      style={{ borderColor: withAlpha(style.primaryColor, "15") }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 20% 0%, ${style.accentColor} 0%, transparent 50%), radial-gradient(circle at 80% 100%, ${style.accentColor} 0%, transparent 50%)`,
        }}
      />
      <div className="relative container mx-auto px-6 py-12 text-center sm:py-16">
        {tenant.logoUrl && (
          <img
            src={tenant.logoUrl}
            alt={tenant.name}
            className="mx-auto mb-6 h-24 w-24 object-contain"
          />
        )}
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{
            backgroundColor: withAlpha(style.accentColor, "30"),
            color: style.primaryColor,
          }}
        >
          Carta digital
        </span>
        <h1
          className="text-balance text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ color: style.primaryColor, fontFamily: headingFont }}
        >
          {tenant.name}
        </h1>
        {style.tagline && (
          <p
            className="mx-auto mt-3 max-w-xl text-sm sm:text-base"
            style={{ color: withAlpha(style.primaryColor, "aa") }}
          >
            {style.tagline}
          </p>
        )}
      </div>
    </header>
  );
}

function GridDish({ dish, ctx }: { dish: Dish; ctx: RenderContext }) {
  const { style, radius, spacing } = ctx;
  const cardClasses = getCardClasses(style.cardStyle);
  const cardBg = getCardBackground(style.cardStyle, "#ffffff");

  return (
    <article
      className={`group overflow-hidden transition-transform hover:-translate-y-1 ${cardClasses}`}
      style={{
        borderRadius: radius,
        backgroundColor: cardBg,
        borderColor: withAlpha(style.primaryColor, "20"),
      }}
    >
      {style.showImages &&
        (dish.imageUrl ? (
          <div className="relative h-48 overflow-hidden">
            <img
              src={dish.imageUrl}
              alt={dish.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {!dish.available && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/55 backdrop-blur-sm">
                <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-rose-600">
                  No disponible
                </span>
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex h-32 items-center justify-center text-3xl font-bold opacity-15"
            style={{
              backgroundColor: withAlpha(style.accentColor, "30"),
              color: style.primaryColor,
            }}
          >
            {dish.name.charAt(0).toUpperCase()}
          </div>
        ))}
      <div style={{ padding: spacing.padding }}>
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <h3
            className="text-lg font-semibold tracking-tight"
            style={{ color: style.primaryColor, fontFamily: ctx.headingFont }}
          >
            {dish.name}
          </h3>
          <PriceTag
            price={dish.price}
            style={style.priceStyle}
            color={style.accentColor}
            currency={style.currency}
          />
        </div>
        {style.showDescriptions && dish.description && (
          <p
            className="text-sm leading-relaxed"
            style={{ color: withAlpha(style.primaryColor, "99") }}
          >
            {dish.description}
          </p>
        )}
      </div>
    </article>
  );
}

function ListDish({ dish, ctx }: { dish: Dish; ctx: RenderContext }) {
  const { style, radius, spacing } = ctx;
  const cardClasses = getCardClasses(style.cardStyle);
  const cardBg = getCardBackground(
    style.cardStyle,
    style.cardStyle === "flat" ? "transparent" : "#ffffff",
  );
  const dotted = style.priceStyle === "dotted";

  return (
    <article
      className={`flex items-start gap-4 ${cardClasses}`}
      style={{
        borderRadius: radius,
        backgroundColor: cardBg,
        borderColor: withAlpha(style.primaryColor, "20"),
        padding: spacing.padding,
      }}
    >
      {style.showImages && dish.imageUrl && (
        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="h-20 w-20 shrink-0 object-cover sm:h-24 sm:w-24"
          style={{ borderRadius: radius }}
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <h3
            className="text-lg font-semibold tracking-tight"
            style={{ color: style.primaryColor, fontFamily: ctx.headingFont }}
          >
            {dish.name}
          </h3>
          {dotted && (
            <span
              aria-hidden
              className="flex-1 mx-1 border-b border-dotted"
              style={{
                borderColor: withAlpha(style.primaryColor, "55"),
                transform: "translateY(-4px)",
              }}
            />
          )}
          {!dotted && <span className="flex-1" />}
          <PriceTag
            price={dish.price}
            style={style.priceStyle === "dotted" ? "inline" : style.priceStyle}
            color={style.accentColor}
            currency={style.currency}
          />
        </div>
        {style.showDescriptions && dish.description && (
          <p
            className="mt-1 text-sm leading-relaxed"
            style={{ color: withAlpha(style.primaryColor, "99") }}
          >
            {dish.description}
          </p>
        )}
        {!dish.available && (
          <span className="mt-2 inline-block rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-600">
            No disponible
          </span>
        )}
      </div>
    </article>
  );
}

function CompactDish({ dish, ctx }: { dish: Dish; ctx: RenderContext }) {
  const { style } = ctx;
  return (
    <div
      className="flex items-baseline justify-between gap-3 py-2"
      style={{
        borderBottom: `1px dashed ${withAlpha(style.primaryColor, "20")}`,
      }}
    >
      <div className="min-w-0 flex-1">
        <h3
          className="text-base font-semibold"
          style={{ color: style.primaryColor, fontFamily: ctx.headingFont }}
        >
          {dish.name}
          {!dish.available && (
            <span className="ml-2 text-[11px] font-normal text-rose-500">
              · No disponible
            </span>
          )}
        </h3>
        {style.showDescriptions && dish.description && (
          <p
            className="text-xs"
            style={{ color: withAlpha(style.primaryColor, "88") }}
          >
            {dish.description}
          </p>
        )}
      </div>
      <PriceTag
        price={dish.price}
        style={style.priceStyle}
        color={style.accentColor}
        currency={style.currency}
      />
    </div>
  );
}

function MagazineDish({
  dish,
  ctx,
  index,
}: {
  dish: Dish;
  ctx: RenderContext;
  index: number;
}) {
  const { style, radius, spacing } = ctx;
  const reverse = index % 2 === 1;
  return (
    <article
      className={`grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-center ${
        reverse ? "sm:[&>*:first-child]:order-2" : ""
      }`}
      style={{ padding: spacing.padding }}
    >
      {style.showImages && dish.imageUrl ? (
        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="h-64 w-full object-cover sm:h-80"
          style={{ borderRadius: radius }}
        />
      ) : (
        <div
          className="flex h-64 w-full items-center justify-center text-7xl font-bold opacity-20 sm:h-80"
          style={{
            backgroundColor: withAlpha(style.accentColor, "30"),
            color: style.primaryColor,
            borderRadius: radius,
            fontFamily: ctx.headingFont,
          }}
        >
          {dish.name.charAt(0).toUpperCase()}
        </div>
      )}
      <div>
        <span
          className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.25em]"
          style={{ color: style.accentColor }}
        >
          Especial
        </span>
        <h3
          className="text-balance text-3xl font-bold leading-tight sm:text-4xl"
          style={{ color: style.primaryColor, fontFamily: ctx.headingFont }}
        >
          {dish.name}
        </h3>
        {style.showDescriptions && dish.description && (
          <p
            className="mt-3 text-base leading-relaxed"
            style={{ color: withAlpha(style.primaryColor, "aa") }}
          >
            {dish.description}
          </p>
        )}
        <div className="mt-5">
          <PriceTag
            price={dish.price}
            style={style.priceStyle === "inline" ? "bold" : style.priceStyle}
            color={style.accentColor}
            currency={style.currency}
          />
        </div>
      </div>
    </article>
  );
}

function CategoryBlock({
  category,
  ctx,
}: {
  category: Category;
  ctx: RenderContext;
}) {
  const { style, spacing } = ctx;

  const heading = (
    <div
      className="mb-8 flex flex-col items-center text-center"
      style={{ gap: "0.5rem" }}
    >
      <Divider style={style.dividerStyle} color={style.accentColor} />
      <h2
        className="text-3xl font-bold tracking-tight sm:text-4xl"
        style={{ color: style.primaryColor, fontFamily: ctx.headingFont }}
      >
        {category.name}
      </h2>
      {category.description && (
        <p
          className="mt-1 max-w-xl text-sm"
          style={{ color: withAlpha(style.primaryColor, "99") }}
        >
          {category.description}
        </p>
      )}
    </div>
  );

  if (style.layout === "magazine") {
    return (
      <section>
        {heading}
        <div className="space-y-12">
          {category.dishes.map((dish, i) => (
            <MagazineDish key={dish.id} dish={dish} ctx={ctx} index={i} />
          ))}
        </div>
      </section>
    );
  }

  if (style.layout === "list") {
    return (
      <section>
        {heading}
        <div className="space-y-4" style={{ rowGap: spacing.gap }}>
          {category.dishes.map((dish) => (
            <ListDish key={dish.id} dish={dish} ctx={ctx} />
          ))}
        </div>
      </section>
    );
  }

  if (style.layout === "compact") {
    return (
      <section>
        {heading}
        <div className="mx-auto max-w-2xl">
          {category.dishes.map((dish) => (
            <CompactDish key={dish.id} dish={dish} ctx={ctx} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      {heading}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{ gap: spacing.gap }}
      >
        {category.dishes.map((dish) => (
          <GridDish key={dish.id} dish={dish} ctx={ctx} />
        ))}
      </div>
    </section>
  );
}

export function MenuDisplay({ tenant, preview = false }: MenuDisplayProps) {
  const style = tenant.menuStyle ?? DEFAULT_STYLE;

  const radius = RADIUS_VALUES[style.borderRadius] ?? RADIUS_VALUES.medium;
  const spacing = SPACING_VALUES[style.spacing] ?? SPACING_VALUES.cozy;
  const bodyFont = getFontFamily(style.fontFamily);
  const headingFont = getFontFamily(style.headingFont);

  const ctx: RenderContext = { style, radius, spacing, bodyFont, headingFont };

  const containerStyle: CSSProperties = {
    backgroundColor: style.secondaryColor,
    fontFamily: bodyFont,
    color: style.primaryColor,
  };

  return (
    <div className={preview ? "" : "min-h-screen"} style={containerStyle}>
      <MenuHeader tenant={tenant} ctx={ctx} />

      <main className="container mx-auto px-6 py-12">
        {tenant.categories.length === 0 ? (
          <div
            className="rounded-2xl border-2 border-dashed py-16 text-center"
            style={{
              borderColor: withAlpha(style.primaryColor, "25"),
              color: withAlpha(style.primaryColor, "80"),
            }}
          >
            Este restaurante aún no tiene platos en su menú.
          </div>
        ) : (
          <div className="space-y-16">
            {tenant.categories.map((category) => (
              <CategoryBlock key={category.id} category={category} ctx={ctx} />
            ))}
          </div>
        )}
      </main>

      <footer
        className="mt-16 border-t py-8 text-center text-sm"
        style={{
          borderColor: withAlpha(style.primaryColor, "15"),
          color: withAlpha(style.primaryColor, "80"),
        }}
      >
        <p>Menú digital de {tenant.name}</p>
      </footer>
    </div>
  );
}
