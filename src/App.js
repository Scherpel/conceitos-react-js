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
    const request = await api.delete( 'repositories/id', {
      params: {
        id:'7382f2f2-67ad-47ce-bf94-3b7a0a19d787'
      }
    }); 
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>  
          {projects.map( project =>
              <li key={project.id}>
                {project.title}
              </li>          
          )}
          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
