"use client";

import React from 'react';
import { ResourceProvider } from '../../context/ResourceContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ResourceProvider>
      {children}
    </ResourceProvider>
  );
}