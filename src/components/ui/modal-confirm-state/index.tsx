import CircleTick from "@/components/ui/circle-tick";
import { Button } from "@mantine/core";

export default function ModalConfirmState({
  setSuccess,
  submitting,
  itemType,
}: {
  setSuccess: (state: boolean) => void;
  submitting: boolean;
  itemType: string;
}) {
  return (
    <div className="flex flex-col items-center text-indigo-500 font-bold">
      <CircleTick height={100} width={100} color="var(--accent-three)" />
      <p>{itemType} added</p>
      <Button
        onClick={() => setSuccess(false)}
        loading={submitting}
        className="mt-4 button-zen h-[50px]"
        fullWidth
        variant="gradient"
        gradient={{ from: "indigo", to: "grape", deg: 147 }}
      >
        Add Another
      </Button>
    </div>
  );
}
