import StaggerContainer from "@/components/utility-comps/stagger-container";
import { moodScale } from "@/config/color-config";

interface SummaryBlockProps {
  title: string;
  icon: React.ReactNode;
  entries: (number | null)[];
  average: string | null;
  colorConfig: ColorCombo;
  stat?: string;
  colSpan?: number;
}

export default function SummaryBlock({
  title,
  icon,
  stat,
  entries,
  average,
  colorConfig,
  colSpan,
}: SummaryBlockProps) {

  return (
    <StaggerContainer
      style={{
        gridColumn: colSpan ? `span ${colSpan} / span ${colSpan}` : undefined,
        height: "100%",
      }}
    >
      <div
        className="flex flex-col rounded-xl p-3 px-4 h-full"
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
        <div className="flex flex-col grow justify-center">
          {stat && (
            <h1
              className="text-[32px] font-bold"
              style={{
                color: colorConfig.mainColor,
              }}
            >
              {stat}
            </h1>
          )}
          <div className="flex items-center gap-1 my-3 h-4">
            {entries.map((entry, idx) =>
              typeof entry === "number" ? (
                <div
                  key={idx}
                  className="h-4 w-4 rounded-full border"
                  style={{
                    backgroundColor: moodScale[entry],
                    borderColor: colorConfig.mainColor,
                    opacity: 0.8,
                  }}
                />
              ) : (
                <div
                  key={idx}
                  className="h-[2px] w-3 mx-[2px]"
                  style={{
                    backgroundColor: colorConfig.mainColor,
                    opacity: 0.5,
                  }}
                />
              )
            )}
          </div>
          <p
            className="text-xs font-light"
            style={{
              color: colorConfig.mainColor,
            }}
          >
            Avg: <span className="font-semibold">{average ?? "N/A"}</span>
          </p>
        </div>
      </div>
    </StaggerContainer>
  );
}
