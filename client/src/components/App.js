import '../App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';
import LoginPage from './LoginPage';
import NavBar from './NavBar';
import NewProject from './NewProject';
import UserProjectList from './UserProjectList';
import AvailableProjectList from './AvailableProjectList';
import ProjectPage from './ProjectPage';

function App() {

  const [user, setUser] = useState(false)
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [projects, setProjects] = useState([])
  const [updateProject, setUpdateProject] = useState(null)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/me').then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
          // navigate('/')
        })
      }
    });
  }, [])

  useEffect(() => {
    fetch('/projects/')
    .then((res) => {
      if (res.ok) {
        res.json().then((fetchedProjects) => {
          setProjects(fetchedProjects)
        })
      }
    })
  }, [user])


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
        "description": formData.description,
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
          setProjects([...projects, newProject])
          // setAllUserProjects([newProject, ...allUserProjects])
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
        getProjects()
        const updatedUserProjList = user.projects.filter((project) => project.id !== deleteProject.id)
        setUser({...user, 
          projects: updatedUserProjList
        })
      })
    } else if (e.target.value === "followed_project") {
      const followedProject = projects.find((project) => project.id === projectId)
      const followToDelete = followedProject.follows.find((follow) => follow.user_id === user.id)
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
        getProjects()
        navigate('/')
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
        const updatedFollowOnProject = {...newFollowProject, 
          follows: [...newFollowProject.follows, follow]}
        const updatedUserFollowProjList = [...user.followed_projects, updatedFollowOnProject]
        setUser({...user,
        followed_projects: updatedUserFollowProjList,
        follows: updatedFollowList
        })
        getProjects()
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
        "description": formData.description,
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
        setProjects([])
      }
    });
  }

  function onUpdateProjectClick(project) {
    setUpdateProject(project)
    navigate('/update_project')
  }

  function onProjectCardClick(projId) {
   navigate(`/projects/${projId}`)
  }

  if (!user) return <LoginPage onLogin={setUser} />

  return (
    <div className='App'>
      <main>
        <NavBar onLogoutClick={onLogoutClick} setSearch={setSearch} />
        <Routes>
          <Route path="/new_project" element={
            <NewProject onNewProjectSubmit={onNewProjectSubmit} errors={errors} isLoading={isLoading} />
          }
          />
          <Route path="/update_project" element={
            <NewProject  errors={errors} isLoading={isLoading} updateProject={updateProject} onUpdateProjectSubmit={onUpdateProjectSubmit}/>
          }
          />
          <Route path="/available_projects" element={
            <AvailableProjectList projects={projects} 
            onProjectButtonClick={onProjectButtonClick} user={user} userId={user.id} search={search} onProjectCardClick={onProjectCardClick}/>
          }
          />
          <Route path="/" element={
            <UserProjectList user={user} userId={user.id} projects={projects} onProjectButtonClick={onProjectButtonClick} onUpdateProjectClick={onUpdateProjectClick} search={search} onProjectCardClick={onProjectCardClick}/>
          }
          />
          <Route path="/projects/:id" element={ 
            <ProjectPage projects={projects} 
            userId={user.id} onProjectButtonClick={onProjectButtonClick} onUpdateProjectClick={onUpdateProjectClick}/>
          }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
