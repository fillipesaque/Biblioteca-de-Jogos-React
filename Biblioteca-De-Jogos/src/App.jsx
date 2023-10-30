import { useState } from 'react'
import AppModule from '../src/App.module.css'

function App() {

  const [games , setGames] = useState(() => { /* hook da bb de games  */
    const storedGames = localStorage.getItem('game-Lib')
    if (!storedGames) return []
    const gameArray = JSON.parse(storedGames)
    return gameArray
  }) 
  const[titulo , setTitulo] = useState('') /* hook controlando o input title */
  const[capa , setCapa] = useState('')    /*  hook controlando o input capa */

  const addGames = ({titulo , capa}) => { /* funçao para add jogos */
      const id = Math.floor(Math.random() * 100000)  /* math.floom ira gerar um umero de 0-100000 */
      const game = {id , titulo , capa} /* Obejto que era ter as props id.titulo,capa */
      setGames(state => {
      const newState = [...state , game]
      localStorage.setItem('game-Lib' , JSON.stringify(newState)) /* salvando os dados no local storage para n perder dados */
      return newState
      })
  }

  const removeGames = (id) => {
    setGames(state =>{
       const newState = state.filter(game => game.id !== id) 
       localStorage.setItem('game-Lib' , JSON.stringify(newState)) 
       return newState
    })
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    addGames({titulo , capa} )  
    setTitulo('')
    setCapa('')
  }

  return (
    <>
      <div className={AppModule.app}>
        <h1>Biblioteca De Jogos</h1>
        <form className={AppModule.form} onSubmit={handleSubmit}>  {/* passando function para o onSubmit */}
          <div className={AppModule.divTitulo}>
            <label htmlFor="titulo"> Titulo do Jogo:</label>
            <input
             type="text"
             name="title" 
             id="title" 
             placeholder="Digite Aqui .." 
             value={titulo}
             onChange={(ev) => setTitulo(ev.target.value)} /* monitorando o value do input */
             />
          </div>
          <div className={AppModule.divCapa}>
            <label htmlFor="capa"> Capa:</label>
            <input 
            type="text" 
            name="capa" 
            id="capa" 
            placeholder="Digite Aqui.." 
            value={capa}
            onChange={(ev) => setCapa(ev.target.value)} /* /* monitorando o value do input */ 
            />
          </div>
          <button 
          type="submit" 
          onClick={handleSubmit}>Adicionar a Biblioteca !
          </button>
        </form>

        <div className={AppModule.games}>
          {games.map((game) => {
            return(
              <div key={game.id}>
                <img src={game.capa} alt="" />
                  <div>
                    <h2>{game.titulo}</h2>
                    <button onClick={() => removeGames(game.id)}>Remover Jogo!</button>
                  </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
