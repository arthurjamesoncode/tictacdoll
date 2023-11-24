import { useAppSelector } from "../../store/hooks";


type OnlineGamesListProps = {
  games: { name: string; members: number }[];
  joinGame: (gameName: string) => void;
};

export default function OnlineGamesList({ games, joinGame }: OnlineGamesListProps) {

  const username = useAppSelector(state => state.user.username);
  const userGameName = username + '\'s game';

  return (
      <table className='online-games-list'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Members</th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.name}>
              <td>{game.name}</td>
              <td>{game.members}/2 players</td>
              <td>{game.name !== userGameName && <button className="join-button" onClick={() => joinGame(game.name)}>Join</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
  );
}
