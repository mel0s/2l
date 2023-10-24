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
 * Contiene los metodos para obtener la informacion de una columna.
 */
var Columna = /*#__PURE__*/function () {
  /**
   * Constructor con el string de configuracion
   * @param {String} - Codigo de confiduracion
   */
  function Columna(cad) {
    _classCallCheck(this, Columna);
    this.programacion = cad;
  }

  /**
   * Determina si el token es de tipo ciclo.
   * @param {String} token 
   * @returns  Datos de configuracion del token ciclos.
   */
  _createClass(Columna, [{
    key: "ciclosCadena",
    value: function ciclosCadena(token) {
      if (/^\^c[^\^]/.test(token)) {
        var repeticiones = token.match(/^\^c[\d]+/)[0];
        var l = repeticiones.length;
        if (repeticiones) {
          repeticiones = repeticiones.substring(2);
          repeticiones = parseInt(repeticiones);
        } else {
          repeticiones = 0;
        }
        var cadena = this.texto(token.substring(l));
        return {
          nombre: "ciclo",
          valor: parseFloat(repeticiones),
          cadena: cadena
        };
      } else {
        return;
      }
    }

    /**
     * Obtiene la configuracion de un token cadena.
     * @param {Array} tokens - Tokens de la columna 
     * @returns {Object} - Configuracion recolectada de una token cadena
     */
  }, {
    key: "estructuraCadena",
    value: function estructuraCadena(tokens) {
      var t = tokens.find(function (e) {
        return /^\^\$|\$+/.test(e);
      });
      var arbolToken = {
        cadena: []
      };
      if (t) {
        var lemas = t.substring(t.indexOf("$") + 1).split('+^');
        for (var i = 0; i < lemas.length; i++) {
          var lema = lemas[i];
          var ciclos = this.ciclosCadena(lema);
          if (ciclos) {
            arbolToken.cadena.push(ciclos);
            continue;
          }
          var nombreColumna = this.nombreColumna(lema);
          if (nombreColumna) {
            arbolToken.cadena.push(nombreColumna);
            continue;
          }
          var cadenaLiteral = this.cadenaLiteral(lema);
          if (cadenaLiteral) {
            arbolToken.cadena.push(cadenaLiteral);
            continue;
          }
        }
      }
      return arbolToken;
    }

    /**
     * Determina si el token es una columna de una tabla.
     * @param {String} token - Token a analizar.
     * @returns {Object} - Datos de configuracion del token columna
     */
  }, {
    key: "nombreColumna",
    value: function nombreColumna(token) {
      var t = token.match(/^#[^#]+|^\^#[^#]+/);
      if (t) {
        t = t[0];
        if (t) {
          var cadena = t.substring(t.indexOf("#") + 1);
          return {
            valor: cadena,
            nombre: "columna"
          };
        } else {
          return;
        }
      } else {
        return;
      }
    }

    /**
     * Determina si el token es del tipo literal
     * @param {String} token - Token literal
     * @returns Datos de configuracion del token literlal.
     */
  }, {
    key: "cadenaLiteral",
    value: function cadenaLiteral(token) {
      var t = token.match(/[<]{1}[^<|^>]+[>]{1}/);
      if (t) {
        t = t[0];
        if (t) {
          var cadena = t.substring(1, t.length - 1);
          return {
            valor: cadena,
            nombre: "literal"
          };
        } else {
          return;
        }
      } else {
        return;
      }
    }

    /**
     * Analiza el token y determina de que tipo es. 
     * @param {String} token - Token
     * @returns {Object} - Configuraciondel token analizado
     */
  }, {
    key: "texto",
    value: function texto(token) {
      var nombreColumna = this.nombreColumna(token);
      if (nombreColumna) {
        return nombreColumna;
      }
      var cadenaLiteral = this.cadenaLiteral(token);
      if (cadenaLiteral) {
        return cadenaLiteral;
      }
      return '';
    }
  }]);
  return Columna;
}();
var _default = exports["default"] = Columna;