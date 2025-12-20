"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  CustomerVerifyData,
  customerVerifySchema,
} from "@/validations/customer";
import FormInput from "../form/FormInput";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

const CustomerVerifyCodeForm = ({}) => {
  const form = useForm<CustomerVerifyData>({
    resolver: zodResolver(customerVerifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (values: CustomerVerifyData) => {
    console.log("data values: ", values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div>
          <FormInput
            control={form.control}
            name="code"
            label="Code"
            helperText="Enter the 6-digit code sent to your email."
          />
        </div>

        <div className="flex flex-row justify-end gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Verify clicked")}
          >
            Verify
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Resend code clicked")}
          >
            Resend code
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CustomerVerifyCodeForm;
