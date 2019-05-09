const localKey = '@GitCompare:repositories';

const getLocalRepositories = async () => JSON.parse(await localStorage.getItem(localKey)) || [];

const setLocalRepository = async (repository) => {
  await localStorage.setItem(localKey, JSON.stringify(repository));
};

const setLocalRepositories = async (repository) => {
  const localRepositories = await getLocalRepositories();

  await localStorage.setItem(localKey, JSON.stringify([...localRepositories, repository]));
};

export { getLocalRepositories, setLocalRepository, setLocalRepositories };
