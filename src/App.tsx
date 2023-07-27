import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
      <Container className="my-4">
      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="/create" element={<p>Create</p>} />
        <Route path="/:id">
          <Route index element={<h1>Details</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route> 
        <Route path="*" element={<Navigate to='/'/>}/>
    </Routes>
      </Container>
    
    </>
  )
}

export default App
