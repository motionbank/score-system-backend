webpackJsonp([1],{

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_PM2MoSysTab__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins_PM2Plugin__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex__ = __webpack_require__(236);







__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_4_vuex__["a" /* default */]);

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_3__plugins_PM2Plugin__["a" /* default */], {
  host: 'https://piecemaker2-api-public.herokuapp.com',
  api_key: '0310XPC6JEeF0oCy'
});

var store = new __WEBPACK_IMPORTED_MODULE_4_vuex__["a" /* default */].Store({
  store: {
    activeGroup: false
  },
  plugins: [__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].PM2Service.getStorePlugin()]
});

var startPM2VueTab = function startPM2VueTab() {
  new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
    el: '#pm2TabContent',
    store: store,
    router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
    template: '<PM2MoSysTab/>',
    components: { PM2MoSysTab: __WEBPACK_IMPORTED_MODULE_1__components_PM2MoSysTab__["a" /* default */] },
    render: function render(h) {
      return h(__WEBPACK_IMPORTED_MODULE_1__components_PM2MoSysTab__["a" /* default */]);
    }
  });
};

if ('domready' in window) {
  window.domready(startPM2VueTab);
} else {
  startPM2VueTab();
}

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PM2MoSysTab_vue__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_16db079a_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_PM2MoSysTab_vue__ = __webpack_require__(158);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(155)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-16db079a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PM2MoSysTab_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_16db079a_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_PM2MoSysTab_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/PM2MoSysTab.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PM2MoSysTab.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-16db079a", Component.options)
  } else {
    hotAPI.reload("data-v-16db079a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 155:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('router-view')
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-16db079a", esExports)
  }
}

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_PM2Groups__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_PM2Group__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_PM2Context__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_PM2Login__ = __webpack_require__(180);







__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

var router = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/login',
    component: __WEBPACK_IMPORTED_MODULE_5_components_PM2Login__["a" /* default */]
  }, {
    path: '/logout'
  }, {
    path: '/',
    component: __WEBPACK_IMPORTED_MODULE_2_components_PM2Groups__["a" /* default */]
  }, {
    path: '/group/:groupId',
    component: __WEBPACK_IMPORTED_MODULE_2_components_PM2Groups__["a" /* default */],
    props: function props(route) {
      return { groupId: parseInt(route.params.groupId, 10), contextId: parseInt(route.params.contextId, 10) };
    },
    children: [{
      path: 'context/:contextId',
      component: __WEBPACK_IMPORTED_MODULE_4_components_PM2Context__["a" /* default */]
    }]
  }]
});

router.beforeEach(function (to, from, next) {
  if (to.path === '/logout') {
    __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].PM2Service.logout(function () {
      next('/');
    });
  } else {
    next();
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PM2Group_vue__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6e3b3742_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_PM2Group_vue__ = __webpack_require__(178);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(168)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6e3b3742"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PM2Group_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6e3b3742_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_PM2Group_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/PM2Group.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PM2Group.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6e3b3742", Component.options)
  } else {
    hotAPI.reload("data-v-6e3b3742", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PM2Groups_vue__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5715c8a4_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_PM2Groups_vue__ = __webpack_require__(179);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(162)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5715c8a4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PM2Groups_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5715c8a4_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_PM2Groups_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/PM2Groups.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PM2Groups.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5715c8a4", Component.options)
  } else {
    hotAPI.reload("data-v-5715c8a4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 162:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PM2GroupListing__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PM2Group__ = __webpack_require__(16);






/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    groupId: Number,
    contextId: Number
  },
  data: function data() {
    return {
      textFilter: '',
      sortReversed: false
    };
  },

  computed: {
    groups: function groups() {
      return this.$store.state.piecemaker.groups;
    },
    groupsSortedAndFiltered: function groupsSortedAndFiltered() {
      var _this = this;

      var clonedGroup = this.groups.slice(0);
      if (this.textFilter) {
        var textFilterNoCase = this.textFilter.toLowerCase();
        clonedGroup = clonedGroup.filter(function (g) {
          return _this.$store.state.activeGroup === g || g.title.toLowerCase().indexOf(textFilterNoCase) >= 0 || g.description.toLowerCase().indexOf(textFilterNoCase) >= 0;
        });
      }
      clonedGroup.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
      if (this.sortReversed) {
        clonedGroup.reverse();
      }
      return clonedGroup;
    },
    hasGroups: function hasGroups() {
      return this.groups && this.groups.length > 0;
    }
  },
  mounted: function mounted() {
    __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].PM2Service.getGroups();
  },

  components: {
    'pm2-group-listing': __WEBPACK_IMPORTED_MODULE_1__PM2GroupListing__["a" /* default */],
    'pm2-group': __WEBPACK_IMPORTED_MODULE_2__PM2Group__["a" /* default */]
  }
});

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PM2GroupListing_vue__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_78d57956_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_PM2GroupListing_vue__ = __webpack_require__(167);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(165)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-78d57956"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PM2GroupListing_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_78d57956_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_PM2GroupListing_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/PM2GroupListing.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PM2GroupListing.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-78d57956", Component.options)
  } else {
    hotAPI.reload("data-v-78d57956", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 165:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['group', 'asMenu']
});

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "group-listing",
    class: {
      'as-menu': _vm.asMenu
    }
  }, [_c('div', {
    staticClass: "inner"
  }, [_c('router-link', {
    attrs: {
      "to": {
        path: '/group/' + _vm.group.id
      }
    }
  }, [_c('h3', [_vm._v(_vm._s(_vm.group.title))]), _vm._v(" "), _c('p', {
    staticClass: "description"
  }, [_vm._v(_vm._s(_vm.group.description))])])], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-78d57956", esExports)
  }
}

/***/ }),

/***/ 168:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PM2Context__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PM2EventListing__ = __webpack_require__(18);






/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    groupId: Number,
    contextId: Number
  },
  data: function data() {
    return {};
  },

  computed: {
    groupPath: function groupPath() {
      return '/group/' + this.group.id;
    },
    contextPath: function contextPath() {
      return this.groupPath + '/context/' + this.context.id;
    },
    context: function context() {
      var _this = this;

      if (this.videos) {
        return this.videos.find(function (v) {
          return v.id === _this.contextId;
        });
      }
      return undefined;
    },
    group: function group() {
      var _this2 = this;

      var tmpGroup = this.$store.state.piecemaker.groups.find(function (g) {
        return g.id === _this2.groupId;
      });
      if (tmpGroup && !tmpGroup.videos) __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].PM2Service.getVideos(this.groupId);
      return tmpGroup;
    },
    videos: function videos() {
      return this.group.videos;
    }
  },
  watch: {
    group: function group() {
      if (this.group) this.$store.state.activeGroup = this.group;
    }
  },
  mounted: function mounted() {
    if (!this.group) {
      __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].PM2Service.getGroup(this.groupId, function (group) {});
    } else if (!this.group.videos) {
      __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].PM2Service.getVideos(this.groupId, function (videos) {});
    }
  },

  components: {
    'pm2-context': __WEBPACK_IMPORTED_MODULE_1__PM2Context__["a" /* default */],
    'pm2-event-listing': __WEBPACK_IMPORTED_MODULE_2__PM2EventListing__["a" /* default */]
  }
});

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PM2Context_vue__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_256bf98f_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_PM2Context_vue__ = __webpack_require__(177);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(170)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PM2Context_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_256bf98f_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_PM2Context_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/PM2Context.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PM2Context.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-256bf98f", Component.options)
  } else {
    hotAPI.reload("data-v-256bf98f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 170:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PM2EventListing__ = __webpack_require__(18);





/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['group', 'context'],
  data: function data() {
    return {};
  },

  computed: {
    events: function events() {
      var _this = this;

      if (this.group.events) return this.group.events.filter(function (e) {
        return e.id !== _this.context.id;
      });
      return [];
    }
  },
  mounted: function mounted() {
    if (this.group.id !== this.context.event_group_id) {
      throw new Error('Piecemaker2-Context component: context needs to belong to group');
    }
    __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].PM2Service.getEventsForEvent(this.group.id, this.context);
  },

  components: {
    'pm2-event-listing': __WEBPACK_IMPORTED_MODULE_1__PM2EventListing__["a" /* default */]
  }
});

/***/ }),

/***/ 172:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);



/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    event: {
      required: true
    },
    context: {
      required: false
    }
  },
  data: function data() {
    return {};
  },

  computed: {
    title: function title() {
      return this.event.fields.title || 'Untitled event';
    },
    description: function description() {
      return this.event.fields.description || '';
    },
    tags: function tags() {
      var tags = this.event.fields.tags;
      if (tags && tags.length > 0) return this.event.fields.tags.split(',');
      return [];
    }
  },
  methods: {
    onDragStart: function onDragStart($ev) {
      var target = $ev.target;
      var cellType = target.classList[0] === 'video-thumb' ? 'player' : 'annotator';
      var cellData = {
        type: 'iframe',
        title: this.title,
        description: this.description,
        additional_fields: {
          'pm2-event-id': this.event.id,
          'pm2-group-id': this.event.event_group_id,
          'pm2-event-type': this.event.type,
          'pm2-event-tags': this.event.fields.tags,
          'pm2-user': this.$store.state.piecemaker.user.id,
          'iframe-src': 'http://localhost:8080/?gid=' + this.event.event_group_id + '&eid=' + this.event.id + '#/' + cellType
        }
      };
      $ev.dataTransfer.setData('application/json', __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(cellData));
    },
    onDragStop: function onDragStop($ev) {}
  }
});

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "event-listing"
  }, [_c('div', {
    staticClass: "video-thumb",
    attrs: {
      "draggable": ""
    },
    on: {
      "dragstart": _vm.onDragStart,
      "dragend": _vm.onDragStop
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "annot-thumb",
    attrs: {
      "draggable": ""
    },
    on: {
      "dragstart": _vm.onDragStart,
      "dragend": _vm.onDragStop
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "info"
  }, [_c('h4', {
    staticClass: "title"
  }, [_vm._t("title", [_vm._v(_vm._s(_vm.title))])], 2), _vm._v(" "), _c('div', {
    staticClass: "time"
  }, [_vm._v(_vm._s(_vm._f("contextTime")(_vm.event.utc_timestamp, _vm.context)))]), _vm._v(" "), _c('div', {
    staticClass: "labels"
  }, [_c('span', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.event.type))]), _vm._v(" "), _vm._l((_vm.tags), function(tag) {
    return [_c('span', {
      staticClass: "label"
    }, [_vm._v(_vm._s(tag))])]
  })], 2)])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2e66b85a", esExports)
  }
}

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.group && _vm.context) ? [(_vm.events && _vm.events.length > 0) ? [_vm._l((_vm.events), function(event) {
    return [_c('pm2-event-listing', {
      attrs: {
        "event": event,
        "context": _vm.context
      }
    })]
  })] : _vm._e()] : _vm._e()], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-256bf98f", esExports)
  }
}

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "group"
  }, [(_vm.group) ? [(_vm.context) ? [_c('pm2-context', {
    attrs: {
      "group": _vm.group,
      "context": _vm.context
    }
  })] : (_vm.videos && _vm.videos.length > 0) ? [_vm._l((_vm.videos), function(video) {
    return [_c('pm2-event-listing', {
      attrs: {
        "event": video
      }
    }, [_c('router-link', {
      attrs: {
        "to": {
          path: _vm.groupPath + '/context/' + video.id
        }
      },
      slot: "title"
    }, [_vm._v(_vm._s(video.fields.title))])], 1)]
  })] : [_vm._m(0)]] : _vm._e()], 2)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "no-videos"
  }, [_c('p', [_vm._v("No videos …")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6e3b3742", esExports)
  }
}

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "groups"
  }, [_c('div', {
    staticClass: "group-list-container",
    class: {
      'as-menu': _vm.groupId
    }
  }, [_c('div', {
    staticClass: "filters"
  }, [_c('label', {
    attrs: {
      "for": "text-filter"
    }
  }, [_vm._v("Search")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.textFilter),
      expression: "textFilter"
    }],
    staticClass: "name-filter",
    attrs: {
      "type": "text",
      "id": "text-filter",
      "placeholder": "Search"
    },
    domProps: {
      "value": (_vm.textFilter)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.textFilter = $event.target.value
      }
    }
  }), _vm._v(" "), _c('label', {
    class: {
      'is-reversed': _vm.sortReversed
    },
    attrs: {
      "for": "sort-reversed"
    }
  }, [_vm._v("Reversed")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.sortReversed),
      expression: "sortReversed"
    }],
    staticClass: "reverse-sort",
    attrs: {
      "type": "checkbox",
      "id": "sort-reversed"
    },
    domProps: {
      "checked": Array.isArray(_vm.sortReversed) ? _vm._i(_vm.sortReversed, null) > -1 : (_vm.sortReversed)
    },
    on: {
      "__c": function($event) {
        var $$a = _vm.sortReversed,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.sortReversed = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.sortReversed = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.sortReversed = $$c
        }
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "group-list"
  }, [(_vm.hasGroups) ? [_vm._l((_vm.groupsSortedAndFiltered), function(group) {
    return [_c('pm2-group-listing', {
      attrs: {
        "group": group,
        "asMenu": !!_vm.groupId
      }
    })]
  })] : _vm._e()], 2)]), _vm._v(" "), (_vm.groupId) ? [_c('pm2-group', {
    attrs: {
      "groupId": _vm.groupId,
      "contextId": _vm.contextId
    }
  })] : _vm._e()], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5715c8a4", esExports)
  }
}

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PM2EventListing_vue__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2e66b85a_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_PM2EventListing_vue__ = __webpack_require__(176);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(172)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2e66b85a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PM2EventListing_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2e66b85a_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_PM2EventListing_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/PM2EventListing.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PM2EventListing.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2e66b85a", Component.options)
  } else {
    hotAPI.reload("data-v-2e66b85a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PM2Login_vue__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8a664f6e_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_PM2Login_vue__ = __webpack_require__(183);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(181)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-8a664f6e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PM2Login_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8a664f6e_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_PM2Login_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/PM2Login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PM2Login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8a664f6e", Component.options)
  } else {
    hotAPI.reload("data-v-8a664f6e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 181:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);




/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      email: '',
      password: ''
    };
  },
  mounted: function mounted() {
    if (this.$store.state.piecemaker.user && this.$store.state.piecemaker.user.email) {
      this.email = this.$store.state.piecemaker.user.email;
    }
  },

  methods: {
    onSubmit: function onSubmit($event) {
      var _this = this;

      __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].PM2Service.login(this.email, this.password, function () {
        _this.$router.push('/');
      });
    }
  }
});

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login"
  }, [_c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.onSubmit($event)
      }
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.email),
      expression: "email"
    }],
    attrs: {
      "type": "text",
      "id": "pm2-email"
    },
    domProps: {
      "value": (_vm.email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.email = $event.target.value
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.password),
      expression: "password"
    }],
    attrs: {
      "type": "password",
      "id": "pm2-password"
    },
    domProps: {
      "value": (_vm.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.password = $event.target.value
      }
    }
  }), _vm._v(" "), _c('input', {
    attrs: {
      "type": "submit",
      "value": "Submit"
    }
  })])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8a664f6e", esExports)
  }
}

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_piecemaker_api_client__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_piecemaker_api_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_piecemaker_api_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);









var PM2Module = {
  state: {
    user: {},
    groups: []
  },
  mutations: {
    user: function user(state, _user) {
      state.user = _user;
    },
    groups: function groups(state, _groups) {
      state.groups = _groups;
    },
    group: function group(state, _group) {
      var oldGroup = state.groups.find(function (g) {
        return g.id === _group.id;
      });
      if (oldGroup) {
        var oldGroupIndex = state.groups.indexOf(oldGroup);
        _group.videos = _group.videos || [];
        _group.events = _group.events || [];
        __WEBPACK_IMPORTED_MODULE_4_vue__["a" /* default */].set(state.groups, oldGroupIndex, _group);
      }
    },
    videos: function videos(state, _ref) {
      var groupId = _ref.groupId,
          _videos = _ref.videos;

      var videoGroup = state.groups.find(function (g) {
        return g.id === groupId;
      });
      if (videoGroup) {
        __WEBPACK_IMPORTED_MODULE_4_vue__["a" /* default */].set(videoGroup, 'videos', _videos);
      }
    },
    event: function event(state, _ref2) {
      var groupId = _ref2.groupId,
          _event = _ref2.event;

      var eventGroup = state.groups.find(function (g) {
        return g.id === groupId;
      });
      if (eventGroup) {
        if (eventGroup.events) {
          var oldEvent = eventGroup.events.find(function (e) {
            return e.id === _event.id;
          });
          if (oldEvent) {
            var oldEventIndex = eventGroup.events.indexOf(oldEvent);
            __WEBPACK_IMPORTED_MODULE_4_vue__["a" /* default */].set(eventGroup.events, oldEventIndex, _event);
          } else {
            eventGroup.events.push(_event);
            eventGroup.events.sort(function (a, b) {
              return a.utc_timestamp.getTime() - b.utc_timestamp.getTime();
            });
          }
        } else {
          eventGroup.events = [_event];
        }
      }
    },
    events: function events(state, _ref3) {
      var groupId = _ref3.groupId,
          _events = _ref3.events;

      var eventGroup = state.groups.find(function (g) {
        return g.id === groupId;
      });
      if (eventGroup) {
        var eventGroupIndex = state.groups.indexOf(eventGroup);
        __WEBPACK_IMPORTED_MODULE_4_vue__["a" /* default */].set(state.groups, eventGroupIndex, __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign___default()({}, eventGroup, { events: _events }));
      }
    }
  }
};

var PM2Service = function () {
  function PM2Service(pm2) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, PM2Service);

    this.pm2 = pm2;
    this.pm2.error = function (err) {
      console.log('Catching errs in PM2 plugin …');
      throw new Error(err);
    };
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(PM2Service, [{
    key: 'getStorePlugin',
    value: function getStorePlugin() {
      var _this = this;

      return function (store) {
        _this.store = store;
        store.subscribe(function (_ref4, state) {
          var type = _ref4.type,
              payload = _ref4.payload;

          console.log('[pm2Service]', type);
        });
        store.registerModule('piecemaker', PM2Module);
      };
    }
  }, {
    key: 'isLoggedIn',
    value: function isLoggedIn() {
      var user = this.store.state.piecemaker.user;
      return user && user.api_key;
    }
  }, {
    key: 'login',
    value: function login(email, password) {
      var _this2 = this;

      var next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      this.pm2.login(email, password, function (apiKey) {
        _this2.pm2.whoAmI(function (user) {
          var userFull = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign___default()(user, { api_key: apiKey });
          _this2.store.commit('user', userFull, { module: 'piecemaker' });
          next(user);
        });
      });
    }
  }, {
    key: 'logout',
    value: function logout(next) {
      var _this3 = this;

      this.pm2.logout(function () {
        _this3.store.commit('user', undefined, { module: 'piecemaker' });
        next();
      });
    }
  }, {
    key: 'getGroups',
    value: function getGroups() {
      var _this4 = this;

      var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      this.pm2.listGroups(function (groups) {
        _this4.store.commit('groups', groups, { module: 'piecemaker' });
        next(groups);
      });
    }
  }, {
    key: 'getGroup',
    value: function getGroup(groupId) {
      var _this5 = this;

      var next = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      if (this.store.state.piecemaker.groups.length > 0) {
        this.pm2.getGroup(groupId, function (group) {
          _this5.store.commit('group', group, { module: 'piecemaker' });
          next(group);
        });
      } else {
        this.getGroups(function () {
          _this5.getGroup(groupId, next);
        });
      }
    }
  }, {
    key: 'getVideos',
    value: function getVideos(groupId) {
      var _this6 = this;

      var next = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      this.pm2.listEventsOfType(groupId, 'video', function (videos) {
        _this6.store.commit('videos', { groupId: groupId, videos: videos }, { module: 'piecemaker' });
        next(videos);
      });
    }
  }, {
    key: 'getEvent',
    value: function getEvent(groupId, eventId) {
      var _this7 = this;

      var next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      this.pm2.getEvent(groupId, eventId, function (event) {
        _this7.store.commit('event', { groupId: groupId, event: event }, { module: 'piecemaker' });
        next(event);
      });
    }
  }, {
    key: 'getEventsForEvent',
    value: function getEventsForEvent(groupId, event) {
      var _this8 = this;

      var next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      var from = event.utc_timestamp.getTime();
      var to = from + event.duration * 1000.0;
      this.pm2.listEventsForTimespan(groupId, from, to, 'intersect', function (events) {
        _this8.store.commit('events', { groupId: groupId, events: events }, { module: 'piecemaker' });
        next(events);
      });
    }
  }]);

  return PM2Service;
}();

var timeFormatHelper = function timeFormatHelper(tdiff) {
  if (tdiff >= 0) {
    tdiff /= 1000.0;
    tdiff = tdiff.toFixed(2);
    var secs = Math.floor(tdiff);
    var mins = Math.floor(secs / 60.0);
    if (mins < 10) mins = '0' + mins;
    var msecs = Math.floor((tdiff - secs) * 100);
    if (msecs < 10) msecs = '0' + msecs;
    secs = secs - mins * 60;
    if (secs < 10) secs = '0' + secs;
    var tdiffStr = mins + ':' + secs + ':' + msecs;
    tdiffStr = tdiffStr.replace('.', ':');

    return tdiffStr;
  }
  return '00:00:00';
};

/* harmony default export */ __webpack_exports__["a"] = ({
  install: function install(Vue, options) {
    Vue.PM2Service = new PM2Service(new __WEBPACK_IMPORTED_MODULE_3_piecemaker_api_client___default.a(options));

    Vue.filter('contextTime', function (time) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (context) {
        var diffTime = time.getTime() - context.utc_timestamp.getTime();
        return timeFormatHelper(diffTime);
      }
      return __WEBPACK_IMPORTED_MODULE_5_moment___default()(time).format('YYYY-MM-DD HH:mm');
    });
  }
});

/***/ }),

/***/ 226:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 38,
	"./af.js": 38,
	"./ar": 39,
	"./ar-dz": 40,
	"./ar-dz.js": 40,
	"./ar-kw": 41,
	"./ar-kw.js": 41,
	"./ar-ly": 42,
	"./ar-ly.js": 42,
	"./ar-ma": 43,
	"./ar-ma.js": 43,
	"./ar-sa": 44,
	"./ar-sa.js": 44,
	"./ar-tn": 45,
	"./ar-tn.js": 45,
	"./ar.js": 39,
	"./az": 46,
	"./az.js": 46,
	"./be": 47,
	"./be.js": 47,
	"./bg": 48,
	"./bg.js": 48,
	"./bn": 49,
	"./bn.js": 49,
	"./bo": 50,
	"./bo.js": 50,
	"./br": 51,
	"./br.js": 51,
	"./bs": 52,
	"./bs.js": 52,
	"./ca": 53,
	"./ca.js": 53,
	"./cs": 54,
	"./cs.js": 54,
	"./cv": 55,
	"./cv.js": 55,
	"./cy": 56,
	"./cy.js": 56,
	"./da": 57,
	"./da.js": 57,
	"./de": 58,
	"./de-at": 59,
	"./de-at.js": 59,
	"./de-ch": 60,
	"./de-ch.js": 60,
	"./de.js": 58,
	"./dv": 61,
	"./dv.js": 61,
	"./el": 62,
	"./el.js": 62,
	"./en-au": 63,
	"./en-au.js": 63,
	"./en-ca": 64,
	"./en-ca.js": 64,
	"./en-gb": 65,
	"./en-gb.js": 65,
	"./en-ie": 66,
	"./en-ie.js": 66,
	"./en-nz": 67,
	"./en-nz.js": 67,
	"./eo": 68,
	"./eo.js": 68,
	"./es": 69,
	"./es-do": 70,
	"./es-do.js": 70,
	"./es.js": 69,
	"./et": 71,
	"./et.js": 71,
	"./eu": 72,
	"./eu.js": 72,
	"./fa": 73,
	"./fa.js": 73,
	"./fi": 74,
	"./fi.js": 74,
	"./fo": 75,
	"./fo.js": 75,
	"./fr": 76,
	"./fr-ca": 77,
	"./fr-ca.js": 77,
	"./fr-ch": 78,
	"./fr-ch.js": 78,
	"./fr.js": 76,
	"./fy": 79,
	"./fy.js": 79,
	"./gd": 80,
	"./gd.js": 80,
	"./gl": 81,
	"./gl.js": 81,
	"./gom-latn": 82,
	"./gom-latn.js": 82,
	"./he": 83,
	"./he.js": 83,
	"./hi": 84,
	"./hi.js": 84,
	"./hr": 85,
	"./hr.js": 85,
	"./hu": 86,
	"./hu.js": 86,
	"./hy-am": 87,
	"./hy-am.js": 87,
	"./id": 88,
	"./id.js": 88,
	"./is": 89,
	"./is.js": 89,
	"./it": 90,
	"./it.js": 90,
	"./ja": 91,
	"./ja.js": 91,
	"./jv": 92,
	"./jv.js": 92,
	"./ka": 93,
	"./ka.js": 93,
	"./kk": 94,
	"./kk.js": 94,
	"./km": 95,
	"./km.js": 95,
	"./kn": 96,
	"./kn.js": 96,
	"./ko": 97,
	"./ko.js": 97,
	"./ky": 98,
	"./ky.js": 98,
	"./lb": 99,
	"./lb.js": 99,
	"./lo": 100,
	"./lo.js": 100,
	"./lt": 101,
	"./lt.js": 101,
	"./lv": 102,
	"./lv.js": 102,
	"./me": 103,
	"./me.js": 103,
	"./mi": 104,
	"./mi.js": 104,
	"./mk": 105,
	"./mk.js": 105,
	"./ml": 106,
	"./ml.js": 106,
	"./mr": 107,
	"./mr.js": 107,
	"./ms": 108,
	"./ms-my": 109,
	"./ms-my.js": 109,
	"./ms.js": 108,
	"./my": 110,
	"./my.js": 110,
	"./nb": 111,
	"./nb.js": 111,
	"./ne": 112,
	"./ne.js": 112,
	"./nl": 113,
	"./nl-be": 114,
	"./nl-be.js": 114,
	"./nl.js": 113,
	"./nn": 115,
	"./nn.js": 115,
	"./pa-in": 116,
	"./pa-in.js": 116,
	"./pl": 117,
	"./pl.js": 117,
	"./pt": 118,
	"./pt-br": 119,
	"./pt-br.js": 119,
	"./pt.js": 118,
	"./ro": 120,
	"./ro.js": 120,
	"./ru": 121,
	"./ru.js": 121,
	"./sd": 122,
	"./sd.js": 122,
	"./se": 123,
	"./se.js": 123,
	"./si": 124,
	"./si.js": 124,
	"./sk": 125,
	"./sk.js": 125,
	"./sl": 126,
	"./sl.js": 126,
	"./sq": 127,
	"./sq.js": 127,
	"./sr": 128,
	"./sr-cyrl": 129,
	"./sr-cyrl.js": 129,
	"./sr.js": 128,
	"./ss": 130,
	"./ss.js": 130,
	"./sv": 131,
	"./sv.js": 131,
	"./sw": 132,
	"./sw.js": 132,
	"./ta": 133,
	"./ta.js": 133,
	"./te": 134,
	"./te.js": 134,
	"./tet": 135,
	"./tet.js": 135,
	"./th": 136,
	"./th.js": 136,
	"./tl-ph": 137,
	"./tl-ph.js": 137,
	"./tlh": 138,
	"./tlh.js": 138,
	"./tr": 139,
	"./tr.js": 139,
	"./tzl": 140,
	"./tzl.js": 140,
	"./tzm": 141,
	"./tzm-latn": 142,
	"./tzm-latn.js": 142,
	"./tzm.js": 141,
	"./uk": 143,
	"./uk.js": 143,
	"./ur": 144,
	"./ur.js": 144,
	"./uz": 145,
	"./uz-latn": 146,
	"./uz-latn.js": 146,
	"./uz.js": 145,
	"./vi": 147,
	"./vi.js": 147,
	"./x-pseudo": 148,
	"./x-pseudo.js": 148,
	"./yo": 149,
	"./yo.js": 149,
	"./zh-cn": 150,
	"./zh-cn.js": 150,
	"./zh-hk": 151,
	"./zh-hk.js": 151,
	"./zh-tw": 152,
	"./zh-tw.js": 152
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 235;

/***/ })

},[153]);