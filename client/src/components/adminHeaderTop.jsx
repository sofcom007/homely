import React from 'react'
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSliders, faTrash } from '@fortawesome/free-solid-svg-icons'

const adminHeaderTop = ({ title, noFilter, noCreate, noDel, openFilter, openCreate, openDel}) => {
  return (
    <div id='ah_top'>
        <h2>{title}</h2>
        <div id="aht_btns">
            {(!noFilter || noFilter && noFilter != true) ?
                <button id='filter_btn' className="cta" onClick={openFilter}>
                    <FontAwesomeIcon icon={faSliders} />
                    <p>Filters</p>
                </button>
                : true
            }
            {(!noCreate || noCreate && noCreate != true) ? 
                <button id='create_btn' className="cta" onClick={openCreate}>
                    <FontAwesomeIcon icon={faPlus} />
                    <p>Create</p>
                </button>
                : null
            }
            {(!noDel || noDel && noDel != true) ? 
                <button id='del_all_btn' className="cta red" onClick={openDel}>
                    <FontAwesomeIcon icon={faTrash} />
                    <p>Delete All</p>
                </button>
                : null
            }
        </div>
    </div>
  )
}

export default adminHeaderTop
