"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";

// Define form schema using zod
const FormSchema = z.object({
  squareFt: z
    .number()
    .min(1, "Square Feet is required and must be greater than 0"),
  bedrooms: z
    .number()
    .min(1, "Bedrooms is required and must be greater than 0"),
  bathrooms: z.number().min(1, "Floors is required and must be greater than 0"),
  age: z.number().min(0, "Age must be at least 0"),
});

// Infer the form schema's TypeScript type
type FormValues = z.infer<typeof FormSchema>;

export default function Home() {
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      squareFt: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
      age: undefined,
    },
    mode: "onSubmit", // Validate on form submission
  });

  const handlePredict = async (data: FormValues) => {
    try {
      setLoading(true);
      const response = await fetch("api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resultData = await response.json();
      if (response.ok) {
        setResult(resultData.predictedPrice);
        setLoading(false);
        toast({
          title: "Prediction Successful",
          description: `The predicted price is $${new Intl.NumberFormat(
            "en-US",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          ).format(resultData.predictedPrice)}`,
        });
      } else {
        setLoading(false);
        toast({
          title: "Error",
          description: resultData.error || "Something went wrong!",
          variant: "destructive",
        });
      }
    } catch {
      setLoading(false);
      toast({
        title: "Network Error",
        description: "Failed to connect to the server.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* Header */}
      <Header predictedPrice={result} />

      {/* Form */}
      <div className="flex m-auto justify-center bg-gray-100 mt-12 md:mx-6 shadow-lg rounded-lg md:p-8 p-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handlePredict)}
            className="w-full max-w-lg space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Enter House Details
            </h2>

            {/* Fields */}
            {["squareFt", "bedrooms", "bathrooms", "age"].map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as keyof FormValues}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel className="block text-gray-700 font-semibold mb-2">
                      {field === "squareFt"
                        ? "Square Feet"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                      :
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...formField}
                        type="number"
                        placeholder={`Enter ${field}`}
                        value={formField.value ?? ""} // Ensure empty string for initial state
                        onChange={
                          (e) =>
                            formField.onChange(
                              e.target.value === ""
                                ? undefined
                                : +e.target.value
                            ) // Convert to number or undefined
                        }
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              type="submit"
              className="w-full py-2 px-4 rounded-md text-white font-semibold bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {loading ? "Predicting..." : "Predict"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
