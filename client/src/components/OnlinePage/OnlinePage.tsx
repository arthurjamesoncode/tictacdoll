import OnlineGamesList from '../OnlineGamesList/OnlineGamesList';

type OnlinePageProps = {
  games: { name: string; members: number }[];
  joinGame: (gameName: string) => void;
  createGame: () => void;
  refreshPage: () => void;
};

export default function OnlinePage(props: OnlinePageProps) {
  const { games, joinGame, createGame, refreshPage } = props;

  return (
    <div className='online-page'>
      <OnlineGamesList games={games} joinGame={joinGame} />
      <div className="online-page-buttons">
        <button className="orange-button" onClick={createGame}>Create new game</button>
        <button className="orange-button" onClick={refreshPage}>Refresh</button>
      </div>
    </div>
  );
}
