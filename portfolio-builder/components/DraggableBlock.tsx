import { useDraggable } from "@dnd-kit/core";
import { Block } from "@/lib/types";
import BlockRenderer from "./BlockRenderer";

export default function DraggableBlock({
  block,
  onSelect,
  isSelected,
}: {
  block: Block;
  onSelect?: () => void;
  isSelected?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: block.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onSelect}
      className={`cursor-move ${
        isSelected ? "outline outline-2 outline-blue-500" : ""
      }`}
    >
      <BlockRenderer block={block} />
    </div>
  );
}