"use client"
import { useDisclosure } from "@mantine/hooks";
import { modules } from "./config";
import { Modal } from "@mantine/core";
import { modalConfig } from "@/components/utility-comps/modal-content-wrapper/modal-config";
import ModalContentWrapper from "@/components/utility-comps/modal-content-wrapper";
import { colorCombos } from "@/config/color-config";
import ModuleGridItem from "./module-grid-item";
import { useState } from "react";


export default function ModulePickerModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [selected, setSelected] = useState<SpaceModuleType | null>(null);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setSelected(null);
          close();  
        }}
        {...modalConfig}
        styles={{
          content: {
            // border: "2px solid cyan",
            minWidth: "600px",
            padding: 0,
            borderRadius: "8px",
          },
          body: {
            margin: 0,
            padding: 0,
          },
        }}
      >
        <ModalContentWrapper title="New Module" close={close}>
          <div className="w-full">
            <p className="text-xs px-4">
              Select a module type to add to your space
            </p>
            <div className="grid grid-cols-2 gap-2 p-4">
              {modules.map((item, idx) => (
                <ModuleGridItem
                  key={item.type}
                  item={item}
                  colorConfig={colorCombos[idx]}
                  selected={selected === item.type}
                  onSelect={(type: SpaceModuleType) => setSelected(type)}
                />
              ))}
            </div>
            <div className="flex justify-end w-full">
              <button
                className="h-[40px] bg-zen-shift flex items-center text-white rounded-md gap-1 px-4 py-1 !transition-all ease-in-out !duration-300 cursor-pointer text-center"
                style={{
                  opacity: selected ? 1 : 0.5,
                  pointerEvents: selected ? "auto" : "none",
                }}
                onClick={close}
                disabled={!selected}
              >
                Submit
              </button>
            </div>
          </div>
        </ModalContentWrapper>
      </Modal>
      <div onClick={open}>{children}</div>
    </>
  );
}
