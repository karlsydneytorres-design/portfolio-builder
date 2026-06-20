import BlockRenderer from "@/components/BlockRenderer";
import { getColorScheme } from "@/components/ThemePicker";
import { supabase } from "@/lib/supabase";
import { Site } from "@/lib/types";
import { notFound } from "next/navigation";

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

  const scheme = getColorScheme(site.theme?.colorScheme ?? "light");

  return (
    <main
      className="relative min-h-screen w-full"
      style={{
        backgroundColor: scheme.bg,
        color: scheme.text,
        fontFamily: site.theme?.font ?? "sans-serif",
      }}
    >
      {site.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </main>
  );
}