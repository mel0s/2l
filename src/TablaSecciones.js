/**
 * Clase para control de propiedades tablaSecciones
 */
class TablaSecciones{

    static obtenerTokenTabla(cad){

        let resultado = cad.match(/[<]{1}[^<\^>]*[>]{1}/gm);

        return resultado[0];

    }

    static obtenerNombreSeccion(cad, item){

        const  resultado =  cad.match(/(?<=\w:)\w+/);
        let nombre  = resultado[0];

        if(nombre){

            return nombre;
        }
        else{

            return "Seccion" + item;
        }
    }

    static obtenerNombreTabla(cad){

        const resultado =  cad.match(/(\w)+(?=\:\w)/)

        let nombre = resultado[0];

        if(nombre){
            return nombre;
        }
        else{
            return cad;
        }
    }

    static obtenerNombreTablaYSeccion(cad, item){

        return {
            nombreSeccion: TablaSecciones.obtenerNombreSeccion(cad, item),
            tabla: TablaSecciones.obtenerNombreTabla(cad)
        }

    }
}

export default TablaSecciones;