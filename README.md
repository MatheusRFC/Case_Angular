# Case Angular

Esse projeto foi desenvolvido usando [Angular](https://github.com/angular/angular-cli) versão 13.3.2.

## Servidor

Rode `ng serve` para rodar o servidor de desenvolvimento. Navegue para `http://localhost:4200/`.

## Dependências

É necessário instalar o angular CDK para o correto funcionamento do Drag and Drop

```
npm i @angular/cdk --save
```

## Objetivo

Desenvolver uma aplicação para a manutenção de Leads, Essa aplicação implementa a camada de front end para a seguinte arquitetura:

![arquitetura.png](https://github.com/MatheusRFC/Case_Angular/blob/master/.img/arquitetura.png)

### Login

A tela de login é responsável por pegar os dados armazenados no localstorage do navegador e utilizá-los
para efetuar a autenticação do usuário

![login.png](https://github.com/MatheusRFC/Case_Angular/blob/master/.img/login.png) 

### Cadastro de Usuários

A página de cadastro de usuários é responsável por fazer o cadastro dos usuários e armazenar o dados
no localstorage do navegador para ser possível o login utilizar esses dados para autênticação posterirmente.

![cadastro_usuarios](https://github.com/MatheusRFC/Case_Angular/blob/master/.img/cadastro_usuarios.png) 

O cadastro tem os seguintes requisitos:

- Todos os campos são obrigatórios.

- A senha tem que possuir ao menos 8 caracteres, contendo ao menos, um caracter especial, um caractere numérico
e um caracter alfanumérico.

- A senha e a confirmação de senha devem ser iguais.

- O nome de usuário deve possuir ao menos 4 caracteres.

### Painel Principal

O painel principal do site é onde é exibido todas as empresas cadastradas, o usuário logado, opção de cadastro
de leads e opção de logout.

![painel_principal.png](https://github.com/MatheusRFC/Case_Angular/blob/master/.img/painel_principal.png)

O painel principal também tem requisitos:

- Os Leads são exibidos pelos status:
    - Cliente em Potencial
    - Dados Confirmados
    - Reunião Agendada

- Cada Lead pode ser “arrastado” (tendo assim seu status interno alterado) na seguinte sequencia:
     - Cliente em Potencial -> Dados Confirmados 
     - Dados Confirmados -> Reunião Agendada

- Não podem ser “arrastados” na sequencia inversa, nem tampouco de Cliente em Potencial diretamente para Reunião Agendada.

- Para que um Lead seja incluído no “pipe”, é utilizada a opção “Novo Lead(+)”.

A função de DragAndDrop foi implementada usando os módulos CdkDragDrop e transferArrayItem do angular CDK.

### Cadastro de novos Leads

O painel de cadastro de leads pode ser visto na imagem abaixo. Nele é possível fazer o cadastro de novos
leads, informando nome, telefone, email, e as oportunidades.

![cadastro_leads.png](https://github.com/MatheusRFC/Case_Angular/blob/master/.img/cadastro_leads.png)

O painel de cadastro de novos leads tem alguns requisitos que foram seguidos:

- Todos os campos são obrigatórios.

- As oportunidades podem ser marcadas / desmarcadas individualmente.

- Ao clicar no CheckBox no cabeçalho da coluna esquerda na grade de oportunidades, este deverá Marcar ou Desmarcar todos.

- Ao clicar no Salvar é exibida a confirmação de Lead incluído com sucesso.

- O Lead deverá é incluído com o Status “Cliente em Potencial”.

## Funções extras que foram adicionadas.

- Verificação de autenticação.
    - Foi adicionada uma verificação de autenticação à todas as páginas (Com exceção do login e cadastro), não permitindo o usuário deslogado de ver ou cadastrar informações.

- Verificação e validação do endereço de e-mail 
    - É feita uma verificação e validação do endereço de e-mail informado durante o cadastro de um lead. Essa verificação, assim como a verificação dos requisitos da senha, é feita utilizando uma expressão regular.
