import '../App.css';
import { useEffect, useState, useContext } from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';
import LoginPage from './LoginPage';
import NavBar from './NavBar';
import NewProject from './NewProject';
import UserProjectList from './UserProjectList';
import AvailableProjectList from './AvailableProjectList';
import ProjectPage from './ProjectPage';
import { UserContext } from '../context/user';
import { ProjectsContext } from '../context/projects';
import { ErrorsContext } from '../context/errors';
import { SearchProvider } from '../context/search';

function App() {

  const { setErrors } = useContext(ErrorsContext)
  const { projects, setProjects } = useContext(ProjectsContext)
  const { user, setUser } = useContext(UserContext)
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
    fetch('/projects')
    .then((res) => {
      if (res.ok) {
        res.json().then((fetchedProjects) => {
          setProjects(fetchedProjects)
        })
      }
    })
  }, [setProjects, setUser])

  function onProjectButtonClick(projectId, e) {
    if (e.target.value === "user_authored_project") {
      fetch(`/projects/${projectId}`, {
        method: 'DELETE',
      })
      .then((res) => {
        if (res.ok) {
          res.json().then((updatedUser) => {
            setUser(updatedUser);
            navigate("/");
          });
        } else {
          res.json().then((err) => setErrors(err.errors))
        }
      });
    } else if (e.target.value === "followed_project") {
      const followedProject = user.user_related_projects.find((project) => project.id === projectId)
      const followToDelete = followedProject.follows.find((follow) => follow.user_id === user.id)
      fetch(`/follows/${followToDelete.id}`, {
        method: 'DELETE',
      })
      .then((res) => {
        if (res.ok) {
          res.json().then((updatedUser) => {
            setUser(updatedUser);
            setProjects([...projects, followedProject]);
            navigate('/');
          })
        } else {
          res.json().then((err) => setErrors(err.errors))
        }
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
      .then((res) => {
        if (res.ok) {
          res.json().then((updatedUser) => {
            setUser(updatedUser);
            const updatedProjects = projects.filter((project) => project.id !== projectId);
            setProjects(updatedProjects);
            navigate('/');
          })
        } else {
          res.json().then((err) => setErrors(err.errors))
        }
      })
    }
  } 
  
  if (!user) return <LoginPage onLogin={setUser} />

  return (
    <div className='App'>
      <main>
        <NavBar />
        <Routes>
          <Route path="/new_project" element={
            <NewProject />
          }
          />
          <Route path="/update_project" element={
            <NewProject />
          }
          />
          
          <Route path="/available_projects" element={
            <SearchProvider>
              <AvailableProjectList projects={projects} 
              onProjectButtonClick={onProjectButtonClick} search={search} setSearch={setSearch} />
            </SearchProvider>
          }
          />
          <Route path="/" element={
            <SearchProvider>
              <UserProjectList projects={projects} onProjectButtonClick={onProjectButtonClick} search={search} setSearch={setSearch}/>
            </SearchProvider>
          }
          />
          <Route path="/projects/:id" element={ 
            <ProjectPage projects={projects} 
            userId={user.id} onProjectButtonClick={onProjectButtonClick}/>
          }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;