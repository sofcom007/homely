import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
//api url
import { useApiUrl } from '../context/apiContext'

const DropDownSec = ({ text1, text2, img, paragraph }) => {
  //url
  const backendUrl = useApiUrl()
  
  const [isOpen, setIsOpen] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const contentRef = useRef(null)
  const headerRef = useRef(null)
  const [imgLoaded, setImgLoaded] = useState(false)

  const handleToggle = () => {
    if (paragraph) {
      setIsOpen(prev => !prev);
    }
  }

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [imgLoaded])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if ( isOpen && headerRef.current && contentRef.current && !headerRef.current.contains(e.target) && !contentRef.current.contains(e.target) ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
  
    // Cleanup function
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className='animated fade_in'>
      <div ref={headerRef} className={(paragraph || img? 'active' : '') + ' dd_header'} onClick={handleToggle}>
        <div className="dd_header_half1">
          <h4>{text1}</h4>
        </div>
        <div className="dd_header_half2">
          <h4>{text2}</h4>
          {paragraph || img ? (
            <button className="dd_toggle" onClick={(e) => { e.stopPropagation(); handleToggle(); }} style={{rotate: isOpen? '-180deg' : '0deg'}}>
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          ) : null}
        </div>
      </div>

      {paragraph || img?
      <div className="dd_content_holder" style={{ height: isOpen ? `${contentHeight + 2}px` : '0px', transition: 'height 0.3s ease', overflow: 'hidden' }}>
        <div className="dd_content" ref={contentRef}>
          {(img && img != "") ? <img src={img? `${backendUrl}/uploads/${img}` : img} alt="" onLoad={() => {setImgLoaded(true)}} /> : null}
          <p>{paragraph}</p>
        </div>
      </div> : null}
    </div>
  )
}

export default DropDownSec