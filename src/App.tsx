import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from "react-router-dom"
import { New } from "./New"

function App() {

  return (
    <>
      <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/create" element={<New/>} />
        <Route path="/:id">
          <Route index element={<h1>Details</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route> 
        <Route path="* " element={<Navigate to='/'/>}/>
    </Routes>
      </Container>
  
    </>
  )
}

export default App
