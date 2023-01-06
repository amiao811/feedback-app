import React from 'react'
import PropTypes from "prop-types"
import FeedbackItem from './FeedbackItem'

function FeedbackList({feedback, handleDelete}) {

  if (!feedback || feedback.length === 0) {
    return <p>NO FEEDBACK YET</p>
  }

  return (
    <div className='feedback-list'>
        {feedback.map((item) => (
            <FeedbackItem 
            key={item.id} 
            item={item}
            handleDelete={handleDelete}
            />
        ))}
    </div>
    )
}

FeedbackList.prototype = {
    feedback: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired,
            text: PropTypes.string
        })
    )
}

export default FeedbackList
