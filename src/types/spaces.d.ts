declare interface SpaceSummary {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
}

declare interface SpaceModule {
    type: SpaceModuleType;
    title: string;
    description: string;
    icon: IconType;
    iconSize: number;
}

declare type SpaceModuleType = "list" | "log" | "tasks" | "habits";
