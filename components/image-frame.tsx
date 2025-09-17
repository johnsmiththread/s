"use client"

import { useState, useEffect } from "react"
import { RefreshCw } from "lucide-react"

interface ImageFrameProps {
  title: string
  category: "real" | "anime"
  onImageChange: () => void
  imageId: string
}

export function ImageFrame({ title, category, onImageChange }: ImageFrameProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [imageKey, setImageKey] = useState(0)
  const [imageUrl, setImageUrl] = useState<string>("")

  async function fetchImage() {
    try {
     const response = await fetch(`/api/images?category=${category}`);
      const data = await response.json()
      return data.url || null
    } catch {
      return null
    }
  }

  const getFallbackImageUrl = () => {
    return category === "anime"
      ? "/next.svg"
      : "/vercel.svg"
  }

  const handleImageClick = async () => {
    if (isLoading) return // prevent spamming clicks
    setIsLoading(true)
    try {
      const newImageUrl = await fetchImage()
      if (!newImageUrl) throw new Error("No image URL received")

      // preload before swapping
      const preload = new window.Image()
      preload.onload = () => {
        setImageUrl(newImageUrl)
        setImageKey((prev) => prev + 1)
        setIsLoading(false)
        onImageChange()
      }
      preload.onerror = () => {
        setImageUrl(getFallbackImageUrl())
        setImageKey((prev) => prev + 1)
        setIsLoading(false)
        onImageChange()
      }
      preload.src = newImageUrl
    } catch {
      setImageUrl(getFallbackImageUrl())
      setImageKey((prev) => prev + 1)
      setIsLoading(false)
    }
  }

  // Load first image when category changes
  useEffect(() => {
    setImageUrl(getFallbackImageUrl())
    setImageKey((prev) => prev + 1)
    handleImageClick()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  const frameColors =
    category === "anime"
      ? "bg-purple-900 border-purple-600"
      : "bg-pink-900 border-pink-600"

  const headerColors =
    category === "anime"
      ? "bg-purple-700 text-purple-100"
      : "bg-pink-700 text-pink-100"

  return (
    <div className="relative group">
      <div className={`rounded-lg overflow-hidden shadow-lg h-full border ${frameColors}`}>
        {/* Header */}
        <div className={`p-4 ${headerColors}`}>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>

        {/* Image container (clickable) */}
        <div
          key={imageKey}
          className="relative aspect-square overflow-hidden cursor-pointer"
          onClick={handleImageClick}
        >
          {/* Background image */}
          <div
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%",
            }}
            className="transition-transform duration-300 hover:scale-105 -mt-8"
          />

          {/* Loader overlay (non-blocking for clicks) */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
              <RefreshCw className="h-8 w-8 text-white animate-spin" />
            </div>
          )}

          {/* Hover tooltip (non-blocking) */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
            <div className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-black">
              Click to change
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
