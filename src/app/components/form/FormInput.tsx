/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps {
  control: any;
  name: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  helperText?: string;
  className?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  control,
  name,
  label,
  type = "text",
  placeholder,
  helperText,
  className,
  required,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={className}>
          {label ? (
            <Label className="text-sm font-medium block mb-1">
              {label}
              {required ? <span className="ml-1 text-red-500">*</span> : null}
            </Label>
          ) : null}
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            aria-invalid={!!fieldState.error}
            aria-describedby={
              fieldState.error
                ? `${name}-fieldState.`
                : helperText
                ? `${name}-help`
                : undefined
            }
            onChange={(e) => field.onChange(e.target.value)}
          />
          {helperText && !fieldState.error ? (
            <p
              id={`${name}-help`}
              className="mt-1 text-xs text-muted-foreground"
            >
              {helperText}
            </p>
          ) : null}

          {fieldState.error ? (
            <p id={`${name}-error`} className="mt-1 text-xs text-red-400">
              {fieldState.error.message}
            </p>
          ) : null}
        </div>
      )}
    />
  );
};

export default FormInput;
