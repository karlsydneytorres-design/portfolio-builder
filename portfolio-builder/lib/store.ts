import { create } from "zustand";
import { Block } from "./types";

type EditorState = {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
  updateBlockPosition: (id: string, x: number, y: number) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  blocks: [],
  setBlocks: (blocks) => set({ blocks }),
  updateBlockPosition: (id, x, y) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id
          ? { ...block, position: { x, y } }
          : block
      ),
    })),
}));