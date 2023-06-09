import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import '../../styles/private-artist-page/Header.css'

function Header() {
  const redirectHomePage = useNavigate()

  const Logout = () => {
    redirectHomePage(`/`)
  }
  return (
    <>
      <header>
        <div>
          <h1>Bonjour</h1>
        </div>
        <div>
          <Button variant="light" onClick={Logout}>
            Déconnexion
          </Button>
        </div>
      </header>
    </>
  )
}

export default Header
