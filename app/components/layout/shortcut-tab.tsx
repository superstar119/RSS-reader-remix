import { Shortcut } from "../ui/shortcut";
import { Key, Text } from "../ui/text";
import { ShortcutItem } from "./shortcut-item";
import { shortcuts } from "~/store/data";

export const ShortcutTab = () => (
  <div className="flex flex-col gap-[40px] items-stretch">
    {shortcuts.map((group, idx) => (
      <div className="flex flex-col gap-[6px]" key={idx}>
        <Text>{group.name}</Text>
        <div className="flex flex-col items-stretch">
          {group.items.map((shortcut, key) => (
            <ShortcutItem key={key}>
              <Shortcut>
                <Key className={shortcut.key.length > 2 ? "text-[12px]" : ""}>
                  {shortcut.key}
                </Key>
              </Shortcut>
              <Text>{shortcut.description}</Text>
            </ShortcutItem>
          ))}
        </div>
      </div>
    ))}
  </div>
);
