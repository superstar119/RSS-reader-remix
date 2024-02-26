import { useNavigation } from "@remix-run/react";

export function Loading() {
  const navigation = useNavigation();
  const active = navigation.state !== "idle";

  if (!active) return null;

  return (
    <div className="w-screen h-screen bg-white dark:bg-slate-900 bg-opacity-40 dark:bg-opacity-40 flex justify-center items-center fixed z-[100] animate-fade-in top-0 left-0">
      <span className="loader text-[#272727] dark:text-[#c0c0c0]"></span>
    </div>
  );
}
