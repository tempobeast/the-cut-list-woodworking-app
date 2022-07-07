import '../App.css';
import { useEffect, useState } from 'react'
import { Route, Routes} from 'react-router-dom'
import Header from './Header'
import LoginPage from './LoginPage'
import NavBar from './NavBar'
import NewProject from './NewProject'
import ProjectList from './ProjectList'

function App() {

  const [user, setUser] = useState(null)
  const [errors, setErrors] = useState([])
  const [allProjects, setAllProjects] = useState([])

  useEffect(() => {
    fetch('/me').then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user))
      }
    });
  }, [])

  useEffect(() => {
    fetch('/projects')
    .then((res) => res.json())
    .then((projects) => setAllProjects(projects))
  }, [])

  console.log(allProjects)

  // useEffect(() => {
  //   fetch(`/projects/${user.id}`)
  //   .then((res) => res.json())
  //   .then((projects) => setUserProjectList(projects))
  // })
  

  function onNewProjectSubmit(formData) {
    fetch ('/projects', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "title": formData.title,
        "tools_required": formData.tools_required,
        "tools_recommended": formData.tools_recommended,
        "materials": formData.materials,
        "time": formData.time,
        "instructions": formData.instructions,
        "img_url": formData.img_url
      })
    })
    .then((res) => {
      if (res.ok) {
        res.json().then((project) => { 
          // console.log(project)
          setUser({...user, 
            projects: [...user.projects, project]
          })  
        })
      } else {
        res.json().then((errors) => setErrors(errors))
        }
    })
  }

  if (!user) return <LoginPage onLogin={setUser} />

  return (
    <>
      <Header />
      <main>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/new" element={
            <NewProject onNewProjectSubmit={onNewProjectSubmit} errors={errors}/>
          }
          />
          <Route path="/" element={
            <ProjectList user={user}/>
          }
          />
        </Routes>
      </main>

     
    </>
  );
}

export default App;
