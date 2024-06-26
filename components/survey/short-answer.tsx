"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { z } from "zod";
import { Progress } from "../ui/progress";

const regex = new RegExp(/\b([1-9]|10)\b/g);

export default function ShortAnswer() {
  const [isCorrectAnswer, SetIsCorrectAnswer] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validation = z.string().regex(regex).safeParse(value);

    if (validation.success) {
      SetIsCorrectAnswer(true);
      const matches = value.match(regex);
      if (matches)
        router.push(pathname + "?" + createQueryString("q2", matches[0]));
    } else {
      SetIsCorrectAnswer(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Progress value={searchParams.size - 3} />
      </div>
      <div>
        <h2 className="text-lg">
          - 아이를 키우는 것이 개인의 행복에 부정적인 영향을 준다고
          생각하십니까?
          <sub className="text-[12px] inline-block h-4 px-2 align-bottom">
            1점&#40;매우 그렇지 않다&#41;~10점&#40;매우 그렇다&#41;
          </sub>
        </h2>
      </div>

      <div>
        <div className="relative">
          <Input
            type="text"
            id="email"
            aria-describedby="outlined_success_help"
            className="border-black-600 focus:border-black-600 text-white peer block w-full appearance-none rounded-lg border-2 bg-transparent px-2.5 pb-4 pt-4 text-sm  focus:outline-none focus:ring-0  "
            placeholder=""
            onBlur={onBlur}
            defaultValue={searchParams.get("q2") ?? undefined}
          />
          <label
            htmlFor="outlined_success"
            className="text-black-600 bg-[rgba(7, 122, 97, 0.3)] absolute start-1 top-2 z-10 origin-[0] -translate-y-8 scale-75 transform bg-transparent px-2 text-sm leading-6 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            <div className=" text-base text-opacity-90 ">
              <span className="text-green-600">*</span>
              <span className="px-1">점수</span>
            </div>
          </label>
        </div>
        {isCorrectAnswer ? (
          <p id="outlined_success_help" className="text-xs p-2 ">
            <span className="font-medium">✅</span> Checked the Answer correctly
          </p>
        ) : (
          <p
            id="outlined_success_help"
            className={`text-xs p-2 text-red-500 ${
              isCorrectAnswer == null ? "invisible" : "visible"
            }`}
          >
            <span className="font-medium pr-2">❌</span>
            Enter the Answer correctly
          </p>
        )}
      </div>
    </div>
  );
}
