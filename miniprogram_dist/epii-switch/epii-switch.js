// conmon/components/form/epii-radio/epii-radio.js
Component({
  behaviors: ['wx://form-field'],
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: "epii-switch"
    },
    title: {
      type: String,
      value: "请选择"
    },
    label: {
      type: String,
      value: "是/否"
    },
    value: {
      type: Boolean,
      value: false
    }
  },
  ready() {
    console.log("mSwitch",this.data.value)
    this.setData({
      value:this.data.value
    });
    this.sendValue();



  },

  /**
   * 组件的初始数据
   */
  data: {

  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    sendValue: function () {
      this.triggerEvent('value', { value: this.data.value });
    },
    onchange: function (e) {
      this.setData({
        value: e.detail.value 
      });
      this.sendValue();
      console.log(e.detail.value)
    }

  }
})