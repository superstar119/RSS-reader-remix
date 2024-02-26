import { Theme, useTheme } from "remix-themes";
import { Icon } from "../ui/icon";
import { Shortcut } from "../ui/shortcut";
import { Key, Text } from "../ui/text";
import { ShortcutItem } from "./shortcut-item";
import { shortcuts } from "~/utils/data";

export const ShortcutTab = () => {
  const [theme] = useTheme();
  return (
    <div className="flex flex-col gap-[40px] items-stretch">
      {shortcuts.map((group, idx) => (
        <div className="flex flex-col gap-[6px]" key={idx}>
          <Text>{group.name}</Text>
          <div className="flex flex-col items-stretch">
            {group.items.map((shortcut, key) => (
              <ShortcutItem key={key}>
                <Shortcut>
                  {shortcut.key && (
                    <Key
                      className={shortcut.key.length > 2 ? "text-[12px]" : ""}
                    >
                      {shortcut.key}
                    </Key>
                  )}
                  {shortcut.icon && (
                    <Icon
                      iconName={shortcut.icon}
                      color={theme === Theme.DARK ? "silver" : "#7b7b7b"}
                    />
                  )}
                </Shortcut>
                <Text>{shortcut.description}</Text>
              </ShortcutItem>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
