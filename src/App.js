import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordList: [],
    searchInput: '',
    passwordStatus: false,
  }

  savePassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newPassword = {
      id: v4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      website: '',
      username: '',
      password: '',
      passwordList: [...prevState.passwordList, newPassword],
    }))
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.seState({password: event.target.value})
  }

  onFindPassword = event => {
    this.setState({searchInput: event.target.value})
  }

  onToggleCheckBox = () => {
    this.setState(prevState => ({passwordStatus: !prevState.passwordStatus}))
  }

  filterSearchInput = () => {
    const {passwordList, searchInput} = this.state
    return passwordList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  deletePasswordItem = id => {
    this.setState(prevState => ({
      passwordList: !prevState.passwordList.filter(each => each.id !== id),
    }))
  }

  render() {
    const {website, username, password, passwordStatus, passwordList} =
      this.state
    const {showPasswordItem} = this.filterSearchInput()
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />

        <div className="first-container">
          <form className="form-container" onSubmit={this.savePassword}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="icon"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="icon"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="input"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="icon"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="input"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager"
          />
        </div>

        <div className="second-container">
          <div className="header-container">
            <div className="start-card">
              <h2 className="heading">Your Passwords</h2>
              <p className="heading">{passwordList.length}</p>
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="icon"
              />
              <input
                type="search"
                placeholder="Search"
                className="input"
                onChange={this.onFindPassword}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="check-container">
            <input
              type="checkbox"
              className="check-box"
              id="search input"
              onClick={this.onToggleCheckBox}
            />
            <label htmlFor="search input" className="heading">
              Show Passwords
            </label>
          </div>
          {showPasswordItem.length !== 0 ? (
            <ul>
              {showPasswordItem.map(each => {
                const deleteItem = () => {
                  this.deletePasswordItem(each.id)
                }
                return (
                  <li className="list-item">
                    <h1 className="heading">
                      {each.website.slice(0, 1).toUpperCase()}
                    </h1>
                    <div className="text-container">
                      <p className="letters">{each.website}</p>
                      <p className="letters">{each.username}</p>
                      {passwordStatus ? (
                        <p className="letters">{each.password}</p>
                      ) : (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="stars"
                        />
                      )}
                    </div>
                    <button onClick={deleteItem} type='button'>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete"
                    />
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="empty-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords"
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
