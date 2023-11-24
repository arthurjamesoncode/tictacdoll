import { ErrorGameData, ErrorGameList } from "../mocks/errorData";
import { GameSession, NewGameSession } from "../utils/types";

const API_BASE_URL = "http://localhost:3002";

export async function fetchGamedata () {
  try {
    const response = await fetch(`${API_BASE_URL}/sessions`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return (await response.json()) as GameSession[];
  } catch (error) {
    console.error("Error fetching game data:", error);
    return ErrorGameList
  }
};

export const addGamedata = async (gameData : NewGameSession) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding game data:", error);
    return ErrorGameData
  }
};

