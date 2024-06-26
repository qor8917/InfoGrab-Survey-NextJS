"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { addItem } from "@/actions/actions";
import { SubmitButton } from "./submit-button";
import { SubmitForm } from "./submit-container";
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
  const sex = searchParams.get("sex");
  const age = searchParams.get("age");
  const name = searchParams.get("name");
  const q1 = parseInt(searchParams.get("q1") ?? "0");
  const q2 = parseInt(searchParams.get("q2") ?? "0");
  const q3 = parseInt(searchParams.get("q3") ?? "0");
  const q3a1 = parseInt(searchParams.get("q3a1") ?? "0");
  const q3a2 = parseInt(searchParams.get("q3a2") ?? "0");
  const q3a3 = parseInt(searchParams.get("q3a3") ?? "0");
  const q3a4 = parseInt(searchParams.get("q3a4") ?? "0");
  const q3a5 = parseInt(searchParams.get("q3a5") ?? "0");
  const sum = q1 + q2 + q3;
  const data = { name, sex, age, sum, q3a1, q3a2, q3a3, q3a4, q3a5 };

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

  const handleFinish = async () => {
    // const { status, error } = await addItem(data);
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
        <div className="block">
          <SubmitForm payload={data}></SubmitForm>
        </div>
      ) : (
        <Button onClick={handleNext} variant="infoGrab" size="sm">
          Next
        </Button>
      )}
    </>
  );
}
