import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Search, X } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="">
        {" "}
        <span
          className="text-gray-700 hover:text-black transition-colors relative h-full "
          // onClick={() => setIsSearchOpen(!isSearchOpen)}
          aria-label="Toggle search"
        >
          <Search size={20} />
        </span>
      </DrawerTrigger>
      {/* <DrawerOverlay /> */}
      <DrawerContent
        overlayClassName="bg-white md:bg-transparent"
        className="!h-[calc(60vh-70px)] md:!h-[calc(100vh-70px)] rounded-none border-none outline-none "
      >
        <DrawerHeader className="px-0 ">
          <DrawerTitle>
            <SearchInput open={open} onOpenChange={setOpen} />
          </DrawerTitle>
          {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <span className="text-gray-700  span:text-black transition-colors">
              Cancel
            </span>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchBar;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchInput = ({ open, onOpenChange }: Props) => {
  return (
    <div className="">
      <div className="border-b flex">
        <input
          type="text"
          placeholder="Search for products"
          // value={searchTerm}
          // onChange={handleInputChange}
          autoFocus
          className="w-full min-h-16 lg:min-h-28 flex items-center  placeholder:text-black placeholder:text-center placeholder:font-bold placeholder:text-xl sm:placeholder:text-2xl md:placeholder:text-3xl xl:placeholder:text-5xl placeholder:pt-5  text-center outline-none text-black text-xl sm:text-2xl md:text-3xl xl:text-5xl font-bold py-10"
        />

        <button
          onClick={() => onOpenChange(!open)}
          className="flex items-center justify-center px-5"
        >
          <X className="hidden md:block" size={40} />
          <X className="block md:hidden" size={20} />
        </button>
      </div>
      {/* Start typing to see products you are looking for.
       */}
      <div className="flex mt-2 px-2">
        <p className="text-sm sm:text-base opacity-65 text-center w-full">
          Start typing to see products you are looking for.
        </p>
        <button
          onClick={() => onOpenChange(!open)}
          className="flex items-center justify-center px-3 opacity-0"
        >
          <X className="hidden md:block" size={40} />
          <X className="block md:hidden" size={20} />
        </button>
      </div>
    </div>
  );
};
