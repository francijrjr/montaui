"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/monta-ui/navigation-menu";

export default function TopbarHeader() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Soluções</NavigationMenuTrigger>
          <NavigationMenuContent className="p-4 md:w-[400px]">
            <div className="grid gap-3">
              <NavigationMenuLink
                href="/core"
                className="block select-none space-y-1 rounded-md p-3 hover:bg-muted"
              >
                <div className="text-sm font-bold">Monta UI Core</div>
                <p className="text-xs text-muted-foreground">
                  27 componentes corporativos prontos para uso.
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
