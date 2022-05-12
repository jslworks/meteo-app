import { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import '../styles/Comments.css'
import { IoIosSend } from 'react-icons/io'

/**
 * Usuario logeado o sin logear
 * Guardar los comentarios
 */

export default function Comments () {
  const [singleComment, setSingleComments] = useState('')
  const [comments, setComments] = useState([])
  const currentTime = moment().unix()

  const sendComment = (e) => {
    e.preventDefault()
    if (singleComment === '') {
      console.warn('Not a valid value')
    } else {
      const postDate = moment().unix()
      console.log(postDate)
      const timeFrom = calcTime(postDate)
      console.log(timeFrom)
      setComments([...comments, singleComment])
      setSingleComments('')
    }
  }

  const calcTime = (e) => {
    const time = moment(currentTime).from(e)
    return time
  }

  const CommentList = (props) => {
    const commentList = props.data.map((comment, i) => <li class='liComments' key={i}>{comment}</li>)

    return <ul>{commentList}</ul>
  }

  return (
    <>
      <h1>Comentarios</h1>
      <div id='commentContainer'>
        <CommentList data={comments} />
      </div>
      <form onSubmit={sendComment} id='commentForm'>
        <input
          type='text'
          value={singleComment}
          name='comment'
          placeholder='Escribe tu comentario'
          id='commentInput'
          onChange={({ target }) => setSingleComments(target.value)}
        />
        <Link to='#' onClick={sendComment} id='sendButton'>
          <IoIosSend size={30} color='aqua' />
        </Link>
      </form>
    </>
  )
}