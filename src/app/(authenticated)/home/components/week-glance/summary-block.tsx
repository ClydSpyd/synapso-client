import StaggerContainer from "@/components/utility-comps/stagger-container";
import { moodScale } from "@/config/color-config";
import { Progress } from "@mantine/core";

interface SummaryBlockProps {
  title: string;
  icon: React.ReactNode;
  stat: string;
  progress: number | number[];
  summary: string;
  colorConfig: ColorCombo;
}

export default function SummaryBlock({
  title,
  icon,
  stat,
  progress,
  summary,
  colorConfig,
}: SummaryBlockProps) {
  return (
    <StaggerContainer>
      <div
        className="flex flex-col rounded-xl p-4 px-6"
        style={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: colorConfig.accentColor,
          backgroundColor: colorConfig.accentColor,
        }}
      >
        <div className="flex w-full items-center justify-between">
          <h1
            className="font-semibold text-slate-700"
            // style={{
            //   color: "#000",
            // }}
          >
            {title}
          </h1>
          {icon}
        </div>
        <div className="flex flex-col grow justify-center gap-2">
          <h1
            className="text-[32px] font-bold"
            style={{
              color: colorConfig.mainColor,
            }}
          >
            {stat}
          </h1>
          {typeof progress === "number" ? (
            <Progress
              value={progress}
              size={"lg"}
              radius={"md"}
              color="grape"
              className="h-2 rounded-md mb-1 mantine-progress"
            />
          ) : (
            <div className="flex gap-1">
              {progress.map((_, idx) => (
                <div
                  key={idx}
                  className="h-4 w-4 rounded-full"
                  style={{
                    backgroundColor: moodScale[idx % moodScale.length],
                    // border: `1px solid ${colorConfig.mainColor}`,
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>
          )}
          <p
            className="text-xs text-slate-600"
            // style={{
            //   color: colorConfig.mainColor,
            // }}
          >
            {summary}
          </p>
        </div>
      </div>
    </StaggerContainer>
  );
}
