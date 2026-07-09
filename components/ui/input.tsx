"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

// Define a custom interface for the Input component's props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Add the label property
  isRequiredStar?: boolean;
  error?: string;
  touched?: boolean;
}

// const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
//   ({ className, type, label = "", rows, ...props }: any, ref) => {
//     return (

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      isRequiredStar = false,
      touched = false,
      error = "",
      ...props
    },
    ref,
  ) => {
    return (
      <div className=" ">
        {label && (
          <label htmlFor={label} className="">
            <strong className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-bold text-gray-700 ">
              {label}{" "}
              {isRequiredStar && <strong className="text-red-500">*</strong>}
            </strong>
          </label>
        )}
        <input
          id={label}
          type={type}

          className={cn(
            "mt-1 block w-full border border-gray-300 bg-white py-[10px] px-3 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-brand-primary sm:text-sm",
            className,
          )}
          ref={ref}
          {...props}
        />

        {/* error message */}
        {touched && error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

// Text Area

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string; // Add the label property
  isRequiredStar?: boolean;
  touched?: boolean;
  error?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,

      label,
      isRequiredStar = false,
      touched = false,
      error = "",
      ...props
    },
    ref,
  ) => {
    return (
      <div>
        {label && (
          <label htmlFor={label}>
            <strong className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700">
              {label}{" "}
              {isRequiredStar && <strong className="text-red-500">*</strong>}
            </strong>
          </label>
        )}
        <textarea
          id={label}
          // className={cn(
          //   "flex  w-full rounded-[10px] border-[2px] border-[#CFB284] bg-white px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-white file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2",
          //   className
          // )}

          className={cn(
            "mt-1 block w-full border border-gray-300 bg-white py-[8px] px-3 shadow-sm focus:border-brand-secondary focus:outline-none focus:ring-brand-secondary sm:text-sm",
            className,
          )}
          ref={ref}
          {...props}
        />

        {/* error message */}
        {touched && error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export { Input, TextArea };
