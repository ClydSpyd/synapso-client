// ToastProvider.tsx
import { notificationColors } from "@/config/color-config";
import { NotificationVariant, useToastStore } from "@/stores/toast-store";
import { IoWarning } from "react-icons/io5";
import { FaCircleInfo } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import { IoCheckmarkCircle } from "react-icons/io5";

const iconMap: Record<NotificationVariant, (props: React.ComponentProps<"svg">) => React.ReactNode> = {
  success: (props) => <IoCheckmarkCircle {...props} size={20} />,
  error: (props) => <TiDelete {...props} size={22} />,
  info: (props) => <FaCircleInfo {...props} size={18} />,
  warning: (props) => <IoWarning {...props} size={20} />,
};

export function ToastProvider() {
  const { toasts, dismiss } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-[9999] space-y-2">
      {toasts
        .slice()
        .reverse()
        .map((toast) => (
          <div
            key={toast.id}
            className={`min-w-[250px] slide-in rounded-md px-4 py-3 shadow-lg text-white 
            flex items-center cursor-pointer`}
            style={{
              border: `2px solid ${notificationColors[toast.variant]}`,
              color: notificationColors[toast.variant],
              backgroundColor: "white",
            }}
            onClick={() => dismiss(toast.id)}
          >
            {iconMap[toast.variant]({
              className: "inline-block mr-2",
              color: notificationColors[toast.variant],
            })}{" "}
            {toast.message}
          </div>
        ))}
    </div>
  );
}
