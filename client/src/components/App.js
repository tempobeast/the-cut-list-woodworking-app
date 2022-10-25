import '../App.css';
import { useEffect, useState, useContext } from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';
import LoginPage from './LoginPage';
import NavBar from './NavBar';
import NewProject from './NewProject';
import UserProjectList from './UserProjectList';
import AvailableProjectList from './AvailableProjectList';
import ProjectPage from './ProjectPage';
import ProjectInstructionsContainer from './ProjectInstructionsContainer';
import { UserContext } from '../context/user';
import { ProjectsContext } from '../context/projects';

function App() {


  const { projects, setProjects } = useContext(ProjectsContext)
  const { user, setUser } = useContext(UserContext)
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/me').then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
        })
      }
    });
  }, [setUser])

  useEffect(() => {
    fetch('/projects/')
    .then((res) => {
      if (res.ok) {
        res.json().then((fetchedProjects) => {
          setProjects(fetchedProjects)
        })
      }
    })
  }, [setProjects])

  function onProjectButtonClick(projectId, e) {
    if (e.target.value === "user_authored_project") {
      fetch(`/projects/${projectId}`, {
        method: 'DELETE',
      })
      .then((res) => res.json())
      .then((updatedUser) => { 
        setUser(updatedUser);
        navigate ("/");
      })
    } else if (e.target.value === "followed_project") {
      const followedProject = user.user_related_projects.find((project) => project.id === projectId)
      const followToDelete = followedProject.follows.find((follow) => follow.user_id === user.id)
      fetch(`/follows/${followToDelete.id}`, {
        method: 'DELETE',
      })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUser(updatedUser)
        setProjects([...projects, followedProject])
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
      .then((updatedUser) => {
        setUser(updatedUser)
        const updatedProjects = projects.filter((project) => project.id !== projectId)
        setProjects(updatedProjects)
        navigate('/')
      })
    }
  } 

  if (!user) return <LoginPage onLogin={setUser} />

  return (
    <div className='App'>
      <main>
        <NavBar setSearch={setSearch} />
        <Routes>
          <Route path="/new_project" element={
            <NewProject />
          }
          />
          <Route path="/update_project" element={
            <NewProject  errors={errors} isLoading={isLoading} />
          }
          />
          <Route path="/available_projects" element={
            <AvailableProjectList projects={projects} 
            onProjectButtonClick={onProjectButtonClick} search={search} />
          }
          />
          <Route path="/" element={
            <UserProjectList projects={projects} onProjectButtonClick={onProjectButtonClick} search={search} />
          }
          />
          <Route path="/projects/:id" element={ 
            <ProjectPage projects={projects} 
            userId={user.id} onProjectButtonClick={onProjectButtonClick}/>
          }
          />
          <Route path="/projects/:id/update_instructions" element={
            <ProjectInstructionsContainer/>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;