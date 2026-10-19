import { ArrowUpRight, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

export const INSTAGRAM_URL = "https://www.instagram.com/decorist.kw/";
export const INSTAGRAM_HANDLE = "@decorist.kw";

/** Follow-us pill used in the footer (dark) and the mobile menu (light). */
const InstagramLink = ({
  isAr,
  tone = "dark",
  className,
}: {
  isAr: boolean;
  tone?: "dark" | "light";
  className?: string;
}) => {
  const dark = tone === "dark";
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full border p-1.5 pe-5 transition-colors duration-300",
        dark
          ? "border-white/15 bg-white/[0.03] hover:border-[#ffb347]/60 hover:bg-white/[0.07]"
          : "border-black/15 bg-black/[0.02] hover:border-[#b4590a]/60 hover:bg-black/[0.04]",
        className,
      )}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(45deg,#f9ce34,#ee2a7b_55%,#6228d7)] text-white transition-transform duration-500 group-hover:scale-105">
        <Instagram size={19} />
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "text-[10.5px] font-bold uppercase tracking-[0.2em]",
            isAr && "tracking-normal text-[11.5px]",
            dark ? "text-white/45" : "text-black/45",
          )}
        >
          {isAr ? "تابعنا" : "Follow us"}
        </span>
        <span
          dir="ltr"
          style={{ direction: "ltr", unicodeBidi: "isolate" }}
          className={cn(
            "text-sm font-semibold transition-colors md:text-[15px]",
            isAr && "text-right",
            dark
              ? "text-white/90 group-hover:text-[#ffb347]"
              : "text-[#1a1613] group-hover:text-[#b4590a]",
          )}
        >
          {INSTAGRAM_HANDLE}
        </span>
      </span>
      <ArrowUpRight
        size={16}
        className={cn(
          "transition-colors rtl:-scale-x-100",
          dark
            ? "text-white/40 group-hover:text-[#ffb347]"
            : "text-black/40 group-hover:text-[#b4590a]",
        )}
      />
    </a>
  );
};

export default InstagramLink;
