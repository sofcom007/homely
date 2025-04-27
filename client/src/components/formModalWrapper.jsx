import React from 'react'
import { useEffect } from 'react'

const formModalWrapper = ({ id, title, children, modalVar, closeModal }) => {

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown) // Cleanup on unmount
  }, [closeModal])

    return (
    <>
        <div className="modal_bcg" style={{ opacity: modalVar? '1' : '0', pointerEvents: modalVar? 'all' : 'none' }} onClick={closeModal}></div>
        <div id={id} className='modal' style={{ opacity: modalVar? '1' : '0', pointerEvents: modalVar? 'all' : 'none' }}>
            <div className="modal_header">
                <h2>{ title }</h2>
                <button className="modal_exit" onClick={closeModal}>&#x2715;</button>
            </div>
            <div className="modal_content">
                {children}
            </div>
        </div>
    </>
  )
}

export default formModalWrapper
