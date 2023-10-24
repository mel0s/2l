"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Propiedades = _interopRequireDefault(require("./Propiedades"));
var _Columna = _interopRequireDefault(require("./Columna"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } //
/**
 *  Genera el proceso de analisis del codigo layout.
 */
var LayoutToken = /*#__PURE__*/function () {
  /**
   * Inicializa el proceso de analisis del codigo de configuracion.
   * @param {String} cad - Codigo de configuracion.
   */
  function LayoutToken(cad) {
    _classCallCheck(this, LayoutToken);
    // Codigo de configuracion
    this.programacion = cad;
    // Partes del layout.
    this.registros = [];
    // Columnas encontradas en la configuracion del layout.
    this.columnas = [];
    // Partes de la columna.
    this.tokenColumna = [];
    // Nombre de las tablas, configuradas.
    this.tablas = [];
    // Obtiene las propiedades de configuiracion de una columna.
    this.propiedadesCol = new _Propiedades["default"]();

    // Datos de la columna.
    this.columna = new _Columna["default"](cad);
    this.obtenerArbolToken();
  }

  /**
   * Obtiene las seccion configuradas en el codigo fuente. 
   * @returns {Object}- Secciones
   */
  _createClass(LayoutToken, [{
    key: "buscarSecciones",
    value: function buscarSecciones() {
      var _this = this;
      this.registros = _toConsumableArray(this.programacion.match(/[^\n]*\n*/mg));
      if (this.registros.length == 0) {
        throw new SyntaxError("No existen secciones configuradas; El salto de linea indica el final de la configuracion de una seccion  ");
        return;
      }
      this.registros.forEach(function (e, i) {
        if (e) {
          e = e.trim();
          _this.registros.splice(i, 1, e);
        } else {
          _this.registros.splice(i, 1);
        }
      });
      return this.registros;
    }

    /**
     * Obtiene las columnas configuradas.
     */
  }, {
    key: "obtenerColumnas",
    value: function obtenerColumnas() {
      var registros = this.registros;
      for (var i in registros) {
        var registro = registros[i];
        this.columnas.push(registro.split("|"));
      }
    }

    /**
     * Obtiene la configuracion de las  columnas del layout configuradas.
     */
  }, {
    key: "obtenerColumnasToken",
    value: function obtenerColumnasToken() {
      var columnas = this.columnas;
      for (var i = 0; i < columnas.length; i++) {
        var reg = columnas[i];
        var a = reg.slice(1);
        var col = [];
        for (var j = 0; j < a.length; j++) {
          var item = a[j];
          var tokens = item.split(',');
          var arbolToken = {};
          Object.assign(arbolToken, this.propiedadesCol.obtenerPropiedades(tokens), this.columna.estructuraCadena(tokens));
          col.push(arbolToken);
        }
        this.tokenColumna.push(col);
      }
    }

    /**
     * Obtiene el nombre de la tablas configuradas.
     */
  }, {
    key: "obtenerNombreTabla",
    value: function obtenerNombreTabla() {
      var columnas = this.columnas;
      for (var i = 0; i < columnas.length; i++) {
        var columna = columnas[i];
        if (columna[0]) {
          var con = columna[0].match(/[<]{1}[^<\^>]*[>]{1}/gm);
          if (con) {
            con = con[0];
            this.tablas.push(con.substring(1, con.length - 1));
          } else {
            this.tablas.push('###404Columna');
          }
        } else {
          this.tablas.push('###404Columna');
        }
      }
    }

    /** 
     * Busca la configuracion del codigo fuente.
     */
  }, {
    key: "obtenerArbolToken",
    value: function obtenerArbolToken() {
      // Busca las secciones del layout
      this.buscarSecciones();
      // Obtiene las columnas de cada uno de los registros.
      this.obtenerColumnas();
      // Obtiene los nombres de las tablas configuradas
      this.obtenerNombreTabla();
      // Obtiene la configuracion de cada una de las columnas
      this.obtenerColumnasToken();
    }
  }]);
  return LayoutToken;
}();
var _default = exports["default"] = LayoutToken;