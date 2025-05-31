'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { FaArrowRight, FaSearch } from 'react-icons/fa';

const formSchema = z.object({
  username: z.string().min(1, 'Username é obrigatório'),
});

type FormValues = z.infer<typeof formSchema>;

const SearchGitInput = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = ({ username }: FormValues) => {
    router.push(`/profile/${username.trim()}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative z-50 w-full max-w-md"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <label className="group flex h-10 rounded-md border border-primary/40 focus:border-primary">
                  <input
                    {...field}
                    type="text"
                    className="h-full w-full bg-transparent px-2 focus:outline-none"
                    placeholder="Username"
                  />
                  <button type="submit" className="border-l-2 border-primary/40 px-5">
                    <FaSearch className="h-5 w-5" />
                  </button>
                </label>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SearchGitInput;


