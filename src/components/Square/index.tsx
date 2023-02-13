import React, {FC} from 'react';
import styles from "./index.module.css";
import {concatClassName} from "../../utils";
import {Coordinates} from "../../types";

interface Props extends Coordinates{
  isActive: boolean
}

const Square: FC<Props> = ({
  col, row, isActive
                           }) => {
  return (
    <div className={concatClassName([styles.sq, isActive && styles.active])} data-col={col} data-row={row} />
  );
};

export default Square;