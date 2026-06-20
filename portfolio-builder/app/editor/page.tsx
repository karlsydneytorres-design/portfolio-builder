"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useEditorStore } from "@/lib/store";
import DraggableBlock from "@/components/DraggableBlock";
import { saveBlocks, getOrCreateSite } from "@/lib/api";
import { supabase } from "@/lib/supabase";

export default function EditorPage() {
  const { blocks, setBlocks, updateBlockPosition } = useEditorStore();
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [siteId, setSiteId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;

      if (!user) {
        router.push("/login");
        return;
      }

      const subdomain = user.email?.split("@")[0] ?? "user";
      const site = await getOrCreateSite(user.id, subdomain);
      setSiteId(site.id);
      setBlocks(site.blocks ?? []);
    }

    init().catch((err) => console.error("Failed to init editor:", err));
  }, [router, setBlocks]);

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

  async function handleSave() {
    if (!siteId) return;
    setStatus("saving");
    try {
      await saveBlocks(siteId, blocks);
      setStatus("saved");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <main className="relative h-screen w-full bg-gray-50">
      <div className="absolute left-0 top-0 z-10 flex items-center gap-3 bg-white p-2 text-sm text-gray-500 shadow">
        <span>Drag blocks, then save to Supabase.</span>
        <button
          onClick={handleSave}
          className="rounded bg-blue-600 px-3 py-1 text-white"
        >
          {status === "saving" ? "Saving..." : "Save"}
        </button>
        {status === "saved" && <span className="text-green-600">Saved ✓</span>}
        {status === "error" && <span className="text-red-600">Error saving</span>}
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