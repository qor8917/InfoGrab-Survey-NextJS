import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LineChart from "./charts/line-avg";
import { labels } from "@/utils/chart";
import LineChartDeviation from "./charts/line-deviation";
import RadarChart from "./charts/radar";
import StackChart from "./charts/bar";

export function ChartContainer({ surveyData, type }: any) {
  return (
    <Tabs className="flex flex-col items-center" defaultValue="20대">
      {labels.map((age) => {
        if (type === "stack") {
          return (
            <TabsContent
              className="w-full px-8 h-[250px]"
              value={age}
              key={age}
            >
              <StackChart surveyData={surveyData} />
            </TabsContent>
          );
        }
        if (type === "avg") {
          return (
            <TabsContent
              className="w-full px-8 h-[250px]"
              value={age}
              key={age}
            >
              <LineChart className="" surveyData={surveyData} gene={age} />
            </TabsContent>
          );
        }
        if (type === "radar") {
          return (
            <TabsContent
              value={age}
              className="w-full px-8 h-[250px]"
              key={age}
            >
              <RadarChart surveyData={surveyData} gene={age} className="" />
            </TabsContent>
          );
        }
        return (
          <TabsContent value={age} className="w-full px-8 h-[250px]" key={age}>
            <LineChartDeviation surveyData={surveyData} gene={age} />
          </TabsContent>
        );
      })}
      <TabsList className="">
        {labels.map((age) => {
          if (type === "stack") return;
          return (
            <TabsTrigger className="shadow" value={age}>
              {age}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
