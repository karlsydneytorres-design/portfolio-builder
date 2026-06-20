import { supabase } from "./supabase";
import { Block } from "./types";

export async function saveBlocks(siteId: string, blocks: Block[]) {
  const { error } = await supabase
    .from("sites")
    .update({ blocks })
    .eq("id", siteId);

  if (error) throw error;
}

export async function loadBlocks(siteId: string): Promise<Block[]> {
  const { data, error } = await supabase
    .from("sites")
    .select("blocks")
    .eq("id", siteId)
    .single();

  if (error) throw error;
  return data.blocks as Block[];
}

export async function getOrCreateSite(userId: string, subdomain: string) {
  const { data: existing, error: fetchError } = await supabase
    .from("sites")
    .select("*")
    .eq("userId", userId)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (existing) return existing;

  const { data: created, error: createError } = await supabase
    .from("sites")
    .insert({ userId, subdomain, blocks: [] })
    .select()
    .single();

  if (createError) throw createError;
  return created;
}
export async function setPublishStatus(siteId: string, isPublished: boolean) {
  const { error } = await supabase
    .from("sites")
    .update({ isPublished })
    .eq("id", siteId);

  if (error) throw error;
}
export async function saveTheme(
  siteId: string,
  theme: { colorScheme: string; font: string }
) {
  const { error } = await supabase
    .from("sites")
    .update({ theme })
    .eq("id", siteId);

  if (error) throw error;
}