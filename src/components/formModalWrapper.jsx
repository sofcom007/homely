import React from 'react'

const formModalWrapper = ({ id, title, children, modalVar, closeModal }) => {
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
