import React, {useState} from 'react'
import './App.css'

const App = () => {
  const [website, setWebsite] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwords, setPasswords] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [search, setSearch] = useState('')

  const addPassword = event => {
    event.preventDefault()
    if (website && username && password) {
      const newPassword = {id: Date.now(), website, username, password}
      setPasswords([...passwords, newPassword])
      setWebsite('')
      setUsername('')
      setPassword('')
    }
  }

  const deletePassword = id => {
    const updatedPasswords = passwords.filter(item => item.id !== id)
    setPasswords(updatedPasswords)
  }

  const filteredPasswords = passwords.filter(item =>
    item.website.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="app-container">
      <header className="header">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
      </header>

      <div className="password-manager">
        <h1>Add New Password</h1>
        <form onSubmit={addPassword} className="input-container">
          <div className="input-group">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
            />
            <input
              type="text"
              placeholder="Enter Website"
              value={website}
              onChange={e => setWebsite(e.target.value)}
            />
          </div>
          <div className="input-group">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
            />
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Add</button>
        </form>

        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
          alt="password manager"
          className="password-manager-image-sm"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          alt="password manager"
          className="password-manager-image-lg"
        />

        <h1>Your Passwords</h1>
        <p>{passwords.length}</p>

        <div className="search-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
            alt="search"
          />
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="show-passwords">
          <input
            type="checkbox"
            id="showPasswords"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPasswords">Show passwords</label>
        </div>

        {filteredPasswords.length > 0 ? (
          <ul className="passwords-list">
            {filteredPasswords.map(item => (
              <li key={item.id} className="password-item">
                <div className="password-details">
                  <p>{item.website}</p>
                  <p>{item.username}</p>
                  <p>
                    {showPassword ? (
                      item.password
                    ) : (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                      />
                    )}
                  </p>
                </div>
                <button
                  data-testid="delete"
                  onClick={() => deletePassword(item.id)}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                    alt="delete"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-passwords-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
            />
            <p>No Passwords</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
