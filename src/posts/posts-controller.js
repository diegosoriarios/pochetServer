const Post = require('./posts-model')

module.exports = {
  add: async (req, res) => {
    try {
      const post = new Post(req.body);
      await post.add();
      
      res.status(201).send(post);
    } catch (err) {
      if (err instanceof InvalidArgumentError) {
        res.status(422).json({ err: err.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ err: err.message });
      } else {
        res.status(500).json({ err: err.message });
      }
    }
  },
  
  list: async (req, res) => {
    try {
      const posts = await Post.list()
      res.send(posts)
    } catch (err) {
      return res.status(500).json({ err: err })
    }
  }
}