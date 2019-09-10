// conmon/components/form/epii-select.js
Component({
  behaviors: ['wx://form-field'],
  options: {
    styleIsolation: 'apply-shared'
  },

  /**
   * 组件的属性列表
   */
  properties: {
    styleType: {
      type: String,
      value: "1"
    },
    label: {
      type: String,
      value: ""
    },
    name: {
      type: String,
      value: "epii-select"
    },
    title: {
      type: String,
      value: ""
    },
    options: {
      type: Array,
      value: null,
      observer: function(newVal, oldVal) {
        if (!newVal) newVal = [];
        this.options_set(newVal);
      }
    },

    value: {
      type: String,
      value: "",
      observer: function(newVal, oldVal) {
        if (newVal == oldVal) return;
        this.options_set(this.data.options, newVal);

      }

    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    select_lebal: "请选择",
    picker: false,

    select_index: 0,


    options_show: []
  },
  attached: function() {

    // this.options_set();

  },
  ready() {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    options_set: function(opts, select_value) {

      var opts_this = [];
      var opts_this_change = false;
      var opts_new = [];
      var select_one = 0;
      for (var i = 0; i < opts.length; i++) {

        if (typeof opts[i] == "object") {
          opts_new.push(opts[i].label);
          opts_this.push(opts[i]);
        } else {
          opts_this_change = true;
          opts_new.push(opts[i]);
          opts_this.push({
            label: opts[i],
            checked: false,
            value: i
          });
        }
        if (opts_this[i].checked || (select_value &&  (opts_this[i].value == select_value))  ) {
          select_one = i;
        }



      }

      var toset = {
        options_show: opts_new,

        picker: this.data.options.length > 6
      };
      if (opts_this_change) {
        toset.options = opts_this;
      }

      this.setData(toset);

      if (select_one) {

        this.onselectone(select_one);
      }

    },

    onselectone: function(index) {
      //  this.data.options_show[index] = this.data.options[index].label+"[选中]"
      this.setData({
        select_index: index,
        select_lebal: this.data.options_show[index],
        value: typeof this.data.options[index] == "object" ? this.data.options[index].value : index
      });
    },

    sendValue: function() {
      this.triggerEvent('value', {
        value: this.data.value
      });
    },
    pickerChange: function(e) {
      this.onselectone(e.detail.value - 0);
    },

    click: function(e) {
      var tath = this;
      if (this.data.options.length > 6) {

      } else {
        var texts = [];


        wx.showActionSheet({
          itemList: this.data.options_show,
          success: function(res) {
            if (!res.cancel) {

              tath.onselectone(res.tapIndex);

            }
          }
        });
      }
    },

  }
})