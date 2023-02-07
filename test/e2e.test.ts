import { Client } from '../src';
import toBeMockedFetch from 'axios';
import { BASE_URL } from '../src/config';

jest.mock('axios');
const axios = toBeMockedFetch as unknown as jest.Mock<ReturnType<any>>;

const fakeMovies = [
  {
    _id: '5cd95395de30eff6ebccde5b',
    name: 'The Two Towers ',
    runtimeInMinutes: 179,
    budgetInMillions: 94,
    boxOfficeRevenueInMillions: 926,
    academyAwardNominations: 6,
    academyAwardWins: 2,
    rottenTomatoesScore: 96,
  },
  {
    _id: '5cd95395de30eff6ebccde5c',
    name: 'The Fellowship of the Ring',
    runtimeInMinutes: 178,
    budgetInMillions: 93,
    boxOfficeRevenueInMillions: 871.5,
    academyAwardNominations: 13,
    academyAwardWins: 4,
    rottenTomatoesScore: 91,
  },
  {
    _id: '5cd95395de30eff6ebccde5d',
    name: 'The Return of the King',
    runtimeInMinutes: 201,
    budgetInMillions: 94,
    boxOfficeRevenueInMillions: 1120,
    academyAwardNominations: 11,
    academyAwardWins: 11,
    rottenTomatoesScore: 95,
  },
];

const fakeQuotes = [
  {
    _id: '5cd96e05de30eff6ebccedfc',
    dialog: 'Tomatoes, sausages, nice crispy bacon',
    movie: fakeMovies[2]._id,
    character: '5cd99d4bde30eff6ebccfc7c',
  },
  {
    _id: '5cd96e05de30eff6ebcce99c',
    dialog: 'Sam, no!',
    movie: fakeMovies[2]._id,
    character: '5cd99d4bde30eff6ebccfc15',
  },
];

const ACCESS_TOKEN = 'TEST_ACCESS_TOKEN';

axios.mockImplementation(({ url }: { url: string }) => {
  if (url.includes(fakeMovies[2]._id) && url.includes('quote')) {
    return Promise.resolve({
      data: { docs: fakeQuotes },
      status: 200,
    });
  } else if (url.includes(fakeMovies[2]._id)) {
    return Promise.resolve({
      data: { docs: [fakeMovies[2]] },
      status: 200,
    });
  } else if (url === `${BASE_URL}/movie`) {
    return Promise.resolve({
      data: { docs: fakeMovies },
      status: 200,
    });
  }
});

describe('test v2 client', () => {
  let client: Client;

  beforeEach(() => {
    client = new Client({ auth: ACCESS_TOKEN });
  });

  test('list movies', async () => {
    const moviesRes = await client.listMovies();

    expect(moviesRes).toEqual({
      docs: fakeMovies,
    });
  });

  test('get movie', async () => {
    const movieRes = await client.getMovie({ movieId: fakeMovies[2]._id });

    expect(movieRes).toEqual(fakeMovies[2]);
  });

  test('get movie quotes', async () => {
    const quotesRes = await client.getMovieQuotes({
      movieId: fakeMovies[2]._id,
    });

    expect(quotesRes).toEqual({
      docs: fakeQuotes,
    });
  });
});
