import { useEffect, useState } from "react";
import { Modal } from "@mantine/core";
import { useDisclosure, useDebouncedCallback } from "@mantine/hooks";
import { defaultIconList, iconList } from "./icon-list";

export default function IconPicker({
  onSelect,
  children,
}: {
  onSelect: (iconName: string) => void;
  children?: React.ReactNode;
}) {
  const [search, setSearch] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [icons, setIcons] = useState(defaultIconList);

  const handleIcon = (iconName: string) => {
    onSelect(iconName);
    close();
    setSearch("");
    setIcons(defaultIconList);
  };

  const handleInputChange = useDebouncedCallback((value: string) => {
    if (!value) {
      setIcons(defaultIconList);
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
        <div className="max-h-[70vh] min-h-[200px] w-[70vw] flex flex-wrap justify-center gap-2 mt-2 overflow-y-auto">
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
