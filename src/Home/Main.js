import Maincomponent from './Miancomponent';
const Main = ({ message }) => {
  return (
    <main>
      <ul>
        <Maincomponent
          itemImage={'images/packaging.jpg'}
          message={message.packaging}
        />
        <Maincomponent
          itemImage={'images/sealing1.jpg'}
          message={message.seal}
        />
        <Maincomponent
          itemImage={'images/transport.jpg'}
          message={message.transport}
        />
        <Maincomponent
          itemImage={'images/delivered1.jpg'}
          message={message.deliver}
        />
      </ul>
    </main>
  );
};

export default Main;
