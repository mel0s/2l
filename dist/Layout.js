"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _LayoutToken = _interopRequireDefault(require("./LayoutToken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Layout = /*#__PURE__*/function () {
  /**
   * Inicializa el analisis del codigo fuente.
   * @param {String} cad - Codigo fuente de configuracion 
   */
  function Layout(cad) {
    _classCallCheck(this, Layout);
    try {
      if (cad) {
        // Sin espacios
        cad = cad.trim();
        this.programacion = cad;
        this.layoutToken = new _LayoutToken["default"](cad);
      } else {
        throw new SyntaxError("El codigo fuente no fue creado o asignado al constructor Layout");
      }
    } catch (error) {
      throw new SyntaxError(error.message);
    }
  }

  /**
   * 
   * @param {Array} fila - Datos base del registro del layout
   * @param {Array} tokensCadena - Lista de tokens de la seccion
   * @returns 
   */
  _createClass(Layout, [{
    key: "crearCadena",
    value: function crearCadena(fila, tokensCadena) {
      var cad = "";
      for (var i = 0; i < tokensCadena.length; i++) {
        var item = tokensCadena[i];
        if (item.nombre === "ciclo") {
          var car = this.obtenerDato(fila, item.cadena);
          for (var j = 0; j < item.valor; j++) {
            cad += car;
          }
        } else {
          cad += this.obtenerDato(fila, item);
        }
      }
      return cad;
    }

    /**
     * Genera el texto del layout
     * @param {Object} datos - Coleccion de tablas o colecciones que se son la base del layout a mostrar.
     * @returns {String} - Cadena del layout generado
     */
  }, {
    key: "generarLayout",
    value: function generarLayout(datos) {
      var tablas = this.layoutToken.tablas;
      var cadenaLayout = "";
      var cont = 0;
      for (var i in tablas) {
        var tabla = tablas[i];
        var configuracion = this.layoutToken.tokenColumna[cont];
        var t = datos[tabla];
        if (t) {
          cadenaLayout += this.generarSeccion(t, configuracion);
        } else {
          cadenaLayout += "###404Tabla\n";
        }
        cont++;
      }
      // Layout generado
      return cadenaLayout;
    }

    /**
     * Obtiene la cadena de la seccion.
     * @param {Object} tabla - Datos del layout
     * @param {Object} configuracion - Configuracion del la seccion actual
     * @returns  {String} - Cadena que representa la seccion
     */
  }, {
    key: "generarSeccion",
    value: function generarSeccion(tabla, configuracion) {
      var layoutGenerado = '';
      for (var f = 0; f < tabla.length; f++) {
        var fila = tabla[f];
        for (var conf = 0; conf < configuracion.length; conf++) {
          var item = configuracion[conf];
          layoutGenerado += this.generarColumna(fila, item);
        }
        layoutGenerado += "\n";
      }
      return layoutGenerado;
    }

    /**
     * Obtiene el texto de la columna 
     * @param {Object} fila - Datos base de la fila.
     * @param {Object} tokens  - Configuracion de la fila. 
     * @returns {String} - Cadena que representa la fila
     */
  }, {
    key: "generarColumna",
    value: function generarColumna(fila, tokens) {
      var max = tokens.tamano;
      var direccion = tokens.direccion;
      var car = tokens.espacio;
      var cad = this.crearCadena(fila, tokens.cadena);
      var l = cad.length;

      // La columna no tiene tama;o
      if (max == 0) {
        return cad;
      }
      // La columna es mas grande que el limite
      else if (l > max) {
        return cad.substring(0, max);
      }
      // La oclumna es mas peque;a que el tamaño establecido, entonces se establece orientacion,  y llenado de caracteres
      else {
        if (direccion == 'i') {
          for (var i = 0; i < max - l; i++) {
            cad += car;
          }
        } else {
          var cadIzq = '';
          for (var _i = 0; _i < max - l; _i++) {
            cadIzq += car;
          }
          cad = cadIzq + cad;
        }
        return cad;
      }
    }

    /**
     * Obtiene el dato real de un token.
     * @param {Object} fila - Datos base.
     * @param {Object} item  - Configuracion del token.
     * @returns {String} - Datos real de un token
     */
  }, {
    key: "obtenerDato",
    value: function obtenerDato(fila, item) {
      var cad = '';
      if (item.nombre === "columna") {
        var dato = fila[item.valor];
        if (dato) {
          cad = dato;
        } else {
          cad = '###404';
        }
      } else if (item.nombre === "literal") {
        cad = item.valor;
      }
      return cad;
    }
  }]);
  return Layout;
}();
var _default = exports["default"] = Layout;