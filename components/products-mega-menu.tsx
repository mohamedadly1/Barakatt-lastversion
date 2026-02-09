"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Grid3x3, Tag, Zap, Volume2, Battery, ChevronRight, Ear } from "lucide-react"
import { cn } from "@/lib/utils"
import { productsMenuStructure } from "@/lib/products-menu-structure"

const iconMap: Record<string, React.ReactNode> = {
  Grid3x3: <Grid3x3 className="h-5 w-5" />,
  Tag: <Tag className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  Volume2: <Volume2 className="h-5 w-5" />,
  Battery: <Battery className="h-5 w-5" />,
}

export function ProductsMegaMenu() {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        <div className="flex items-center gap-2">
          <Ear className="h-4 w-4" />
          <span>Products & Accessories</span>
        </div>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="w-screen max-w-4xl p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {/* Main Categories Sidebar */}
            <div className="md:col-span-2 space-y-2">
              <div className="mb-4">
                <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-3">
                  Categories
                </h3>
              </div>
              {productsMenuStructure.categories.map((category) => (
                <button
                  key={category.id}
                  onMouseEnter={() => setActiveSubmenu(category.id)}
                  onClick={() => setActiveSubmenu(activeSubmenu === category.id ? null : category.id)}
                  className={cn(
                    "w-full group flex items-start gap-3 px-4 py-3 rounded-xl transition-all duration-300 border-2",
                    "border-primary/30 hover:border-primary hover:bg-primary/5 hover:shadow-md",
                    activeSubmenu === category.id &&
                      "border-primary bg-primary/5 shadow-md",
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 text-muted-foreground transition-colors duration-300",
                      activeSubmenu === category.id && "text-primary",
                    )}
                  >
                    {iconMap[category.icon as string]}
                  </div>
                  <div className="flex-1 text-left">
                    <p
                      className={cn(
                        "text-sm font-medium transition-colors duration-300",
                        activeSubmenu === category.id && "text-primary font-semibold",
                      )}
                    >
                      {category.label}
                    </p>
                  </div>
                  {(category.submenu || category.items) && (
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1",
                        activeSubmenu === category.id && "text-primary translate-x-1",
                      )}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="md:col-span-3 bg-background rounded-xl p-6 border border-border/50 min-h-96">
              {activeSubmenu ? (
                (() => {
                  const activeCategory = productsMenuStructure.categories.find((c) => c.id === activeSubmenu)
                  if (!activeCategory) return null

                  // Brand submenu (Hearing Aid Brands)
                  if (activeCategory.submenu) {
                    return (
                      <div className="space-y-5">
                        <h4 className="text-sm font-semibold uppercase text-foreground tracking-wider">
                          {activeCategory.label}
                        </h4>
                        <div className="space-y-4">
                          {activeCategory.submenu.map((brand) => (
                            <div key={brand.id} className="space-y-2">
                              <h5 className="font-medium text-sm text-foreground">
                                {brand.label}
                              </h5>
                              <p className="text-xs text-muted-foreground mb-3">{brand.description}</p>
                              <ul className="space-y-1">
                                {brand.items?.map((item) => (
                                  <li key={item.id}>
                                    <Link
                                      href={item.href}
                                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 py-1.5 px-3 block rounded-md border-l-2 border-transparent hover:border-primary hover:bg-primary/5"
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }

                  // Technology items
                  if (activeCategory.items) {
                    return (
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase text-foreground tracking-wider">
                          {activeCategory.label}
                        </h4>
                        <ul className="space-y-2">
                          {activeCategory.items.map((item) => (
                            <li key={item.id}>
                              <Link
                                href={item.href}
                                className="block p-3 rounded-lg border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 text-sm text-muted-foreground hover:text-primary hover:shadow-sm"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  }

                  // Simple link category
                  return (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      <p className="text-sm text-muted-foreground text-center">{activeCategory.label}</p>
                      <Link
                        href={activeCategory.href || "/products"}
                        className="px-5 py-2 border-2 border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        Explore
                      </Link>
                    </div>
                  )
                })()
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <Ear className="h-10 w-10 text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground text-center">Select a category to view products</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}
