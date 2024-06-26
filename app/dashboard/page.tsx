import { getAllItems } from "@/actions/actions";
import { ChartContainer } from "@/components/chart-container";
import StackChart from "@/components/charts/bar";

export default async function Page() {
  const { data } = await getAllItems();
  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <div className="flex flex-col gap-4 min-h-[100vh]">
        <h1 className=" text-sm desktop:text-2xl font-bold glassMorphism rounded flex justify-center items-center py-4 mt-4">
          <span>결과 대시보드</span>
        </h1>
        <div className="flex gap-4 flex-wrap justify-between text-xl mb-4">
          <div className="flex flex-col basis-[100%] tablet:basis-[49%] glassMorphism   overflow-hidden p-4 rounded-xl">
            <h2 className="f">연령별 총 합계</h2>
            <div>
              <ChartContainer surveyData={data} type="stack" />
            </div>
          </div>
          <div className="flex flex-col basis-[100%] tablet:basis-[49%]  glassMorphism   overflow-hidden p-4 rounded-xl">
            <h2>연령별 평균 점수</h2>
            <div>
              <ChartContainer surveyData={data} type="avg" />
            </div>
          </div>
          <div className="flex flex-col basis-[100%] tablet:basis-[49%]  glassMorphism   overflow-hidden p-4 rounded-xl">
            <h2>연령별 표준 편차</h2>
            <div>
              <ChartContainer surveyData={data} type="devi" />
            </div>
          </div>
          <div className="flex flex-col basis-[100%] tablet:basis-[49%]  glassMorphism  overflow-hidden p-4 rounded-xl">
            <h2>출산이 늦어지는 가장 큰 요인?</h2>
            <div>
              <ChartContainer surveyData={data} type="radar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
