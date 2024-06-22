import { InitialForm } from "@/components/intialForm";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="h-full flex justify-center items-center">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold">
          🐣 대한민국 합계 출산율 0.6 들어보셨나요?
        </h1>
        <p className="text-lg">
          요즘 대두 되고 있는 출산율에 대한 인식을 남녀 그리고 연령대로 나누어
          설문조사 후 결과를 알아 볼까요?
        </p>
        <InitialForm />
      </div>
    </main>
  );
}
