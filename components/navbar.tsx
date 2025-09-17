"use client"

import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NavbarProps {
  onCategoryChange: (category: "real" | "anime") => void
  currentCategory: "real" | "anime"
}

export function Navbar({ onCategoryChange, currentCategory }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="text-2xl font-bold text-primary">ImageFun</div>
            </div>

            {/* Center Dropdown */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="capitalize bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground"
                  >
                    {currentCategory} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onCategoryChange("real")}>Real</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onCategoryChange("anime")}>Anime</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Hamburger Menu */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(true)}
                className="text-foreground hover:text-primary hover:bg-accent"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Menu */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-80 bg-card shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-card-foreground">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
              className="text-card-foreground hover:text-primary"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-card-foreground">Categories</h3>
              <Button
                variant={currentCategory === "real" ? "default" : "ghost"}
                className="w-full justify-start text-black"
                onClick={() => {
                  onCategoryChange("real")
                  setIsMenuOpen(false)
                }}
              >
                18+ Images
              </Button>
              <Button
                variant={currentCategory === "anime" ? "default" : "ghost"}
                className="w-full justify-start text-black"
                onClick={() => {
                  onCategoryChange("anime")
                  setIsMenuOpen(false)
                }}
              >
                18- Images
              </Button>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">Click on images to change them and have fun comparing!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
