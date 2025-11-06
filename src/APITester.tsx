import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";


const API_URL = 'https://1b8ecb7eadb9.ngrok.app/graphql'

export function APITester() {
  const [gameId, setGameId] = useState('')
  const [gameStatus, setGameStatus] = useState('')
  const [guessesRemaining, setGuessesRemaining] = useState(-1)
  const [guesses, setGuesses] = useState([])
  const [guessInputText, setGuessInputText] = useState('')

  /*
  mutation BeginGame {
    beginGame {
      gameId
      guessesRemaining
      gameStatus
      guesses {
        candidate
        letterMatches
      }
    }
  }
  */

  async function beginGame() {
    if (!gameId) {
      const beginGameResponse = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
          mutation BeginGame {
          beginGame {
            gameId
            guessesRemaining
            gameStatus
            guesses {
              candidate
              letterMatches
            }
          }
        }`
        })
      })

      const beginGameResponseJSON = await beginGameResponse.json()
      const data = beginGameResponseJSON.data.beginGame
      console.log('gameId: ', data.gameId)
      setGameId(data.gameId)
      setGameStatus(data.gameStatus)
      setGuesses(data.guesses)
      setGuessesRemaining(data.guessesRemaining)

      console.log('beginGameResponse: ', beginGameResponseJSON)
    }
  }


  const responseInputRef = useRef<HTMLTextAreaElement>(null);

  const makeGuess = async (event) => {
    event.preventDefault();

    try {
      const mutation = `
        mutation GuessWord {
          makeGuess(
            candidate: {candidate: ${guessInputText}}
            gameId: ${gameId}
          ) {
            __typename ...on Game {
              gameId
              gameStatus
              guesses {
                candidate
                letterMatches
              }
              guessesRemaining
            }
          }
        }
      `

      const requestBody = JSON.stringify({ query: mutation })
      console.log('body: ', requestBody)
      const guessResponse = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody
      })

      const guessResponseJSON = await guessResponse.json()
      console.log('guessResponse: ', guessResponseJSON)
    } catch (error) {
      responseInputRef.current!.value = String(error);
    }
  };

  function onInputChanged(event) {
    setGuessInputText(event.target.value)
  }

  return (
    <div className="flex flex-col gap-6">

      <div>
        Game ID: {gameId}
      </div>
      <Button onClick={beginGame} variant="secondary">
        {gameId ? 'End Game' : "Begin Game"}
      </Button>

      <Label htmlFor="method" className="sr-only">
        Wordle
      </Label>
      <Input
        id="guessInput"
        type="text"
        name="guessInput"
        placeholder="guess"
        onChange={onInputChanged}
        value={guessInputText}
      />
      <Button onClick={makeGuess} variant="secondary">
        Make Guess
      </Button>
      <Label htmlFor="response" className="sr-only">
        Response
      </Label>
      <Textarea
        ref={responseInputRef}
        id="response"
        readOnly
        placeholder="Response will appear here..."
        className="min-h-[140px] font-mono resize-y"
      />
    </div>
  );
}
