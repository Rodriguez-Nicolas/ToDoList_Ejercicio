//Array tareas
const tareas = [
  { nombre: 'barrer', prioridad: '1' },
  { nombre: 'cocinar', prioridad: '2' },
  { nombre: 'lavar', prioridad: '3' },
];
console.log(tareas);

const lista = document.getElementById('listaDeTareas');
const select = document.getElementById('ordenar');

//oredena de forma ascendente o descendente usando burbleSort
function Ordenar() {
  var arreglo = tareas;
  var ascendente = true;
  if (select.value == 'descendente') {
    ascendente = false;
  }
  var n = arreglo.length;
  for (var i = 0; i < n - 1; i++) {
    for (var j = 0; j < n - i - 1; j++) {
      if (ascendente) {
        if (arreglo[j].prioridad > arreglo[j + 1].prioridad) {
          var aux = arreglo[j];
          arreglo[j] = arreglo[j + 1];
          arreglo[j + 1] = aux;
        }
        //console.log('ascendente');
      } else {
        if (arreglo[j].prioridad < arreglo[j + 1].prioridad) {
          var aux = arreglo[j];
          arreglo[j] = arreglo[j + 1];
          arreglo[j + 1] = aux;
        }
        //console.log('descendente');
      }
    }
  }
  DibujarLista();
}

function Buscar() {}

function DibujarLista() {
  while (lista.hasChildNodes()) lista.removeChild(lista.firstChild);
  for (var i = 0; i < tareas.length; i++) {
    var div = document.createElement('DIV');
    div.id = i;
    div.className = 'tarea';
    div.onmouseover = Iluminar;
    div.onmouseout = Desiluminar;
    var botonBorrar = document.createElement('Button');
    botonBorrar.textContent = 'X';
    botonBorrar.className = 'boton';
    botonBorrar.onclick = BorrarTarea;
    botonBorrar.onmouseover = Iluminar;
    botonBorrar.onmouseout = Desiluminar;
    var textoTarea = document.createTextNode(
      `${tareas[i].prioridad} ` + tareas[i].nombre
    );
    div.appendChild(textoTarea);
    div.appendChild(botonBorrar);
    lista.appendChild(div);
  }
}

function AñadirTarea() {
  var label = document.getElementById('nuevaTarea');
  if (label.value != '') {
    var tarea = { nombre: `${label.value}`, prioridad: `${tareas.length + 1}` };
    tareas.push(tarea);
    label.value = '';
    console.log(tareas);
    DibujarLista();
  }
}

function BorrarTarea() {
  tareas.splice(this.parentNode.id, 1);
  DibujarLista();
}

function Iluminar() {
  this.classList.add('iluminado');
}

function Desiluminar() {
  this.classList.remove('iluminado');
}

DibujarLista();
document.getElementById('agregar').addEventListener('click', AñadirTarea);
select.onchange = Ordenar;
document.getElementById('agregar').onmouseover = Iluminar;
document.getElementById('agregar').onmouseout = Desiluminar;
document.getElementById('buscar').onmouseover = Iluminar;
document.getElementById('buscar').onmouseout = Desiluminar;
