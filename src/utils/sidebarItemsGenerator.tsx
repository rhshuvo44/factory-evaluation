import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types";

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
        title: item.name,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name as string,
        label: item.name,
        title: item.name as string,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              label: (
                <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
              ),
              title: child.name,
            };
          }
        }),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
