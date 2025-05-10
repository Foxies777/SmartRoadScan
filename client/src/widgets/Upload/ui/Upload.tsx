import React, { useState } from 'react'
import {UploadOutlined} from '@ant-design/icons'
import { Button } from 'antd'
import UploadModal from './UploadModal'
const Upload = () => {
    const [modal, setModal] = useState(false)
  return (
    <div>
        <Button
        style={{
            width: '35px',
            height: '35px',
            backgroundColor: 'white',
            position: 'absolute',
            top: '70px',
            left: '20px',
            gap: '0',
            boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 10px'
        }}
        onClick={() => setModal(true)}> <UploadOutlined/></Button>
        {
        modal 
        ? <UploadModal onClose={() => setModal(false)}/>
        : null
        }
    </div>
  )
}

export default Upload