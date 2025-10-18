import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/shared/user-nav";
import { AiChat } from "./ai-chat";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-2xl">Welcome, User</h1>
      </div>
      <div className="flex items-center gap-4">
        <AiChat />
        <UserNav />
      </div>
    </header>
  );
}
