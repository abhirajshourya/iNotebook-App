import React from 'react'


export default function Alert(props) {
    const lowerMsg = (word) => {
        return word.toLowerCase()
    }
    return (
        <div style={{height: '50px'}}>
        {props.alert && <div>
            <div className={`alert alert-${lowerMsg(props.alert.type)} alert-dismissible fade show`} role="alert">
                {props.alert.message}
            </div>
        </div>}
        </div>
    )
}