import React, { Component } from 'react';
import { withRouter } from 'next/router';
import io from 'socket.io-client';
import Layout from '../../components/layout';

class Home extends Component {
  state = {
    docs: [],
    dir: 'home',
  }

  navigate(doc) {
    console.log('a ver si es cierto ====>', doc);
    // this.props.router.push(`/${doc.name}`, `${this.props.router.pathname}/${doc.name}`, { shallow: true })
  }

  componentDidMount() {
    console.log('a ver', this.props);
    fetch('/api/changes').finally(() => {
      const socket = io()

      socket.on('change', (change) => {
        const docIndex = this.state.docs.findIndex((doc) => doc._id === change.id);
        if (docIndex > -1) {
          this.setState((prevState) => {
            return {
              docs: prevState.docs.map((doc) => {
                if (doc._id === change.id) {
                  return change.doc;
                }
                return doc;
              }),
            };
          });
        }
      });

      // socket.on('disconnect', () => {
      //   console.log('disconnect')
      // })
    });

    fetch('/api/get-documents')
    .then((res) => res.json())
    .then((res) => {
      this.setState({
        docs: res.docs,
      });
    })
  }

  render() {
    return (
      <Layout>
        <h1>Hola soy el Home</h1>
        <ul>
          {
            this.state.docs.map((doc) => (
              <li key={doc._id} onClick={() => this.navigate(doc)}>{doc.name}</li>
            ))
          }
        </ul>
      </Layout>
    );
  }

}

export default withRouter(Home);
