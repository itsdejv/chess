import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface DraggedPieceMap {
  id: string;
  image: string;
}

interface DraggedPieceContextType {
  draggedPiece: DraggedPieceMap;
  setDraggedPiece: Dispatch<SetStateAction<DraggedPieceMap>>;
}

const DraggedPieceContext = createContext<DraggedPieceContextType>({
  draggedPiece: {
    id: "",
    image: "",
  },
  setDraggedPiece: () => {},
});

interface Props {
  children: ReactNode;
}

const DraggedPieceContextProvider = ({ children }: Props) => {
  const [draggedPiece, setDraggedPiece] = useState<DraggedPieceMap>({
    id: "",
    image: "",
  });

  return (
    <DraggedPieceContext.Provider value={{ draggedPiece, setDraggedPiece }}>
      {children}
    </DraggedPieceContext.Provider>
  );
};

export { DraggedPieceContext, DraggedPieceContextProvider };
