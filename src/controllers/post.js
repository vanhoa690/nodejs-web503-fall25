let posts = [
  { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
  { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
  { id: 3, title: "Bài viết 2", content: "Nội dung bài viết 2" },
  { id: 4, title: "Bài viết 2", content: "Nội dung bài viết 2" },
];

export function getPosts(req, res) {
  res.json(posts);
}

export function getPostById() {}
export function addPost() {}
export function updatePost() {}
export function deletePost() {}
