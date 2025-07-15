import React, { useState, useEffect } from 'react';

function ListaTarefas() {
  const [lista, setLista] = useState(() => {
    const salvas = localStorage.getItem("tarefas");
    return salvas ? JSON.parse(salvas) : [];
  });

  const [texto, setTexto] = useState("");
  const [editando, setEditando] = useState(null);
  const [editado, setEditado] = useState("");

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(lista));
  }, [lista]);

  function mudarTexto(e) {
    setTexto(e.target.value);
  }

  function adicionar() {
    if (texto.trim() !== "") {
      setLista([...lista, texto]);
      setTexto("");
    }
  }

  function excluir(i) {
    const novaLista = lista.filter((_, index) => index !== i);
    setLista(novaLista);
  }

  function subir(i) {
    if (i > 0) {
      const novaLista = [...lista];
      [novaLista[i], novaLista[i - 1]] = [novaLista[i - 1], novaLista[i]];
      setLista(novaLista);
    }
  }

  function descer(i) {
    if (i < lista.length - 1) {
      const novaLista = [...lista];
      [novaLista[i], novaLista[i + 1]] = [novaLista[i + 1], novaLista[i]];
      setLista(novaLista);
    }
  }

  function editar(i) {
    setEditando(i);
    setEditado(lista[i]);
  }

  function salvar(i) {
    const novaLista = [...lista];
    novaLista[i] = editado;
    setLista(novaLista);
    setEditando(null);
    setEditado("");
  }

  return (
    <div className="lista-tarefas">
      <h1>Lista de Tarefas</h1>

      <div>
        <input
          type="text"
          placeholder="Digite uma tarefa..."
          value={texto}
          onChange={mudarTexto}
        />
        <button className="botao-adicionar" onClick={adicionar}>
          Adicionar
        </button>
      </div>

      <ol>
        {lista.map((item, i) => (
          <li key={i}>
            {editando === i ? (
              <>
                <input
                  type="text"
                  value={editado}
                  onChange={(e) => setEditado(e.target.value)}
                />
                <button className="botao-adicionar" onClick={() => salvar(i)}>
                  Salvar
                </button>
              </>
            ) : (
              <>
                <span className="texto">{item}</span>
                <button className="botao-excluir" onClick={() => excluir(i)}>Excluir</button>
                <button className="botao-mover" onClick={() => subir(i)}>Priorizar</button>
                <button className="botao-mover" onClick={() => descer(i)}>Postergar</button>
                <button className="botao-mover" onClick={() => editar(i)}>Editar</button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ListaTarefas;
