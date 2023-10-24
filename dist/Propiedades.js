"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Propiedades de una columna
 */
var Propiedades = /*#__PURE__*/function () {
  function Propiedades() {
    _classCallCheck(this, Propiedades);
    // Coleccion de propiedades de una columna.
    this.propiedades = {};
  }

  /**
   * 
   * @param {Array} tokens - Lista de tokens de configuracion de una columna.
   * @returns - Configuracion de llenado por si el tamaño de la columna es mas grande que el contenido
   */
  _createClass(Propiedades, [{
    key: "espacio",
    value: function espacio(tokens) {
      var t = tokens.find(function (e) {
        return /^\^e[^\^]/.test(e);
      });
      if (t) {
        return {
          espacio: t.substring(2)
        };
      } else {
        return {
          espacio: ' '
        };
      }
    }

    /**
     * Obtiene la orientacion de la columna/
     * @param {Array} tokens - Lista de tokens de configuracion de una columna.
     * @returns {Object} - Configuracion de orientacion.
     */
  }, {
    key: "direccion",
    value: function direccion(tokens) {
      var t = tokens.find(function (e) {
        return /^\^d[i|d]$/.test(e);
      });
      if (t == "^di") {
        return {
          direccion: 'i'
        };
      } else if (t == "^dd") {
        return {
          direccion: 'd'
        };
      } else {
        return {
          direccion: 'i'
        };
      }
    }

    /**
     * Obtiene el tamaño de la columna
     * @param {Array} tokens  - Coleccion de propiedades de la columnas configurada
     * @returns Indica el tama;o de la columna
     */
  }, {
    key: "tamano",
    value: function tamano(tokens) {
      var t = tokens.find(function (e) {
        return /^\^l[\d]/.test(e);
      });
      if (t) {
        return {
          tamano: parseFloat(t.substring(2))
        };
      } else {
        return {
          tamano: 0
        };
      }
    }

    /**
     * Ejecuta el analasis de configuracion de las propiedades de una columna
     * @param {Array} tokens - Tokens de la columna
     * @returns {Obejct} - Propiedades de la columna.
     */
  }, {
    key: "obtenerPropiedades",
    value: function obtenerPropiedades(tokens) {
      return Object.assign(this.propiedades, this.tamano(tokens), this.espacio(tokens), this.direccion(tokens));
    }
  }]);
  return Propiedades;
}();
var _default = exports["default"] = Propiedades;