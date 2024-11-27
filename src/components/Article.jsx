function Article({ children, title }) {
  return (
    <main
      style={{
        margin: '4px 0px',
        background: 'white',
        borderTop: '3px solid #000b8b',
        borderBottom: '3px solid #ccc',
        borderRadius: 4,
        overflow: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 8,
          borderBottom: '1px solid #d2d6de',
        }}
      >
        <h2>{title} </h2>
      </div>
      <div style={{ padding: 16 }}>{children}</div>
      <footer style={{ float: 'right', marginBottom: '8px' }}>
        {' '}
        {new Date().toLocaleDateString('es-CO', { dateStyle: 'full' })}{' '}
      </footer>
    </main>
  );
}

export default Article;
