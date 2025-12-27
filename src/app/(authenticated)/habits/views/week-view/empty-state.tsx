import StaggerContainer from "@/components/utility-comps/stagger-container"
import { colorCombos } from "@/config/color-config";

const BlockSkeleton = ({idx}: {idx: number}) =>{
  const colorConfig = colorCombos[idx % colorCombos.length];

  return (
    <div
      className="w-full flex items-center justify-between py-6 px-4 border bg-white rounded-lg relative group"
      style={{
        borderColor: colorConfig.accentColor + 70,
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="h-18 w-18 rounded-lg flex items-center justify-center relative"
          style={{
            backgroundColor: colorConfig.hintColor + 70,
          }}
        />
        <div className="flex flex-col gap-2">
          <div
            className="h-8 w-60 rounded-sm"
            style={{
              backgroundColor: colorConfig.hintColor + 90,
            }}
          />
          <div
            className="h-5 w-70 rounded-sm"
            style={{
              backgroundColor: colorConfig.hintColor + 90,
            }}
          />
        </div>
      </div>
      <div className="flex gap-[10px] items-center">
        {[...Array(7)].map((_, idx) => (
          <div
            key={idx}
            className="h-12 w-12 rounded-lg"
            style={{
              backgroundColor: colorConfig.hintColor + 70,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function WeekViewEmptyState(){
    return [...Array(4)].map((_, idx) => (
      <StaggerContainer key={idx} staggerDelay={100} randomFactor={0}>
        <BlockSkeleton idx={idx} />
      </StaggerContainer>
    ));
}