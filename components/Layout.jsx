import { Menu, MenuButton, NoSsr } from '@components';

const Layout = ({ title, children, button }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-body text-sm">
      <Menu />
      <main className="max w-full gap-4 p-4 lg:col-span-5 lg:p-8 xl:px-12">
        <div className="mb-6 flex items-center">
          <div className="flex flex-1 items-center gap-3">
            <h3 className="text-2xl font-semibold">{title}</h3>
            {button}
          </div>
          <MenuButton />
        </div>
        <div className="grid gap-4">
          <NoSsr>{children}</NoSsr>
        </div>
      </main>
    </div>
  );
};

export default Layout;
