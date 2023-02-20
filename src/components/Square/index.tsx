import React, {FC} from 'react';
import styles from "./index.module.css";
import {concatClassName} from "../../utils";

interface Props {
  isActive: boolean;
  onHover: () => void;
}

const Square: FC<Props> = ({isActive, onHover
                           }) => {
  return (
    <div onMouseOver={onHover} className={concatClassName([styles.sq, isActive && styles.active])}/>
  );
};

export default Square;