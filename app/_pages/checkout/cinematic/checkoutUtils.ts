import { CartItem } from "@/utils/localStorage";
import { Locale, WHATSAPP_NUMBER } from "../../home/cinematic/content";
import { coCopy } from "./checkoutContent";

/* ───────── what the result pages read back ───────── */

const ORDER_KEY = "decolab_last_order";
const FAIL_KEY = "decolab_checkout_failure";
const DRAFT_KEY = "decolab_checkout_draft";

export interface SnapshotItem {
  title: string;
  image: string;
  quantity: number;
  price: number;
  options: string[];
}

export interface OrderSnapshot {
  at: number;
  ref?: string;
  name: string;
  phone: string;
  address: string;
  total: number;
  items: SnapshotItem[];
}

export interface FailureInfo {
  at: number;
  message?: string;
}

export type CheckoutDraft = Record<string, string>;

const read = <T,>(key: string): T | null => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};
const write = (key: string, value: unknown) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode / quota: the result pages degrade gracefully */
  }
};
const drop = (key: string) => {
  try {
    sessionStorage.removeItem(key);
  } catch {
    /* ignore */
  }
};

export const saveOrder = (o: OrderSnapshot) => {
  write(ORDER_KEY, o);
  drop(FAIL_KEY);
  drop(DRAFT_KEY);
};
export const loadOrder = () => read<OrderSnapshot>(ORDER_KEY);

export const saveFailure = (f: FailureInfo, draft: CheckoutDraft) => {
  write(FAIL_KEY, f);
  write(DRAFT_KEY, draft);
};
export const loadFailure = () => read<FailureInfo>(FAIL_KEY);
export const loadDraft = () => read<CheckoutDraft>(DRAFT_KEY);
export const clearDraft = () => drop(DRAFT_KEY);

/* ───────── cart helpers ───────── */

/** "50cm · Black · No. 23" style option list for one cart line. */
export function describeItem(item: CartItem, locale: Locale): string[] {
  const o = coCopy[locale].opt;
  const out: string[] = [];
  if (item.digitCount) out.push(`${o.digits} ${item.digitCount}`);
  if (item.size?.title) out.push(item.size.title);
  if (item.color?.name) out.push(item.color.name);
  if (item.lightColor?.name) out.push(`${o.lightColor}: ${item.lightColor.name}`);
  if (item.houseNumber) out.push(`${o.houseNumber} ${item.houseNumber}`);
  if (item.design?.name) out.push(item.design.name);
  if (item.font?.name) out.push(item.font.name);
  if (item.text) out.push(item.text);
  return out;
}

export const money = (n: number) => n.toFixed(3);

export const toSnapshotItems = (items: CartItem[], locale: Locale): SnapshotItem[] =>
  items.map((i) => ({
    title: i.productTitle,
    image: i.productImage,
    quantity: i.quantity,
    price: i.price,
    options: describeItem(i, locale),
  }));

/** Plain-language server error, if the API sent one. */
export function errorMessage(e: unknown): string | undefined {
  if (typeof e === "string") return e.slice(0, 200);
  if (e && typeof e === "object") {
    const o = e as Record<string, unknown>;
    for (const k of ["detail", "message", "error"]) {
      if (typeof o[k] === "string") return (o[k] as string).slice(0, 200);
    }
  }
  return undefined;
}

/** Pre-filled WhatsApp link carrying the whole cart (the fallback when an order fails). */
export function whatsappOrderUrl(
  items: SnapshotItem[],
  total: number,
  locale: Locale,
  who?: { name?: string; phone?: string; address?: string },
) {
  const t = coCopy[locale];
  const lines = items.map(
    (i) =>
      `• ${i.title} × ${i.quantity}${i.options.length ? ` (${i.options.join(", ")})` : ""} — KD ${money(i.price * i.quantity)}`,
  );
  const parts = [t.waIntro, ...lines, `${t.total}: KD ${money(total)}`];
  if (who?.name) parts.push(`${t.waName}: ${who.name}`);
  if (who?.phone) parts.push(`${t.waPhone}: ${who.phone}`);
  if (who?.address) parts.push(`${t.waAddress}: ${who.address}`);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(parts.join("\n"))}`;
}
