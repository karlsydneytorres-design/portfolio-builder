import { BlockType } from "@/lib/types";

const BLOCK_TYPES: { type: BlockType; label: string }[] = [
  { type: "text", label: "Text" },
  { type: "image", label: "Image" },
  { type: "project_card", label: "Project Card" },
  { type: "contact_form", label: "Contact Form" },
  { type: "social_links", label: "Social Links" },
];

export default function AddBlockPanel({
  onAdd,
}: {
  onAdd: (type: BlockType) => void;
}) {
  return (
    <div className="flex gap-2">
      {BLOCK_TYPES.map((b) => (
        <button
          key={b.type}
          onClick={() => onAdd(b.type)}
          className="rounded border bg-white px-2 py-1 text-xs hover:bg-gray-100"
        >
          + {b.label}
        </button>
      ))}
    </div>
  );
}