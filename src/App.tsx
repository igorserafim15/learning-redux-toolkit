import { FormEvent, ChangeEvent, useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './app/hook'
import { fetchToken } from './reducer/fetch'
import { loadingList } from './reducer/list'

function App() {
  const [username, setUser] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(fetchToken({ username, password }))
  }

  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(loadingList(page))
  }, [dispatch, page])

  const { data } = useAppSelector((state) => state.list)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">Usuário</label>
        </div>
        <input
          id="user"
          type="text"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUser(e.target.value)
          }
        />
        <div>
          <label htmlFor="password">Senha</label>
        </div>
        <input
          id="password"
          type="text"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <div>
          <button>Entrar</button>
        </div>
      </form>
      <hr />
      <ul>
        {data?.map((item) => (
          <li key={item.id}>
            <img src={item.src} alt="" width="60px" height="60px" />
            <h4>{item.title}</h4>
            <p>{item.acessos}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page + 1)}>Carregar mais</button>
    </div>
  )
}

export default App
