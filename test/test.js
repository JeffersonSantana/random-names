const app = require('../index');

it('Testar a leitura do respositório', () => {
  expect(app.getRepository('names')).toEqual(["Jefferson", "Camila", "Igor", "Flavio", "Flávia"]);
});

it('Testar o nome randomico', () => {
  app.getRepository = jest.fn().mockImplementationOnce(() => ['Jefferson']).mockImplementationOnce(() => ['Bonito']).mockImplementationOnce(() => []);
  expect(app.getRandomCombination()).toEqual('Jefferson Bonito');
});

it('Verificar se existe na black list', () => {
  expect(app.verifyBlackList('Camila Bonito')).toBe(true);
});
