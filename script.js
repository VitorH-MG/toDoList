const inputTarefa = document.querySelector('#inputTarefa');
const btAdicionarTarefa = document.querySelector('#btAdicionarTarefa');
const fecharEdicao = document.querySelector('#fecharEdicao');
const janelaEdicao = document.querySelector('#janelaEdicao');
const editarJanela  = document.querySelector('#editarJanela');
const nomeEdicao  = document.querySelector('#nomeEdicao');
const idTarefaEdicao  = document.querySelector('#idTarefaEdicao');



//EVENTO PARA ADICIONAR TAREFA AO HTML PRESSIONANDO A TECLA ENTER
inputTarefa.addEventListener('keypress', (e) => {

    if(e.keyCode == 13) {
        const tarefa = {
            nome: inputTarefa.value,
            id: gerarId(),
        }
        //ADICIONAR TAREFA AO HTML
        adicionarTarefa(tarefa);    
    }
});

//EVENTO PARA ADICIONAR TAREFA AO HTML CLICANDO NO +
btAdicionarTarefa.addEventListener('click', (e) => {
    const tarefa = {
        nome: inputTarefa.value,
        id: gerarId(),
    }
    //ADICIONAR TAREFA AO HTML
    adicionarTarefa(tarefa);
});

//FECHAR JANELA DE EDIÇÃO
fecharEdicao.addEventListener('click',(e) =>{
    alternareditarJanela();
});

//EDITAR TAREFA
botaoAtualizar.addEventListener('click', (e) => {
    e.preventDefault();

    const idTarefa = idTarefaEdicao.innerHTML.replace('#', '');

    const tarefa = {
        nome: nomeEdicao.value,
        id: idTarefa
    }

    const tarefaAtual = document.getElementById(''+idTarefa+'');


        const li = criarTagLi(tarefa);
        listaTarefas.replaceChild(li, tarefaAtual);
        alternareditarJanela();


});

//FUNÇÃO PARA GERAR ID ALEATÓRIO
function gerarId(){
    return Math.floor(Math.random() * 3000);
}

function adicionarTarefa(tarefa){
    const li = criarTagLi(tarefa);
    listaTarefas.appendChild(li);
    inputTarefa.value='';
}


//FUNÇÃO PARA DEIXAR O listaTarefas DINÂMIOCO
function criarTagLi(tarefa){
    const li = document.createElement('li');
    li.id = tarefa.id; //AYRIBUI UM id AO li

    const span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;
    
    const div  = document.createElement('div');
    
    const botaoEditar = document.createElement('button');
    botaoEditar.classList.add('btAcao');
    botaoEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    botaoEditar.setAttribute('onclick', 'editar('+tarefa.id+')');

    const botaoExcluir = document.createElement('button');
    botaoExcluir.classList.add('btAcao');
    botaoExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    botaoExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');

    div.appendChild(botaoEditar);
    div.appendChild(botaoExcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li;
}

//FUNÇÃO PARA EDITAR
function editar(idTarefa){
    const li = document.getElementById(''+idTarefa+'');
    if(li) {
        idTarefaEdicao.innerHTML = '#' + idTarefa;
        nomeEdicao.value = li.innerText; //ATRIBUI O TEXTO DA TAREFA QUE ESTÁ SENDO EDITADA A BARRA PARA EDITAR
        alternareditarJanela();
    } else {
        alert('Elemento HTML não encontrado!');
    }
}

//FUNÇÃO PARA EXCLUIR
function excluir(idTarefa){
    const confirmacao = window.confirm('CONFIRMAR EXCLUSÃO?');
    if(confirmacao){
        const li = document.getElementById(''+idTarefa+'');
        if(li){
            listaTarefas.removeChild(li);
        }
    }
}

//FUNÇÃO PARA VOLTAR PARA JANELA INICIAL
function alternareditarJanela() {
    editarJanela.classList.toggle('abrir');
    janelaEdicao.classList.toggle('abrir');
}