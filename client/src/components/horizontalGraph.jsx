import React from 'react'
import { useState, useEffect, useRef } from 'react'


const horizontalGraph = ({ values }) => {
  //calculate values
  const graphRef = useRef()
  const labelHolderRef = useRef()
  const barHolderRef = useRef()
  const [valueLength, setValueLength] = useState(0)

  useEffect(() => {
    if(values) {
      //get the max value
      let maxVal = 0
      values.forEach(value => {
      if(value.value > maxVal)
        maxVal = value.value
      })

      //get the bar holder width
      const bhWidth = graphRef.current.clientWidth - (labelHolderRef.current.clientWidth + 10)

      //get the individual value
      const val = (bhWidth/maxVal)
      setValueLength(val)
    
    }
  }, [values])

  
  return (
    <>{values? <div ref={graphRef} className='horizontal_graph'>
        <ul ref={labelHolderRef} className='hg_labels'>
            {values.map(value => (
                <li key={value.name}><p>{value.name.length > 13 ? value.name.substring(0, 14) + ".." : value.name}</p></li>
            ))}
        </ul>
        <ul ref={barHolderRef} className="hg_bars">
            {values.map(value => (
                <li className='hb_bar_holder' style={{ width: `${valueLength * value.value}px` }} key={value.name}>
                    <div className="hg_bar"> <p>{value.value}</p> </div>
                </li>
            ))}
        </ul>
    </div> : null}</>
  )
}


export default horizontalGraph