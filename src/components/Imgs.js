import {Card, Icon, Modal, Upload} from 'antd';
import bucket from './Bucket';
import styles from './Imgs.css';

const DEFAULT_CONFIG = {
  accept: 'image/*',
  listType: 'picture-card',
}

export default class Imgs extends React.Component {
  token;
  imgType;
  bsId;
  fileLength = -1;

  constructor(props) {
    super(props);
    const {multiple = true, style = 'webp.cover', imgType, bsId, content} = this.props;
    this.style = style;
    this.state = {
      ...DEFAULT_CONFIG,
      fileList: [],
      multiple,
      content,
    };
    this.loadData(imgType, bsId);
  }

  beforeUpload = () => {
    return bucket.getUploadToken(this.imgType, this.bsId).then(token => this.token = token);
  }

  getUploadData = () => {
    const {token, key} = this.token;
    const {imgType, bsId, style} = this;
    return {
      token,
      key,
      'x:type': imgType.value,
      'x:bsId': bsId,
      'x:token': token,
      'x:protocol': window.location.protocol,
      'x:style': style,
    };
  }

  onUploadStatusChange = ({file, fileList}) => {
    if (file.status == 'done') {
      const url = file.response.url;
      fileList[fileList.length - 1] = {url, uid: bucket.parseKey(url)};
    }
    this.state.fileList = fileList;
    this.fileLenChange();
  }

  closePreview = () => this.setState({previewVisible: false})

  onPreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  onRemove = (file) => {
    Modal.confirm({
      title: '确定删除图片？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        bucket.del(this.imgType, this.bsId, file.uid).then(res => {
          if (res > 0) {
            this.state.fileList = this.state.fileList.filter(f => {
              if (f.uid != file.uid) {
                return f;
              }
            });
            this.fileLenChange();
          }
          return res > 0;
        });
      }
    });
    return false;
  }

  componentWillReceiveProps(nextProps) {
    const {imgType, bsId} = nextProps;
    if (imgType != this.imgType || bsId != this.bsId) {
      this.loadData(imgType, bsId);
    }
  }

  loadData = (imgType, bsId) => {
    this.imgType = imgType;
    this.bsId = bsId;
    if (imgType) {
      bucket.getUpUrl(imgType).then(action => this.state.action = action);
      if (typeof bsId == 'number') {
        bucket.getDownUrls(imgType, bsId, this.style).then((urls) => {
          this.state.fileList = urls.map(([url, uid]) => ({url, uid}));
          this.fileLenChange();
        });
        this.state.content = undefined;
        return;
      } else {
        this.state.fileList = [];
        this.fileLenChange(false);
      }
    }
    this.state.content = <div>没有可展示的信息</div>;
  }

  fileLenChange = (refresh = true) => {
    const curLen = this.state.fileList.length;
    if (curLen != this.fileLength) {
      const max = this.imgType.maxCount, len = this.fileLength = curLen;
      this.state.msg = `${len}/${max}`;
      this.props.onChange && this.props.onChange(len, max);
    }
    refresh && this.setState({
      ...this.state
    });
  }

  render() {
    const {previewVisible = false, previewImage = '', fileList, msg} = this.state;
    const {title, bordered = false, add = true, content = this.state.content} = this.props;
    return (
      <Card title={title} bordered={bordered} extra={msg}>
        {content ? content : <Upload
          {...this.state}
          beforeUpload={this.beforeUpload}
          data={this.getUploadData}
          onChange={this.onUploadStatusChange}
          onPreview={this.onPreview}
          onRemove={this.onRemove}
        >
          {add && (fileList.length < this.imgType.maxCount) &&
          <div>
            <Icon type="plus"/>
            <div>点我上传</div>
          </div>}
        </Upload>}
        <Modal visible={previewVisible} className={styles.preview} footer={null}
               onCancel={this.closePreview}>
          <img src={previewImage}/>
        </Modal>
      </Card>
    );
  }
}
