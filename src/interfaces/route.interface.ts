import React from "react";
export interface Route {
  id: string;
  link: string;
  component: () => Promise<{ default: React.ComponentType }>;
}
