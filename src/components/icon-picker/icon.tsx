import { IconType } from "react-icons/lib";
import { getIconByName } from "./icon-list";

export default function Icon({
  name,
  className,
  size = 24,
  color = "currentColor",
  style,
  ...props
}: {
  name: string;
  className?: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  const IconComponent: IconType | null = getIconByName(name);
  
  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
      style={style}
      {...props}
    />
  );

}
