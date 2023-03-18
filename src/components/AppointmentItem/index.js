import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, changeImage} = props
  const {title, date, isStarred, id} = appointmentDetails
  const starredImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onChangeImage = () => {
    changeImage(id)
  }
  return (
    <li className="list-item">
      <div className="title-header">
        <p className="title">{title}</p>
        <button type="button" onClick={onChangeImage}>
          <img
            src={starredImage}
            alt="star"
            className="star"
            data-testid="star"
          />
        </button>
        <p className="describe">Date: {date}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
