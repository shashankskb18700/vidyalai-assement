const express = require('express');
const { fetchPosts, getImage } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts(req.query);
  const getImg = await getImage(posts);

  let counter = -1;

  const postsWithImages = posts.reduce((acc, post) => {
    // TODO use this route to fetch photos for each post
    // axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
    counter++;
    return [
      ...acc,
      {
        ...post,
        images: [
          { url: getImg[counter][0] },
          { url: getImg[counter][1] },
          { url: getImg[counter][2] },
        ],
      },
    ];
  }, []);

  res.json(postsWithImages);
});

module.exports = router;
