import React, { ComponentProps } from "react";
import { createPortal } from "react-dom";
import { DragOverlay, useDndContext } from "@dnd-kit/core";
import type { DropAnimation } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Piece } from "../Pieces/Piece";

const dropAnimationConfig: DropAnimation = {
  keyframes({ transform }) {
    return [
      { transform: CSS.Transform.toString(transform.initial) },
      {
        transform: CSS.Transform.toString({
          ...transform.final,
          scaleX: 0.94,
          scaleY: 0.94,
        }),
      },
    ];
  },
  sideEffects({ active, dragOverlay }) {
    active.node.style.opacity = "0";

    const button = dragOverlay.node.querySelector("button");

    if (button) {
      button.animate(
        [
          {
            boxShadow:
              "-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)",
          },
          {
            boxShadow:
              "-1px 0 15px 0 rgba(34, 33, 81, 0), 0px 15px 15px 0 rgba(34, 33, 81, 0)",
          },
        ],
        {
          duration: 250,
          easing: "ease",
          fill: "forwards",
        }
      );
    }

    return () => {
      active.node.style.opacity = "";
    };
  },
};

interface Props {
  id: string;
  image?: string;
  dropAnimation?: DropAnimation | null;
}

export function DraggableOverlay({
  id,
  image,
  dropAnimation = dropAnimationConfig,
}: Props) {
  const { active } = useDndContext();

  return createPortal(
    <DragOverlay dropAnimation={dropAnimation}>
      {active ? <Piece id={id} image={image} /> : null}
    </DragOverlay>,
    document.body
  );
}
