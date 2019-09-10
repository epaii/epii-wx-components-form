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
      value: "epii-checkbox"
    },
    title: {
      type: String,
      value: "请选择"
    },
    options: {
      type: Array,
      value: [{
        label: "多选1",
        checked: true,
        value: 1
      }, {
        label: "多选2",
        checked: false,
        value: 2
      }]
    },
    value: {
      type: Array,
      value: [],
      observer: function(newVal, oldVal) {

        if (newVal.sort().toString() != oldVal.sort().toString()) {
        //  console.log("rlr:" + this.data.name + "/" + newVal + "/" + oldVal);
     
          var radioItems = this.data.options;
        
          for (var i = 0, len = radioItems.length; i < len; ++i) {

            radioItems[i].checked = false;
            // console.log(newVal);
            // console.log(newVal.indexOf(radioItems[i].value));
            // console.log(radioItems[i].value);
            if (newVal.indexOf(radioItems[i].value + "") >= 0 || newVal.indexOf(radioItems[i].value ) >= 0) {
              radioItems[i].checked = true;
            }
          }
          this.setData({
            options: radioItems
          });
          this.sendValue();
        } 
      }

    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached() {


  },

  ready() {

    console.log("mCheckbox", this.data.value);
    var ret = [];
    var radioItems = this.data.options;
    var dataValue = this.data.value;
    for (var i = 0, len = radioItems.length; i < len; ++i) {

      if (radioItems[i].checked)
        ret.push(radioItems[i].value);
      else if (this.data.value.indexOf(radioItems[i].value) >= 0) {
        ret.push(radioItems[i].value);
        radioItems[i].checked = true;

      }
    }
    this.setData({
      value: ret,
      options: radioItems
    });
    this.sendValue();

  },


  /**
   * 组件的方法列表
   */
  methods: {
    sendValue: function() {
      this.triggerEvent('value', {
        value: this.data.value
      });
    },
    onchange: function(e) {
      this.setData({

        value: e.detail.value
      });
      this.sendValue();
    },

  }
})