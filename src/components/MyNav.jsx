import { useState, useEffect } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import provincesArray from '../assets/provincesArray.json'

const MyNav = (props) => {
  const [selectedRegion, setSelectedRegion] = useState('')
  const [filteredProvinces, setFilteredProvinces] = useState([])

  const regionsArrayUnique = provincesArray
    .filter(
      (obj1, i, arr) =>
        arr.findIndex((obj2) => obj2.regione === obj1.regione) === i
    )
    .sort((regione1, regione2) => {
      return regione1.regione.localeCompare(regione2.regione)
    })
    .map((provincia) => {
      return {
        nome: provincia.nome,
        sigla: provincia.sigla,
        regione: provincia.regione.split('/')[0],
      }
    })

  useEffect(() => {
    if (selectedRegion) {
      const filtered = provincesArray.filter(
        (provincia) => provincia.regione.split('/')[0] === selectedRegion
      )
      setFilteredProvinces(filtered)
    } else {
      setFilteredProvinces([])
    }
  }, [selectedRegion])

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' data-bs-theme='dark'>
      <Container fluid={props.isFluid}>
        <Navbar.Brand href='#home'>
          {/* <img
            className='me-2'
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz-BmHfl4y5j751P0jl0GRPqCQVwGUIM_ReA&s'
            width='50px'
            alt='Logo'
          /> */}
          {props.title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ms-1'>
            <Nav.Link as={Link} to={'/'}>
              Home
            </Nav.Link>
            <NavDropdown title='Regioni' id='regionsDropdown'>
              {regionsArrayUnique.map((region) => (
                <NavDropdown.Item
                  key={region.regione}
                  onClick={() => setSelectedRegion(region.regione)}
                  style={{ cursor: 'pointer' }}
                >
                  {region.regione}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          {selectedRegion && (
            <Nav className='ms-5 d-flex align-content-center'>
              <div className='p-2 text-yellow-WA'>{selectedRegion}:</div>
              {filteredProvinces.map((provincia) => (
                <Nav.Link
                  as={Link}
                  to={`/provincia/${provincia.nome
                    .replace(/'/g, '')
                    .toLowerCase()}`}
                  key={provincia.sigla}
                >
                  {provincia.nome}
                </Nav.Link>
              ))}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav
