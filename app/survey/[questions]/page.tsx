import MultipleChoice from "@/components/survey/multiple-choice";
import ShortAnswer from "@/components/survey/short-answer";
import SingleChoice from "@/components/survey/single-choice";
import SwitchForQuestion from "@/components/switch-question";
import { Suspense } from "react";
export default function Page({ params }: { params: { questions: string } }) {
  const currentPage = parseInt(params.questions);
  const pages = [
    <SingleChoice key="page3" />,
    <ShortAnswer key="page2" />,
    <MultipleChoice key="page1" />,
  ];
  return (
    <div className="h-full flex justify-center items-center">
      <div className="min-w-[300px] flex flex-col gap-8 p-10 glassMorphism rounded-xl">
        <Suspense>
          <div>{pages[currentPage]}</div>
        </Suspense>
        <div className="flex justify-between w-full">
          <Suspense>
            <SwitchForQuestion pages={pages} currentPage={currentPage} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
