import { create } from "zustand";
import { Block, BlockType, BlockContent } from "./types";

function generateId() {
  return `block-${Math.random().toString(36).slice(2, 10)}`;
}

function defaultContentFor(type: BlockType): BlockContent {
  switch (type) {
    case "text":
      return { text: "New text block" };
    case "image":
      return { url: "https://placehold.co/400x300", alt: "" };
    case "project_card":
      return { title: "New Project", description: "", link: "" };
    case "contact_form":
      return { recipientEmail: "" };
    case "social_links":
      return { links: [] };
  }
}

function defaultSizeFor(type: BlockType) {
  switch (type) {
    case "text":
      return { width: 300, height: 60 };
    case "image":
      return { width: 300, height: 200 };
    case "project_card":
      return { width: 300, height: 200 };
    case "contact_form":
      return { width: 300, height: 150 };
    case "social_links":
      return { width: 300, height: 50 };
  }
}

type EditorState = {
  blocks: Block[];
  selectedBlockId: string | null;
  setBlocks: (blocks: Block[]) => void;
  updateBlockPosition: (id: string, x: number, y: number) => void;
  addBlock: (type: BlockType) => void;
  updateBlockContent: (id: string, content: BlockContent) => void;
  deleteBlock: (id: string) => void;
  selectBlock: (id: string | null) => void;
};

export const useEditorStore = create<EditorState>((set, get) => ({
  blocks: [],
  selectedBlockId: null,
  setBlocks: (blocks) => set({ blocks }),
  updateBlockPosition: (id, x, y) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...block, position: { x, y } } : block
      ),
    })),
  addBlock: (type) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      position: { x: 40, y: 40 },
      size: defaultSizeFor(type),
      zIndex: get().blocks.length + 1,
      content: defaultContentFor(type),
    };
    set((state) => ({
      blocks: [...state.blocks, newBlock],
      selectedBlockId: newBlock.id,
    }));
  },
  updateBlockContent: (id, content) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...block, content } : block
      ),
    })),
  deleteBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== id),
      selectedBlockId:
        state.selectedBlockId === id ? null : state.selectedBlockId,
    })),
  selectBlock: (id) => set({ selectedBlockId: id }),
}));