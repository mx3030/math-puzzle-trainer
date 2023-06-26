/*create json with folder and filename structure for linking with puzzleGenerator.js*/
/*this needs to run with local dev, not working with github pages*/
/*gets imported by puzzleGenerator.js --> can be run in local dev*/

async function getRepositoryContents(owner, repo, path) {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  if (response.ok) {
    const files = [];
    const folders = [];

    for (const item of data) {
      if (item.type === 'file') {
        files.push(item.name);
      } else if (item.type === 'dir') {
        folders.push(item.name);
      }
    }

    return { files, folders };
  } else {
    throw new Error(data.message || 'Failed to fetch repository contents.');
  }
}

// Example usage
const owner = 'mx3030';
const repo = 'math-puzzle-trainer';
const path = 'puzzles';

getRepositoryContents(owner, repo, path)
  .then(result => {
    console.log('Files:', result.files);
    console.log('Folders:', result.folders);
  })
  .catch(error => {
    console.error('Error:', error);
  });


