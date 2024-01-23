import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  withRouter,
  RouteComponentProps,
  useParams
} from "react-router-dom";
import './App.css';
import {Home, Playlist} from './components'
const NoMatchPage = () => {
  return (
    <div>
      <h3 className='oops-message text-large'>Woops! This page does not exist. Maybe try going <a className='link' href='/'>Home</a>?</h3>
    </div>
  );
};
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        err : null,
        isLoaded : false,
        work: [],
        contact: [],
        news: [],
        collaborations: [],
        playlists: []
    };
  }

  componentDidMount() {
      fetch('https://api.airtable.com/v0/appRUjNpdyTGlg8jN/Work?&view=grid', { headers: new Headers({ 'Authorization': 'Bearer ' + process.env.REACT_APP_LIO })})
        .then(res => res.json())
        .then(res => {
          this.setState({ work: res.records.reverse() })
        })
        .catch(error => console.log(error))
      fetch('https://api.airtable.com/v0/appRUjNpdyTGlg8jN/Contact?&view=grid',{ headers: new Headers({ 'Authorization': 'Bearer ' + process.env.REACT_APP_LIO })})
        .then(res => res.json())
        .then(res => {
          this.setState({ contact: res.records })
        })
        .catch(error => console.log(error))
      fetch('https://api.airtable.com/v0/appRUjNpdyTGlg8jN/Recent%20News?&view=grid',{ headers: new Headers({ 'Authorization': 'Bearer ' + process.env.REACT_APP_LIO })})
        .then(res => res.json())
        .then(res => {
          this.setState({ news: res.records })
        })
        .catch(error => console.log(error))
      fetch('https://api.airtable.com/v0/appRUjNpdyTGlg8jN/Collaborations?&view=grid',{ headers: new Headers({ 'Authorization': 'Bearer ' + process.env.REACT_APP_LIO })})
        .then(res => res.json())
        .then(res => {
          this.setState({ collaborations: res.records })
        })
        .catch(error => console.log(error))
      fetch('https://api.airtable.com/v0/appRUjNpdyTGlg8jN/Playlists?&view=grid',{ headers: new Headers({ 'Authorization': 'Bearer ' + process.env.REACT_APP_LIO })})
        .then(res => res.json())
        .then(res => {
          this.setState({ playlists: res.records.reverse() })
        })
        .catch(error => console.log(error))
        
  }


render() {
  const { work, contact, news, collaborations, playlists } = this.state;
  
  return (
    <BrowserRouter>
      <Routes>
            <Route exact path="/" element={<Home work={work} contact={contact} news={news} collaborations={collaborations} playlists={playlists} />} />
            <Route exact path="/:id" element={<Playlist work={work} contact={contact} news={news} collaborations={collaborations} playlists={playlists} />} />
      </Routes>
    </BrowserRouter>
  );
}

}

export default App;