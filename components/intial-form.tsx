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
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Input } from "./ui/input";

const formSchema = z.object({
  sex: z.string(),
  age: z.string(),
  name: z.string().min(2, { message: "" }),
});

export function InitialForm() {
  const labels = [
    "10대",
    "20대",
    "30대",
    "40대",
    "50대",
    "60대",
    "70대",
    "80대",
  ];
  const [isCorrectAnswer, SetIsCorrectAnswer] = useState<boolean | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sex: "F",
      age: "20대",
      name: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(
      "survey/0" +
        "?" +
        createQueryString("sex", values.sex) +
        "&" +
        createQueryString("age", values.age) +
        "&" +
        createQueryString("name", values.name)
    );
    router.refresh();
  }
  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validation = z.string().min(2).safeParse(value);

    if (validation.success) {
      SetIsCorrectAnswer(true);
    } else {
      SetIsCorrectAnswer(false);
    }
  };

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
                        value="M"
                      >
                        남자
                      </SelectItem>
                      <SelectItem
                        className="data-[highlighted]:mainGradient data-[highlighted]:text-white"
                        value="F"
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
                      {labels.map((la) => (
                        <SelectItem
                          className="data-[highlighted]:mainGradient data-[highlighted]:text-white"
                          value={la}
                        >
                          {la}
                        </SelectItem>
                      ))}
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <div className="relative">
                    <Input
                      type="text"
                      id="name"
                      aria-describedby="outlined_success_help"
                      className="border-black-600 focus:border-black-600 text-gray-500 peer block w-[180px] appearance-none rounded-lg border-2 bg-transparent px-2.5 pb-4 pt-4 text-sm  focus:outline-none focus:ring-0  "
                      placeholder="이름"
                      {...field}
                      onBlur={onBlur}
                    />
                    <label
                      htmlFor="outlined_success"
                      className="text-black-600 absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm leading-6 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                    >
                      <div className=" text-base text-opacity-90">
                        <span className="text-green-600">*</span>
                        <span>이름</span>
                      </div>
                    </label>
                  </div>
                  {isCorrectAnswer ? (
                    <p
                      id="outlined_success_help"
                      className="text-xs p-2 text-green-600 w-[180px]"
                    >
                      <span className="font-medium">✅</span> Checked the Answer
                    </p>
                  ) : (
                    <p
                      id="outlined_success_help"
                      className={`text-xs p-2 text-red-500 ${
                        isCorrectAnswer == null ? "invisible" : "visible"
                      } w-[180px]`}
                    >
                      <span className="font-medium">❌</span>
                      Enter the Answer correctly
                    </p>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="lg" variant="infoGrab" type="submit">
          설문 시작하기
        </Button>
      </form>
    </Form>
  );
}
