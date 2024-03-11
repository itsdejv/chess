import { Chessboard } from "./components/Chessboard/Chessboard";
import "./App.css";
import { DraggedPieceContextProvider } from "./components/contexts/DraggedPiece";

function App() {
  return (
    <DraggedPieceContextProvider>
      <main>
        <Chessboard />
      </main>
    </DraggedPieceContextProvider>
  );
}

export default App;
