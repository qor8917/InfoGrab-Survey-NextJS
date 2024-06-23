import MultipleChoice from "@/components/survey/multiple-choice";
import ShortAnswer from "@/components/survey/short-answer";
import SingleChoice from "@/components/survey/single-choice";
import SwitchForQuestion from "@/components/switch-question";

export default function Page({ params }: { params: { questions: string } }) {
  const currentPage = parseInt(params.questions);
  const pages = [
    <SingleChoice key="page3" />,
    <ShortAnswer key="page2" />,
    <MultipleChoice key="page1" />,
  ];
  return (
    <div className="h-full flex justify-center items-center ">
      <div className="w-[460px] flex flex-col gap-8">
        <div>{pages[currentPage]}</div>
        <div className="flex justify-between w-full">
          <SwitchForQuestion pages={pages} currentPage={currentPage} />
        </div>
      </div>
    </div>
  );
}
