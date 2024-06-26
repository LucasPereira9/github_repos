import axios from 'axios';

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
const GITHUB_TOKEN = process.env.REACT_APP_API_TOKEN;

export const fetchGitHubRepositories = async (searchQuery) => {

  const query = `
    query {
      search(query: "${searchQuery} in:name", type: REPOSITORY, first: 26) {
        edges {
          node {
            ... on Repository {
              name
              description
              owner {
                login
                avatarUrl
              }
              defaultBranchRef {
                target {
                  ... on Commit {
                    history {
                      totalCount
                    }
                  }
                }
              }
              issues(states: OPEN) {
                totalCount
              }
              pullRequests(states: OPEN) {
                totalCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      GITHUB_GRAPHQL_API,
      { query },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.data.search.edges.map(edge => edge.node);
  } catch (error) {
          return error.response.data.message
  }
};