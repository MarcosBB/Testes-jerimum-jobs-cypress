import { v4 as uuidv4 } from 'uuid'
const { generate } = require('gerador-validador-cpf')

class AdminCreationForm{
  elements = {
    inputName: () => cy.get('#inputNome'),
    inputCPF: () => cy.get('#cpf'),
    inputSexo: () => cy.get('#pessoa\\.sexo1'),
    inputCelular: () => cy.get('#pessoa\\.celular'),
    inputTelefone: () => cy.get('#telefoneInput'),
    inputRamal: () => cy.get('#pessoa\\.ramal'),
    inputEmail: () => cy.get('#inputEmail'),
    inputLogin: () => cy.get('#inputUsuario'),
    submitButton: () => cy.get('button[type="submit"]')
  }

  createUser({
    name="Teste", 
    cpf=generate(), 
    sexo=true, 
    celular=null, 
    telefone="12345678901", 
    ramal=null, 
    email=uuidv4() + "@gmail.com", 
    login=uuidv4()
  }){
    this.elements.inputName().type(name)
    cpf !== "" && this.elements.inputCPF().type(cpf)
    sexo && this.elements.inputSexo().check()
    celular && this.elements.inputCelular().type(celular)
    this.elements.inputTelefone().type(telefone)
    ramal && this.elements.inputRamal().type(ramal)
    this.elements.inputEmail().type(email)
    this.elements.inputLogin().type(login)
    this.elements.submitButton().click()
  }

}



describe('Form de criação de usuário admin', () => {
  const userCreationForm = new AdminCreationForm()
  before(() => {
    cy.visit("/login")
    cy.get('#login-username').type("admintestes")
    cy.get('#login-password').type("admintestes")
    cy.get('#login-button').click()

  });

  beforeEach(() => {
    cy.visit("admin/usuario/formUsuario")
  })

  it('Criação de usuário admin', () => {
    userCreationForm.createUser({})
    cy.get('.alert-success').should('contain.text', 'Cadastrado com sucesso!')
  })

  it('Criação de usuário com CPF inválido', () => {
    userCreationForm.createUser({
      cpf: "12345678901",
    })
    cy.get('.alert').should('contain.text', 'Insira um CPF válido')
  })

  it('Criação de usuário com email inválido', () => {
    userCreationForm.createUser({
      email: "email inválido",
    })
    cy.get('.alert-success').should('not.exist')
  })

  it('Criação de usuário sem algum campo NECESSÁRIO', () => {
    userCreationForm.createUser({
      cpf: "",
    })
    cy.get('.alert-success').should('not.exist')
  })

  it('Criação de usuário com o mesmo email de outro', () => {
    const email = uuidv4() + "@gmail.com"
    userCreationForm.createUser({
      email: email,
    })
    cy.get('.alert-success').should('contain.text', 'Cadastrado com sucesso!')
    cy.visit("admin/usuario/formUsuario")
    userCreationForm.createUser({
      email: email,
    })

    cy.get('.alert-success').should('not.exist')
  })

  it('Criação de usuário com o mesmo login de outro', () => {
    const login = uuidv4() 
    userCreationForm.createUser({
      login: login,
    })
    cy.get('.alert-success').should('contain.text', 'Cadastrado com sucesso!')
    cy.visit("admin/usuario/formUsuario")
    userCreationForm.createUser({
      login: login,
    })

    cy.get('.alert-success').should('not.exist')
  })

  it('Criação de usuário com o mesmo cpf de outro', () => {
    const cpf = generate() 
    userCreationForm.createUser({
      cpf: cpf,
    })
    cy.get('.alert-success').should('contain.text', 'Cadastrado com sucesso!')
    cy.visit("admin/usuario/formUsuario")
    userCreationForm.createUser({
      cpf: cpf,
    })

    cy.get('.alert-success').should('not.exist')
  })
})




class CandidatoCreationForm{
  elements = {
    inputName: () => cy.get('#nomeCandidatoInput'),
    inputCPF: () => cy.get('#cpfInput'),
    checkUseTerm: () => cy.get('.iToggle-helper'),
    inputTelefone: () => cy.get('#telefoneCandidatoInput'),
    inputEmail: () => cy.get('#emailCandidatoInput'),
    inputLogin: () => cy.get('#loginCandidatoInput'),
    submitButton: () => cy.get('button[type="submit"]')
  }

  createUser({
    name="Teste", 
    cpf=generate(), 
    telefone="12345678901", 
    email=uuidv4() + "@gmail.com", 
    login=uuidv4()
  }){
    this.elements.inputName().type(name)
    this.elements.inputLogin().type(login)
    cpf !== "" && this.elements.inputCPF().type(cpf)
    this.elements.inputEmail().type(email)
    this.elements.inputTelefone().type(telefone)
    this.elements.checkUseTerm().click()
    this.elements.submitButton().click()
  }

}

// describe('Form de criação de usuário admin', () => {
//   const userCreationForm = new CandidatoCreationForm()
//   before(() => {
//     cy.visit("/login#")
//     cy.get('#btn-show-cadastro-form').click()
//   })

//   it('Criação de usuário admin', () => {
//     userCreationForm.createUser({})
//     cy.get('.alert-success').should('contain.text', 'Cadastrado com sucesso!')
//   })

  // it('Criação de usuário com CPF inválido', () => {
  //   userCreationForm.createUser({
  //     cpf: "12345678901",
  //   })
  //   cy.get('.alert').should('contain.text', 'Insira um CPF válido')
  // })

  // it('Criação de usuário com email inválido', () => {
  //   userCreationForm.createUser({
  //     email: "email inválido",
  //   })
  //   cy.get('.alert-success').should('not.exist')
  // })

  // it('Criação de usuário sem algum campo NECESSÁRIO', () => {
  //   userCreationForm.createUser({
  //     cpf: "",
  //   })
  //   cy.get('.alert-success').should('not.exist')
  // })

  // it('Criação de usuário com o mesmo email de outro', () => {
  //   const email = uuidv4() + "@gmail.com"
  //   userCreationForm.createUser({
  //     email: email,
  //   })
  //   cy.get('.alert-success').should('contain.text', 'Cadastrado com sucesso!')
  //   userCreationForm.createUser({
  //     email: email,
  //   })

  //   cy.get('.alert-success').should('not.exist')
  // })

  // it('Criação de usuário com o mesmo login de outro', () => {
  //   const login = uuidv4() 
  //   userCreationForm.createUser({
  //     login: login,
  //   })
  //   cy.get('.alert-success').should('contain.text', 'Cadastrado com sucesso!')
  //   userCreationForm.createUser({
  //     login: login,
  //   })

  //   cy.get('.alert-success').should('not.exist')
  // })

  // it('Criação de usuário com o mesmo cpf de outro', () => {
  //   const cpf = generate() 
  //   userCreationForm.createUser({
  //     cpf: cpf,
  //   })
  //   cy.get('.alert-success').should('contain.text', 'Cadastrado com sucesso!')
  //   userCreationForm.createUser({
  //     cpf: cpf,
  //   })

  //   cy.get('.alert-success').should('not.exist')
  // })
// })