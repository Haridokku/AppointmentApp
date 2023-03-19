import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

const appointmentImg =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png'
class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    getStarred: false,
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: format(new Date(dateInput), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  changeImage = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  getStarredAppointment = () => {
    const {getStarred} = this.state
    if (getStarred === false) {
      this.setState(prevState => ({
        appointmentsList: prevState.appointmentsList.filter(
          eachAppointment => eachAppointment.isStarred === true,
        ),
      }))
    }
    this.setState(prevState => ({getStarred: !prevState.getStarred}))
  }

  render() {
    const {appointmentsList, titleInput, dateInput, getStarred} = this.state
    const buttonClassName = getStarred ? 'active-button' : 'no-active-button'
    return (
      <div className="app-container">
        <div className="content-container">
          <div className="content-header">
            <form className="form-container" onSubmit={this.onAddAppointment}>
              <h1 className="head">Add Appointment</h1>
              <label htmlFor="inputElement" className="title">
                TITLE
              </label>
              <input
                id="inputElement"
                type="text"
                placeholder="Title"
                className="title-input"
                onChange={this.onChangeTitle}
                value={titleInput}
              />
              <label htmlFor="dateElement" className="title">
                DATE
              </label>
              <input
                id="dateElement"
                type="date"
                className="title-input"
                placeholder="dd/mm/yy"
                onChange={this.onChangeDate}
                value={dateInput}
              />
              <div>
                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>
            <img src={appointmentImg} alt="appointments" className="img" />
          </div>
          <hr className="line" />
          <div className="appointments">
            <h1 className="appoint">Appointments</h1>
            <button
              type="button"
              className={buttonClassName}
              onClick={this.getStarredAppointment}
            >
              Starred
            </button>
          </div>
          <ul className="appointmentsList-container">
            {appointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                changeImage={this.changeImage}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
