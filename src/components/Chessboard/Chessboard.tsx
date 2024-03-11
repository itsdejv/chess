import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { Tile } from "../Tiles/Tile";
import "./Chessboard.css";
import { DraggableOverlay } from "../DragAndDrop/DraggableOverlay";
import { useContext } from "react";
import { DraggedPieceContext } from "../contexts/DraggedPiece";
import { snapCenterToCursor } from "@dnd-kit/modifiers";

interface Pieces {
  source: string;
  x: number;
  y: number;
}

const pieces: Pieces[] = [];

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const y = p === 0 ? 7 : 0;

  pieces.push({ source: `assets/pieces/king_${type}.png`, x: 4, y });

  pieces.push({ source: `assets/pieces/queen_${type}.png`, x: 3, y });

  pieces.push({ source: `assets/pieces/rook_${type}.png`, x: 0, y });
  pieces.push({ source: `assets/pieces/rook_${type}.png`, x: 7, y });

  pieces.push({ source: `assets/pieces/knight_${type}.png`, x: 1, y });
  pieces.push({ source: `assets/pieces/knight_${type}.png`, x: 6, y });

  pieces.push({ source: `assets/pieces/bishop_${type}.png`, x: 2, y });
  pieces.push({ source: `assets/pieces/bishop_${type}.png`, x: 5, y });
}

for (let i = 0; i < 8; i++) {
  pieces.push({ source: "assets/pieces/pawn_w.png", x: i, y: 1 });
}

for (let i = 0; i < 8; i++) {
  pieces.push({ source: "assets/pieces/pawn_b.png", x: i, y: 6 });
}

export const Chessboard = () => {
  const { draggedPiece, setDraggedPiece } = useContext(DraggedPieceContext);

  const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

  let board = [];

  for (let v = verticalAxis.length - 1; v >= 0; v--) {
    for (let h = 0; h < horizontalAxis.length; h++) {
      const colorNumber = v + h;

      let image = undefined;
      let id = horizontalAxis[h] + verticalAxis[v];
      pieces.map((piece) => {
        if (piece.x === h && piece.y === v) {
          image = piece.source;
        }
      });

      board.push(<Tile key={id} number={colorNumber} image={image} id={id} />);
    }
  }

  const handleDragStart = (e: DragStartEvent) => {
    setDraggedPiece({
      id: e.active.data.current?.pieceId,
      image: e.active.data.current?.pieceImage,
    });
  };

  return (
    <DndContext onDragStart={handleDragStart} modifiers={[snapCenterToCursor]}>
      <div className="chessboard">{board}</div>
      <DraggableOverlay id={draggedPiece.id} image={draggedPiece.image} />
    </DndContext>
  );
};
