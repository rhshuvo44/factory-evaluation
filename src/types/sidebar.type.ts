import { ReactNode } from 'react';

export type TRoute = {
    path: string;
    element: ReactNode;
};
export type TSidebarItem =
    | {
        key?: string;
        label?: ReactNode;
        title?: string;
        type?: string;
        children?: TSidebarItem[];
    }
    | undefined;

export type TUserPath = {
    name?: string;
    path?: string;
    type?: string;
    element?: ReactNode;
    children?: TUserPath[];
};