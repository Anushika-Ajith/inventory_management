interface PageHeaderProps {
  title: string;
  description?: string;
  badgeText?: string;
}

export default function PageHeader({
  title,
  description = 'Manage and maintain records. Select an item from the menu to view or add records.',
  badgeText = 'Item Management',
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          {description}
        </p>
      </div>

      <div className="self-start sm:self-center">
        <span className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-2xs">
          {badgeText}
        </span>
      </div>
    </div>
  );
}
