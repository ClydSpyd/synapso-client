import {
  DownIcon,
  HappyIcon,
  NeutralIcon,
  SadIcon,
  UpIcon,
} from "@/components/ui/emojis";
import { moodScale } from "@/config/color-config";
import BarInputs from "../bar-inputs";
import { Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import StaggerContainer from "@/components/utility-comps/stagger-container";
import { API } from "@/api";
import { useCheckin } from "@/queries/useCheckin";
import CircleTick from "@/components/ui/circle-tick";
import LoaderSpin from "@/components/ui/loader-spin";
import { useQueryClient } from "@tanstack/react-query";

export interface CheckinValues {
  mood: number;
  energy_level: number;
  focus_level: number;
  stress_level: number;
  reflection: string;
}

const initialValues: CheckinValues = {
  mood: 0,
  energy_level: 0,
  focus_level: 0,
  stress_level: 0,
  reflection: "",
};

const moodsConfig = [
  {
    label: "Very Sad",
    icon: <SadIcon size={30} color={"#fff"} />,
    color: moodScale[0],
    value: 0,
  },
  {
    label: "Sad",
    icon: <DownIcon size={30} color={"#fff"} />,
    color: moodScale[1],
    value: 1,
  },
  {
    label: "Neutral",
    icon: <NeutralIcon size={30} color={"#fff"} />,
    color: moodScale[2],
    value: 2,
  },
  {
    label: "Happy",
    icon: <UpIcon size={30} color={"#fff"} />,
    color: moodScale[3],
    value: 3,
  },
  {
    label: "Very Happy",
    icon: <HappyIcon size={35} color={"#fff"} />,
    color: moodScale[4],
    value: 4,
  },
];

const unchangedLocally = (a: CheckinValues, b: CheckinValues) => {
  const returnVal = Object.keys(a).every(
    (key) => a[key as keyof CheckinValues] === b[key as keyof CheckinValues]
  );
  console.log("Unchanged locally:", { returnVal, a, b });
  return returnVal;
};

const checkValuesComplete = (inputVals: CheckinValues) => {
  return (
    inputVals.mood >= 0 &&
    inputVals.energy_level >= 0 &&
    inputVals.focus_level >= 0 &&
    inputVals.stress_level >= 0 &&
    inputVals.reflection.length > 0
  );
};

export default function CheckinModuleContent({ date }: { date: string }) {
  const queryClient = useQueryClient();
  const { data } = useCheckin(date);
  const [inputVals, setInputVals] = useState<CheckinValues>(
    data ?? initialValues
  );
  const [complete, setComplete] = useState(checkValuesComplete(inputVals));
  const [uiState, setUiState] = useState<
    "saving" | "saved" | "error" | "ready"
  >("ready");

  useEffect(() => {
    if (data) {
      setInputVals(data);
    }
  }, [data]);

  useEffect(() => {
    if(!data) {
      setComplete(false);
      return;
    }

    setComplete(
      checkValuesComplete(inputVals) &&
        !unchangedLocally(inputVals, data as CheckinValues)
    );
  }, [inputVals]);

  const handleInputChange = (
    field: keyof CheckinValues,
    value: number | string
  ) => {
    setInputVals({ ...inputVals, [field]: value });
  };

  const handleSave = async () => {
    setUiState("saving");
    console.log("Saving check-in:", date);
    const payload: Checkin = {
      mood: inputVals.mood < 0 ? 0 : inputVals.mood,
      energy_level: inputVals.energy_level,
      focus_level: inputVals.focus_level,
      stress_level: inputVals.stress_level,
      reflection: inputVals.reflection,
    };
    const { data, error } = await API.checkin.create(payload, date);
    console.log({ data, error });
    if (data) {
      setTimeout(() => {
        setUiState("saved");
        setTimeout(() => setUiState("ready"), 1500);
      }, 500);
      queryClient.invalidateQueries({
        queryKey: ["checkins"],
        exact: false,
      });
      queryClient.refetchQueries({
        queryKey: ["week-glance-stats"],
        exact: false,
      });
    } else {
      setUiState("error");
    }
  };

  return (
    <>
      <div className="py-3">
        <p className="w-full text-center font-semibold text-xs text-gray-500 mb-2">
          How are you feeling today? (select one)
        </p>
        <div className="flex gap-2 w-full justify-center">
          {moodsConfig.map((mood) => (
            <StaggerContainer staggerDelay={150} key={mood.value}>
              <div
                onClick={() => setInputVals({ ...inputVals, mood: mood.value })}
                className={cn(
                  "flex items-center justify-center rounded-full cursor-pointer min-h-[25px] max-h-[25px] min-w-[25px] max-w-[25px] relative z-10 transition-all duration-300 ease-in-out hover:scale-115",
                  {
                    "pointer-events-none": inputVals.mood === mood.value,
                  }
                )}
                style={{ backgroundColor: mood.color }}
              >
                {mood.icon}
                {inputVals.mood === mood.value && (
                  <div className="z-[-1] absolute rounded-full bg-[var(--accent-six)] min-h-[30px] max-h-[30px] min-w-[30px] max-w-[30px]" />
                )}
              </div>
            </StaggerContainer>
          ))}
        </div>
      </div>
      <div className="py-3">
        <p className="font-semibold text-xs text-gray-500 mb-2">
          Your metrics for today
        </p>
        <BarInputs onChange={handleInputChange} values={inputVals} />
      </div>
      <div className="pb-3">
        <p className="font-semibold text-xs text-gray-500 mb-2">
          Quick Reflection
        </p>
        <Textarea
          value={inputVals.reflection}
          onChange={(e) => handleInputChange("reflection", e.target.value)}
          placeholder="What's on your mind?"
          size="sm"
          autosize
          minRows={4}
          maxRows={6}
          classNames={{
            input: "!border-gray-200 !rounded-lg",
          }}
        />
      </div>
      {/* <div className="flex w-full justify-end">
                <button
                  onClick={handleGet}
                  className="bg-zen-shift flex items-center text-white rounded-md gap-1 px-2 py-1 !transition-all ease-in-out !duration-300 cursor-pointer"
                >
                  <p className="text-sm m-0 font-semibold">GET</p>
                </button>
              </div> */}
      <div className="flex w-full justify-end gap-2">
        <div className="flex items-center gap-2">
          {uiState === "saving" && <LoaderSpin size={18} color="#6500d8" />}
          {uiState === "saved" && <CircleTick height={20} width={20} />}
          {uiState === "error" && (
            <p className="text-xs text-red-500 italic">
              Error saving. Please try again.
            </p>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={!complete || uiState === "saving"}
          className={cn(
            "bg-zen-shift flex items-center text-white rounded-md gap-1 px-2 py-1 !transition-all ease-in-out !duration-300 cursor-pointer",
            {
              "opacity-50 cursor-not-allowed":
                !complete || uiState === "saving",
            }
          )}
        >
          <p className="text-sm m-0 font-semibold">Save</p>
        </button>
      </div>
    </>
  );
}
