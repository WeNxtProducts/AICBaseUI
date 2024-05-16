import { notification } from 'antd';
import CollapsePanelHeader from '../collapsePanelHeader/CollapsePanelHeader';

const showNotification = {
 SUCCESS: description => {
  notification.success({
   message: '',
   description: description,
   duration: 2,
  });
 },
 ERROR: description => {
  notification.error({
   message: '',
   description: description,
   duration: 2,
  });
 },
 WARNING: description => {
  notification.warning({
   message: '',
   description: description,
   duration: 2,
  });
 },
 INFO: description => {
  notification.info({
   message: '',
   description: description,
   duration: 2,
  });
 },
};

export default showNotification;
