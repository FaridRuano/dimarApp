import React,{Fragment} from 'react'
import './style.scss'
import Building from '../../../../assets/images/gifs/building.gif'

const BuildingComp = () => {
  return (
    <Fragment>
        <div className='no-data-warp'>
            <img src={Building} className="no-data-gif" alt="No Data" />
            <span className='no-data-text'>Muy pronto...</span>
        </div>
    </Fragment>
  )
}

export default BuildingComp