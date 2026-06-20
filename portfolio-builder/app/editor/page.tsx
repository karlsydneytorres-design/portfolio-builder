"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useEditorStore } from "@/lib/store";
import DraggableBlock from "@/components/DraggableBlock";
import AddBlockPanel from "@/components/AddBlockPanel";
import BlockEditorPanel from "@/components/BlockEditorPanel";
import { saveBlocks, getOrCreateSite, setPublishStatus, saveTheme } from "@/lib/api";
import ThemePicker, { getColorScheme } from "@/components/ThemePicker";
import { supabase } from "@/lib/supabase";

export default function EditorPage() {
  const {
    blocks,
    setBlocks,
    updateBlockPosition,
    selectedBlockId,
    addBlock,
    updateBlockContent,
    deleteBlock,
    selectBlock,
  } = useEditorStore();
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [siteId, setSiteId] = useState<string | null>(null);
  const [subdomain, setSubdomain] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [theme, setTheme] = useState({ colorScheme: "light", font: "sans-serif" });
  const router = useRouter();

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;

      if (!user) {
        router.push("/login");
        return;
      }

      const sub = user.email?.split("@")[0] ?? "user";
      const site = await getOrCreateSite(user.id, sub);
      setSiteId(site.id);
      setSubdomain(site.subdomain);
      setIsPublished(site.isPublished);
      setTheme(site.theme ?? { colorScheme: "light", font: "sans-serif" });
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

  async function handlePublish() {
    if (!siteId) return;
    try {
      await setPublishStatus(siteId, true);
      setIsPublished(true);
    } catch (err) {
      console.error("Failed to publish:", err);
    }
  }

  async function handleThemeChange(newTheme: typeof theme) {
    setTheme(newTheme);
    if (!siteId) return;
    try {
      await saveTheme(siteId, newTheme);
    } catch (err) {
      console.error("Failed to save theme:", err);
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

        <button
          onClick={handlePublish}
          className="rounded bg-green-600 px-3 py-1 text-white"
        >
          {isPublished ? "Republish" : "Publish"}
        </button>

       {isPublished && subdomain && (
          <a
            href={`/${subdomain}`}
            target="_blank"
            className="text-blue-600 underline"
          >
            View live site →
          </a>
        )}

        <ThemePicker theme={theme} onChange={handleThemeChange} />
        <AddBlockPanel onAdd={addBlock} />
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div
          className="relative h-full w-full"
          style={{
            fontFamily: theme.font,
            backgroundColor: getColorScheme(theme.colorScheme).bg,
            color: getColorScheme(theme.colorScheme).text,
          }}
        >
          {blocks.map((block) => (
            <div
              key={block.id}
              style={{
                position: "absolute",
                left: block.position.x,
                top: block.position.y,
              }}
            >
              <DraggableBlock
                block={block}
                onSelect={() => selectBlock(block.id)}
                isSelected={block.id === selectedBlockId}
              />
            </div>
          ))}
        </div>
      </DndContext>

      {selectedBlockId &&
        (() => {
          const selected = blocks.find((b) => b.id === selectedBlockId);
          if (!selected) return null;
          return (
            <BlockEditorPanel
              block={selected}
              onChange={(content) => updateBlockContent(selected.id, content)}
              onDelete={() => deleteBlock(selected.id)}
              onClose={() => selectBlock(null)}
            />
          );
        })()}
    </main>
  );
}