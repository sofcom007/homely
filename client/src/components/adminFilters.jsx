import React from 'react'
import { useRef, useEffect, useState } from 'react'

const adminFilters = ({ filtersOn, children }) => {
    const [height, setHeight] = useState(0)
    const divRef = useRef(null)

    useEffect(() => {
        if(divRef.current){
            const newHeight = divRef.current.scrollHeight + 2
            setHeight(newHeight)
        }
    })

  return (
    <div id='filters_holder' style={{ height: `${filtersOn? height : 0}px` }}>
        <div id="filters" ref={divRef}>
            {children}
        </div>
    </div>
  )
}

export default adminFilters