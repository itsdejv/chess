import "./Tile.css";
import { Piece } from "../Pieces/Piece";

interface TileProps {
  number: number;
  image?: string;
  id: string;
}

export const Tile = ({ number, image, id }: TileProps) => {
  if (number % 2 === 0)
    return (
      <div className=" tile secondary-tile">
        {image && <Piece id={id} image={image} />}
      </div>
    );
  else
    return (
      <div className="tile primary-tile">
        {image && <Piece id={id} image={image} />}
      </div>
    );
};
