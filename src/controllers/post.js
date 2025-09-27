let posts = [
  { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
  { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
  { id: 3, title: "Bài viết 2", content: "Nội dung bài viết 2" },
  { id: 4, title: "Bài viết 2", content: "Nội dung bài viết 2" },
];

export function getPosts(req, res) {
  res.json(posts);
}

export function getPostById(req, res) {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
}
export function addPost(req, res) {
  // req.body : underfined
  const { title, content } = req.body;
  const newPost = { id: Date.now(), title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
}

export function updatePost(req, res) {}
export function deletePost(req, res) {}
