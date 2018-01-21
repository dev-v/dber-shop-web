import MapLoader from './MapLoader';
import {Spin, message} from 'antd';
import React from 'react';
import './Map.less';
import mapPin from '../../assets/map-pin1.png';

const DEFAULT_CONFIG = {
  zoom: 18,
  zooms: [12, 18],
  keyboardEnable: false,
  // showBuildingBlock: false,
  showIndoorMap: true,
}

const plugins = {
  Geolocation: {
    // showButton: true,        //显示定位按钮，默认：true
    timeout: 60000,          //超过60秒后停止定位，默认：无穷大
    buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
    // showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
    // panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
    zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    buttonDom: '<i class="iconfont icon-map-location" style="font-size: 32px;cursor: pointer;"></i>',//定位按钮样式
    markerOptions: {
      content: '<i class="iconfont icon-map-user-pin" style="font-size: 32px;cursor: pointer;color: #1296db;"></i>',
      animation: 'AMAP_ANIMATION_DROP' //AMAP_ANIMATION_BOUNCE|AMAP_ANIMATION_DROP
    }, //定位点样式设置
  },
  BasicControl: {
    position: 'rb',
    theme: 'black',
    showZoomNum: false,
  },
  PositionPicker: {
    iconStyle: {//自定义外观
      url: mapPin,//图片地址
      size: [32, 32],  //要显示的点大小，将缩放图片
      ancher: [10, 30],//锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
    }
  }
};

const geolocationMax = 2;//获取定位信息失败最大重试次数


export default class Map extends React.PureComponent {

  /**
   * 获取城市信息 回到函数fn 参数为(status,result)
   */
  static getCity = (fn) => {
    new MapLoader({useAMapUI: false}).load().then(() => {
      const citySearch = new AMap.CitySearch();
      citySearch.getLocalCity((status, result) => {
        fn && fn(status, result);
      });
    });
  }

  mapLoaded = false;

  loading = <Spin size="large" style={{textAlign: 'center', display: 'block', paddingTop: '20%',}} tip='地图加载中...'/>;

  geolocationReget = 0;//离上次获取定位信息失败已重试次数

  events = {
    positionChange: (state) => {//地图中心点变化后触发(包括定位变化、中心点变化、缩放变化等)
    },
    moveStart: () => {//地图平移开始 暂不支持

    },
    moveEnd: () => {//地图平移结束 暂不支持

    }
  }

  componentWillUnmount() {
    this.map.destroy();
  }

  state = {
    geolocation: undefined,//用户当前位置 GeolocationResult对象
    position: undefined,//地图中心点位置信息 positionPickerResult对象
    bounds: undefined,//地图可视范围
    zoom: undefined,//当前可视级别
  }

  constructor(props) {
    super(props);
    Object.assign(this.events, props.events);
    new MapLoader({useAMapUI: true}).load().then(() => {
      const map = this.map = new AMap.Map(this.container, DEFAULT_CONFIG);
      this.state.zoom = map.getZoom();
      AMap.event.addListener(map, 'zoomchange', this.zoomchange);
      // AMap.event.addListener(map, 'movestart', this.zoomchange);
      // AMap.event.addListener(map, 'moveend', this.zoomchange);
      // AMap.event.addListener(map, 'touchmove', this.zoomchange);
      // AMap.event.addListener(map, 'touchend', this.zoomchange);
      this.setGeolocation();
      // this.setBasicalController();
      this.setPositionPicker();
      this.mapLoaded = true;
    });
  }

  geolocationComplete = (result) => {
    this.geolocationReget = 0;
    this.state.geolocation = result;
  }

  zoomchange = () => {
    this.state.zoom = this.map.getZoom();
    this.state.bounds = this.map.getBounds();
  }

  positionPickerSuccess = (result) => {
    this.state.position = result;
    this.state.bounds = this.map.getBounds();
    this.events.positionChange({...this.state});
  }

  geolocationError = (error) => {
    if (this.geolocationReget < geolocationMax) {
      message.warn('获取位置信息失败，正在重新获取！');
      this.geolocation.getCurrentPosition();
    } else {
      message.error('获取定位信息失败，您可以手动设置位置信息！');
    }
    console.warn(error);
    this.geolocationReget++;
  }

  positionPickerFail = (error) => {
  }

  setBasicalController = () => {
    AMapUI.loadUI(['control/BasicControl'], (BasicControl) => {
      this.map.addControl(new BasicControl.Zoom(plugins.BasicControl));
    });
  }

  setGeolocation = () => {
    this.map.plugin('AMap.Geolocation', () => {
      const geolocation = this.geolocation = new AMap.Geolocation(plugins.Geolocation);
      this.map.addControl(geolocation);
      AMap.event.addListener(geolocation, 'complete', this.geolocationComplete);
      AMap.event.addListener(geolocation, 'error', this.geolocationError);
      geolocation.getCurrentPosition();
    });
  }

  setPositionPicker = () => {
    AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) => {
      const positionPicker = this.positionPicker = new PositionPicker({...plugins.PositionPicker, map: this.map});
      positionPicker.on('success', this.positionPickerSuccess);
      positionPicker.on('fail', this.positionPickerFail);
      positionPicker.start();
    });
  }

  render() {
    return <div ref={(div) => {
      this.container = div
    }} style={{width: '100%', height: '100%',}}>
      {
        !this.mapLoaded && this.loading
      }
    </div>
  }
}
