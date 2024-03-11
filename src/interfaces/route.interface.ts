import React from "react";

export interface ComponentProps {
  message: string;
}

export interface Route {
  id: string;
  link: string;
  component: () => Promise<{ default: React.ComponentType<ComponentProps> }>;
}
