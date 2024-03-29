import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Anime from './pages/Anime';
import YourList from './pages/YourList';
import Registersignup from './pages/Registerlogin';

const httpLink = createHttpLink({
  uri: (process.env.REACT_APP_SERVER_URL || '') + '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/anime" element={<Anime />} />
              <Route path="/your-list" element={<YourList />} />
              {/* <Route exact path="/login" element={<Login />} /> */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Registersignup />} />
              {/* <Route exact path="/signup" element={<Signup />} /> */}
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/profile/" element={<Profile />} />
              {/* <Route path="/thought/:id" element={<SingleThought />} /> */}

              <Route element={<NoMatch />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
