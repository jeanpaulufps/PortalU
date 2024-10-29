function Segment({ children, title, icon }) {
  return (
    <main
      style={{
        margin: '16px 0px',
        background: 'white',
        borderTop: '3px solid #000b8b',
        borderRadius: 4,
      }}
    >
      <h2 style={{ padding: 8, borderBottom: '1px solid #d2d6de' }}>{title}</h2>
      <div style={{ padding: 16 }}>{children}</div>
    </main>
  );
}

export default Segment;
