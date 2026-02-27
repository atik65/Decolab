// "use client";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { X } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";

// interface ImageZoomViewModalProps {
//   imgURI: string;
// }

// const ImageZoomViewModal = ({ imgURI }: ImageZoomViewModalProps) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="w-full">
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger className="w-full cursor-pointer border-none outline-none">
//           <Image
//             src={imgURI}
//             alt="Product Image"
//             height={500}
//             width={500}
//             className=" w-[100%] lg:w-[100%] object-contain   rounded-[15px]  mx-auto  lg:h-[425px] xl:h-[430px] 2xl:h-[500px]  "
//           />
//         </DialogTrigger>
//         <DialogContent
//           style={{
//             backgroundImage: "linear-gradient(to right, #d1e7d1, #fffff1  )",
//           }}
//           className="p-0 w-[90%] rounded-[10px] border border-[#189CD9] md:w-[50%] overflow-auto "
//         >
//           <DialogHeader className="p-5">
//             <DialogTitle className="flex justify-end">
//               {/* close button */}
//               <button
//                 onClick={() => setOpen(false)}
//                 className="text-black h-6 w-6 flex justify-center items-center border-2 border-[ #189CD9 ,] rounded-md"
//               >
//                 <X size={16} />
//               </button>
//             </DialogTitle>
//             <div className="w-full h-full lg:w-[100%] overflow-y-auto ">
//               {/* show the image  */}
//               <Image
//                 src={imgURI}
//                 alt="Product Image"
//                 height={500}
//                 width={500}
//                 // className="w-full lg:w-[90%] object-contain   rounded-[15px]  mx-auto h-[360px] md:h-[402px] lg:h-[425px] xl:h-[430px] 2xl:h-[500px] overflow-hidden "
//                 className="w-[130%] sm:w-[100%] sm:max-h-[70vh] object-contain   rounded-[15px]  mx-auto  "
//               />
//             </div>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ImageZoomViewModal;

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
import { cn } from "@/lib/utils";

interface ImageZoomViewModalProps {
  imgURI: string;
  isEager?: boolean;
  className?: string;
}

const ImageZoomViewModal = ({
  imgURI,
  isEager,
  className,
}: ImageZoomViewModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full border-none outline-none">
          <Image
            src={imgURI || "/images/home/bed.png"}
            alt="Product Image"
            height={500}
            width={500}
            className={cn(className)}
            loading={isEager ? "eager" : "lazy"}
            quality={100}
          />
        </DialogTrigger>
        <DialogContent
          style={{
            backgroundImage: "linear-gradient(to right, #d1e7d1, #fffff1  )",
            // backgroundImage: "linear-gradient(to right, #ffffff, #ffffff  )",
          }}
          className="p-0 w-[90%] md:w-[60%] rounded-[10px] border border-[#10b981] overflow-auto  "
        >
          <DialogHeader className="p-5">
            <DialogTitle className="flex justify-end">
              {/* close button */}
              <button
                onClick={() => setOpen(false)}
                className="text-black h-6 w-6 flex justify-center items-center border-2 border-[#10b981] rounded-md"
              >
                <X size={16} />
              </button>
            </DialogTitle>
            <div className="w-full h-full lg:w-[100%] overflow-y-auto ">
              {/* show the image  */}
              <Image
                src={imgURI || "/images/home/bed.png"}
                alt="Product Image"
                height={500}
                width={500}
                // className="w-full lg:w-[90%] object-contain   rounded-[15px]  mx-auto h-[360px] md:h-[402px] lg:h-[425px] xl:h-[430px] 2xl:h-[500px] overflow-hidden "
                className="w-[130%] sm:w-[100%] sm:max-h-[70vh] object-contain   rounded-[15px]  mx-auto "
                loading="lazy"
                quality={100}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageZoomViewModal;
