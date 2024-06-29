import React from 'react';
import "../styles/notification.scss";
import { Alert } from 'antd';

export default function MyAlert(props) {
    return (
        <>
    <Alert className='warning' message={props.text} type="warning" showIcon  />
    
  </>
    )
}