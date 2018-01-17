import {Icon} from 'antd';
import styles from './index.less';

export default () => {

  const links = [
    {
      title: '帮助',
      href: '',
    }, {
      title: '隐私',
      href: '',
    }, {
      title: '条款',
      href: '',
    }];

  return (
    <div className={`${styles.globalFooter} ${styles.footer}`}>
      {
        links && (
          <div className={styles.links}>
            {links.map(link => (
              <a
                key={link.title}
                target={link.blankTarget ? '_blank' : '_self'}
                href={link.href}
              >
                {link.title}
              </a>
            ))}
          </div>
        )
      }
      <div className={styles.copyright}>
        <div>Copyright <Icon type="copyright"/> 2018
          动吧（成都）信息网络技术有限责任公司
        </div>
      </div>
    </div>
  );
};
