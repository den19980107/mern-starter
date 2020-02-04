import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import marked from "marked";
import './markdown.css'

// import cmoponent
import { Icon } from 'antd';
const Spinner = <Icon type="loading" style={{ fontSize: 40 }} spin />;

class Document extends Component {
   state = {
      markdown: "",
      loading: true
   }
   componentDidMount() {
      const readmePath = require("./doc.md");

      fetch(readmePath)
         .then(response => {
            return response.text()
         })
         .then(text => {
            this.setState({
               loading: false,
               markdown: marked(text)
            })
         })
   }
   render() {
      return (
         <div className="container pt-4">
            {this.state.loading && <div style={{ display: "flex", justifyContent: "center" }}>{Spinner}</div>}
            <ReactMarkdown
               source={this.state.markdown}
               escapeHtml={false}
            />
         </div>
      );
   }
}

export default Document;