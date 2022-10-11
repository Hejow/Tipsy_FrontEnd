import React from 'react'

const Comment = (props) => {
    return (
        <div className='commentBox'>
            <div className='commentName'>{props.name}</div>
            <div className='commentContent'>{props.content}</div>
        </div>
    )
}

export default Comment;