import React, {useEffect, useState} from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
      api.get('repositories').then(response => {
          setProjects(response.data);
      });
  }, []);

  async function handleAddRepository() {
    const request = await api.post( 'repositories', {
      title: 'Conceitos em React',
      url: 'www.github.com/scherpel',
      techs: 'React JS, Node'
    });
    const project = request.data;
    setProjects([...projects, project]);
    
  }

  async function handleRemoveRepository(id) {
    await api.delete( `repositories/${id}`); 
    setProjects(projects.filter(
      project => project.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {projects.map( project =>
              <li key={project.id}>
                {project.title}
                <button onClick={() => handleRemoveRepository(project.id)}>
                  Remover
                </button>
              </li>          
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
