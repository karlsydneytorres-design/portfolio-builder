import { useDraggable } from "@dnd-kit/core";
import { Block } from "@/lib/types";
import BlockRenderer from "./BlockRenderer";

export default function DraggableBlock({ block }: { block: Block }) {
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
      className="cursor-move"
    >
      <BlockRenderer block={block} />
    </div>
  );
}