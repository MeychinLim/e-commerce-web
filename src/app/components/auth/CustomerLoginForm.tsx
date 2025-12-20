"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CustomerLoginData, customerLoginSchema } from "@/validations/customer";
import FormInput from "../form/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";

const CustomerLoginForm = () => {
  const form = useForm<CustomerLoginData>({
    resolver: zodResolver(customerLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: CustomerLoginData) => {
    console.log("data values: ", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className="grid grid-cols-1 gap-4">
          <FormInput control={form.control} name="email" label="Email" />

          <FormInput
            control={form.control}
            name="password"
            label="Password"
            type="password"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button type="submit" variant="outline">
              Sign In
            </Button>
            {/* <Button variant="ghost" onClick={sendLoginCode}>
                Sign in with code
              </Button> */}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CustomerLoginForm;
