interface DecoyProps {
  type: "text" | "password" | "number" | "email";
  name: string;
}
export default function DecoyInput({ type, name }: DecoyProps) {
  return (
    <input
      required
      type={type}
      name={name}
      tabIndex={-1}
      className="fixed pointer-events-none opacity-0"
    />
  );
}
