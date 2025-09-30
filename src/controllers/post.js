import Post from "../models/Post";

export async function getPosts(req, res) {
  // Post.find()
  try {
    const posts = await Post.find();
    return res.json(posts);
  } catch (error) {
    return res.json({ error: error.message });
  }
}

export function getPostById(req, res) {
  // Post.findById()
  // const post = posts.find((p) => p.id === parseInt(req.params.id));
  // if (!post) return res.status(404).json({ error: "Post not found" });
  // res.json(post);
}
export async function addPost(req, res) {
  try {
    // Model.create(data) : data = req.body, Model = Post
    const newPost = await Post.create(req.body);
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export function updatePost(req, res) {
  // Post.findByIdAndUpdate()
}
export function deletePost(req, res) {
  // Post.findByIdAndDelete()
}
