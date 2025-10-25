import StaggerContainer from "@/components/utility-comps/stagger-container";
import { Progress } from "@mantine/core";

interface ProgressBlockProps {
  title: string;
  icon: React.ReactNode;
  completed: number;
  total: number;
  colorConfig: ColorCombo;
  colSpan?: number;
}

export default function ProgressBlock({
  title,
  icon,
  completed,
  total,
  colorConfig,
  colSpan,
}: ProgressBlockProps) {
  const percentage = total === 0 ? 0 : (completed / total) * 100;
  return (
    <StaggerContainer
      style={{
        gridColumn: colSpan ? `span ${colSpan} / span ${colSpan}` : undefined,
        height: "100%",
      }}
    >
      <div
        className="flex flex-col rounded-xl p-4 px-6 h-full"
        style={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: colorConfig.accentColor,
          backgroundColor: colorConfig.accentColor,
        }}
      >
        <div className="flex w-full items-center justify-between">
          <h1 className="font-semibold text-slate-700">{title}</h1>
          {icon}
        </div>
        <div className="flex flex-col grow justify-center gap-4">
          <div className="flex gap-2 items-end">
            <h1
              className="text-5xl font-extrabold whitespace-nowrap"
              style={{
                color: colorConfig.mainColor,
              }}
            >
              {completed}/{total}
            </h1>
            <h5
              style={{
                color: colorConfig.mainColor,
              }}
              className="text-sm font-bold uppercase"
            >
              of target
            </h5>
          </div>

          <Progress
            value={percentage}
            size={"lg"}
            radius={"md"}
            color="grape"
            className="h-2 rounded-md mb-1 mantine-progress"
          />
        </div>
        <p className="text-xs text-slate-600">
          {percentage.toFixed(1)}% completed
        </p>
      </div>
    </StaggerContainer>
  );
}
