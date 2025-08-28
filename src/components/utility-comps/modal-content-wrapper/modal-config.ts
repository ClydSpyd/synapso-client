import type { MantineTransition } from '@mantine/core';

export const modalConfig = {
  withCloseButton: false,
  centered: true,
  transitionProps: {
    transition: "scale-y" as MantineTransition,
    duration: 200,
    timingFunction: "ease",
  },
  overlayProps: {
    backgroundOpacity: 0.55,
    blur: 3,
  },
  styles: {
    content: {
      padding: 0,
      borderRadius: "8px",
    },
    body: {
      margin: 0,
      padding: 0,
    },
  },
};