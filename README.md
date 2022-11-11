# KRUGER CHALLENGE (ReactJS - frontend)

## Ejecución de la aplicacion

Para ejecutar correctamente la aplicacion realizamos lo siguiente:

1. Primero copiamos el repositorio en nuestro portapapeles y lo agregamos a nuestro sistema con `git clone`. 
2. Posterior a eso, ingresamos en la nueva carpeta creada, kruger-challenge, e instalamos los modulos del proyecto con `npm install`.
3. Finalmente inicializamos el proyecto con `npm start` y no dirigimos al [http://localhost:3000](http://localhost:3000) para verlo en nuestro navegador.

## Desarrollo de la aplicacion

### Usuarios y Contrasenas

Se tienen los siguientes usuarios y contrasenas inicialmente (se pueden borrar dichos usuarios luego, en la ventana de Admin):

1. admin | admin (este es el admin del sistema)
2. josanbaq | 123456 (employee)
3. jesunava | jesu123 (employee)
4. claucerv | 123pony123 (employee)
5. jonasola | surfer14 (employee)
6. belenca | senacontra (employee)

Siendo admin, se pueden visualizar el usuario y contrasena de cada uno de los empleados.

### Rutas (react-router-dom)

Se establecieron las rutas del proyecto, las cuales se relacionan con:

1. Login
2. Admin
3. Employee (dinamico de acuerdo al employee)

Tanto Admin como Employee se encuentran protegidas en caso de que se quiera acceder a ellas por medio de url sin haber estado logueado primero o tener una cuenta conectada pero que no pertenece a ese scope.

### Login

Una ventana en donde la persona puede ingresar un usuario y una contrasena que se validan con los datos existentes en el "backend". Se verifica si es admin o si es empleado, y si es empleado, redirige a la respectiva pagina dinamica. Si el ingreso es exitoso, se almacena al usuario con redux-persist y storageSession.

### Admin

Se tienen 2 secciones principales:

1. EmployeesContainer
2. OptionsContainer

EmployeesContainer muestra a los empleados dependiendo del tipo de filtro seleccionado en OptionsContainer. Ademas posee el boton de REGISTER NEW EMPLOYEE para registrar a un nuevo empleado (ingresando el id, correo, nombre y apellido). Este boton, cuando se genera el usuario, muestra por un pop up el nuevo usuario con su respectiva contrasena que fueron creados (con una funcion de aleatoriedad para ambos casos, "backend").

Los empleados que se muestran tienen las siguientes caracteristicas:

1. Avatar
2. Nombre
3. Apellido
4. Edit Button (renderiza EditModal)
5. Delete Button (renderiza DeleteModal) 

En los dos ultimos, aparece un modal que les permite realizar las acciones que desea realizar el usuario, ya sea modificar la informaciopn de un empleado o eliminar al empleado. En el Edit Modal, se tienen valores que son readOnly (por ejemplo, el id del usuairo ingresado) y otros valores que si son editables (por ejemplo, el address del usuario), es decir que este elemento permite visualizar los datos y editarlos.

Si en el EditModal se selecciona "yes" a si esta vacunado el usuario, se renderiza dentro del modal un fieldset para que se seleccione el tipo de vacuna, la fecha de vacunacion y la dosis. Caso contrario, no se muestra este fieldset.

En el DeleteModal solo se muestra si el admin esta seguro de eliminar al employe, ya que esta accion es irreversible.

Las acciones realizadas en los dos se comunican directamente con el "backend database" (ya que es una prueba de frontend se realizo un pseudo backend) que vendria a ser el storageSession (que tambien tiene la lista de usuarios general). Los modales estan llamados por medio de store (ya que de lo contrario habria que pasar informacion a traves de algunos componentes, y se puede aprovechar la ventaja de compartir el componente de EditModal para el employee cuando desea cambiar o llenar su informacion).

Ademas, los modals son llamados por medio de lazy y Suspense, ya que no son requeridos inicialmente cuando el usuario ingresa a la pagina.

El OptionsContainer muestra un menu de filtros, los cuales son:

1. None (por default)
2. Vaccine Status
3. Vaccine Type
4. Vaccine Date

Dependiendo del filtro seleccionado, se renderiza un subfiltro con nuevos parametros que el administrador puede ingresar para realizar su busqueda. Siempre se tiene disponible el boton de FILTER para aplicar el filtro escogido.

Para poder comunicar a estos dos componentes entre si, se utiliza un useState en Admin (componente padre de los dos) y se pasan la informacion de esta manera por medio de callbacks.

### Employee

Se hace display de la informacion del empleado por medio de bloques consecutivos. Ademas se muestra su avatar y un boton de edicion que le permite abrir el EditModal que usaba el admin (reutilizacion de componente que realiza la misma funcion.

### Store (redux)

Se establecio un store para que algunos componentes puedan acceder a ciertas propiedades sin la necesidad de pasar parametros a traves de sus predecesores, y tambien por la ventaja de que se puede aplicar persistencia de datos por sesion, lo cual es muy importante cuando se contecta un usuario (es decir, que si se hace refresh a la pagina, se navega de componente a componente, el usuario se mantiene. Pero si se cierra el tab, se cierra la sesion del usuario).