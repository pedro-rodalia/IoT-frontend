module.exports.displays = [
  { 'nombre':             'Display de prueba nº1',
    'identificacion':     1,
    'descripcion':        'Display de prueba nº1 asociado al grupo 1 con la imagen 1',
    'estado':             ['activo'],
    'localizacion':       "",
    'fecha':              "2017-10-03",
    'creador':            'Pedro Rodriguez',
    'dimensiones':        {alto: 512, ancho: 512},
    'grupos':             [1],
    'imagen_asociada':    1,
    'etiquetas':          ['etiqueta 1', 'etiqueta 2', 'etiqueta 3']
  },
  { 'nombre':             'Display de prueba nº2',
    'identificacion':     2,
    'descripcion':        'Display de prueba nº2 asociado al grupo 2 con la imagen 2',
    'estado':             ['activo'],
    'localizacion':       "",
    'fecha':              "2017-10-04",
    'creador':            'Pedro Rodriguez',
    'dimensiones':        {alto: 512, ancho: 512},
    'grupos':             [1, 2],
    'imagen_asociada':    2,
    'etiquetas':          ['etiqueta 1', 'etiqueta 2', 'etiqueta 3']
  },
  { 'nombre':             'Display de prueba nº3',
    'identificacion':     3,
    'descripcion':        'Display de prueba nº3 asociado al grupo 3 con la imagen 3',
    'estado':             ['activo'],
    'localizacion':       "",
    'fecha':              "2017-10-05",
    'creador':            'Pedro Rodriguez',
    'dimensiones':        {alto: 512, ancho: 512},
    'grupos':             [1, 3],
    'imagen_asociada':    3,
    'etiquetas':          ['etiqueta 1', 'etiqueta 2', 'etiqueta 3']
  },
  { 'nombre':             'Display de prueba nº4',
    'identificacion':     4,
    'descripcion':        'Display de prueba nº4 asociado al grupo 4 con la imagen 4',
    'estado':             ['activo'],
    'localizacion':       "",
    'fecha':              "2017-10-03",
    'creador':            'Pedro Rodriguez',
    'dimensiones':        {alto: 512, ancho: 512},
    'grupos':             [1, 4],
    'imagen_asociada':    4,
    'etiquetas':          ['etiqueta 1', 'etiqueta 2', 'etiqueta 3']
  },
  { 'nombre':             'Display de prueba nº5',
    'identificacion':     5,
    'descripcion':        'Display de prueba nº5 asociado al grupo 1 con la imagen 5',
    'estado':             ['activo'],
    'localizacion':       "",
    'fecha':              "2017-10-03",
    'creador':            'Pedro Rodriguez',
    'dimensiones':        {alto: 512, ancho: 512},
    'grupos':             [1],
    'imagen_asociada':    5,
    'etiquetas':          ['etiqueta 1', 'etiqueta 2', 'etiqueta 3']
  },
  { 'nombre':             'Display de prueba nº6',
    'identificacion':     6,
    'descripcion':        'Display de prueba nº6 asociado al grupo 2 con la imagen 1',
    'estado':             ['activo'],
    'localizacion':       "",
    'fecha':              "2017-10-03",
    'creador':            'Pedro Rodriguez',
    'dimensiones':        {alto: 512, ancho: 512},
    'grupos':             [1, 2],
    'imagen_asociada':    1,
    'etiquetas':          ['etiqueta 1', 'etiqueta 2', 'etiqueta 3']
  },
  { 'nombre':             'Display de prueba nº7',
    'identificacion':     7,
    'descripcion':        'Display de prueba nº7 asociado al grupo 3 con la imagen 2',
    'estado':             ['activo'],
    'localizacion':       "",
    'fecha':              "2017-10-03",
    'creador':            'Pedro Rodriguez',
    'dimensiones':        {alto: 512, ancho: 512},
    'grupos':             [1, 3],
    'imagen_asociada':    2,
    'etiquetas':          ['etiqueta 1', 'etiqueta 2', 'etiqueta 3']
  },
  { 'nombre':             'Display de prueba nº8',
    'identificacion':     8,
    'descripcion':        'Display de prueba nº asociado al grupo 4 con la imagen 3',
    'estado':             ['activo'],
    'localizacion':       "",
    'fecha':              "2017-10-03",
    'creador':            'Pedro Rodriguez',
    'dimensiones':        {alto: 512, ancho: 512},
    'grupos':             [1, 4],
    'imagen_asociada':    3,
    'etiquetas':          ['etiqueta 1', 'etiqueta 2', 'etiqueta 3']
  },
  { 'nombre':             'Display de prueba nº9',
    'identificacion':     9,
    'descripcion':        'Display de prueba nº9 asociado al grupo 1 con la imagen 4',
    'estado':             ['activo'],
    'localizacion':       "",
    'fecha':              "2017-10-03",
    'creador':            'Pedro Rodriguez',
    'dimensiones':        {alto: 512, ancho: 512},
    'grupos':             [1],
    'imagen_asociada':    4,
    'etiquetas':          ['etiqueta 1', 'etiqueta 2', 'etiqueta 3']
  },
  { 'nombre':             'Display de prueba nº10',
    'identificacion':     10,
    'descripcion':        'Display de prueba nº9 asociado al grupo 1 con la imagen 5',
    'estado':             ['activo'],
    'localizacion':       "",
    'fecha':              "2017-10-03",
    'creador':            'Pedro Rodriguez',
    'dimensiones':        {alto: 512, ancho: 512},
    'grupos':             [1, 2],
    'imagen_asociada':    5,
    'etiquetas':          ['etiqueta 1', 'etiqueta 2', 'etiqueta 3']
  }
];

module.exports.imagenes = [
  { nombre:           'Imagen de prueba 1',
    identificacion:    1,
    descripcion:      'imagen de prueba en formato png de tamaño 512x512',
    fecha:            '2017-10-16',
    creador:          'Pedro Rodriguez Alia',
    etiquetas:        ['imagen', 'prueba', 'png', '512x512'],
    formato:          'png',
    dimensiones:      {alto: '512', ancho: '512'},
    bytes:            '127kb',
    categoria:        'nombre'
  },
  { nombre:           'Imagen de prueba 2',
    identificacion:   2,
    descripcion:      'imagen de prueba en formato png de tamaño 125x512',
    fecha:            '2017-10-01',
    creador:          'Pedro Rodriguez Alia',
    etiquetas:        ['prueba', 'imagen', 'png', '125x512'],
    formato:          'png',
    dimensiones:      {alto: '125', ancho:'512'},
    bytes:            '133kb',
    categoria:        'informacion'
  },
  { nombre:           'Imagen de prueba 3',
    identificacion:   3,
    descripcion:      'imagen de prueba en formato png de tamaño 125x512',
    fecha:            '2017-10-01',
    creador:          'Pedro Rodriguez Alia',
    etiquetas:        ['prueba', 'imagen', 'png', '125x512'],
    formato:          'png',
    dimensiones:      {alto: '125', ancho: '512'},
    bytes:            '133kb',
    categoria:        'informacion'
  },
  { nombre:           'Imagen de prueba 4',
    identificacion:   4,
    descripcion:      'imagen de prueba en formato png de tamaño 125x512',
    fecha:            '2017-10-01',
    creador:          'Pedro Rodriguez Alia',
    etiquetas:        ['prueba', 'imagen', 'png', '125x512'],
    formato:          'png',
    dimensiones:      {alto: '125', ancho: '512'},
    bytes:            '133kb',
    categoria:        'informacion'
  },
  { nombre:           'Imagen de prueba 5',
    identificacion:   5,
    descripcion:      'imagen de prueba en formato png de tamaño 125x512',
    fecha:            '2017-10-01',
    creador:          'Pedro Rodriguez Alia',
    etiquetas:        ['prueba', 'imagen', 'png', '125x512'],
    formato:          'png',
    dimensiones:      {alto: '125', ancho: '512'},
    bytes:            '133kb',
    categoria:        'informacion'
  }
];

module.exports.grupos = [
  {
    nombre:           'Grupo de prueba 1',
    descripcion:      'Grupo de displays de prueba correspondientes a la seccion 1',
    identificacion:   1,
    displays:         [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    etiquetas:        ['grupo', 'doctores'],
    icono:            'fa fa-user-md',
    creador:          'Pedro Rodríguez Alía',
    fecha:            '2017-03-20',
  },
  {
    nombre:           'Grupo de prueba 2',
    descripcion:      'Grupo de displays de prueba correspondientes a la seccion 2',
    identificacion:   2,
    displays:         [2, 6, 10],
    etiquetas:        ['grupo', 'doctores'],
    icono:            'fa fa-user-md',
    creador:          'Pedro Rodríguez Alía',
    fecha:            '2017-03-20',
  }
  ,
  {
    nombre:           'Grupo de prueba 3',
    descripcion:      'Grupo de displays de prueba correspondientes a la seccion 3',
    identificacion:   3,
    displays:         [3, 7],
    etiquetas:        ['grupo', 'doctores'],
    icono:            'fa fa-user-md',
    creador:          'Pedro Rodríguez Alía',
    fecha:            '2017-03-20',
  },
  {
    nombre:           'Grupo de prueba 4',
    descripcion:      'Grupo de displays de prueba correspondientes a la seccion 4',
    identificacion:   4,
    displays:         [4, 8],
    etiquetas:        ['grupo', 'doctores'],
    icono:            'fa fa-user-md',
    creador:          'Pedro Rodríguez Alía',
    fecha:            '2017-03-20',
  },
];
