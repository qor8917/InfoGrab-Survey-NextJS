import { InitialForm } from "@/components/intial-form";
import { Suspense } from "react";
export default function Home() {
  return (
    <main className="flex justify-center items-center glassMorphism rounded-xl ">
      <div className="flex flex-col gap-4 items-center p-10 min-w-[300px]">
        <h1 className="text-xl font-bold">
          🐣 대한민국 합계 출산율 0.6 들어보셨나요?
        </h1>
        <p className="text text-center">
          요즘 대두 되고 있는 출산율에 대한 인식을 알아보고
          <br />
          남녀 그리고 연령별 생각의 차이를 알아 볼까요?
        </p>
        <div>
          <Suspense>
            <InitialForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
