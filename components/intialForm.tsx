"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formSchema = z.object({
  sex: z.string(),
  age: z.string(),
});
export function InitialForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sex: "woman",
      age: "adult",
    },
  });
  const isLoading = form.formState.isSubmitting;
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 py-4 flex flex-col items-center"
      >
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="성별을 선택 해주세요" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded">
                    <SelectGroup>
                      <SelectItem
                        className="data-[highlighted]:mainGradient data-[highlighted]:text-white"
                        value="man"
                      >
                        남자
                      </SelectItem>
                      <SelectItem
                        className="data-[highlighted]:mainGradient data-[highlighted]:text-white"
                        value="woman"
                      >
                        여자
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="나이를 선택 해주세요" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded">
                    <SelectGroup>
                      <SelectItem
                        className="data-[highlighted]:mainGradient data-[highlighted]:text-white"
                        value="teenager"
                      >
                        10대
                      </SelectItem>
                      <SelectItem
                        className="data-[highlighted]:mainGradient data-[highlighted]:text-white"
                        value="adult"
                      >
                        20대~40대
                      </SelectItem>
                      <SelectItem
                        className="data-[highlighted]:mainGradient data-[highlighted]:text-white"
                        value="senior"
                      >
                        50대 이상
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mainGradient text-white self-center rounded p-12 text-2xl align-middle "
          type="submit"
        >
          설문 시작하기
        </Button>
      </form>
    </Form>
  );
}
