import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>404</h1>
      <p>La página que buscás no existe.</p>
      <Link to="/">Volver al catálogo</Link>
    </div>
  );
}

export default NotFoundPage;