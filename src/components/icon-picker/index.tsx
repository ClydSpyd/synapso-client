import { useEffect, useState } from "react";
import { Modal } from "@mantine/core";
import { useDisclosure, useDebouncedCallback } from "@mantine/hooks";
import { defaultIconList, activityIconList, iconList } from "./icon-list";

export default function IconPicker({
  onSelect,
  children,
  baseIconSet = "general",
}: {
  onSelect: (iconName: string) => void;
  baseIconSet?: "activity" | "general";
  children?: React.ReactNode;
}) {
  const defaultOptions =
    baseIconSet === "activity" ? activityIconList : defaultIconList;
    
  const [search, setSearch] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [icons, setIcons] = useState(defaultOptions);

  const handleIcon = (iconName: string) => {
    onSelect(iconName);
    close();
    setSearch("");
    setIcons(defaultOptions);
  };

  const handleInputChange = useDebouncedCallback((value: string) => {
    if (!value) {
      setIcons(defaultOptions);
      return;
    }
    const filteredIcons = iconList.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    setIcons(filteredIcons);
  }, 400);

  useEffect(() => {
    handleInputChange(search);
  }, [search]);

  return (
    <>
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={close}
        size={"auto"}
        centered
      >
        <input
          type="text"
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border w-full rounded-sm"
        />
        <div className="max-h-[70vh] min-h-[200px] w-[650px] max-w-[70vw] flex flex-wrap justify-center gap-2 mt-2 overflow-y-auto">
          {icons.map(({ name, IconComponent }) => (
            <div
              key={name}
              className="p-2 w-[80px] h-[80px] flex items-center justify-center hover:bg-gray-100 rounded-md cursor-pointer"
              onClick={() => handleIcon(name)}
              title={name}
            >
              <IconComponent size={40} />
            </div>
          ))}
        </div>
      </Modal>
      <div onClick={open}>{children}</div>
    </>
  );
}
