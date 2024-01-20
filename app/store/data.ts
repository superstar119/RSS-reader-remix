type ShortcutType = {
  key: string;
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
      { key: "←", description: "Previous post" },
      { key: "→", description: "Next post" },
      { key: "C", description: "Copy link to clipboard" },
      { key: "E", description: "Mark as unread" },
      { key: "⏎", description: "Open link in new tab" },
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
