"use client";

import { useEffect } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useEditorStore } from "@/lib/store";
import DraggableBlock from "@/components/DraggableBlock";
import { Site } from "@/lib/types";

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
  const { blocks, setBlocks, updateBlockPosition } = useEditorStore();

  // Load sample data into the store on first render.
  // Later, replace this with a fetch from Supabase.
  useEffect(() => {
    setBlocks(sampleSite.blocks);
  }, [setBlocks]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, delta } = event;
    const block = blocks.find((b) => b.id === active.id);
    if (!block) return;

    updateBlockPosition(
      block.id,
      block.position.x + delta.x,
      block.position.y + delta.y
    );
  }

  return (
    <main className="relative h-screen w-full bg-gray-50">
      <div className="absolute left-0 top-0 z-10 bg-white p-2 text-sm text-gray-500 shadow">
        Drag the blocks below — positions are now live in Zustand state.
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="relative h-full w-full">
          {blocks.map((block) => (
            <div
              key={block.id}
              style={{
                position: "absolute",
                left: block.position.x,
                top: block.position.y,
              }}
            >
              <DraggableBlock block={block} />
            </div>
          ))}
        </div>
      </DndContext>
    </main>
  );
}