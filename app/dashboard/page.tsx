import { getAllItems } from "@/actions/actions";
import { ChartContainer } from "@/components/chart-container";
import StackChart from "@/components/charts/bar";

export default async function Page() {
  const { data } = await getAllItems();
  return (
    <section className="">
      <div className="flex flex-col gap-4 ">
        <h1 className="text-2xl p-10 pl-0">결과 대시보드</h1>
        <div className="flex gap-4 bg-red-500 flex-wrap justify-between">
          <div className="flex flex-col basis-[100%] tablet:basis-[48%] bg-blue-500 h-full overflow-hidden">
            <h2>연령별 총 합계</h2>
            <div>
              <ChartContainer surveyData={data} type="stack" />
            </div>
          </div>
          <div className="flex flex-col basis-[100%] tablet:basis-[48%] bg-yellow-500 h-full overflow-hidden">
            <h2>연령별 평균 점수</h2>
            <div>
              <ChartContainer surveyData={data} type="avg" />
            </div>
          </div>
          <div className="flex flex-col basis-[100%] tablet:basis-[48%] bg-green-500 h-full overflow-hidden">
            <h2>연령별 표준 편차</h2>
            <div>
              <ChartContainer surveyData={data} type="devi" />
            </div>
          </div>
          <div className="flex flex-col basis-[100%] tablet:basis-[48%] bg-gray-500 h-full overflow-hidden ">
            <h2>출산이 늦어지는 가장 큰 요인?</h2>
            <div>
              <ChartContainer surveyData={data} type="radar" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
