import { InitialForm } from "@/components/intial-form";

export default function Home() {
  return (
    <main className="h-full flex justify-center items-center">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold">
          🐣 대한민국 합계 출산율 0.6 들어보셨나요?
        </h1>
        <p className="text-lg">
          요즘 대두 되고 있는 출산율에 대한 인식을 알아보고
          <br />
          남녀 그리고 연령별 생각의 차이를 알아 볼까요?
        </p>
        <div>
          <InitialForm />
        </div>
      </div>
    </main>
  );
}
