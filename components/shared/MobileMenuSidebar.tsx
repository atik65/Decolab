import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { useGetLocale } from "@/hooks/useGetLocale";

export default function MobileMenuSidebar({
  isOpen,
  onOpenChange,
  onSearchOpen,
  tone = "dark",
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSearchOpen: () => void;
  tone?: "dark" | "light";
}) {
  const locale = useGetLocale();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button
          className={
            tone === "light"
              ? "lg:hidden text-white hover:text-white/70 transition-colors"
              : "lg:hidden text-gray-700 hover:text-black transition-colors"
          }
          //   onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent
        isShowCloseButton={true}
        side={locale === "ar" ? "right" : "left"}
        className="p-0 border-none w-[300px] sm:w-[350px]"
      >
        <SheetHeader className="hidden">
          <SheetTitle></SheetTitle>
        </SheetHeader>

        <MobileMenu onOpenChange={onOpenChange} isOpen={isOpen} onSearchOpen={onSearchOpen} />

        {/* <SheetFooter>
          <button>Save changes</button>
          <SheetClose asChild>
            <button>Close</button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
