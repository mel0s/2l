(()=>{"use strict";window&&(window._2l=class{constructor(e){try{if(!e)throw new SyntaxError("El codigo fuente no fue creado o asignado al constructor Layout");e=e.trim(),this.programacion=e,this.layoutToken=new class{constructor(e){this.programacion=e,this.registros=[],this.columnas=[],this.tokenColumna=[],this.tablas=[],this.propiedadesCol=new class{constructor(){this.propiedades={}}espacio(e){let t=e.find((e=>/^\^e[^\^]/.test(e)));return t?{espacio:t.substring(2)}:{espacio:" "}}direccion(e){let t=e.find((e=>/^\^d[i|d]$/.test(e)));return"^di"==t?{direccion:"i"}:"^dd"==t?{direccion:"d"}:{direccion:"i"}}tamano(e){let t=e.find((e=>/^\^l[\d]/.test(e)));return t?{tamano:parseFloat(t.substring(2))}:{tamano:0}}obtenerPropiedades(e){return Object.assign(this.propiedades,this.tamano(e),this.espacio(e),this.direccion(e))}},this.columna=new class{constructor(e){this.programacion=e}ciclosCadena(e){if(/^\^c[^\^]/.test(e)){let t=e.match(/^\^c[\d]+/)[0],r=t.length;t?(t=t.substring(2),t=parseInt(t)):t=0;let n=this.texto(e.substring(r));return{nombre:"ciclo",valor:parseFloat(t),cadena:n}}}estructuraCadena(e){let t=e.find((e=>/^\^\$|\$+/.test(e))),r={cadena:[]};if(t){let e=t.substring(t.indexOf("$")+1).split("+^");for(let t=0;t<e.length;t++){let n=e[t],s=this.ciclosCadena(n);if(s){r.cadena.push(s);continue}let o=this.nombreColumna(n);if(o){r.cadena.push(o);continue}let a=this.cadenaLiteral(n);a&&r.cadena.push(a)}}return r}nombreColumna(e){let t=e.match(/^#[^#]+|^\^#[^#]+/);if(t&&(t=t[0],t))return{valor:t.substring(t.indexOf("#")+1),nombre:"columna"}}cadenaLiteral(e){let t=e.match(/[<]{1}[^<|^>]+[>]{1}/);if(t&&(t=t[0],t))return{valor:t.substring(1,t.length-1),nombre:"literal"}}texto(e){return this.nombreColumna(e)||this.cadenaLiteral(e)||""}}(e),this.obtenerArbolToken()}buscarSecciones(){if(this.registros=[...this.programacion.match(/[^\n]*\n*/gm)],0==this.registros.length)throw new SyntaxError("No existen secciones configuradas; El salto de linea indica el final de la configuracion de una seccion  ");return this.registros.forEach(((e,t)=>{e?(e=e.trim(),this.registros.splice(t,1,e)):this.registros.splice(t,1)})),this.registros}obtenerColumnas(){let e=this.registros;for(let t in e){let r=e[t];this.columnas.push(r.split("|"))}}obtenerColumnasToken(){let e=this.columnas;for(let t=0;t<e.length;t++){let r=e[t].slice(1),n=[];for(let e=0;e<r.length;e++){let t=r[e].split(","),s={};Object.assign(s,this.propiedadesCol.obtenerPropiedades(t),this.columna.estructuraCadena(t)),n.push(s)}this.tokenColumna.push(n)}}obtenerNombreTabla(){let e=this.columnas;for(let t=0;t<e.length;t++){let r=e[t];if(r[0]){let e=r[0].match(/[<]{1}[^<\^>]*[>]{1}/gm);e?(e=e[0],this.tablas.push(e.substring(1,e.length-1))):this.tablas.push("###404Columna")}else this.tablas.push("###404Columna")}}obtenerArbolToken(){this.buscarSecciones(),this.obtenerColumnas(),this.obtenerNombreTabla(),this.obtenerColumnasToken()}}(e)}catch(e){throw new SyntaxError(e.message)}}crearCadena(e,t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if("ciclo"===s.nombre){let t=this.obtenerDato(e,s.cadena);for(let e=0;e<s.valor;e++)r+=t}else r+=this.obtenerDato(e,s)}return r}generarLayout(e){let t=this.layoutToken.tablas,r="",n=0;for(let s in t){let o=t[s],a=this.layoutToken.tokenColumna[n],i=e[o];r+=i?this.generarSeccion(i,a):"###404Tabla\n",n++}return r}generarSeccion(e,t){let r="";for(let n=0;n<e.length;n++){let s=e[n];for(let e=0;e<t.length;e++){let n=t[e];r+=this.generarColumna(s,n)}r+="\n"}return r}generarColumna(e,t){let r=t.tamano,n=t.direccion,s=t.espacio,o=this.crearCadena(e,t.cadena),a=o.length;if(0==r)return o;if(a>r)return o.substring(0,r);if("i"==n)for(let e=0;e<r-a;e++)o+=s;else{let e="";for(let t=0;t<r-a;t++)e+=s;o=e+o}return o}obtenerDato(e,t){let r="";if("columna"===t.nombre){r=e[t.valor]||"###404"}else"literal"===t.nombre&&(r=t.valor);return r}})})();