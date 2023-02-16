import React, {ChangeEvent, useEffect, useMemo, useRef, useState} from 'react';
import SquareFields from "./components/SquareFields";
import useFetchData from "./API/useFetchData";
import {Complexity} from "./API/types";
import styles from "./app.module.css";
import HoveredItem from "./components/HoveredItem";
import {Coordinates} from "./types";
import {emptyArrayFromSize} from "./utils";

function App() {
  const {error, isLoaded, data} = useFetchData<Complexity[]>("http://demo7919674.mockable.io/");
  const [selectedSize, setSelectedSize] = useState(0);
  const [hovered, setHovered] = useState<Coordinates[]>([])
  const hoveredMatrix = useRef(emptyArrayFromSize(selectedSize))

  const selectPlaceholder = useMemo(() => {

    if (!isLoaded) {
      return 'loading...'
    }

    if (!!error) {
      return "something went wrong"
    }

    return 'select complexity'
  }, [error, isLoaded])

  useEffect(() => {
    if (data !== null) {
      setSelectedSize(data[0].field);
    }
  }, [data])

  useEffect(() => {
    hoveredMatrix.current = emptyArrayFromSize(selectedSize);
    setHovered([]);
  }, [selectedSize])

  const handleChange = (e: ChangeEvent<HTMLSelectElement> ) => {
    setSelectedSize(+e.target.value);
  }

  const handleHover = useMemo(() => (({row, col}: Coordinates) => {
    if(hoveredMatrix.current[row][col]){
      const filtered = hovered.filter(v => v.col !== col || v.row !== row);
      setHovered(filtered);
    }
    else{
      setHovered(v => [...v, {col , row}])
    }

    hoveredMatrix.current[row][col] = !hoveredMatrix.current[row][col];
  }), [setHovered, hovered])

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.leftBar}>
          <h2>
            Hover squares

          </h2>
          <div>
            {hovered.map(h => <HoveredItem key={`${h.col} ${h.row}`} col={h.col + 1} row={h.row + 1}/>)}
          </div>
        </div>
        <div>
          <div className={styles.controllers}>
            <select className={styles.select} onChange={handleChange} placeholder={selectPlaceholder}
                    disabled={!!error || !isLoaded}>
              {!!data && data.map(d => <option value={d.field} key={d.field}>{d.name}</option>)}
            </select>
          </div>
          <SquareFields size={selectedSize} onHover={handleHover} hovered={hoveredMatrix.current}/>
        </div>
      </div>

    </>
  );
}

export default App;
