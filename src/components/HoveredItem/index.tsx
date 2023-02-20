import React, {FC} from 'react';
import styles from "./index.module.css"
import {Coordinates} from "../../types";


const HoveredItem: FC<Coordinates> = ({col, row}) => {
  return (
    <div className={styles.wrapper}>
      row {row} col {col}
    </div>
  );
};

export default HoveredItem;