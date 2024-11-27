function Segment({ children, title, action, icon }) {
  return (
    <main
      style={{
        margin: '16px 0px',
        background: 'white',
        borderTop: '3px solid #000b8b',
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
        <h2 style={{}}>{title}</h2>
        {action}
      </div>
      <div style={{ padding: 16 }}>{children}</div>
    </main>
  );
}

export default Segment;
