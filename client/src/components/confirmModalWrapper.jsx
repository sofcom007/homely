import React from 'react'

const confirmModalWrapper = ({ title, message, modalOn, closeModal }) => {
  return (
    <>
        <div className="modal_bcg" onClick={closeModal} style={{ opacity: modalOn? '1' : '0', pointerEvents: modalOn? 'all' : 'none' }}></div>
        <div className="modal" style={{ opacity: modalOn? '1' : '0', pointerEvents: modalOn? 'all' : 'none' }}>
            <div className="modal_header">
                <h2>{ title }</h2>
            </div>
            <p className='conf_modal_msg'>{message}</p>
            <div className="conf_modal_btns">
                <button className="cta"><p>Confirm</p></button>
                <button className="cta red" onClick={closeModal}><p>Cancel</p></button>
            </div>            
        </div> 
    </>
  )
}

export default confirmModalWrapper
