import { Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="flex h-14 items-center px-4 lg:hidden">
      <button type="button" className="rounded-full p-2 hover:bg-accent">
        <Menu className="size-5" />
      </button>
    </header>
  );
}
