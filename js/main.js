const form = document.getElementById('novoItem');
const lista = document.querySelector('.lista');




const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach(element => {
    criarElemento(element)

});

form.addEventListener('submit', (evento) => {

    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];


    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    const existe = itens.find(elemento => elemento.nome === nome.value);

    if (existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex(item => item.id === existe.id)] = itemAtual;

    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

        criarElemento(itemAtual);

        itens.push(itemAtual);


    }


    localStorage.setItem("itens", JSON.stringify(itens));

    nome.focus();
    nome.value = "";
    quantidade.value = "";




});


function criarElemento(item) {

    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.nome;

    novoItem.appendChild(buttonDelete(item.id));

    lista.appendChild(novoItem);


}


function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;

}

function buttonDelete(id) {
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = "X";
    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id);
    });
    return elementoBotao;

}

function deletarItem(idItem){
        
    let podeRemoverItem = confirm("Deseja realmente excluir o item?");

    if(podeRemoverItem){
        deletarElemento(idItem);
        const index = itens.findIndex(item => item.id == idItem);
        itens.splice(index, 1);
        atualizaLocalStorage();
    }
}

function deletaElemento(tag, id) {
    tag.remove();
    itens.splice(itens.findIndex(item => item.id === id), 1);
    localStorage.setItem("itens", JSON.stringify(itens));
}