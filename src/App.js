import './App.css';
import ContextProvider from './Context';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Departments from './Pages/Departments';
import Discover from './Pages/Discover';
import Recents from './Pages/Recents';
import Search from './Pages/Search';
import Favourites from './Pages/Favourites';
import PageDetails from './Pages/PageDetails';
import Banner from './/Components/Banner';
import Navbar from './Components/Navbar';
import bannerImg from './Res/Images/banner.png';
import bannerImg2 from './Res/Images/banner3.png';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <Navbar/>

          <Banner img={bannerImg} ID='banner-main'/>

          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/Departments' exact={true} component={Departments}/>
            <Route path='/Discover' exact={true} component={Discover}/>
            <Route path='/Recents' exact={true} component={Recents}/>
            <Route path='/Search' exact={true} component={Search}/>
            <Route path='/Favourites' exact={true} component={Favourites}/>
            <Route path='/PageDetails/:pageItem' exact={true} component={PageDetails}/>
          </Switch>

          <Banner img={bannerImg2} ID='banner-footer'/>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;