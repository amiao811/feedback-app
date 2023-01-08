import { createContext, useState } from "react";
import { v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {

    const [feedback, setFeedback] = useState([
        /* 
        {
            id:1,
            text: 'This is feedback 1',
            rating: 10
        },
        {
            id:2,
            text: 'This is feedback 2',
            rating: 9
        },
        {
            id:3,
            text: 'This is feedback 3',
            rating: 8
        }
        */
    ])


    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    // Add feedback
    const addFeedback = (newFeedback) => {
        console.log("addFeedback", newFeedback)
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
    }

    // Delete feedback
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    // Update feedback item
    const updateFeedback = (id, updatedItem) => {
        setFeedback(
            feedback.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
        )
    } 


    // Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;