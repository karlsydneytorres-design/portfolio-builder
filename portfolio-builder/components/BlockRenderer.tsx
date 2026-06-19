import { Block } from "@/lib/types";

// This component is the heart of the "two render contexts" architecture:
// it's used as-is for the published static page, and wrapped with
// drag-and-drop handles in the editor. Keep it dumb — no editing
// logic lives here, just "given a block, render it."

export default function BlockRenderer({ block }: { block: Block }) {
  const wrapperStyle: React.CSSProperties = {
    position: "absolute",
    left: block.position.x,
    top: block.position.y,
    width: block.size.width,
    height: block.size.height,
    zIndex: block.zIndex,
    backgroundColor: block.style?.backgroundColor,
    color: block.style?.textColor,
    fontFamily: block.style?.fontFamily,
    padding: block.style?.padding,
  };

  switch (block.type) {
    case "text": {
      const content = block.content as { text: string };
      return (
        <div style={wrapperStyle}>
          <p>{content.text}</p>
        </div>
      );
    }

    case "image": {
      const content = block.content as { url: string; alt?: string };
      return (
        <div style={wrapperStyle}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.url}
            alt={content.alt ?? ""}
            className="h-full w-full object-cover"
          />
        </div>
      );
    }

    case "project_card": {
      const content = block.content as {
        title: string;
        description?: string;
        imageUrl?: string;
        link?: string;
      };
      return (
        <div style={wrapperStyle} className="rounded-lg border p-4 shadow-sm">
          {content.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={content.imageUrl}
              alt={content.title}
              className="mb-2 h-32 w-full object-cover"
            />
          )}
          <h3 className="font-semibold">{content.title}</h3>
          {content.description && (
            <p className="text-sm text-gray-600">{content.description}</p>
          )}
          {content.link && (
            <a
              href={content.link}
              className="text-sm text-blue-600 underline"
              target="_blank"
              rel="noreferrer"
            >
              View project →
            </a>
          )}
        </div>
      );
    }

    case "contact_form": {
      const content = block.content as { recipientEmail: string };
      return (
        <div style={wrapperStyle} className="rounded-lg border p-4">
          <p className="mb-2 text-sm text-gray-500">Contact form (placeholder)</p>
          <p className="text-xs text-gray-400">Sends to: {content.recipientEmail}</p>
        </div>
      );
    }

    case "social_links": {
      const content = block.content as {
        links: { platform: string; url: string }[];
      };
      return (
        <div style={wrapperStyle} className="flex gap-3">
          {content.links.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm underline"
            >
              {link.platform}
            </a>
          ))}
        </div>
      );
    }

    default:
      return null;
  }
}
