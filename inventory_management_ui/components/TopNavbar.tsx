import { Menu } from 'lucide-react';

interface TopNavbarProps {
  selectedItemName: string;
  onOpenMobileMenu: () => void;
  userInitials?: string;
}

export default function TopNavbar({
  selectedItemName,
  onOpenMobileMenu,
  userInitials = 'AK',
}: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-slate-200/80 bg-white px-4 sm:px-6">
      {/* Left: Mobile Menu Toggle + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center text-xs sm:text-sm">
          <span className="font-medium text-slate-500 hover:text-slate-700 cursor-pointer">
            Home
          </span>
          <span className="mx-2 text-slate-300">/</span>
          <span className="font-semibold text-slate-900">
            {selectedItemName}
          </span>
        </nav>
      </div>

      {/* Right: User Profile Avatar */}
      <div className="flex items-center gap-3">
        <div
          title="User Profile"
          style={{ backgroundColor: '#e0f2fe', color: '#0369a1' }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-200/60 text-xs font-bold shadow-2xs select-none"
        >
          {userInitials}
        </div>
      </div>
    </header>
  );
}
