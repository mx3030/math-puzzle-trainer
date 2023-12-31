export async function getPuzzleFiles(owner, repo, path = '') {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
        const files = [];
        for (const item of data) {
            if (item.type === 'file') {
                if(item.name!='tags.js') files.push(item.path);
            } else if (item.type === 'dir') {
                const subFiles = await getPuzzleFiles(owner, repo, item.path);
                files.push(...subFiles);
            }
        }
        return files;
    } else {
        throw new Error(data.message || 'Failed to fetch repository contents.');
    }
}

export async function getGithubDirFolders(owner,repo, path=''){
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (response.ok) {
        const folders = [];

        for (const item of data) {
            if (item.type === 'dir') {
                folders.push(item.path);    
            }
        }
        return folders;
    } else {
        throw new Error(data.message || 'Failed to fetch repository contents.');
    }

}


