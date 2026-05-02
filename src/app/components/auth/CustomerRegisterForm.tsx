"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "../form/FormInput";
import {
  CustomerRegisterData,
  customerRegisterSchema,
} from "@/validations/customer";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

const CustomerRegisterForm = () => {
  // const [stage, setStage] = useState<"form" | "verify">("form");

  const form = useForm<CustomerRegisterData>({
    resolver: zodResolver(customerRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: CustomerRegisterData) => {
    console.log("data values: ", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="fullName"
            label="Full name"
            required
          />

          <FormInput
            control={form.control}
            name="phone"
            label="Phone"
            required
          />

          <FormInput
            control={form.control}
            name="email"
            label="Email"
            required
          />

          <FormInput
            control={form.control}
            name="address"
            label="Address"
            required
          />

          <FormInput
            control={form.control}
            name="password"
            label="Password"
            type="password"
            required
          />
          <FormInput
            control={form.control}
            name="confirmPassword"
            label="Confirm password"
            type="password"
            required
          />
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            type="submit"
          // onClick={() => form.handleSubmit(onSubmit())}
          >
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CustomerRegisterForm;
