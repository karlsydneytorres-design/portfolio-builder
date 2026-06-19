"use client";

import BlockRenderer from "@/components/BlockRenderer";
import { Site } from "@/lib/types";

// Sample site data for testing the renderer before persistence/drag-and-drop
// are wired up. Replace with real state from Zustand + Supabase.
const sampleSite: Site = {
  id: "demo",
  userId: "demo-user",
  subdomain: "demo",
  theme: { colorScheme: "light", font: "sans-serif" },
  isPublished: false,
  blocks: [
    {
      id: "block-1",
      type: "text",
      position: { x: 40, y: 40 },
      size: { width: 400, height: 80 },
      zIndex: 1,
      content: { text: "Hi, I'm building my portfolio here." },
    },
    {
      id: "block-2",
      type: "project_card",
      position: { x: 40, y: 140 },
      size: { width: 300, height: 200 },
      zIndex: 1,
      content: {
        title: "Sample Project",
        description: "A short description of the project.",
        link: "https://example.com",
      },
    },
  ],
};

export default function EditorPage() {
  // TODO: replace with Zustand store for layout state, plus dnd-kit
  // <DndContext> wrapping these blocks so they're draggable/resizable.
  return (
    <main className="relative h-screen w-full bg-gray-50">
      <div className="absolute left-0 top-0 z-10 bg-white p-2 text-sm text-gray-500 shadow">
        Editor shell — drag-and-drop not wired up yet. Rendering sample blocks
        via the shared BlockRenderer.
      </div>
      <div className="relative h-full w-full">
        {sampleSite.blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>
    </main>
  );
}
