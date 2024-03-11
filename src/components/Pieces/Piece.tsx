import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { DraggableOverlay } from "../DragAndDrop/DraggableOverlay";

interface PieceProps {
  image?: string;
  id: string;
}

export const Piece = ({ image, id }: PieceProps) => {
  const { listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: {
      pieceId: id,
      pieceImage: image,
    },
  });

  return (
    <>
      <div
        ref={setNodeRef}
        {...listeners}
        className="chess-piece"
        style={{
          backgroundImage: `url(${image})`,
          opacity: isDragging ? 0 : undefined,
        }}
      ></div>
    </>
  );
};
