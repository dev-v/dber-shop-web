import {Icon, Modal, Upload} from 'antd';

export default class Imgs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: props.fileList || [],
    };
  }

  handleCancel = () => this.setState({previewVisible: false})

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({fileList}) => this.setState({fileList})

  render() {
    const {maxFile = 50, action,} = this.props;
    const {previewVisible, previewImage, fileList} = this.state;
    return (
      <div className="clearfix">
        <Upload
          action={action}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {(fileList.length >= maxFile) || <div>
            <Icon type="plus"/>
            <div className="ant-upload-text">点我上传</div>
          </div>}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="preview" style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </div>
    );
  }
}
