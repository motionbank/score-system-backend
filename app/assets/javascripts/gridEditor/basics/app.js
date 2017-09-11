var lib117a26 =
webpackJsonplib117a26([1],{

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_wysiwyg__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_wysiwyg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_wysiwyg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MoSysBasicsTab__ = __webpack_require__(90);







__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_2_vue_wysiwyg___default.a, {
  hideModules: {
    image: true
  }
});

var startBasicsVueTab = function startBasicsVueTab() {
  new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
    components: {
      MoSysBasicsTab: __WEBPACK_IMPORTED_MODULE_3__MoSysBasicsTab__["a" /* default */]
    },
    template: '<MoSysBasicsTab/>',
    el: '#basicCellsContent',
    router: __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */],
    render: function render(h) {
      return h(__WEBPACK_IMPORTED_MODULE_3__MoSysBasicsTab__["a" /* default */]);
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
    var routerDisabled = true;
    var handleTabEvents = function handleTabEvents(event, ui) {
      if (ui.oldPanel && ui.oldPanel.get(0).id === 'basicCellsContentContainer') {
        routerDisabled = true;
      }
      var panel = ui.newPanel || ui.panel;
      if (panel && panel.get(0).id === 'basicCellsContentContainer') {
        routerDisabled = false;
        if ('theGrid' in window) {
          if (__WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */].currentRoute.params.id) {
            var cell = theGrid.getCellById(__WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */].currentRoute.params.id);
            if (!cell) __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */].push('/');
          } else if (currentCellToEdit) {
            __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */].push('/cell/' + currentCellToEdit.id + '/edit');
          }
        }
      }
      if (ui.panel) __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */].push('/');
    };
    $('#tabs').on('tabscreate', handleTabEvents).on('tabsbeforeactivate', handleTabEvents);
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

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Cells__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_CellEditor__ = __webpack_require__(62);





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

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Cells_vue__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_37bfb63e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Cells_vue__ = __webpack_require__(61);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(27)
}
var normalizeComponent = __webpack_require__(4)
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

/***/ 27:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys__);





/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      textFilter: '',
      cellProtos: {
        title: {
          title: 'Title cell',
          description: 'A title cell can display a large title'
        },
        text: {
          title: 'Text cell',
          description: 'A text cell can display text'
        },
        image: {
          title: 'Image cell',
          description: 'An image cell can display an uploaded image'
        },
        set_link: {
          title: 'Set link cell',
          description: 'A set link cell creates a link to go to (open) another set'
        },

        html: {
          title: 'HTML cell',
          description: 'A HTML cell can display HTML content'
        },

        iframe: {
          title: 'Iframe cell',
          description: 'Load and show external content (YouTube, etc.)'
        }
      }
    };
  },

  computed: {
    cellProtosFiltered: function cellProtosFiltered() {
      var _this = this;

      if (this.textFilter && this.textFilter.length >= 2) {
        var textFilter = this.textFilter.toLowerCase();
        var testFilter = function testFilter(str) {
          return str.toLowerCase().indexOf(textFilter) >= 0;
        };
        var cellProtosFiltered = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default()(this.cellProtos).reduce(function (obj, key) {
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
        var additionalFields = {
          'created-on': Date.now(),

          'created-by': APPLICATION.user.id
        };
        if (cellType === 'iframe') {
          additionalFields = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, additionalFields, {
            'iframe-src': 'https://www.youtube.com/embed/t2ByLmLnYJ8',
            'attr-allowfullscreen': '1',
            'autoload': '0 / 1',
            'class': 'click-through / show-info / hide-info',
            'css-z-index': '100 (a number >= 0)',
            'stick': '0 / 1',
            'solo': '0 / false',
            '?': 'https://github.com/motionbank/score-system-frontend/wiki/Basic-Concepts-Review'
          });
        } else if (cellType === 'html') {
          additionalFields = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, additionalFields, {
            'html-copntent': '<h1>A headline</h1><p>And a paragraph with a <a href="#">link</a>.</p>',
            '?': 'https://github.com/motionbank/score-system-frontend/wiki/Basic-Concepts-Review'
          });
        }
        var cellData = {
          type: cellType,
          title: proto.title,
          description: proto.description,
          additional_fields: additionalFields
        };
        $ev.dataTransfer.setData('application/json', __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(cellData));
        var img = $ev.target.querySelector('img');
        $ev.dataTransfer.setDragImage(img, 4, 3);
      }
    }
  }
});

/***/ }),

/***/ 61:
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
      "src": "/dev-assets/fallback/default.png"
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

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CellEditor_vue__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7e78965c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_CellEditor_vue__ = __webpack_require__(88);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(63)
}
var normalizeComponent = __webpack_require__(4)
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

/***/ 63:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_input_tag__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_input_tag___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_input_tag__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_form_data__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_form_data___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_form_data__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_simple_spinner__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_simple_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_vue_simple_spinner__);









var COLLAPSED = false,
    OPEN = true;


var cleanTag = function cleanTag(tag) {
  tag = tag.replace(/[ ]+/ig, ' ');

  tag = tag.replace(/[^-\u00C0-\u017Fa-z0-9._ ]/ig, '-');

  tag = tag.replace(/([ ]*[-]+[ ]*)+/ig, '-');

  tag = tag.replace(/^[^\u00C0-\u017Fa-z0-9]+/ig, '');

  tag = tag.replace(/[^\u00C0-\u017Fa-z0-9]+$/ig, '');
  return tag;
};

/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['id'],
  data: function data() {
    return {
      showDebug: true,
      showSaveSpinner: false,
      collapsibles: {
        default: OPEN,
        iframe: OPEN,
        html: OPEN,
        set_link: OPEN,
        debug: COLLAPSED
      },
      cell: null,
      cellTags: [],
      sets: [],
      htmlContent: '<h1>Hello!</h1><p>This is a paragraph</p>'
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.updateCell();

    var setsPath = Routes.sets_api_path(APPLICATION.score_id) + '.json';

    __WEBPACK_IMPORTED_MODULE_3_axios___default.a.get(setsPath).then(function (response) {
      if (response.data && response.data.length) {
        _this.sets = response.data;
      }
    }).catch(function (err) {
      console.log('Getting sets caused err', err);
    });
  },

  watch: {
    id: function id() {
      this.updateCell();
    },
    htmlContent: function htmlContent() {
      if (this.cell && this.cell.type === 'html') {
        this.cell.additional_fields['html-content'] = this.htmlContent;
      }
    }
  },
  computed: {
    cellPosterImageSrc: function cellPosterImageSrc() {
      if (this.cell) {
        if (this.cell.poster_image && this.cell.poster_image.medium) {
          return this.cell.poster_image.medium.url;
        } else if (this.cell.src) {
          return this.cell.src.replace(/\/small\//, '/medium/');
        } else if (this.cell.canonicalCell.poster_image && this.cell.canonicalCell.poster_image.medium) {
          return this.cell.canonicalCell.poster_image.medium.url;
        }
      }
      return '';
    },
    cellPosterSmallImageSrc: function cellPosterSmallImageSrc() {
      if (this.cellPosterImageSrc) {
        return this.cellPosterImageSrc.replace(/\/medium\//, '/small/');
      }
      return '';
    }
  },
  methods: {
    updateCell: function updateCell() {
      var theGrid = window['theGrid'];
      if (theGrid) {
        this.cell = theGrid.getCellById(this.id);
        if (this.cell) {
          var tags = this.cell.additional_fields.tags || this.cell.canonicalCell.additional_fields.tags || '';
          tags = tags.split(/[\s]*,[\s]*/);
          tags = tags.filter(function (t) {
            return cleanTag(t).length > 0;
          });
          tags.sort();
          this.cellTags = tags;
          this.htmlContent = '';
          if (this.cell.type === 'html') {
            this.htmlContent = this.cell.additional_fields['html-content'] || this.cell.canonicalCell.additional_fields['html-content'];

            window['$']('.html-editor button').attr('type', 'button');
          }
        }
      }
    },
    saveCell: function saveCell() {
      var _this2 = this;

      var posterImageInput = document.querySelector('#img-file-input');
      var data = new __WEBPACK_IMPORTED_MODULE_4_form_data___default.a();
      data.append('grid_cell[title]', this.cell.title || this.cell.canonicalCell.title);
      data.append('grid_cell[description]', this.cell.description || this.cell.canonicalCell.description);
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(this.cell.canonicalCell.additional_fields).map(function (k) {
        var val = _this2.cell.canonicalCell.additional_fields[k];
        data.append('grid_cell[additional_fields][][key]', k);
        data.append('grid_cell[additional_fields][][value]', val);
      });
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(this.cell.additional_fields).map(function (k) {
        var val = _this2.cell.additional_fields[k];
        data.append('grid_cell[additional_fields][][key]', k);
        data.append('grid_cell[additional_fields][][value]', val);
      });
      if (posterImageInput && posterImageInput.files.length > 0) {
        data.append('grid_cell[poster_image]', posterImageInput.files[0]);
      }
      var csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
      this.showSaveSpinner = true;
      __WEBPACK_IMPORTED_MODULE_3_axios___default.a.request({
        method: 'PUT',

        url: Routes.cell_set_grid_cell_path(APPLICATION.score_id, APPLICATION.resource_id, this.cell.id),

        data: data,
        headers: {
          'Accept': '*/*',
          'X-CSRF-Token': csrfToken,
          'X-Requested-With': 'XMLHttpRequest'
        }
      }).then(function (response) {
        var theGrid = window['theGrid'];
        if (theGrid) {
          var gridCell = theGrid.getCellById(_this2.id);
          gridCell.updateData(response.data);
          gridCell.updateGridCell();
          gridCell.updateContentCell();
        }


        _this2.showSaveSpinner = false;
      }).catch(function (err) {
        console.log(err);

        _this2.showSaveSpinner = false;
      });
    },
    collapse: function collapse(panel) {
      __WEBPACK_IMPORTED_MODULE_1_vue__["a" /* default */].set(this.collapsibles, panel, !this.collapsibles[panel]);
    },
    cellTagsChanged: function cellTagsChanged(tags) {
      tags = tags.map(function (t) {
        return cleanTag(t);
      }).filter(function (t) {
        return t.length > 0;
      });
      this.cellTags = tags;
      this.cell.additional_fields.tags = this.cellTags.join(',');
    },
    updateSetLinkId: function updateSetLinkId(evt) {
      this.cell.additional_fields['set-id'] = evt.target.value;
    }
  },
  components: {
    InputTag: __WEBPACK_IMPORTED_MODULE_2_vue_input_tag___default.a,
    Spinner: __WEBPACK_IMPORTED_MODULE_5_vue_simple_spinner___default.a
  }
});

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.cell) ? [_c('div', {
    staticClass: "header"
  }, [_c('span', {
    staticClass: "poster-image-small"
  }, [_c('img', {
    staticStyle: {
      "max-width": "120px",
      "max-height": "80px"
    },
    attrs: {
      "src": _vm.cellPosterSmallImageSrc
    }
  })]), _vm._v(" "), _c('span', {
    staticClass: "type-name"
  }, [_c('span', {
    staticClass: "badge"
  }, [_vm._v(_vm._s(_vm.cell.type))])]), _vm._v(" "), _c('div', {
    staticClass: "title"
  }, [_c('h3', [_vm._v(_vm._s(_vm.cell.title || _vm.cell.canonicalCell.title))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.cell.description || _vm.cell.canonicalCell.description))])]), _vm._v(" "), _c('small', {
    staticClass: "id"
  }, [_vm._v(_vm._s(_vm.cell.id))]), _vm._v(" "), _c('div', {
    staticClass: "submit"
  }, [(_vm.showSaveSpinner) ? _c('Spinner', {
    staticClass: "spinner",
    attrs: {
      "size": "16",
      "line-fg-color": "#9bb0a5",
      "line-size": "7"
    }
  }) : _vm._e(), _vm._v(" "), _c('input', {
    staticClass: "btn",
    attrs: {
      "type": "submit",
      "value": "Save"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.saveCell($event)
      }
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "collapsible default-settings"
  }, [_c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.collapse('default')
      }
    }
  }, [_c('h3', [_vm._v("Basic Cell Attributes")]), _vm._v(" "), _c('p', [_vm._v("Title, Description, Tags, Posterimage")])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "collapse-content"
    }
  }, [(_vm.collapsibles['default']) ? _c('div', {
    staticClass: "content"
  }, [_c('div', {
    staticClass: "poster-image"
  }, [_c('img', {
    attrs: {
      "src": _vm.cellPosterImageSrc,
      "alt": "Cell Posterimage"
    }
  }), _vm._v(" "), _c('input', {
    attrs: {
      "type": "file",
      "id": "img-file-input"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "title-etc"
  }, [_c('div', {
    staticClass: "title"
  }, [_c('label', {
    attrs: {
      "for": "cell-title-input"
    }
  }, [_vm._v("Title")]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "text",
      "id": "cell-title-input",
      "title": "Edit cell title"
    },
    domProps: {
      "value": (_vm.cell.title || _vm.cell.canonicalCell.title)
    },
    on: {
      "input": function($event) {
        _vm.cell.title = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "description"
  }, [_c('label', {
    attrs: {
      "for": "cell-description-input"
    }
  }, [_vm._v("Description")]), _vm._v(" "), _c('textarea', {
    attrs: {
      "title": "Edit cell description",
      "id": "cell-description-input",
      "type": "text"
    },
    on: {
      "input": function($event) {
        _vm.cell.description = $event.target.value
      }
    }
  }, [_vm._v(_vm._s(_vm.cell.description || _vm.cell.canonicalCell.description))])]), _vm._v(" "), _c('div', {
    staticClass: "tags"
  }, [_c('label', [_vm._v("Tags")]), _vm._v(" "), _c('input-tag', {
    attrs: {
      "on-change": _vm.cellTagsChanged,
      "tags": _vm.cellTags
    }
  })], 1)])]) : _vm._e()])], 1), _vm._v(" "), (_vm.cell.type === 'html') ? [_c('div', {
    staticClass: "collapsible iframe-settings"
  }, [_c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.collapse('html')
      }
    }
  }, [_c('h3', [_vm._v("HTML Settings")])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "collapse-content"
    }
  }, [(_vm.collapsibles['html']) ? _c('div', {
    staticClass: "content"
  }, [_c('wysiwyg', {
    staticClass: "html-editor",
    model: {
      value: (_vm.htmlContent),
      callback: function($$v) {
        _vm.htmlContent = $$v
      },
      expression: "htmlContent"
    }
  })], 1) : _vm._e()])], 1)] : _vm._e(), _vm._v(" "), (_vm.cell.type === 'iframe') ? [_c('div', {
    staticClass: "collapsible iframe-settings"
  }, [_c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.collapse('iframe')
      }
    }
  }, [_c('h3', [_vm._v("Iframe Settings")])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "collapse-content"
    }
  }, [(_vm.collapsibles['iframe']) ? _c('div', {
    staticClass: "content"
  }, [_c('div', [_c('label', {
    attrs: {
      "for": "iframe-src-input"
    }
  }, [_vm._v("Source URL")]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "url",
      "title": "Enter / edit an IFrame URL here",
      "id": "iframe-src-input"
    },
    domProps: {
      "value": (_vm.cell.additional_fields['iframe-src'] || _vm.cell.canonicalCell.additional_fields['iframe-src'])
    },
    on: {
      "input": function($event) {
        _vm.cell.additional_fields['iframe-src'] = $event.target.value
      }
    }
  })])]) : _vm._e()])], 1)] : _vm._e(), _vm._v(" "), (_vm.cell.type === 'set_link') ? [_c('div', {
    staticClass: "collapsible iframe-settings"
  }, [_c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.collapse('set_link')
      }
    }
  }, [_c('h3', [_vm._v("Link Settings")])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "collapse-content"
    }
  }, [(_vm.collapsibles['set_link']) ? _c('div', {
    staticClass: "content"
  }, [_c('div', [_c('label', {
    attrs: {
      "for": "set-link-select"
    }
  }, [_vm._v("Select a target set to link to from this cell")]), _vm._v(" "), _c('select', {
    staticClass: "set-link",
    attrs: {
      "name": "set-link-select",
      "id": "set-link-select"
    },
    on: {
      "input": _vm.updateSetLinkId
    }
  }, _vm._l((_vm.sets), function(set) {
    return _c('option', {
      domProps: {
        "value": set.id,
        "selected": set.id === (_vm.cell.additional_fields['set-id'] || _vm.cell.canonicalCell.additional_fields['set-id'])
      }
    }, [_vm._v(_vm._s(set.title))])
  }))])]) : _vm._e()])], 1)] : _vm._e(), _vm._v(" "), (_vm.showDebug) ? [_c('div', {
    staticClass: "collapsible"
  }, [_c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.collapse('debug')
      }
    }
  }, [_c('h3', [_vm._v("Debug")])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "collapse-content"
    }
  }, [(_vm.collapsibles['debug']) ? _c('div', {
    staticClass: "content"
  }, [_c('pre', [_c('code', [_vm._v("\n            " + _vm._s(_vm.cell) + "\n            ")])])]) : _vm._e()])], 1)] : _vm._e()] : [_c('h3', [_vm._v("No cell found with id " + _vm._s(_vm.id) + "!")])]], 2)
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

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MoSysBasicsTab_vue__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f70162b_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_MoSysBasicsTab_vue__ = __webpack_require__(93);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(91)
}
var normalizeComponent = __webpack_require__(4)
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

/***/ 91:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ 93:
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

},[22]);