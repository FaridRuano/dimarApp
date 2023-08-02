import React from 'react'
import { Fragment } from 'react'

const StatusSpan = ({status}) => {
    const getStatusColor = ()=>{
        const originalString = status;
        return originalString.substring(0, 4).toLowerCase()
    }

  return (
    <Fragment>
        <div className={'status-warp '+ getStatusColor()}>
            <span className='status-txt'>
                {status}
            </span>
        </div>
    </Fragment>
  )
}

export default StatusSpan