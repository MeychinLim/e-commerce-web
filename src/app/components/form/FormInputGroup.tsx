/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface FormInputGroup {
  control: any;
  name: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  helperText?: string;
  className?: string;
  required?: boolean;
  addOn?: React.ReactNode;
}

const FormInputGroup: React.FC<FormInputGroup> = ({
  control,
  name,
  label,
  type = "text",
  placeholder,
  helperText,
  className,
  required,
  addOn,
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
          {/* <Input
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
          /> */}
          <InputGroup>
            <InputGroupInput
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
            {addOn && <InputGroupAddon>{addOn}</InputGroupAddon>}
          </InputGroup>
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

export default FormInputGroup;
