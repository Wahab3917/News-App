import React, { Component } from 'react'
import loading from './loading-2.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center m-3'>
        <img src={loading} alt="loading"/>
      </div>
    )
  }
}

export default Spinner

