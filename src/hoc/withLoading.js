import React from 'react'
import { branch, renderComponent } from 'recompose'

const Loader = () => <div>Loading...</div>

const withLoading = branch(
  ({data}) => data.loading,
  renderComponent(Loader)
)

export default withLoading
