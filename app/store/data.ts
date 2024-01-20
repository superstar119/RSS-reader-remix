type ShortcutType = {
  key?: string;
  icon?: "arrowLeft" | "arrowRight" | "return";
  description: string;
};

type ShortcutsType = {
  name: string;
  items: ShortcutType[];
};

export const shortcuts: ShortcutsType[] = [
  {
    name: "Feed",
    items: [
      { key: "L", description: "Switch layout" },
      { key: "CMD", description: "+ Click to open link in new tab" },
      { key: "E", description: "Mark all as read" },
    ],
  },
  {
    name: "Post",
    items: [
      { icon: "arrowLeft", description: "Previous post" },
      { icon: "arrowRight", description: "Next post" },
      { key: "C", description: "Copy link to clipboard" },
      { key: "E", description: "Mark as unread" },
      { icon: "return", description: "Open link in new tab" },
    ],
  },
  {
    name: "General",
    items: [
      { key: "ESC", description: "Go back" },
      { key: "T", description: "Switch theme" },
      { key: "S", description: "Open settings" },
    ],
  },
];
