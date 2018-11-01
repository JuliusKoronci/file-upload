import { connect } from 'react-redux';
import { IAppState } from '../../../../types/IAppState';
import { Message } from '../../components/Message';
import { documentsSelector } from '../../../../domains/Documents';

const mapStateToProps = (state: IAppState) => ({
  message: documentsSelector(state).error,
});

export const MessageContainer = connect(mapStateToProps)(Message);