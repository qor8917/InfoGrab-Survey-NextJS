"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

interface ISwitchProps {
  pages: any;
  currentPage: number;
}

export default function SwitchForQuestion({
  pages,
  currentPage,
}: ISwitchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      const params = new URLSearchParams(searchParams.toString());

      router.push(`/survey/${currentPage + 1}?${params.toString()}`);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      const params = new URLSearchParams(searchParams.toString());
      router.push(`/survey/${currentPage - 1}?${params.toString()}`);
    }
  };

  const handleFinish = () => {
    const sex = searchParams.get("sex");
    const age = searchParams.get("age");
    const q1 = parseInt(searchParams.get("q1") ?? "0");
    const q2 = parseInt(searchParams.get("q2") ?? "0");
    const q3 = parseInt(searchParams.get("q3") ?? "0");
    const sum = q1 + q2 + q3;
    console.log(sum);
    router.push("/dashboard");
  };
  return (
    <>
      {currentPage > 0 ? (
        <Button variant="infoGrab" size="sm" onClick={handlePrev}>
          Previous
        </Button>
      ) : (
        <div></div>
      )}

      {currentPage === pages.length - 1 ? (
        <Button onClick={handleFinish} variant="infoGrab" size="sm">
          완료
        </Button>
      ) : (
        <Button onClick={handleNext} variant="infoGrab" size="sm">
          Next
        </Button>
      )}
    </>
  );
}
