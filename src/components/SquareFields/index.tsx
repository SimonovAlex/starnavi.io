import React, {FC, Fragment} from 'react';
import Square from "../Square";
import styles from "./index.module.css";
import {Coordinates} from "../../types";

interface Props {
  size: number;
  onHover: (data: Coordinates) => void;
  hovered: boolean[][];
}

const SquareFields: FC<Props> = ({
                                   size,
                                   onHover,
                                   hovered
                                 }) => {

  const isActive = (i: number, j: number) => {
    if (hovered.length) {
      return hovered[i][j]
    }
    return false
  }

  const row = (i: number) => {
    return (
      Array(size).fill(false).map((_, j) => <Fragment key={`${i} ${j}`}>
        <Square
                isActive={isActive(i, j)}
                onHover={() => onHover({
                  col: j,
                  row: i,
                })}
        />
      </Fragment>)
    )
  }

  return (
    <div className={styles.sq}>
      {Array(size).fill(false).map((_, i) => <div className={styles.row} key={i}>{row(i)}</div>)}
    </div>
  );
};

export default SquareFields;