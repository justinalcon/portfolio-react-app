import React from 'react';

export default class ModuleArticle extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    article_text: React.PropTypes.string.isRequired
  };

  sanitizeMarkup(){
    // Here we would sanitize potentially malicious XSS injections
    // Currently out of scope since it's an internal tool
    return {
      __html: this.props.article_text
    }
  }

  render() {
    return (
      <div className="module-article">
        <div className="module-article__content" dangerouslySetInnerHTML={this.sanitizeMarkup()} />
      </div>
    )
  }

}