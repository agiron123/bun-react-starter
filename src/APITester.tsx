import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";


const API_URL = 'https://hypothecary-unfulminated-rayden.ngrok-free.dev/graphql'

export function APITester() {
  const [gameId, setGameId] = useState('')
  const [gameStatus, setGameStatus] = useState('')
  const [guessesRemaining, setGuessesRemaining] = useState(-1)
  const [guesses, setGuesses] = useState([])
  const [guessInputText, setGuessInputText] = useState('')
  const [error, setError] = useState('')

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

  const makeGuess = async (event) => {
    event.preventDefault();

    try {
      const mutation = `
        mutation GuessWord {
          makeGuess(
            candidate: {candidate: "${guessInputText}"}
            gameId: "${gameId}"
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
      console.log('guessResponse: ', JSON.stringify(guessResponseJSON))

      if (guessResponseJSON.errors) {
        throw new Error(guessResponseJSON.errors[0].message)
      }
      setGuesses(guessResponseJSON.data.makeGuess.guesses)
    } catch (error) {
      if (error instanceof Error) {
        console.log('error making guess: ', error)
        setError(error.message)
      } else {
        setError('Unable to contact server')
      }
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
      {
        error.length > 0 && (
          <p className="text-red-500">Error: {error}</p>
        )
      }

      <Button onClick={makeGuess} variant="secondary">
        Make Guess
      </Button>

      {
        guesses.length > 0 && (
          <div>
            {
              guesses.map((guess, index) => {
                return (<div key={`${guess.candidate}-${index}`} className="flex flex-row">
                  {
                    guess.letterMatches.map((letterMatch, index) => {
                      let borderColor = ""

                      if (letterMatch === 'CORRECT_LETTER_INCORRECT_POSITION') {
                        borderColor = 'border-yellow-500'
                      } else if (letterMatch === 'CORRECT_LETTER_AND_POSITION') {
                        borderColor = 'border-green-500'
                      }

                      return (
                        <div key={`${letterMatch}-${index}`} className={`flex text-3xl rounded border-2 w-36 h-36 center align-center justify-center ${borderColor}`}>
                          {guess.candidate[index]}
                        </div>
                      )
                    })
                  }</div>)
              })
            }
          </div>
        )
      }



    </div>
  );
}
