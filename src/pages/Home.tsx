import Container from '@/components/Container/Container';
import ProductList from '@/components/ProductList/ProductList';

const Home: React.FC = () => {
  return (
    <div>
      <Container>
        <ProductList />
      </Container>
    </div>
  );
};

export default Home;
