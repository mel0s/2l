//
import Propiedades from './Propiedades';
import Columna from './Columna';
import TablaSecciones from './TablaSecciones';

/**
 *  Genera el proceso de analisis del codigo layout.
 */
class LayoutToken {


  /**
   * Inicializa el proceso de analisis del codigo de configuracion.
   * @param {String} cad - Codigo de configuracion.
   */
  constructor(cad) {
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
    this.propiedadesCol = new Propiedades();
    // Datos con la configuracion de las secciones
    this.propiedadesSecciones = [];
    // Datos de la columna.
    this.columna = new Columna(cad);


    this.obtenerArbolToken();
  }


  /**
   * Obtiene las seccion configuradas en el codigo fuente. 
   * @returns {Object}- Secciones
   */
  buscarSecciones() {
    this.registros = [...this.programacion.match(/[^\n]*\n*/mg)];


    if(this.registros.length == 0 ){
      throw new SyntaxError("No existen secciones configuradas; El salto de linea indica el final de la configuracion de una seccion.");
    }    

    this.registros.forEach((e, i) => {
      if (e) {
        e = e.trim();
        this.registros.splice(i, 1, e);
      }
      else{
        this.registros.splice(i, 1);
      }
    });

    return this.registros;
  }

  /**
   * Obtiene las columnas configuradas.
   */
  obtenerColumnas() {
    let registros = this.registros;
    for (let i in registros) {
      let registro = registros[i];
      this.columnas.push(registro.split("|"));
    }
  }

  /**
   * Obtiene la configuracion de las  columnas del layout configuradas.
   */
  obtenerColumnasToken() {
    let columnas = this.columnas;
    for (let i = 0; i < columnas.length; i++) {
      let reg = columnas[i];
      let a = reg.slice(1);
      let col = [];

      for (let j = 0; j < a.length; j++) {
        let item = a[j];
        let tokens = item.split(',');
        let arbolToken = {};

        Object.assign(arbolToken, this.propiedadesCol.obtenerPropiedades(tokens), this.columna.estructuraCadena(tokens));

        col.push(arbolToken);
      }

      this.tokenColumna.push(col);
    }
  }

  /**
   * Obtiene el nombre de la tablas configuradas.
   */
  obtenerNombreTabla() {
    let columnas = this.columnas;

    for (let i = 0; i < columnas.length; i++) {
      let columna = columnas[i];

      if (columna[0]) {

        let tokenSeccionTabla = TablaSecciones.obtenerTokenTabla(columna[0]);

        let nombreTablaSeccion = TablaSecciones.obtenerNombreTablaYSeccion(tokenSeccionTabla);

        if (nombreTablaSeccion.tabla) {
          this.propiedadesSecciones.push(nombreTablaSeccion);
          this.tablas.push(nombreTablaSeccion.tabla);
        }
        else {
          this.tablas.push('###404Columna');
        }
      }
      else {
        this.tablas.push('###404Columna');
      }
    }

  }


  /** 
   * Busca la configuracion del codigo fuente.
   */
  obtenerArbolToken() {
    // Busca las secciones del layout
    this.buscarSecciones();
    // Obtiene las columnas de cada uno de los registros.
    this.obtenerColumnas();
    // Obtiene los nombres de las tablas configuradas
    this.obtenerNombreTabla();
    // Obtiene la configuracion de cada una de las columnas
    this.obtenerColumnasToken();
  }


}

export default  LayoutToken;