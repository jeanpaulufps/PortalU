import MainLayout from '../layouts/MainLayout';
import Segment from '../components/Segment';
import Article from '../components/Article';
import newsList from '../mocks/news.json';

function Home() {
  return (
    <MainLayout>
      <Segment title="Novedades recientes">
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}
        >
          {newsList.map((news) => (
            <Article key={news.id} title={news.title}>
              {news.content}
            </Article>
          ))}
        </div>
      </Segment>
    </MainLayout>
  );
}

export default Home;
