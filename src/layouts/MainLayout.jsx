import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function MainLayout({ children }) {
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <main
        style={{
          background: '#ecf0f5',
          marginLeft: 230,
          padding: 16,
          minHeight: 'calc(100vh - 50px)',
        }}
      >
        {children}
      </main>
    </>
  );
}

export default MainLayout;
