"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const answers = [
  { name: "a5", rating: 5, content: "매우 동의 한다." },
  { name: "a4", rating: 4, content: "동의 한다." },
  { name: "a3", rating: 3, content: "보통이다." },
  { name: "a2", rating: 2, content: "동의 하지 않는다." },
  { name: "a1", rating: 1, content: "매우 동의 하지 않는다." },
];

export default function SingleChoice() {
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
  const handleInputChange = (value: string) => {
    router.push(pathname + "?" + createQueryString("q1", value));
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg">- 출산율은 나와 상관 없다.</h2>
      <div className="flex flex-col gap-4">
        <RadioGroup
          onValueChange={handleInputChange}
          defaultValue={searchParams.get("q1") ?? undefined}
        >
          {answers.map(({ name, rating, content }) => (
            <div className="flex gap-x-2 gap-y-6" key={name}>
              <RadioGroupItem value={rating.toString()} id={name} />
              <Label htmlFor={name}>{content}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
