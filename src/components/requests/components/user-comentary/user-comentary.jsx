import React, {useState} from 'react'
import './style.scss'
import { Fragment } from 'react'
import { Image } from 'react-feather'

const UserComentary = ({userna, date, text, img}) => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <Fragment>
        <div className='coment-warp'>
            <div className='coment-user-date'>
                <span className='c-u-d-user'>{userna}</span>
                <span className='c-u-d-date'>{date}</span>
            </div>
            <div className='coment-text'>
                <p>
                    {text}
                </p>
            </div>
            <div>                
                <button className={img===''? 'noimg': 'img-btn'} onClick={()=>{
                        setIsOpen(true)
                }} disabled={img===''}>
                    <Image/>
                </button>
            </div>
        </div>
        <div className={isOpen?'modal-warp':'modal-warp-closed'}>
            {
                img!==''?(
                    <Fragment>
                        <div className='img-warp-modal'>
                            <img src={'http://localhost/modelsDimar/'+img} className='modal-img'/>
                            <button className='close-img' onClick={()=>{
                                setIsOpen(false)
                            }}>Cerrar</button>
                        </div>
                    </Fragment>
                ):(
                    <Fragment/>
                )
            }
        </div>
        <div className={isOpen?'overlay':'overlay-closed'}/>
    </Fragment>
  )
}

export default UserComentary