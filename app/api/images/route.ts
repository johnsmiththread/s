// app/api/images/route.ts  (notice: no [category] folder anymore!)
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")

    if (!category) {
      return NextResponse.json({ error: "Category parameter is required" }, { status: 400 })
    }

    let imageUrl: string | null = null

    if (category === "anime") {
      const res = await fetch("https://api.waifu.pics/sfw/waifu")
      const data = await res.json()
      imageUrl = data.url
    } else if (category === "real") {
      const res = await fetch("https://api.waifu.pics/nsfw/waifu")
      const data = await res.json()
      imageUrl = data.url
    }

    if (!imageUrl) {
      return NextResponse.json({ error: "No image found" }, { status: 404 })
    }

    return NextResponse.json({ url: imageUrl })
  } catch (err) {
    console.error("API Proxy Error:", err)
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 })
  }
}
