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
      value: "epii-radio"
    },
    title: {
      type: String,
      value: "请选择"
    },
    options: {
      type: Array,
      value: [{
        label: "是",
        checked: false,
        value: "1"
      }, {
        label: "否",
        checked: false,
        value: "0"
      }]
    },
    value: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) { 
        if(newVal - oldVal==0) return;
        var radioItems = this.data.options;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
          
          if (newVal  - radioItems[i].value==0) {
              radioItems[i].checked = true;
            }else{
            radioItems[i].checked = false;
            }
           
        };
        this.setData({
          options: radioItems
        });
        this.sendValue();
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached: function() {
    // console.log(this);

  },
  ready() {
    // console.log("dddddddd"+this.data.value);
    // var radioItems = this.data.options;
    // for (var i = 0, len = radioItems.length; i < len; ++i) {

    //   if (radioItems[i].checked)
    //     // console.log("radioItems", radioItems[i].value)
    //     this.setData({
    //       value: radioItems[i].value
    //     });
    //   else {
    //     if (this.data.value == radioItems[i].value) {
    //       radioItems[i].checked = true;
    //     }
    //   }
    // };
    // this.setData({
    //   options: radioItems
    // });
    // this.sendValue();
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
      console.log(e);
      // console.log("radioItems", e.detail.value)
      var radioItems = this.data.options;
      if(e.type == "tap")
      {
        for (var i = 0, len = radioItems.length; i < len; ++i) {
          var tmp  = i == e.currentTarget.dataset.index;
          var select_value = radioItems[i].value;
          if (select_value!= this.data.value)
          {
            radioItems[i].checked = false;
          }

          if (radioItems[i].checked && tmp) {
            radioItems[i].checked = false;
            this.setData({
              value: 0
            })

          }else if(tmp)
          {
            radioItems[i].checked = true;
            this.setData({
              value: radioItems[i].value
            })
          }
        }
        //radioItems[0].checked = false;
      }

      this.setData({
        options: radioItems,
      });
      // console.log(this);
      //  this.sendValue();
    },

  }
})