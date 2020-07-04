const db = require('../../database')

module.exports = {
  add: post => {
    return new Promise((res, rej) => {
      db.run(
        `
        INSERT INTO posts (
          titulo, 
          conteudo
        ) VALUES (?, ?)
      `,
        [post.title, post.content],
        erro => {
          if (erro) {
            return rej('Erro ao adicionar o post!');
          }

          return res();
        }
      );
    });
  },

  list: () => {
    return new Promise((res, rej) => {
      db.all(`SELECT * FROM posts`, (err, results) => {
        if (err) {
          return rej('Erro ao listar os posts!');
        }

        return res(results);
      });
    });
  }
}