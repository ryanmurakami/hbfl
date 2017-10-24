import Hamsters from '../scenes/Hamsters/index.jsx'
import Hamster from '../scenes/Hamster/index.jsx'
import Login from '../scenes/Login/index.jsx'
import Main from '../scenes/Main/index.jsx'
import Race from '../scenes/Race/index.jsx'
import Races from '../scenes/Races/index.jsx'
import Leaderboards from '../scenes/Leaderboards/index.jsx'
import User from '../scenes/User/index.jsx'
import Config from '../scenes/Config/index.jsx'

const routes = [
  {
    path: '/',
    exact: true,
    component: Main
  }, {
    path: '/hamsters',
    component: Hamsters
  }, {
    path: '/hamster/:id',
    component: Hamster
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/races',
    component: Races
  }, {
    path: '/race/:id',
    component: Race
  }, {
    path: '/leaderboards',
    component: Leaderboards
  }, {
    path: '/user',
    component: User
  }, {
    path: '/config',
    component: Config
  }
]

export default routes
