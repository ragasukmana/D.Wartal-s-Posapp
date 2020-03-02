import React from 'react'
import { toast } from 'react-semantic-toasts';

const toasting = (title='', description='', type='success')=>{
    return setTimeout(() => {
        toast(
            {
                time: 2000,
                title: title,
                type: type,
                description: (<p>{description}</p>)
            }
        )
    }, 150)
}

export {
    toasting
}