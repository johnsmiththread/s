"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { ImageFrame } from "@/components/image-frame"
import { Footer } from "@/components/footer"

export default function Home() {
  const [category, setCategory] = useState<"real" | "anime">("anime")
  const [imageChangeCount, setImageChangeCount] = useState(0)

  const handleImageChange = () => {
    setImageChangeCount((prev) => prev + 1)
  }

  const handleCategoryChange = (newCategory: "real" | "anime") => {
    setCategory(newCategory)
  }

  const themeClasses = "bg-black text-white"

  return (
    <div className={`min-h-screen transition-colors duration-500 ${themeClasses}`}>
      <Navbar onCategoryChange={handleCategoryChange} currentCategory={category} />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance text-white">Image Comparison Fun</h1>
            <p className="text-xl mb-8 text-pretty text-gray-300">
              Click on images to discover new ones. Currently viewing {category} style images!
            </p>
            <div className="text-sm text-gray-400">
              Images changed: <span className="font-semibold text-white">{imageChangeCount}</span>
            </div>
          </div>
        </section>

        {/* Image Comparison Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex lg:grid lg:grid-cols-2 gap-4 lg:gap-8 h-[600px] overflow-x-auto lg:overflow-x-visible">
              <div className="flex-shrink-0 w-80 lg:w-auto">
                <ImageFrame
                  title={`${category.charAt(0).toUpperCase() + category.slice(1)} #1`}
                  category={category}
                  onImageChange={handleImageChange}
                  imageId="image1"
                />
              </div>
              <div className="flex-shrink-0 w-80 lg:w-auto">
                <ImageFrame
                  title={`${category.charAt(0).toUpperCase() + category.slice(1)} #2`}
                  category={category}
                  onImageChange={handleImageChange}
                  imageId="image2"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Fun Stats */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 -mt-28 lg:mt-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border bg-gray-900 border-gray-700">
                <div className="text-3xl font-bold mb-2 text-white">{imageChangeCount}</div>
                <div className="text-gray-400">Images Changed</div>
              </div>
              <div className="p-6 rounded-lg border bg-gray-900 border-gray-700">
                <div className="text-3xl font-bold mb-2 text-white">∞</div>
                <div className="text-gray-400">Possibilities</div>
              </div>
              <div className="p-6 rounded-lg border bg-gray-900 border-gray-700">
                <div className="text-3xl font-bold mb-2 text-white">100%</div>
                <div className="text-gray-400">Fun Guaranteed</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 py-3 px-4 text-center z-40 bg-gray-800 text-white">
        <p className="text-sm font-medium">
          👆 Click to change image • Currently viewing: <span className="capitalize font-bold">{category}</span> mode
        </p>
      </div>
    </div>
  )
}
