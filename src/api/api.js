import axios from 'axios';

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
const GITHUB_TOKEN = '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';

export const fetchGitHubRepositories = async (searchQuery) => {
  const query = `
    query {
      search(query: "${searchQuery} in:name", type: REPOSITORY, first: 10) {
        edges {
          node {
            ... on Repository {
              name
              id
              description
              url
              stargazerCount
              forkCount
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
    console.log('response: ', response.data.data.search.edges)
    
    return response.data.data.search.edges.map(edge => edge.node);
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};