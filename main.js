const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');


function criaLi() {
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        if (!inputTarefa.value) return;
          criaTarefa(inputTarefa.value);
    }
});

function limpaImput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = 'apagar';
    botaoApagar.setAttribute('class', 'apagar');
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {  // o textoInput eceberá o valor que está dentro do elemento com a classe input-tarefa.
   const li = criaLi();  //ta recebendo o li que foi criado na function criaLi
   li.innerText = textoInput;
   tarefas.appendChild(li);
   limpaImput();
   criaBotaoApagar(li);
   salvarTarefas();
}

btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
      criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e) {
    const el = e.target
     
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();  //  console.log(el.parentElement); descobrir o pai
        salvarTarefas();  
    }
});

function salvarTarefas() {
   const liTarefas = tarefas.querySelectorAll('li');
   const listaDeTarefas = [];

   for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('apagar', ' ').trim();
    listaDeTarefas.push(tarefaTexto);
   }
   const tarefasJson = JSON.stringify(listaDeTarefas);
   localStorage.setItem('tarefas', tarefasJson);
}

function adicionarTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    
    for(let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionarTarefasSalvas();
