var libad27 =
webpackJsonplibad27([1],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MoSysBasicsTab__ = __webpack_require__(52);






var startBasicsVueTab = function startBasicsVueTab() {
  new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
    components: { MoSysBasicsTab: __WEBPACK_IMPORTED_MODULE_2__MoSysBasicsTab__["a" /* default */] },
    template: '<MoSysBasicsTab/>',
    el: '#basicCellsContent',
    router: __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */],
    render: function render(h) {
      return h(__WEBPACK_IMPORTED_MODULE_2__MoSysBasicsTab__["a" /* default */]);
    }
  });
};

var initBasicVueTab = function initBasicVueTab() {
  var grid = document.querySelector('#grid');
  grid.addEventListener('currentCellChanged', function ($ev) {
    var gridCell = $ev.detail.cell;
    if (gridCell) {
      __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */].push({
        path: '/cell/' + gridCell.id + '/edit'
      });
    } else {
      __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */].push({
        path: '/'
      });
    }
  });
};

if ('$' in window) {
  $(function () {
    var routerDisabled = false;
    $('#tabs').on('tabsbeforeactivate', function (event, ui) {
      if (ui.oldPanel && ui.oldPanel.get(0).id === 'basicCellsContentContainer') {
        routerDisabled = true;
      }
      if (ui.newPanel && ui.newPanel.get(0).id === 'basicCellsContentContainer') {
        routerDisabled = false;
      }
    });
    __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */].beforeEach(function (to, from, next) {
      if (!routerDisabled) next();
    });
    initBasicVueTab();
    startBasicsVueTab();
  });
} else {
  initBasicVueTab();
  startBasicsVueTab();
}

/***/ }),

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Cells__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_CellEditor__ = __webpack_require__(48);





__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/cell/:id/edit',
    component: __WEBPACK_IMPORTED_MODULE_3__components_CellEditor__["a" /* default */],
    props: true
  }, {
    path: '*',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Cells__["a" /* default */]
  }]
}));

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Cells_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_37bfb63e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Cells_vue__ = __webpack_require__(47);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(15)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Cells_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_37bfb63e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Cells_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Cells.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Cells.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-37bfb63e", Component.options)
  } else {
    hotAPI.reload("data-v-37bfb63e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 15:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      textFilter: '',
      cellProtos: {
        text: {
          title: 'Text cell',
          description: 'A text cell can display text'
        },
        image: {
          title: 'Image cell',
          description: 'An image cell can display an uploaded image'
        },
        html: {
          title: 'HTML cell',
          description: 'A HTML cell can display HTML content'
        },
        video: {
          title: 'Video cell',
          description: 'A video cell can show a video player'
        }
      }
    };
  },

  computed: {
    cellProtosFiltered: function cellProtosFiltered() {
      var _this = this;

      if (this.textFilter && this.textFilter.length > 2) {
        var textFilter = this.textFilter.toLowerCase();
        var testFilter = function testFilter(str) {
          return str.toLowerCase().indexOf(textFilter) >= 0;
        };
        var cellProtosFiltered = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(this.cellProtos).reduce(function (obj, key) {
          var proto = _this.cellProtos[key];
          if (testFilter(key) || testFilter(proto.title) || testFilter(proto.description)) {
            obj[key] = proto;
          }
          return obj;
        }, {});
        return cellProtosFiltered;
      }
      return this.cellProtos;
    }
  },
  methods: {
    onDragStart: function onDragStart($ev) {
      var target = $ev.target;
      var cellType = '';
      target.classList.forEach(function (c) {
        if (c.indexOf('cell-type-') >= 0) {
          cellType = c.replace('cell-type-', '');
        }
      });
      var proto = this.cellProtos[cellType];
      if (proto) {
        var cellData = {
          type: cellType,
          title: proto.title,
          description: proto.description,
          additional_fields: {}
        };
        $ev.dataTransfer.setData('application/json', __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(cellData));
        var img = $ev.target.querySelector('img');
        $ev.dataTransfer.setDragImage(img, 4, 3);
      }
    }
  }
});

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    attrs: {
      "id": "filter"
    }
  }, [_c('label', {
    attrs: {
      "for": "searchBasicCells"
    }
  }, [_vm._v("Filter")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.textFilter),
      expression: "textFilter"
    }],
    attrs: {
      "type": "text",
      "id": "searchBasicCells",
      "placeholder": "Enter title, type or description"
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
  })]), _vm._v(" "), _c('div', {
    staticClass: "protoCells cellTable"
  }, [_vm._l((_vm.cellProtosFiltered), function(cell, type) {
    return [_c('div', {
      class: 'protoCell basicCell row-fluid cell-type-' + type,
      attrs: {
        "draggable": ""
      },
      on: {
        "dragstart": _vm.onDragStart
      }
    }, [_vm._m(0, true), _vm._v(" "), _c('div', {
      staticClass: "span10"
    }, [_c('span', {
      staticClass: "badge label"
    }, [_vm._v(_vm._s(type))]), _vm._v(" "), _c('h5', {
      staticClass: "title contentCellTitle"
    }, [_vm._v(_vm._s(cell.title))]), _vm._v(" "), _c('span', {
      staticClass: "contentCellID"
    }), _vm._v(" "), _c('p', {
      staticClass: "contentCellDescription"
    }, [_vm._v(_vm._s(cell.description))])])])]
  })], 2)])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "contentCellPosterImage span1"
  }, [_c('img', {
    attrs: {
      "src": "http://192.168.99.100:9999/dev-assets/fallback/default.png"
    }
  })])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-37bfb63e", esExports)
  }
}

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CellEditor_vue__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7e78965c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_CellEditor_vue__ = __webpack_require__(51);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(49)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CellEditor_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7e78965c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_CellEditor_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/CellEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CellEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7e78965c", Component.options)
  } else {
    hotAPI.reload("data-v-7e78965c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 49:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['id'],
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._v("\n  " + _vm._s(_vm.id) + "\n")])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7e78965c", esExports)
  }
}

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MoSysBasicsTab_vue__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f70162b_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_MoSysBasicsTab_vue__ = __webpack_require__(55);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(53)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MoSysBasicsTab_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f70162b_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_MoSysBasicsTab_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/MoSysBasicsTab.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MoSysBasicsTab.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7f70162b", Component.options)
  } else {
    hotAPI.reload("data-v-7f70162b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 53:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('router-view')], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7f70162b", esExports)
  }
}

/***/ })

},[10]);