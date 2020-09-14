import React, { Component } from 'react';
import { withRouter } from 'next/router';
import io from 'socket.io-client';
import Layout from '../../../components/layout';

class Home extends Component {
  state = {
    docs: [],
    dirs: ['home'],
  }

  navigate(doc) {
    this.props.router.push(`${doc._id}`)
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.router.query.slug) {
      const currentId = this.props.router.query.slug[0];
      console.log('mmm q hacer? ==>', this.props.router.query.slug, prevProps.router.query.slug);
      fetch(`/api/get-documents/?id=${currentId}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          docs: res.docs,
        });
      })

      if (currentId !== 'home') {
        fetch(`/api/get-breadcumbs/?id=${currentId}`)
        .then((res) => res.json())
        .then((res) => {
          console.log('res =====>', res);
        })
        .catch((err) => {
          console.error(err);
        })
      }
    }
  }

  componentDidMount() {
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
    });
  }

  render() {
    return (
      <Layout>
        <h1>Hola soy el Home</h1>
        <ul>
          {
            this.state.docs.map((doc) => {
              if (doc.type === 'folder') {
                return <li key={doc._id} onClick={() => this.navigate(doc)}>{doc.name} {doc.type}</li>;
              } else {
                return <li key={doc._id} onClick={() => this.navigate(doc)}>{doc.title} {doc.type}</li>;
              }
            })
          }
        </ul>
      </Layout>
    );
  }

}

export default withRouter(Home);
