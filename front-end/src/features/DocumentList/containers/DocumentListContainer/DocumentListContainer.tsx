import { connect } from 'react-redux';
import { IAppState } from '../../../../types/IAppState';
import { DocumentList } from '../../components/DocumentList';

const mapStateToProps = (state: IAppState) => ({
  items: [
    {
      link: 'http://www.my-awesome-link.com',
      mime: 'png',
      slug: 'my-awesome-link',
      title: 'Cool pic 1',
    },
    {
      link: 'http://www.my-awesome-link.com',
      mime: 'docx',
      slug: 'my-awesome-link-2',
      title: 'Cool pic 2',
    },
    {
      link: 'http://www.my-awesome-link.com',
      mime: 'jpg',
      slug: 'my-awesome-link-3',
      title: 'Cool pic 3',
    },
  ],
});

export const DocumentListContainer = connect(mapStateToProps)(DocumentList);