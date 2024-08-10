"use client";
import React, { useEffect, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import debounce from "lodash/debounce";

const SearchBar = () => {
  const router = useRouter();
  const query = useSearchParams();
  const search = query.get("search");

  const formSchema = z.object({
    search: z.string().min(0).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: search ?? "",
    },
  });

  useEffect(() => {
    form.setValue("search", search ?? "");
  }, [search, form]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value) {
        router.push(`/browse/?search=${encodeURIComponent(value)}`);
      } else {
        router.push("/browse");
      }
    }, 300),
    [router]
  );

  // Effect to trigger search on input change
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "search") {
        debouncedSearch(value.search as string);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, debouncedSearch]);

  const clearSearch = () => {
    form.setValue("search", "");
    router.push("/browse");
  };

  return (
    <Form {...form}>
      <form className="relative flex items-center">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <motion.div
                  initial={{ width: 300 }}
                  animate={{ width: field.value ? 450 : 300 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    {...field}
                    className="pr-10"
                    placeholder="Search rooms by keywords"
                  />
                </motion.div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <motion.div
          className="absolute right-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Search className="text-gray-400" />
        </motion.div>
        <AnimatePresence>
          {form.watch("search") && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Form>
  );
};

export default SearchBar;
