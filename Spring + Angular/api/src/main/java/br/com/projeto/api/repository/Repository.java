package br.com.projeto.api.repository;

import br.com.projeto.api.modelo.Cliente;
import org.springframework.data.repository.CrudRepository;

public interface Repository extends CrudRepository<Cliente, Long> {
}
