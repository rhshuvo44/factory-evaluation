import { ReactNode } from "react";

export type TRoute = {
    path: string;
    element: ReactNode;
};
export type TSidebarItem = {
    key: string;
    label: ReactNode;
    children?: TSidebarItem[];
};