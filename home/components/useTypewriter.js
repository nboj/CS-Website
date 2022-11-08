import {useEffect, useRef, useState} from "react";
import utils from "../components/helper-classes/utils";

const State = {
    increasing: 0,
    decreasing: 1,
    idle: 2,
}
const useTypewriter = async ({words, initiate}) => {
    const currentState = useRef(State.increasing)
    const currentWords = useRef([]);
    const moving = useRef(false)
    const currentWord = useRef('error')
    const currentIndex = useRef(1)
    const [word, setWord] = useState('')
    useEffect(() => {
        currentWords.current = Array.from(words)
        setNewWord()
    }, [])
    const typewriter = () => {
        type().then((res) => {
            setWord(res)
        })
    }
    useEffect(() => {
        if (initiate) {
            typewriter()
        }
    }, [word, initiate])
    const setNewWord = () => {
        const prevWord=currentWord.current
        let newWord = 'error'
        const getPopWord = () => {
            const index = utils.roundedRandom(0, currentWords.current.length - 1);
            newWord = currentWords.current[index]
            currentWords.current.splice(index, 1)
        }
        if (currentWords.current.length > 0) {
            getPopWord()
        } else {
            currentWords.current = Array.from(words)
            getPopWord()
        }
        if (initiate && prevWord === newWord) {
            getPopWord()
        }
        currentWord.current = newWord
    }
    const type = () => new Promise((resolve) => {
        const t = (Math.round(currentIndex.current/currentWord.current.length*100)/100)
        let delay = currentState.current===State.increasing?utils.bezier(t, .66,.01,.97,.59)*100:utils.bezier(t, 1,.2,.2,1)*66
        let newWord = null
        if (!moving.current) {
            moving.current = true
        }
        const getWord = () => new Promise(resolve2 => {
            if (currentState.current === State.increasing) {
                if (currentWord.current[currentIndex.current] === " ") {
                    currentIndex.current++
                }
                if (currentIndex.current <= currentWord.current.length) {
                    newWord = currentWord.current.substring(0, currentIndex.current)
                    currentIndex.current++
                    return resolve2(0)
                } else if (currentIndex.current > currentWord.current.length) {
                    moving.current = false
                    setTimeout(() => {
                        currentState.current = State.decreasing
                        currentIndex.current--
                        return resolve2(1)
                    }, utils.roundedRandom(2000, 2500))
                } else {
                    return resolve2(0)
                }
            } else {
                if (currentWord.current[currentIndex.current-1] === " ") {
                    currentIndex.current--
                }
                if (currentIndex.current > 0) {
                    currentIndex.current--
                    newWord = currentWord.current.substring(0, currentIndex.current)
                    return resolve2(0)
                } else if (currentIndex.current <= 0) {
                    currentState.current = State.idle
                    moving.current = false
                    return setTimeout(() => {
                        currentIndex.current=1
                        currentState.current = State.increasing
                        setNewWord()
                        return resolve2(0)
                    }, 50)
                } else {
                    return resolve2(0)
                }
            }
        })
        setTimeout(() => {
            getWord().then((a) => {
                if (newWord !== null) {
                    resolve(newWord)
                } else {
                    type().then(a => {
                        resolve(a)
                    })
                }
            })
        }, delay)
    })
    return {word: word, moving: moving.current};
}

export default useTypewriter;
