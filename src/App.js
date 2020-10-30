import React, { useEffect, useState } from "react";

import api from 'services/api'

import "./styles.css";

function App() {

  const [repos, setRepos] = useState([])
  const [numRep, setNumRep] = useState(0)
  async function getRepositories() {
    const response = await api.get('/repositories');
    setRepos(response.data)
  }

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      id: 123,
      title: `repo teste ${numRep}`,
      url: 'http://google.com',
      techs: ['Node', 'React']
    })
    console.log(response)
    setRepos([...repos, response.data])
    setNumRep(numRep + 1)
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)
    console.log(response)
    const indexToRemove = repos.findIndex((repo) => {
      return repo.id === id
    })
    
    if(indexToRemove < 0) return alert("ID not found")
    let tmpArr = [...repos]
    tmpArr.splice(indexToRemove, 1)
    setRepos(tmpArr)

  }
  useEffect(() => {
    getRepositories()
  }, [])
  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repo) => 
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
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
