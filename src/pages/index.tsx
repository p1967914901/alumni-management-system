import styles from './index.less';
import { Redirect } from 'umi';

export default function IndexPage() {
  return (
    <Redirect to='/login' />
  );
}
