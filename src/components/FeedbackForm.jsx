import { useState, useContext, useEffect } from 'react'
import React from 'react'
import Card from './shared/Card'
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {

  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit])
  
  const handleTextChange = (e) => {
    // validate lenght of text
    if (e.target.value === '') {
        setBtnDisabled(true);
        setMessage(null);
    } else if (e.target.value !== '' && e.target.value.trim().length < 9) {
        setBtnDisabled(true);
        setMessage('Text must be ate least 10 characters');
    } else {
        setBtnDisabled(false);
        setMessage(null);
    }
    setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length >= 10) {
        const newFeedback = {
            text,
            rating
        }
        if (feedbackEdit.edit) {
            updateFeedback(feedbackEdit.item.id, newFeedback)
        } else {
            addFeedback(newFeedback);
        }
        setText('');
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)}/>
        <div className="input-group">
            <input type='text' onChange={handleTextChange} 
            placeholder='write a review' value={text} />

            <Button type="submit" isDisabled={btnDisabled}>send</Button>
        </div>
        {message && <div className='message'>{message}</div>}

      </form>


    </Card>
  )
}

export default FeedbackForm
