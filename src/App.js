import React, { Component } from "react";
import "./App.css";
const instgrm = window.instgrm;

class InstagramFeed extends Component {
  constructor() {
    super();
    this.state = {
      links: []
    };
  }

  componentDidMount() {
    fetch(
      "https://api.instagram.com/v1/users/self/media/recent/?access_token=3966056718.1677ed0.2011715011c54e7893069bdd9317264d"
    )
      .then(resp => resp.json())
      .then(response => {
        let links = response.data.map(item => {
          return item.link;
        });
        this.setState({
          links: links
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.links.map((link, i) => <Instagram key={i} link={link} />)}
      </div>
    );
  }
}

class Instagram extends Component {
  constructor() {
    super();
    this.state = {
      embedCode: { __html: "" }
    };
  }
  componentDidMount() {
    fetch("https://api.instagram.com/oembed/?hidecaption=true&omitscript=true&url=" + this.props.link)
      .then(resp => resp.json())
      .then(response => {
        this.setState({
          embedCode: { __html: response.html }
        });
      });
  }
  render() {
    return <div dangerouslySetInnerHTML={this.state.embedCode} />;
  }
  componentDidUpdate() {
    instgrm.Embeds.process();
  }
}

class App extends Component {
  render() {
    return <InstagramFeed />;
  }
}

export default App;
