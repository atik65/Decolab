"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageZoomViewModalProps {
  imgURI: string;
}

const ImageZoomViewModal = ({ imgURI }: ImageZoomViewModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full">
          <Image
            src={imgURI}
            alt="Product Image"
            height={500}
            width={500}
            className=" w-[90%] lg:w-[90%] object-contain   rounded-[15px]  mx-auto  md:h-[402px] lg:h-[425px] xl:h-[430px] 2xl:h-[500px]  "
          />
        </DialogTrigger>
        <DialogContent
          style={{
            backgroundImage: "linear-gradient(to right, #fffff1 , #f3ece0 )",
          }}
          className="p-0 w-[90%] rounded-[10px] border border-[#CFB284] md:w-[90%] overflow-auto "
        >
          <DialogHeader className="p-5">
            <DialogTitle className="flex justify-end">
              {/* close button */}
              <button
                onClick={() => setOpen(false)}
                className="text-black h-6 w-6 flex justify-center items-center border-2 border-[#CFB284] rounded-md"
              >
                <X size={16} />
              </button>
            </DialogTitle>
            <div className="w-full h-full lg:w-[100%] overflow-y-auto ">
              {/* show the image  */}
              <Image
                src={imgURI}
                alt="Product Image"
                height={500}
                width={500}
                // className="w-full lg:w-[90%] object-contain   rounded-[15px]  mx-auto h-[360px] md:h-[402px] lg:h-[425px] xl:h-[430px] 2xl:h-[500px] overflow-hidden "
                className="w-[130%] sm:w-[100%]  object-contain   rounded-[15px]  mx-auto  "
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageZoomViewModal;
