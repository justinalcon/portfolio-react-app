import React from 'react';
import hljs from 'highlight.js';

export default class ModuleDevNotes extends React.Component {
  constructor(props) {
    super(props);
    
    
    
    // We want to render HTML to the page, but render content inside <code> blocks as simply text.
    // So we're going to strip contents from <code>, save in an array, render html, then place back the stripped code as plain-text.
    let stripped_code_array = [];
    
    // Loop through prop.dev_notes searching for <code>**</code>
    this.render_html = props.dev_notes.replace(/<code>([\s\S]*?)<\/code>/ig, function() {
      
      // Save out inner content of code tags replace inner contents with ""
      stripped_code_array.push(arguments[1]);
      return "";
    });

    this.stripped_code_array = stripped_code_array;
    
  }

  static propTypes = {
    dev_notes: React.PropTypes.string.isRequired
  };

  // When DOM node mounts, re-insert code and init code highlighting
  componentDidMount() {
    
    var code_blocks = this.refs.dev_notes.querySelectorAll("pre");
    for (var i = 0; i < code_blocks.length; i++) {
      code_blocks[i].innerText = this.stripped_code_array[i];
      hljs.highlightBlock(code_blocks[i]);
    };    
  }

  // Here we would sanitize potentially malicious XSS injections
  // Currently out of scope since it's an internal tool
  sanitizeMarkup(){
    return {
      __html: this.render_html
    }
  }

  render() {
    return (
      <div className="module-dev-notes" ref="dev_notes">
        <div className="module-dev-notes__content" dangerouslySetInnerHTML={this.sanitizeMarkup()} />
      </div>
    )
  }

}