import { AUTH_URL } from '../config/spotifyConfig'

export const Login = () => {
  return (
    <div className='login' >
        <a href={AUTH_URL}>Inicia sesión con Spotify</a>
    </div>
  )
}
