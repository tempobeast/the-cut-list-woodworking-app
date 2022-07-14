import '../App.css';
import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate} from 'react-router-dom'
// import Header from './Header'
import LoginPage from './LoginPage'
import NavBar from './NavBar'
import NewProject from './NewProject'
import UserProjectList from './UserProjectList'
import AvailableProjectList from './AvailableProjectList'
// import ProjectList from './ProjectList';

function App() {

  const [user, setUser] = useState(null)
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [projects, setProjects] = useState([])
  const [updateProject, setUpdateProject] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/me').then((res) => {
      if (res.ok) {
        res.json().then((user) =>{
          getProjects();
          setUser(user);
        })
      }
    });
  }, [])

  const getProjects = () => {
    fetch('/projects')
    .then((res) => res.json())
    .then((projects) => {
      setProjects(projects)
    })
  }

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
        res.json().then((newProject) => { 
          setUser({...user, 
            projects: [...user.projects, newProject]
          })
          setProjects(...projects, newProject)
          navigate('/')
        })
      } else {
        res.json().then((errors) => setErrors(errors))
        }
    })
  }

  function onProjectButtonClick(projectId, e) {
    if (e.target.value === "user_authored_project") {
      fetch(`/projects/${projectId}`, {
        method: 'DELETE',
      })
      .then((res) => res.json())
      .then((deleteProject) => { 
        const updatedProjList = projects.filter((project) => project.id !== deleteProject.id)
        setProjects(updatedProjList)
        const updatedUserProjList = user.projects.filter((project) => project.id !== deleteProject.id)
        setUser({...user, 
          projects: updatedUserProjList
        })
      })
    } else if (e.target.value === "followed_project") {
      const followToDelete = user.follows.find((follow) => follow.project_id === projectId)
      fetch(`/follows/${followToDelete.id}`, {
        method: 'DELETE',
      })
      .then((res) => res.json())
      .then((deletedFollow) => {
        const followProject = user.followed_projects.find((project) => project.id === deletedFollow.project_id)

        console.log(followProject)
        setProjects([...projects, followProject])
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
        const updatedFollowList = [...user.follows, follow]
        const newFollowProject = projects.find((project) => project.id === follow.project_id)
        const updatedUserFollowProjList = [...user.followed_projects, newFollowProject]
        const updatedProjects = projects.filter((project) => project.id !== follow.project_id)
        setProjects(updatedProjects)
        setUser({...user,
        followed_projects: updatedUserFollowProjList,
        follows: updatedFollowList
        })
        navigate('/')
      })
    }
  } 

  function onUpdateProjectSubmit(formData) {
    fetch(`/projects/${formData.id}`, {
      method: 'PATCH',
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
    .then((res) => res.json())
    .then((updatedProject) => {
      const updatedAllProjects = projects.filter((proj) => proj.id !== updatedProject.id);
      setProjects([...updatedAllProjects, updateProject]);
      const updatedUserProjList = user.projects.filter ((proj) => proj.id !== updateProject.id);
      setUser({...user, 
        projects:[...updatedUserProjList, updatedProject]});
        navigate('/')
    })
  }

  function onLogoutClick() {
    fetch("/logout", 
    { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  // function onLogin(user) {
  //   getProjects()
  //   setUser(user)
  // }

  function onUpdateProjectClick(e, project) {
    setUpdateProject(project)
    navigate('/new')
  }


  if (!user) return <LoginPage onLogin={setUser} />

  return (
    <>
      {/* <Header /> */}
      <main>
        <NavBar onLogoutClick={onLogoutClick}/>
        <Routes>
          <Route path="/new" element={
            <NewProject onNewProjectSubmit={onNewProjectSubmit} errors={errors} isLoading={isLoading} updateProject={updateProject} onUpdateProjectSubmit={onUpdateProjectSubmit}/>
          }
          />
          <Route path="/projects" element={
            <AvailableProjectList projects={projects} 
            onProjectButtonClick={onProjectButtonClick} userId={user.id}/>
          }
          />
          <Route path="/" element={
            <UserProjectList user={user} userId={user.id} onProjectButtonClick={onProjectButtonClick} onUpdateProjectClick={onUpdateProjectClick}/>
          }
          />
        </Routes>
      </main>

     
    </>
  );
}

export default App;
