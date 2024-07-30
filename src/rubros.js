export const srubrosAccesorios = [
   { id: 102, nombre: 'Acrilico' },
   { id: 68, nombre: 'Antipánico' },
   { id: 86, nombre: 'Baranda' },
   { id: 71, nombre: 'Bisagra' },
   { id: 55, nombre: 'Burlete' },
   { id: 63, nombre: 'Cerradura' },
   { id: 87, nombre: 'Cielorraso' },
   { id: 91, nombre: 'Cierra puerta' },
   { id: 70, nombre: 'Cierre' },
   { id: 64, nombre: 'Compensador' },
   { id: 49, nombre: 'Complemento' },
   { id: 9, nombre: 'Cortina' },
   { id: 14, nombre: 'Escuadra' },
   { id: 42, nombre: 'Felpa' },
   { id: 88, nombre: 'Frente integral' },
   { id: 61, nombre: 'Herraje corredizo' },
   { id: 73, nombre: 'Manija' },
   { id: 12, nombre: 'Movimiento' },
   { id: 62, nombre: 'Pasador' },
   { id: 45, nombre: 'Remache' },
   { id: 54, nombre: 'Rodamiento' },
   { id: 60, nombre: 'Sellador' },
   { id: 90, nombre: 'Tapon/tope' },
   { id: 41, nombre: 'Tornillo' },
   { id: 57, nombre: 'Vidriería' },
]

const srubrosAutomatismos = [
   { id: 85, nombre: 'Central' },
   { id: 44, nombre: 'Control' },
   { id: 84, nombre: 'Motor' },
   { id: 56, nombre: 'Tecla' },
]

export const srubrosChapas = [
   { id: 65, nombre: 'Lisa' },
]

const srubrosHerramientas = [
   { id: 67, nombre: 'Carpintería' },
   { id: 57, nombre: 'Vidriería' },
]

const srubrosPaneles = [
   { id: 65, nombre: 'Liso' },
   { id: 52, nombre: 'Moldurado' },
   { id: 92, nombre: 'Ranurado' },
]

const srubrosPolicarbonatos = [
   { id: 69, nombre: 'Alveolar' },
   { id: 66, nombre: 'Compacto' }
]

const srubrosPoliestirenos = [
   { id: 35, nombre: 'Grabado' },
   { id: 65, nombre: 'Liso' },
]

const srubrosPuertasPlacas = [
   { id: 31, nombre: 'Hoja sola' },
   { id: 72, nombre: 'Marco de luminio' },
   { id: 89, nombre: 'Puerta embutir' },
]

const srubrosTejidosMosquiteros = [
   { id: 43, nombre: 'Aluminio' },
   { id: 36, nombre: 'Fibra' },
]

export const srubrosPerfiles = [
   { id: 22, nombre: 'Ángulo' },
   { id: 86, nombre: 'Baranda' },
   { id: 49, nombre: 'Complemento' },
   { id: 50, nombre: 'Contravidrio' },
   { id: 9, nombre: 'Cortina' },
   { id: 14, nombre: 'Escuadra' },
   { id: 88, nombre: 'Frente integral' },
   { id: 29, nombre: 'Guillotina' },
   { id: 4, nombre: 'Hoja' },
   { id: 3, nombre: 'Mampara' },
   { id: 1, nombre: 'Marco corrediza' },
   { id: 7, nombre: 'Marco de abrir/Paño fijo' },
   { id: 5, nombre: 'Mosquitero' },
   { id: 13, nombre: 'Parasol' },
   { id: 17, nombre: 'Perfil de acople' },
   { id: 21, nombre: 'Perfil techo' },
   { id: 24, nombre: 'Placard' },
   { id: 27, nombre: 'Premarco' },
   { id: 16, nombre: 'Revestimientos' },
   { id: 33, nombre: 'T' },
   { id: 18, nombre: 'Tabique' },
   { id: 15, nombre: 'Tapajunta' },
   { id: 32, nombre: 'Tubo' },
   { id: 19, nombre: 'U' },
   { id: 20, nombre: 'Vidrio repartido' },
]

export const rubrosProcesos = [
   { nombre: 'Anodizados', items: [88] },
   { nombre: 'Pinturas', items: [67, 78, 3, 73] },
]

export const marcasPerfiles = [ //Los universales se agregan en cada marca que queremos que aparezcan
   { nombre: 'HERRERO', items: [1, 72, 144, 145] },
   { nombre: 'MODENA', items: [2, 108, 144, 145] },
   { nombre: 'A30', items: [65, 114, 144, 145] },
   { nombre: 'HERRERO ECO', items: [105, 146, 148, 150] },
   { nombre: 'MODENA ECO', items: [146, 147, 149, 150] },
]

export const marcasUnicasPerfiles = [...new Set(marcasPerfiles.reduce((acc, marca) => {
   return acc.concat(marca.items);
}, []))];

export const rubrosPerfiles = [58, 60, 2, 59, 61, 13, 28, 5, 21, 8, 39, 12, 70, 56]

export const rubros = [
   { id: 'Perfiles', nombre: 'PERFILES', srubros: srubrosPerfiles, marcas: marcasPerfiles },
   { id: 'Accesorios', nombre: 'ACCESORIOS', srubros: srubrosAccesorios },
   { id: 'Automatismos', nombre: 'AUTOMATISMOS', srubros: srubrosAutomatismos },
   { id: 'Chapas', nombre: 'CHAPAS', srubros: srubrosChapas },
   { id: 'Herramientas', nombre: 'HERRAMIENTAS', srubros: srubrosHerramientas },
   { id: 'Paneles', nombre: 'PANELES', srubros: srubrosPaneles },
   { id: 'Policarbonatos', nombre: 'POLICARBONATOS', srubros: srubrosPolicarbonatos },
   { id: 'Poliestirenos', nombre: 'POLIESTIRENOS', srubros: srubrosPoliestirenos },
   { id: 'PuertasPlacas', nombre: 'PUERTAS PLACAS', srubros: srubrosPuertasPlacas },
   { id: 'TejidosMosquiteros', nombre: 'TEJIDOS MOSQUITEROS', srubros: srubrosTejidosMosquiteros },
   { id: 'Maquinas', nombre: 'MÁQUINAS', srubros: srubrosHerramientas },
];