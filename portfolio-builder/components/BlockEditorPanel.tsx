import { Block, BlockContent } from "@/lib/types";

export default function BlockEditorPanel({
  block,
  onChange,
  onDelete,
  onClose,
}: {
  block: Block;
  onChange: (content: BlockContent) => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const content = block.content as any;

  return (
    <div className="absolute right-0 top-0 z-20 h-full w-72 overflow-y-auto border-l bg-white p-4 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold capitalize">
          {block.type.replace("_", " ")}
        </h3>
        <button onClick={onClose} className="text-sm text-gray-400">
          Close
        </button>
      </div>

      {block.type === "text" && (
        <textarea
          className="w-full rounded border p-2 text-sm"
          rows={4}
          value={content.text ?? ""}
          onChange={(e) => onChange({ text: e.target.value })}
        />
      )}

      {block.type === "image" && (
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500">Image URL</label>
          <input
            className="w-full rounded border p-2 text-sm"
            value={content.url ?? ""}
            onChange={(e) => onChange({ ...content, url: e.target.value })}
          />
          <label className="text-xs text-gray-500">Alt text</label>
          <input
            className="w-full rounded border p-2 text-sm"
            value={content.alt ?? ""}
            onChange={(e) => onChange({ ...content, alt: e.target.value })}
          />
        </div>
      )}

      {block.type === "project_card" && (
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500">Title</label>
          <input
            className="w-full rounded border p-2 text-sm"
            value={content.title ?? ""}
            onChange={(e) => onChange({ ...content, title: e.target.value })}
          />
          <label className="text-xs text-gray-500">Description</label>
          <textarea
            className="w-full rounded border p-2 text-sm"
            rows={3}
            value={content.description ?? ""}
            onChange={(e) =>
              onChange({ ...content, description: e.target.value })
            }
          />
          <label className="text-xs text-gray-500">Image URL</label>
          <input
            className="w-full rounded border p-2 text-sm"
            value={content.imageUrl ?? ""}
            onChange={(e) =>
              onChange({ ...content, imageUrl: e.target.value })
            }
          />
          <label className="text-xs text-gray-500">Link</label>
          <input
            className="w-full rounded border p-2 text-sm"
            value={content.link ?? ""}
            onChange={(e) => onChange({ ...content, link: e.target.value })}
          />
        </div>
      )}

      {block.type === "contact_form" && (
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500">Recipient email</label>
          <input
            className="w-full rounded border p-2 text-sm"
            value={content.recipientEmail ?? ""}
            onChange={(e) =>
              onChange({ ...content, recipientEmail: e.target.value })
            }
          />
        </div>
      )}

      {block.type === "social_links" && (
        <SocialLinksEditor
          links={content.links ?? []}
          onChange={(links) => onChange({ links })}
        />
      )}

      <button
        onClick={onDelete}
        className="mt-4 w-full rounded bg-red-600 py-2 text-sm text-white"
      >
        Delete block
      </button>
    </div>
  );
}

function SocialLinksEditor({
  links,
  onChange,
}: {
  links: { platform: string; url: string }[];
  onChange: (links: { platform: string; url: string }[]) => void;
}) {
  function update(index: number, field: "platform" | "url", value: string) {
    const next = [...links];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  }

  function add() {
    onChange([...links, { platform: "", url: "" }]);
  }

  function remove(index: number) {
    onChange(links.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-3">
      {links.map((link, i) => (
        <div key={i} className="flex flex-col gap-1 rounded border p-2">
          <input
            placeholder="Platform (e.g. Twitter)"
            className="w-full rounded border p-1 text-sm"
            value={link.platform}
            onChange={(e) => update(i, "platform", e.target.value)}
          />
          <input
            placeholder="URL"
            className="w-full rounded border p-1 text-sm"
            value={link.url}
            onChange={(e) => update(i, "url", e.target.value)}
          />
          <button
            onClick={() => remove(i)}
            className="text-xs text-red-500 underline"
          >
            Remove
          </button>
        </div>
      ))}
      <button onClick={add} className="text-xs text-blue-600 underline">
        + Add link
      </button>
    </div>
  );
}