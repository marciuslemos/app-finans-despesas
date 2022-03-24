// logica de captura de informação

class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia 
        this.tipo = tipo 
        this.descricao = descricao 
        this.valor = valor 
    }

    validarDados(){
        for(let i in this){
            
            if(this[i] == undefined || this[i] == "" || this[i] == null){
                
                return false
            } 
        
        }
        return true
    }
}
    //crialçao de uma classe para ser o banco de dados.
class Bd {

    constructor(){
        let id = localStorage.getItem('id')
        // implementação da logica
        if (id === null){
            localStorage.setItem('id', 0)
        }

    }
    // função para saber se ja existe um id no localStorage e implementar um proximo id
    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return  parseInt(proximoId) + 1
    }
    // criando a função gravar

    gravar(d){
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d)) // o metodo setItem no 2 parametro esta transformando em JSON.
        localStorage.setItem('id', id)
        
    }
    // criando um metodo para recuperar todos os registros cadastrados.
    recuperarTodosRegistros(){

        // criação da variavel que vai receber o array de despesa
        let despesas = Array()
        
        let id = localStorage.getItem('id')
        
        // usar um laço de repetição para recuperar os dados.

        for(let i = 1; i <= id; i++){  
            // recuperar a despesa criando uma variavel.

            let despesa = JSON.parse(localStorage.getItem(i))

             //metodo para pular objetos null e evitar erro no programa.
             if(despesa === null){
                continue
            }

            despesa.id = i
           // console.log(despesa.id)
            despesas.push(despesa)
            
        }
        
        return despesas
    }

    pesquisar(despesa){

        let despesasFiltradas = Array()
		despesasFiltradas = this.recuperarTodosRegistros()
		console.log(despesasFiltradas);
		console.log(despesa)

		//ano
		if(despesa.ano != ''){
			console.log("filtro de ano");
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}
			
		//mes
		if(despesa.mes != ''){
			console.log("filtro de mes");
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}

		//dia
		if(despesa.dia != ''){
			console.log("filtro de dia");
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

		//tipo
		if(despesa.tipo != ''){
			console.log("filtro de tipo");
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}

		//descricao
		if(despesa.descricao != ''){
			console.log("filtro de descricao");
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		//valor
		if(despesa.valor != ''){
			console.log("filtro de valor");
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}

		
        return despesasFiltradas
    }

    remover(id){
        localStorage.removeItem(id)
    }

}
    //variavel que esta contendo o banco de dados escopo global.
    let bd = new Bd()


function cadastrarDespesa() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')
    // usasr o modelo ano.value para facilitar os debugs

    let despesa = new Despesa(
        ano.value, 
        mes.value,
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    )

        if(despesa.validarDados() == true){

            bd.gravar(despesa)

            //limpar campos dos dados.
            let btn = document.querySelector("#botao_modal");

            btn.addEventListener("click", function() {
                
                location.reload();

            });

            /* outra forma de fazer esta operação seria recuperar os valores dos campos e alterar para vazio isto sendo feito no final do bloco if antes de fevhar as chaves.
            ex:  ano.value, 
            mes.value = ''
            dia.value = ''
            tipo.value = ''
            descricao.value = '' 
            valor.value = ''
            */

            
            //formatação da janela modal

            document.getElementById('Titulo_modal').innerHTML= 'Despesa Cadastrada com Sucesso'
            document.getElementById('detalhe-texto').className= "modal-header text-success"
            document.getElementById('modal_conteudo').innerHTML= 'Sua despesa foi cadastrada com sucesso, Click em Ok, Fechar para cadastrar nova despesa.'
            document.getElementById('botao_modal').innerHTML= 'Ok, Fechar'
            document.getElementById('botao_modal').className= "btn btn-success"  

            $('#modalRegistrarDespesa').modal('show') // foi inserido um metodo de JQUERY
            
        } else{
            
            //fazer manipulação do html

            document.getElementById('Titulo_modal').innerHTML= 'ERRO!!!'
            document.getElementById('detalhe-texto').className= "modal-header text-danger"
            document.getElementById('modal_conteudo').innerHTML= 'Favor Verificar Todos os Campos, Para Continuar É Preciso Preencher Todos Os Itens!'
            document.getElementById('botao_modal').innerHTML= 'Voltar'
            document.getElementById('botao_modal').className= "btn btn-danger" 
           
           //caixa de erro
            $('#modalRegistrarDespesa').modal('show') 
           
        }

        
}

function carregarListaDespesa(despesas = Array(), filtro = false){

     if(despesas.length == 0 && filtro == false){
         despesas = bd.recuperarTodosRegistros()
     }
     
     //selecionando o elemento t-body da tabela
    let listaDespesa = document.getElementById('listaDespesa')
    listaDespesa.innerHTML = ''
    despesas.forEach(function(d){
        // criando linha dentro do tbody HTML
        let linha = listaDespesa.insertRow()
        //criando colinas dentro das linhas do tbody HTML
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        //fazendo a tranposição do tipo.
            switch(d.tipo){
                case '1' : d.tipo = 'Alimentação'
                    break
                case '2' : d.tipo = 'Educação'
                    break
                case '3' : d.tipo = 'Lazer'
                    break
                case '4' : d.tipo = 'Saúde'
                    break
                case '5' : d.tipo = 'Transporte'
                    break
            }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = 'R$' + d.valor
        // criando o botao de remover
        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        //console.log(btn.id)
        btn.onclick = function(){
            //ajustando a string para nao dar bug
            let id = this.id.replace('id_despesa_', '')
           // alert(id)
            bd.remover(id)

            window.location.reload()
        }
        
        linha.insertCell(4).append(btn) 

    })
}
function pesquisarDespesas(){
    // recuperando os valores dos campos do formulario
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    //criar uma variavel com a instancia new despesa
    let despesa = new Despesa(ano, mes, dia, tipo, descricao,valor)

    //chamadas para criação do filtro em tela html

    despesas = bd.pesquisar(despesa)

    carregarListaDespesa(despesas, true)

}
  