const axios = require('axios').default;

/**
 * Fetches posts from a remote API.
 * @async
 * @param {Object} [params] - The parameters for fetching posts.
 * @param {number} [params.start=0] - The start index of posts to fetch.
 * @param {number} [params.limit=10] - The maximum number of posts to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 */
async function fetchPosts(params) {
  const { start = 0, limit = 10 } = params || {};
  const { data: posts } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts?limit',
    {
      params: {
        _start: start,
        _limit: limit,
      },
    },
  );

  return posts;
}

async function getImage(posts) {
  let arr = [];
  for (let i of posts) {
    let temp = [];
    const data = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${i.id}/photos`,
    );

    data.data.slice(0, 3).map(photo => {
      temp.push(photo.url);
    }),
      arr.push(temp);
  }

  return arr;
}

module.exports = { fetchPosts, getImage };
