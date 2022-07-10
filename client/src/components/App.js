import '../App.css';
import { useEffect, useState } from 'react'
import { Route, Routes} from 'react-router-dom'
// import Header from './Header'
import LoginPage from './LoginPage'
import NavBar from './NavBar'
import NewProject from './NewProject'
import UserProjectList from './UserProjectList'
import AvailableProjectList from './AvailableProjectList'

function App() {

  const [user, setUser] = useState(null)
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
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

  // useEffect(() => {
  //   fetch(`/projects/${user.id}`)
  //   .then((res) => res.json())
  //   .then((projects) => setUserProjectList(projects))
  // })
  

  function onNewProjectSubmit(formData) {
    setErrors([]);
    setIsLoading(true);
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
      setIsLoading(false);
      if (res.ok) {
        res.json().then((project) => { 
          setUser({...user, 
            projects: [...user.projects, project]
          })  
        })
      } else {
        res.json().then((errors) => setErrors(errors))
        }
    })
  }
  function onProjectButtonClick(projectId, e) {
    if (e.target.value === "delete project") {
      fetch(`/projects/${projectId}`, {
        method: 'DELETE',
      })
      .then((res) => res.json())
      .then((deleteProject) => { 
        const updatedProjList = allProjects.filter((project) => project.id !== deleteProject.id)
        setAllProjects(updatedProjList)
        const updatedUserProjList = user.projects.filter((project) => project.id !== deleteProject.id)
        setUser({...user, 
          projects: updatedUserProjList
        })
      })
    } else if (e.target.value === "remove project") {
      const followToDelete = user.follows.find((follow) => follow.project_id === projectId)
      fetch(`/follows/${followToDelete.id}`, {
        method: 'DELETE',
      })
      .then((res) => res.json())
      .then((deletedFollow) => {
        const updatedFollowList = user.follows.filter((follow) => follow.id !== deletedFollow.id)
        const updatedUserFollowProjList = user.followed_projects.filter((project) => project.id !== deletedFollow.project_id)
        setUser({...user,
        followed_projects: updatedUserFollowProjList,
        follows: updatedFollowList
        })
      }) 
    } else {
      fetch('/follows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: projectId,
          user_id: user.id,
          follow_type: "todo"
        })
      })
      .then((res) => res.json())
      .then((follow) => {
        console.log(follow)
        const updatedFollowList = [...user.follows, follow]
        const newFollowProject = allProjects.find((project) => project.id === follow.project_id)
        const updatedUserFollowProjList = [...user.followed_projects, newFollowProject]
        setUser({...user,
        followed_projects: updatedUserFollowProjList,
        follows: updatedFollowList
        })
      })
    }
  } 
  

  if (!user) return <LoginPage onLogin={setUser} />

  return (
    <>
      {/* <Header /> */}
      <main>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/new" element={
            <NewProject onNewProjectSubmit={onNewProjectSubmit} errors={errors} isLoading={isLoading}/>
          }
          />
          <Route path="/projects" element={
            <AvailableProjectList projects={allProjects} onProjectButtonClick={onProjectButtonClick}/>
          }
          />
          <Route path="/" element={
            <UserProjectList user={user} onProjectButtonClick={onProjectButtonClick}/>
          }
          />
        </Routes>
      </main>

     
    </>
  );
}

export default App;
