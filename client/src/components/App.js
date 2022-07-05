import '../App.css';
import { useEffect, useState } from 'react'
import { Route, Routes} from 'react-router-dom'
import Header from './Header'
import LoginPage from './LoginPage'
import NavBar from './NavBar'
import NewProject from './NewProject'
import ProjectList from './ProjectList'

function App() {

  // const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)

  console.log(user)

  useEffect(() => {
    fetch('/me').then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user))
      }
    });
  }, [])

  if (!user) return <LoginPage onLogin={setUser} />

  return (
    <>
      <Header />
      <main>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/new" element={
            <NewProject />
          }
          />
          <Route path="/" element={
            <ProjectList />
          }
          />
        </Routes>
      </main>

     
    </>
  );
}

export default App;
