import React, { PropTypes } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import PublishingInfo from 'components/PublishingInfo';

import styles from './Document.scss';

@observer
class DocumentHtml extends React.Component {
  static propTypes = {
    html: PropTypes.string.isRequired,
  }

  componentDidMount = () => {
    this.setExternalLinks();
  }

  componentDidUpdate = () => {
    this.setExternalLinks();
  }

  setExternalLinks = () => {
    const links = this.refs.content.querySelectorAll('a');
    links.forEach(link => {
      if (link.hostname !== window.location.hostname) {
        link.target = '_blank'; // eslint-disable-line no-param-reassign
      }
    });
  }

  render() {
    return (
      <div
        ref="content"
        className={ styles.document }
        dangerouslySetInnerHTML={{ __html: this.props.html }}
        { ...this.props }
      />
    );
  }
}

@observer
class Document extends React.Component {
  static propTypes = {
    document: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className={ styles.container }>
        <PublishingInfo
          createdAt={ this.props.document.createdAt }
          createdBy={ this.props.document.createdBy }
          updatedAt={ this.props.document.updatedAt }
          updatedBy={ this.props.document.updatedBy }
          collaborators={ toJS(this.props.document.collaborators) }
        />
        <DocumentHtml html={ this.props.document.html } />
      </div>
    );
  }
}

export default Document;
export {
  DocumentHtml,
};