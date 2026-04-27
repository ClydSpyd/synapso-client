import ModuleWrapper from "@/components/utility-comps/module-wrapper";
import { colorCombos } from "@/config/color-config";
import { RiRunFill } from "react-icons/ri";
import { useModalStore } from "@/stores/modal-store";
import { useActivitySnapshot } from "@/queries/useActivitySnapshot";
import { formatDatePayload } from "@/lib/dates";
import HistoryBtn from "@/components/ui/history-btn";
import ActivityModuleContent from "./module-content";
import SnapshotHistoryModal from "./snapshot-history-modal";


export default function ActivitySnapshot() {
  const moduleColorConf = colorCombos[3];
  const { open } = useModalStore();
  const today = formatDatePayload(0);
  const { data: activities } = useActivitySnapshot(today);

  return (
    <ModuleWrapper>
      <div className="flex gap-2">
        <div
          className="w-11 h-11 flex items-center justify-center rounded-lg"
          style={{
            backgroundColor: moduleColorConf.hintColor,
            color: moduleColorConf.mainColor,
          }}
        >
          <RiRunFill size={27} />
        </div>
        <div className="grow">
          <h1 className="font-semibold text-slate-700">Activity Snapshot</h1>
          <p className="text-xs text-slate-500">
            Keep track of your your daily workouts, sports sessions and other
            activities
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              open({
                type: "activity_snapshot",
                title: "Log New Activity",
                payload: {
                  colorConfig: activities?.length ?? 0,
                },
                modalStyles: {
                  content: {
                    maxWidth: "600px",
                    width: "600px",
                    minWidth: "600px",
                  },
                },
              });
            }}
            className="w-[120px] bg-zen-shift h-fit flex justify-center items-center text-white rounded-md gap-1 px-2 py-1 !transition-all ease-in-out !duration-300"
          >
            <h1 className="text-lg m-0 font-semibold relative bottom-0.5">+</h1>
            <p className="text-sm m-0 font-semibold">LOG ENTRY</p>
          </button>

          <SnapshotHistoryModal>
            <HistoryBtn size={35} />
          </SnapshotHistoryModal>
        </div>
      </div>

      {/* Activity items list */}
      <ActivityModuleContent date={today} />
    </ModuleWrapper>
  );
}
