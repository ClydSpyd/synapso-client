export const fetchCache = "force-no-store";
export const revalidate = 0;
import SpaceHeader from "./components/space-header";

export default function SpacePage() {
  return (
    <div className="h-full w-full bg-slate-50/50">
      <div className="h-full w-full max-w-[1250px] mx-auto flex flex-col py-8 px-12">
        <SpaceHeader />
        <div className="grid w-full grid-cols-2 p-2 mt-2">
          <div className="w-full bg-white rounded-2xl p-4 shadow-md">
            <h1 className="mb-1 text-slate-500 text-lg font-bold">WORKOUT LOG</h1>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full rounded-lg border-2 border-[var(--accent-six)] p-2 pt-1">
                <p className="text-md font-semibold text-[var(--accent-six)]">
                  Friday 9th
                </p>
                <p className="text-slate-500 text-xs">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                  commodi neque culpa eveniet corporis dolorum optio et
                  voluptate pariatur, nam maxime molestias natus perspiciatis
                  dolorem enim, obcaecati similique nisi fugiat.
                </p>
              </div>
              <div className="w-full rounded-lg border-2 border-[var(--accent-two)] p-2 pt-1">
                <p className="text-md font-semibold text-[var(--accent-two)]">
                  Sunday 11th
                </p>
                <p className="text-slate-500 text-xs">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                  commodi neque culpa eveniet corporis dolorum optio et
                  voluptate pariatur, nam maxime molestias natus perspiciatis
                  dolorem enim, obcaecati similique nisi fugiat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
