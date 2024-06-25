export const labels = ["10대", "20대", "30대", "40대", "50대", "60대 이상"];
export const fators = [
  "기타 요인",
  "개인적 요인",
  "사회적 요인",
  "일-가정 양립의 어려움",
  "경제적 요인",
];
export const getMenData = (surveyData: any, gene: any) => {
  return surveyData
    .filter(({ sex }: { sex: string }) => sex === "M")
    .filter(({ age }: { age: string }) => age === gene);
};
export const getwomenData = (surveyData: any, gene: any) => {
  return surveyData
    .filter(({ sex }: { sex: string }) => sex !== "M")
    .filter(({ age }: { age: string }) => age === gene);
};
