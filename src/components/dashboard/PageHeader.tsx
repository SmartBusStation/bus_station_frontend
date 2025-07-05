// src/components/dashboard/PageHeader.tsx

import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
};

export default PageHeader;
