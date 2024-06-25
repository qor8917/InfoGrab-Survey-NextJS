"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "../ui/checkbox";

const answers = [
  {
    name: "a5",
    rating: false,
    content: "경제적 요인 (높은 교육비, 주거비 부담)",
  },
  { name: "a4", rating: false, content: "일-가정 양립의 어려움 (경력 단절)" },
  { name: "a3", rating: false, content: "사회적 요인 (정부 지원 미흡)" },
  {
    name: "a2",
    rating: false,
    content: "개인적 요인 (개인의 행복 우선, 출산에 대한 두려움 등)",
  },
  { name: "a1", rating: false, content: "기타요인" },
];

export default function MultipleChoice() {
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

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg">
        - 출산이 힘들어 지는 주된 이유는? ( 다중선택 가능 )
      </h2>
      <div className="flex flex-col gap-4">
        {answers.map(({ name, content }) => (
          <div className="flex items-center space-x-2" key={name}>
            <Checkbox
              id={name}
              onCheckedChange={(value: boolean) => {
                router.push(
                  pathname +
                    "?" +
                    createQueryString(`q3${name}`, value ? "1" : "0")
                );
              }}
              checked={searchParams.get(`q3${name}`) === "1" ? true : undefined}
            />
            <label
              htmlFor={name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {content}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
