package br.com.projeto.api.controller;

import br.com.projeto.api.modelo.Cliente;
import br.com.projeto.api.repository.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class Controller {

    @Autowired
    private Repository acao;

    @PostMapping("/")
    public Cliente cadastrar(@RequestBody Cliente cliente){
        return acao.save(cliente);
    }

    @GetMapping("/")
    public Iterable<Cliente> selecionar(){
        return acao.findAll();
    }

    @PutMapping("/")
    public Cliente editar(@RequestBody Cliente cliente){
        return acao.save(cliente);
    }

    @DeleteMapping("/{codigo}")
    public void remover(@PathVariable long codigo){
        acao.deleteById(codigo);
    }






}
