import React, { Component } from 'react'
import { browserHistory , Link} from 'react-router'
import { connect } from 'react-redux'

import { Button, Form, Icon, Message } from 'semantic-ui-react'

import { createUser, login } from '../../actions/userActions'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      credentials: {
        username: '',
        password: '',
        password_confirmation: '',
        email: '',
        first_name: '',
        last_name: '',
        avatar: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLogIn = this.handleLogIn.bind(this)
  }

  handleChange(event){
    const field = event.target.name
    const credentials = this.state.credentials
    credentials[field] = event.target.value
    return this.setState({ credentials })
  }

  handleSubmit(event){
    event.preventDefault()
    const credentials = this.state.credentials
    this.props.createUser(credentials)
  }

  handleLogIn(){
    browserHistory.push('/login')
  }

  handleGuestLogIn(params) {
    this.props.login(params)
  }

  render(){
    if(!!sessionStorage.jwt) browserHistory.push('/')

    // UNDERCONSTRUCTION:
    // <Form.Field>
    //   <label>Avatar</label>
    //   <input name='avatar' onChange={this.handleChange} />
    // </Form.Field>
    //
    // <br/>
    // <Form.Checkbox inline  name='terms' label='I agree to the terms and conditions' />

    return (
      <div className='center signup'>
        <Message
          attached
          header='Welcome to Connected Investing! *BETA'
          content='Fill out the form below to sign-up for a new account.  All fields should be filled out feel free to use fake names ;)'
          color='blue'
        />

      <Form className='attached fluid segment signup' onSubmit={this.handleSubmit}>

          <Form.Field>
            <label>Username</label>
            <input name='username' onChange={this.handleChange} />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input name='password' onChange={this.handleChange} type='password' />
          </Form.Field>

          <Form.Field>
            <label>Password Confirmation</label>
            <input name='password_confirmation' onChange={this.handleChange} type='password' />
          </Form.Field>

          <Form.Field>
            <label>Email</label>
            <input name='email' onChange={this.handleChange} />
          </Form.Field>

          <Form.Field>
            <label>First Name</label>
            <input name='first_name' onChange={this.handleChange} />
          </Form.Field>

          <Form.Field>
            <label>Last Name</label>
            <input name='last_name' onChange={this.handleChange} />
          </Form.Field>

          <Button type='submit' color='blue'>Sign Up</Button>

        </Form>

        <Message attached='bottom' warning>
          <Icon name='help' />
          Already signed up?&nbsp;<Link to='/login'>Login here</Link>&nbsp;instead, or login as a guest <Button className={'guest-button'} onClick={ this.handleGuestLogIn.bind(this,{email: "myguest@connectedinvestments.com", password: "guest"}) } color='twitter'>here</Button>
        </Message>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (credentials) => {
      let action = createUser(credentials)
      dispatch(action)
    },
    login: (credentials) => {
      let action = login(credentials)
      dispatch(action)
    }
  }
}

export default connect( null, mapDispatchToProps )( SignUp )
