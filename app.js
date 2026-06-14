const input = document.getElementById("input");
const button = document.getElementById("button");
const display = document.getElementById("display");
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarTarefas(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarTarefas(){

    display.innerHTML = "";

    tarefas.forEach((tarefa,index)=>{
        display.innerHTML += `
        <div class="tarefa ${tarefa.concluida ? "concluida" : ""}">
            
            <span class="texto">${tarefa.texto}</span>
            <div class="botoes">
                <button class="done" data-index="${index}">
                    ✓
                </button>

                <button class="edit" data-index="${index}">
                    ✏
                </button>

                <button class="delete" data-index="${index}">
                    🗑
                </button>
            </div>
        </div>
        `;
    });
}

function inserirTarefa(){
    const texto = input.value.trim();

    if(texto === ""){
        alert("Digite uma tarefa");
        return;
    }

    tarefas.push({
        texto, concluida:false
    });

    salvarTarefas();
    renderizarTarefas();
    input.value = "";
}

function gerenciarTarefa(event){
    const index = event.target.dataset.index;

    if(index === undefined) return;

    if(event.target.classList.contains("delete")){
        tarefas.splice(index,1);
    }else if(event.target.classList.contains("done")){
        tarefas[index].concluida = !tarefas[index].concluida;
    }else if(event.target.classList.contains("edit")){
        const novoTexto = prompt("Editar tarefa:", tarefas[index].texto);

        if(novoTexto && novoTexto.trim() !== ""){
            tarefas[index].texto = novoTexto.trim();
        }
    }
    salvarTarefas();
    renderizarTarefas();
}

button.addEventListener("click", inserirTarefa);
display.addEventListener("click", gerenciarTarefa);
renderizarTarefas();