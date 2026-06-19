import BlockRenderer from "@/components/BlockRenderer";
import { supabase } from "@/lib/supabase";
import { Site } from "@/lib/types";
import { notFound } from "next/navigation";

// Public published page: app/[username]/page.tsx
// Server-rendered, no editing logic, same BlockRenderer as the editor.

async function getSite(username: string): Promise<Site | null> {
  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .eq("subdomain", username)
    .eq("isPublished", true)
    .single();

  if (error || !data) return null;
  return data as Site;
}

export default async function PublishedSitePage({
  params,
}: {
  params: { username: string };
}) {
  const site = await getSite(params.username);

  if (!site) {
    notFound();
  }

  return (
    <main className="relative min-h-screen w-full">
      {site.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </main>
  );
}
